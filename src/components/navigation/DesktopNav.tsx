import Link from "next/link";
import { CATEGORIES } from "@/lib/data/mock-data";

const TOP_LINKS = [
  { href: "/auctions", label: "Аукционы" },
  { href: "/search?filter=buy_now", label: "Купить сейчас" },
  { href: "/stores", label: "Магазины" },
  { href: "/categories", label: "Категории" },
];

export function DesktopNav() {
  return (
    <nav className="hidden border-b border-line bg-surface px-6 py-3 lg:block">
      <div className="mx-auto flex max-w-6xl items-center gap-6">
        <Link href="/" className="text-xl font-black tracking-tight">
          <span className="text-brand-700">IT</span>
          <span className="text-auction-600">Orgo</span>
        </Link>

        <div className="flex items-center gap-1">
          {TOP_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-full px-3 py-1.5 text-sm font-medium hover:bg-surface-dim">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="no-scrollbar ml-auto flex items-center gap-2 overflow-x-auto">
          <span className="text-xs text-ink-faint">Категории:</span>
          {CATEGORIES.slice(0, 8).map((c) => (
            <Link key={c.id} href={`/search?cat=${c.id}`} className="shrink-0 rounded-full bg-surface-dim px-2.5 py-1 text-xs font-medium">
              {c.emoji} {c.label}
            </Link>
          ))}
          <Link href="/categories" className="shrink-0 text-xs font-semibold text-brand-600">
            Все →
          </Link>
        </div>

        <div className="ml-4 flex items-center gap-2">
          <Link href="/sell" className="btn-primary !min-h-9 !px-4 !text-sm">
            + Продать
          </Link>
          <Link href="/profile" className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-dim">
            👤
          </Link>
        </div>
      </div>

      {/* Mega-menu teaser — real mega menu with columns would go here (spec #36) */}
      <div className="mx-auto hidden max-w-6xl gap-6 pt-3 text-xs text-ink-faint lg:flex">
        <span>Бишкек · Ош · Джалал-Абад · Каракол · Токмок</span>
        <span className="ml-auto">KG · сом · ru · KZ/UZ скоро</span>
      </div>
    </nav>
  );
}
