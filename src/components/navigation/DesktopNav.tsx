import Link from "next/link";
import { CartBadge } from "@/components/cart/CartBadge";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const TOP_LINKS = [
  { href: "/auctions", label: "Аукционы" },
  { href: "/search?filter=buy_now", label: "Купить сейчас" },
  { href: "/stores", label: "Магазины" },
  { href: "/categories", label: "Категории" },
];

export function DesktopNav() {
  return (
    <nav className="hidden border-b border-line bg-surface px-6 py-3 lg:block">
      <div className="mx-auto flex max-w-[1400px] items-center gap-6">
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

        <div className="ml-auto flex items-center gap-2">
          <CartBadge />
          <ThemeToggle />
          <Link href="/sell" className="btn-primary !min-h-9 !px-4 !text-sm">
            + Продать
          </Link>
          <Link href="/profile" className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-dim">
            👤
          </Link>
        </div>
      </div>

      {/* Mega-menu teaser — real mega menu with columns would go here (spec #36) */}
      <div className="mx-auto flex max-w-[1400px] gap-6 pt-3 text-xs text-ink-faint lg:flex">
        <span>Бишкек · Ош · Джалал-Абад · Каракол · Токмок</span>
        <span className="ml-auto">KG · сом · ru · KZ/UZ скоро</span>
      </div>
    </nav>
  );
}
