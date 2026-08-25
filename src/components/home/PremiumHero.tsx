import Link from "next/link";
import { getLiveAuctions, getProduct, formatKGS } from "@/lib/data/mock-data";
import { Countdown } from "@/components/ui/Countdown";
import { ProductImage } from "@/components/ui/ProductImage";
import { IconBolt } from "@/components/icons/Icons";

/**
 * HeroBentoPro v2 — $10k editorial
 * 21st inspiration: bento + glass + live pulse + editorial type
 * Mobile: stacked, Desktop: 1.6fr / 1fr + 2x2 bento
 */
export function PremiumHero() {
  const live = getLiveAuctions()[0];
  if (!live) return null;
  const p = getProduct(live.productId)!;

  return (
    <section className="mx-4 overflow-hidden rounded-[28px] bg-ink p-2.5 shadow-lifted lg:mx-0 lg:p-3">
      {/* Top bar — trust + locale */}
      <div className="flex items-center justify-between px-2 pb-2 text-[11px] font-bold tracking-wide text-white/60">
        <span className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-white backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> LIVE · {live.bidsCount} ставок сейчас
          </span>
          <span className="hidden lg:inline">Кыргызстан · сом · ru</span>
        </span>
        <span className="hidden lg:inline text-white/40">● 4 210 онлайн</span>
      </div>

      <div className="grid gap-2.5 lg:grid-cols-[1.55fr_0.95fr]">
        {/* Featured — editorial */}
        <Link href={`/product/${p.id}`} className="group relative overflow-hidden rounded-[20px] bg-white">
          <ProductImage product={p} big className="h-[260px] w-full lg:h-[340px]" />
          {/* editorial overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
          {/* top badges */}
          <div className="absolute left-3 top-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-danger px-3 py-1 text-xs font-black tracking-wide text-white">
              <span className="live-dot h-2 w-2 rounded-full bg-white" /> LIVE AUCTION
            </span>
            <span className="hidden rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-ink shadow lg:inline-flex">🔥 {live.bidsCount} · {live.participants} участников</span>
          </div>
          {/* bottom editorial */}
          <div className="absolute inset-x-0 bottom-0 p-3 lg:p-4">
            <div className="flex items-end justify-between gap-3">
              <div className="min-w-0">
                <p className="line-clamp-1 text-sm font-black leading-tight text-white lg:text-lg">{p.title}</p>
                <p className="mt-1 flex items-center gap-2 text-xs text-white/70">
                  <span>{p.city}</span>
                  <span>·</span>
                  <span className="rounded-full bg-white/15 px-2 py-0.5 font-bold text-white backdrop-blur">Текущая {formatKGS(live.currentBid)} сом</span>
                </p>
              </div>
              <div className="shrink-0 rounded-2xl bg-white px-3 py-2 text-center shadow-xl">
                <p className="text-[10px] font-black tracking-widest text-ink-faint">ОСТАЛОСЬ</p>
                <Countdown endsAt={live.endsAt} className="text-sm !p-0 font-black" />
                <p className="text-[11px] font-bold text-success">🛡 Безопасная сделка</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Bento 2x2 — stats */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="rounded-[20px] bg-white p-4">
            <p className="text-xs font-bold tracking-widest text-ink-faint">GMV · СЕГОДНЯ</p>
            <p className="mt-1 text-2xl font-black tabular-nums tracking-tight">1.2 млн <span className="text-sm font-bold text-ink-faint">сом</span></p>
            <div className="mt-3 flex items-end gap-1">
              {[18, 28, 22, 34, 26, 40, 32].map((h, i) => (
                <span key={i} className="flex-1 rounded-full bg-brand-600" style={{ height: `${h}px`, opacity: 0.9 - i * 0.06 }} />
              ))}
            </div>
            <p className="mt-2 text-xs font-bold text-success">▲ 12% к вчера</p>
          </div>

          <div className="rounded-[20px] bg-brand-600 p-4 text-white">
            <p className="text-xs font-bold tracking-widest opacity-80">АКТИВНЫХ ТОРГОВ</p>
            <p className="mt-1 text-4xl font-black tracking-tight">20</p>
            <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-xs font-bold backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-white" /> 4 заканчиваются &lt;10 мин
            </p>
            <Link href="/auctions" className="mt-3 inline-flex rounded-full bg-white px-3 py-1.5 text-xs font-black text-brand-700">Все аукционы →</Link>
          </div>

          <div className="rounded-[20px] bg-white p-4">
            <p className="text-xs font-bold tracking-widest text-ink-faint">ДОВЕРИЕ</p>
            <p className="mt-2 flex items-baseline gap-1 text-2xl font-black">
              4.9<span className="text-sm font-bold text-ink-faint">/5</span>
              <span className="text-amber-400">★★★★★</span>
            </p>
            <p className="mt-1 text-xs leading-tight text-ink-faint">Средний рейтинг · 2.1k отзывов · 🛡 96% trust</p>
          </div>

          <Link href="/sell" className="group flex flex-col justify-between rounded-[20px] bg-auction-500 p-4 text-white transition hover:bg-auction-600">
            <div>
              <p className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-xs font-black backdrop-blur">
                <IconBolt size={12} strokeWidth={2.4} /> Продать за 30 сек
              </p>
              <p className="mt-3 text-lg font-black leading-tight">Фото → AI → цена</p>
            </div>
            <span className="mt-4 inline-flex w-fit items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-black text-auction-700 transition group-hover:gap-2">Начать <span>→</span></span>
          </Link>
        </div>
      </div>

      <p className="px-2 pt-2 text-center text-xs font-medium tracking-wide text-white/35 lg:text-left">
        Бишкек · Ош · Джалал-Абад · Каракол · Токмок
      </p>
    </section>
  );
}
