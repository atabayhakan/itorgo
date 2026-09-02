"use client";

import { usePathname } from "next/navigation";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { BottomNav } from "@/components/navigation/BottomNav";
import { FloatingSell } from "@/components/sell/FloatingSell";

/** Storefront nav/sidebar/bottom-nav — everywhere except /admin, which renders its own full-bleed AdminShell. */
export function StorefrontShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin" || pathname?.startsWith("/admin/")) {
    return <>{children}</>;
  }

  return (
    <>
      <DesktopNav />
      <div className="mx-auto min-h-dvh max-w-[1440px] bg-surface-dim px-4 lg:px-10 lg:py-6">
        <div className="lg:flex lg:gap-10">
          <div className="min-w-0 flex-1 lg:max-w-[calc(100%-340px)]">{children}</div>
          {/* Desktop sidebar — real filters (component not filler) */}
          <aside className="hidden w-[300px] shrink-0 lg:block">
            <div className="sticky top-[88px] space-y-3">
              <div className="rounded-2xl bg-surface p-4 shadow-card">
                <p className="text-sm font-bold">Быстрые фильтры</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {["Электроника", "Авто", "Новинки", "Аукцион", "Бишкек", "до 50 000 сом"].map((f) => (
                    <a key={f} href={`/search?q=${encodeURIComponent(f)}`} className="rounded-full bg-surface-dim px-3 py-1.5 text-xs font-semibold hover:bg-brand-50">
                      {f}
                    </a>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl bg-ink p-4 text-white shadow-lifted">
                <p className="text-sm font-black">Продавайте на ITOrgo</p>
                <p className="mt-1 text-xs opacity-80">0% комиссия на первый месяц · AI поможет с ценой</p>
                <a href="/sell" className="mt-3 inline-flex w-full justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-black text-ink">
                  + Создать объявление
                </a>
              </div>
            </div>
          </aside>
        </div>
        <div className="h-[72px] lg:hidden" aria-hidden />
      </div>
      <div className="lg:hidden">
        <FloatingSell />
        <BottomNav />
      </div>
    </>
  );
}
