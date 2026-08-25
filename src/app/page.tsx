import { Header } from "@/components/navigation/Header";
import { LiveTicker } from "@/components/home/LiveTicker";
import { PremiumHero } from "@/components/home/PremiumHero";
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

      {/* Live ticker — platform canliligi hissi (spec #8/#63) */}
      <div className="pt-2">
        <LiveTicker />
      </div>

      {/* Premium bento hero — 21st editorial, ilk 3 sn WOW (spec #3, #5) */}
      <div className="mt-3">
        <PremiumHero />
      </div>

      {/* HERO / DISCOVERY — 🔥 Сейчас на торгах */}
      <section className="mt-5 space-y-3">
        <SectionHeader title="Сейчас на торгах" live href="/auctions" count={live.length} subtitle="Торги в реальном времени — сделайте ставку" />
        <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-1 snap-x snap-mandatory">
          {live.slice(0, 8).map((a) => (
            <div key={a.id} className="snap-start">
              <AuctionCard auctionId={a.id} />
            </div>
          ))}
        </div>
      </section>

      {/* QUICK ACTIONS — spec #9 */}
      <section className="mt-6">
        <QuickActions />
      </section>

      {/* AI SEARCH ASSISTANT banner — spec #12 */}
      <div className="mx-4 mt-4 flex items-center justify-between rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 px-4 py-3.5 text-white shadow-lifted">
        <div>
          <p className="text-sm font-bold">🤖 Помочь найти?</p>
          <p className="mt-0.5 text-xs opacity-80">Опишите, что ищете — AI подберёт варианты</p>
        </div>
        <Link href="/search" className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-700">
          Спросить AI
        </Link>
      </div>

      {/* CATEGORY EXPERIENCE — spec #10 */}
      <section className="mt-6 space-y-3">
        <SectionHeader title="Категории" href="/categories" subtitle="Электроника, авто, ферма — всё в одном месте" />
        <CategoryGrid />
      </section>

      {/* SMART FEED — Для вас (spec #20) */}
      <section className="mt-6 space-y-3">
        <SectionHeader title="Для вас" subtitle="Подобрано на основе ваших интересов · Бишкек" href="/search" />
        <div className="grid grid-cols-2 gap-3 px-4 lg:grid-cols-4">
          {feed.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="px-4">
          <Link href="/search" className="btn-secondary w-full">
            Показать ещё
          </Link>
        </div>
      </section>

      {/* Ending soon rail — FOMO */}
      {endingSoon.length > 0 && (
        <section className="mt-6 space-y-3">
          <SectionHeader title="Скоро закончится" subtitle="Успейте сделать ставку" href="/auctions?filter=ending_soon" />
          <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-1 snap-x snap-mandatory">
            {endingSoon.map((a) => (
              <div key={a.id} className="snap-start">
                <AuctionCard auctionId={a.id} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Popular stores — spec #18 */}
      <section className="mt-6 space-y-3">
        <SectionHeader title="Популярные магазины" subtitle="Проверенные продавцы Кыргызстана" href="/stores" />
        <StoreStrip />
      </section>

      {/* Footer SEO + trust */}
      <footer className="mt-8 border-t border-line bg-surface px-4 py-8">
        <p className="text-sm font-bold">ITOrgo — Кыргызстандын жаңы муундагы соода платформасы</p>
        <p className="mt-1 text-xs leading-relaxed text-ink-faint">
          Marketplace · Live Auctions · Магазины · AI · Trust. Бишкек · Ош · Джалал-Абад · Каракол · Токмок и вся страна.
          Валюта — сом. Языки — русский, кыргызча. Платформа готова к расширению: Казахстан и Узбекистан.
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
