"use client";

import Link from "next/link";
import { CartBadge } from "@/components/cart/CartBadge";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LocaleSwitcher } from "@/components/i18n/LocaleCountrySwitcher";
import { useLocale, useT } from "@/lib/i18n/LocaleProvider";

const TOP_LINKS = [
  { href: "/auctions", labelKey: "nav.auctions" },
  { href: "/search?filter=buy_now", labelKey: "nav.buy_now" },
  { href: "/stores", labelKey: "nav.stores" },
  { href: "/categories", labelKey: "nav.categories" },
];

export function DesktopNav() {
  const t = useT();
  const locale = useLocale();
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
              {t(l.labelKey)}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <CartBadge />
          <ThemeToggle />
          <LocaleSwitcher />
          <Link href="/sell" className="btn-primary !min-h-9 !px-4 !text-sm">
            + {t("nav.sell")}
          </Link>
          <Link href="/profile" aria-label={t("nav.profile")} className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-dim">
            👤
          </Link>
        </div>
      </div>

      {/* Mega-menu teaser — a real mega menu with columns would go here */}
      <div className="mx-auto flex max-w-[1400px] gap-6 pt-3 text-xs text-ink-faint lg:flex">
        <span>{t("nav.cities_line")}</span>
        <span className="ml-auto">{t("nav.region_line", { locale })}</span>
      </div>
    </nav>
  );
}
