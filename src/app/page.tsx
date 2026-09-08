import { Header } from "@/components/navigation/Header";
import { LiveTicker } from "@/components/home/LiveTicker";
import { PremiumHero } from "@/components/home/PremiumHero";
import { TrustBarPro } from "@/components/home/TrustBarPro";
import { AuctionCard } from "@/components/auction/AuctionCard";
import { QuickActions } from "@/components/home/QuickActions";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { SectionHeader } from "@/components/home/SectionHeader";
import { StoreStrip } from "@/components/home/StoreStrip";
import { ProductCard } from "@/components/product/ProductCard";
import { AIFloatingButton } from "@/components/home/AIFloatingButton";
import Link from "next/link";
import { getLiveAuctions, getFeed } from "@/lib/data/catalog";
import { getT } from "@/lib/i18n/server";

// Force dynamic so countdown "endsAt" is live per request (demo).
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const t = await getT();
  const live = await getLiveAuctions();
  const feed = await getFeed(12);
  // Ending-soon auctions get their own FOMO rail below — keep the general
  // live rail from showing the same cards twice.
  const endingSoon = live.filter((a) => a.status === "ending_soon");
  const generalLive = live.filter((a) => a.status !== "ending_soon").slice(0, 8);

  return (
    <main className="pb-10">
      <Header />

      <div className="pt-3 px-4 lg:px-0">
        <LiveTicker />
      </div>

      {/* LIVE AUCTION HERO — editorial, signature */}
      <div className="mt-5 rise-in">
        <PremiumHero />
      </div>

      {/* QUICK ACTIONS */}
      <section className="rise-in mt-10" style={{ animationDelay: "60ms" }}>
        <QuickActions />
      </section>

      {/* Trust bar — compact, no dashboard feel */}
      <div className="mt-10 px-4 lg:px-0">
        <TrustBarPro />
      </div>

      {/* Signature: dark auction section — live now */}
      <section className="rise-in mt-14 bg-ink py-12" style={{ animationDelay: "100ms" }}>
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-4 flex items-end justify-between gap-3 px-4 lg:px-6">
            <div className="min-w-0">
              <h2 className="flex flex-wrap items-center gap-2 text-[18px] font-bold tracking-tight text-white lg:text-[22px]">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-white px-2 py-1 text-[11px] font-bold tracking-wide text-danger">
                  <span className="live-dot h-2 w-2 rounded-full bg-danger" /> LIVE
                </span>
                {t("home.live_now")}
                <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs font-bold text-white/70">{live.length}</span>
              </h2>
              <p className="mt-1 text-sm text-white/60">{t("home.live_subtitle")}</p>
            </div>
            <Link href="/auctions" className="shrink-0 rounded-[10px] border border-white/25 px-3.5 py-2 text-sm font-semibold text-white hover:bg-white/10">
              {t("common.see_all")}
            </Link>
          </div>
          <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 lg:px-6">
            {generalLive.map((a) => (
              <div key={a.id} className="snap-start">
                <AuctionCard auctionId={a.id} dark />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY EXPERIENCE */}
      <section className="rise-in mt-16 space-y-6" style={{ animationDelay: "180ms" }}>
        <SectionHeader title={t("home.categories")} href="/categories" subtitle={t("home.categories_subtitle", { n: 16 })} />
        <CategoryGrid />
      </section>

      {/* SMART FEED */}
      <section className="rise-in mt-16 space-y-6" style={{ animationDelay: "240ms" }}>
        <SectionHeader title={t("home.for_you")} subtitle={t("home.for_you_subtitle", { city: t("cities.bishkek") })} href="/search" />
        <div className="grid grid-cols-2 gap-3 px-4 lg:grid-cols-4 lg:px-0">
          {feed.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="px-4 lg:px-0">
          <Link href="/search" className="inline-flex w-full items-center justify-center rounded-[10px] border border-line bg-surface py-4 text-sm font-semibold hover:bg-surface-dim transition">
            {t("common.more")}
          </Link>
        </div>
      </section>

      {/* Ending soon — FOMO */}
      {endingSoon.length > 0 && (
        <section className="mt-16 space-y-6">
          <SectionHeader title={t("home.ending_soon")} subtitle={t("home.ending_soon_subtitle")} href="/auctions?filter=ending_soon" />
          <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1">
            {endingSoon.slice(0, 6).map((a) => (
              <div key={a.id} className="snap-start">
                <AuctionCard auctionId={a.id} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Popular stores */}
      <section className="mt-16 space-y-6">
        <SectionHeader title={t("home.top_stores")} subtitle={t("home.top_stores_subtitle")} href="/stores" />
        <StoreStrip />
      </section>

      <AIFloatingButton />

      {/* Footer */}
      <footer className="mt-12 border-t border-line bg-surface px-4 py-8">
        <p className="text-sm font-bold">{t("home.footer_title")}</p>
        <p className="mt-1 text-xs leading-relaxed text-ink-faint">
          {t("home.footer_text", { cities: t("nav.cities_line") })}
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="chip bg-surface-sunken text-ink-soft">KG · {t("home.country_active")}</span>
          <span className="chip bg-surface-sunken text-ink-faint">KZ · {t("common.soon")}</span>
          <span className="chip bg-surface-sunken text-ink-faint">UZ · {t("common.soon")}</span>
        </div>
        <p className="mt-6 text-center text-[11px] text-ink-faint">{t("home.copyright", { year: new Date().getFullYear() })}</p>
      </footer>
    </main>
  );
}
