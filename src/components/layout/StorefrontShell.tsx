"use client";

import { usePathname } from "next/navigation";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { BottomNav } from "@/components/navigation/BottomNav";
import { FloatingSell } from "@/components/sell/FloatingSell";
import { useT } from "@/lib/i18n/LocaleProvider";

const QUICK_FILTER_KEYS = [
  "home.cat_electronics",
  "home.cat_auto",
  "home.new_items",
  "home.filter_auction",
  "cities.bishkek",
  "home.filter_under_price",
];

/** Storefront nav/sidebar/bottom-nav — everywhere except /admin, which renders its own full-bleed AdminShell. */
export function StorefrontShell({ children }: { children: React.ReactNode }) {
  const t = useT();
  const pathname = usePathname();
  if (pathname === "/admin" || pathname?.startsWith("/admin/")) {
    return <>{children}</>;
  }
  // Pages with their own primary CTA (bid/buy/pay) — the floating "Sell" button would sit on top of it.
  const hideFloatingSell = /^\/(product|checkout|cart|sell|login|register)(\/|$)/.test(pathname ?? "");
  // The browse sidebar (quick filters + sell promo) only makes sense on discovery pages.
  const showSidebar = /^\/(auctions|categories|stores|search)?(\/|$)/.test(pathname ?? "/");

  return (
    <>
      <DesktopNav />
      <div className="mx-auto min-h-dvh max-w-[1440px] bg-surface-dim px-4 lg:px-10 lg:py-6">
        <div className="lg:flex lg:gap-10">
          <div className={`min-w-0 flex-1 ${showSidebar ? "lg:max-w-[calc(100%-340px)]" : ""}`}>{children}</div>
          {/* Desktop sidebar — quick filters + sell promo */}
          <aside className={`hidden w-[300px] shrink-0 ${showSidebar ? "lg:block" : ""}`}>
            <div className="sticky top-[88px] space-y-3">
              <div className="rounded-2xl bg-surface p-4 shadow-card">
                <p className="text-sm font-bold">{t("home.quick_filters")}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {QUICK_FILTER_KEYS.map((key) => {
                    const f = t(key);
                    return (
                      <a key={key} href={`/search?q=${encodeURIComponent(f)}`} className="rounded-full bg-surface-dim px-3 py-1.5 text-xs font-semibold hover:bg-brand-50">
                        {f}
                      </a>
                    );
                  })}
                </div>
              </div>
              <div className="rounded-2xl bg-ink p-4 text-white shadow-lifted">
                <p className="text-sm font-black">{t("home.sell_on_itorgo")}</p>
                <p className="mt-1 text-xs opacity-80">{t("home.sell_promo")}</p>
                <a href="/sell" className="mt-3 inline-flex w-full justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-black text-ink">
                  + {t("home.create_listing")}
                </a>
              </div>
            </div>
          </aside>
        </div>
        <div className="h-[72px] lg:hidden" aria-hidden />
      </div>
      <div className="lg:hidden">
        {!hideFloatingSell && <FloatingSell />}
        <BottomNav />
      </div>
    </>
  );
}
