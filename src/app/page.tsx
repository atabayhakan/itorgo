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
import { getLiveAuctions, getFeed } from "@/lib/data/mock-data";
import Link from "next/link";

// Force dynamic so countdown "endsAt" is live per request (demo).
export const dynamic = "force-dynamic";

export default function HomePage() {
  const live = getLiveAuctions();
  const feed = getFeed(12);
  const endingSoon = live.filter((a) => a.status === "ending_soon").slice(0, 6);

  return (
    <main className="pb-6">
      <Header />

      <div className="pt-2">
        <LiveTicker />
      </div>

      {/* LIVE AUCTION HERO — editorial, signature */}
      <div className="mt-4 rise-in">
        <PremiumHero />
      </div>

      <div className="mt-4 px-4 lg:px-0">
        <TrustBarPro />
      </div>

      {/* Signature: dark auction section — Сейчас на торгах */}
      <section className="rise-in mt-10 bg-ink py-8" style={{ animationDelay: "80ms" }}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex items-end justify-between gap-3 px-4 lg:px-6">
            <div className="min-w-0">
              <h2 className="flex flex-wrap items-center gap-2 text-[18px] font-bold tracking-tight text-white lg:text-[22px]">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-white px-2 py-1 text-[11px] font-bold tracking-wide text-danger">
                  <span className="live-dot h-2 w-2 rounded-full bg-danger" /> LIVE
                </span>
                Сейчас на торгах
                <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs font-bold text-white/70">{live.length}</span>
              </h2>
              <p className="mt-1 text-sm text-white/60">Торги в реальном времени — сделайте ставку</p>
            </div>
            <Link href="/auctions" className="shrink-0 rounded-[10px] border border-white/25 px-3.5 py-2 text-sm font-semibold text-white hover:bg-white/10">
              Все
            </Link>
          </div>
          <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 lg:px-6">
            {live.slice(0, 8).map((a) => (
              <div key={a.id} className="snap-start">
                <AuctionCard auctionId={a.id} dark />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="rise-in mt-10" style={{ animationDelay: "140ms" }}>
        <QuickActions />
      </section>

      {/* CATEGORY EXPERIENCE */}
      <section className="rise-in mt-12 space-y-4" style={{ animationDelay: "200ms" }}>
        <SectionHeader title="Категории" href="/categories" subtitle="16 категорий — от электроники до фермы" />
        <CategoryGrid />
      </section>

      {/* SMART FEED */}
      <section className="rise-in mt-12 space-y-4" style={{ animationDelay: "260ms" }}>
        <SectionHeader title="Для вас" subtitle="Подобрано на основе ваших интересов · Бишкек" href="/search" />
        <div className="grid grid-cols-2 gap-3 px-4 lg:grid-cols-4 lg:px-0">
          {feed.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="px-4 lg:px-0">
          <Link href="/search" className="inline-flex w-full items-center justify-center rounded-[10px] border border-line bg-surface py-3 text-sm font-semibold hover:bg-surface-dim">
            Показать ещё
          </Link>
        </div>
      </section>

      {/* Ending soon — FOMO */}
      {endingSoon.length > 0 && (
        <section className="mt-12 space-y-4">
          <SectionHeader title="Скоро закончится" subtitle="Успейте сделать ставку" href="/auctions?filter=ending_soon" />
          <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1">
            {endingSoon.map((a) => (
              <div key={a.id} className="snap-start">
                <AuctionCard auctionId={a.id} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Popular stores */}
      <section className="mt-12 space-y-4">
        <SectionHeader title="Популярные магазины" subtitle="Проверенные продавцы Кыргызстана" href="/stores" />
        <StoreStrip />
      </section>

      {/* Footer */}
      <footer className="mt-12 border-t border-line bg-surface px-4 py-8">
        <p className="text-sm font-bold">ITOrgo — Кыргызстандын жаңы муундагы соода платформасы</p>
        <p className="mt-1 text-xs leading-relaxed text-ink-faint">
          Marketplace · Live Auctions · Магазины · AI · Trust. Бишкек · Ош · Джалал-Абад · Каракол · Токмок и вся страна.
          Валюта — сом. Языки — русский, кыргызча.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="chip bg-surface-sunken text-ink-soft">KG · активен</span>
          <span className="chip bg-surface-sunken text-ink-faint">KZ · скоро</span>
          <span className="chip bg-surface-sunken text-ink-faint">UZ · скоро</span>
        </div>
        <p className="mt-6 text-center text-[11px] text-ink-faint">© {new Date().getFullYear()} ITOrgo · www.itorgo.kg</p>
      </footer>
    </main>
  );
}
