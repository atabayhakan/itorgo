import Link from "next/link";
import { getLiveAuctions, getProduct } from "@/lib/data/mock-data";
import { formatKGS } from "@/lib/data/mock-data";
import { Countdown } from "@/components/ui/Countdown";
import { ProductImage } from "@/components/ui/ProductImage";

export function PremiumHero() {
  const live = getLiveAuctions()[0];
  if (!live) return null;
  const p = getProduct(live.productId)!;

  return (
    <section className="mx-4 overflow-hidden rounded-[28px] bg-ink p-3 text-white shadow-lifted lg:mx-0">
      <div className="grid gap-3 lg:grid-cols-[1.35fr_0.85fr]">
        {/* Featured live */}
        <Link href={`/product/${p.id}`} className="group relative overflow-hidden rounded-2xl bg-white text-ink">
          <ProductImage product={p} big className="h-[240px] w-full lg:h-[300px]" />
          <div className="absolute left-3 top-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-danger px-2.5 py-1 text-xs font-black text-white">
              <span className="live-dot h-2 w-2 rounded-full bg-white" /> LIVE
            </span>
            <span className="rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-white backdrop-blur">
              🔥 {live.bidsCount} ставок
            </span>
          </div>
          <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3">
            <div>
              <p className="line-clamp-1 text-sm font-extrabold leading-tight">{p.title}</p>
              <p className="text-xs text-ink-faint">{p.city} · {live.participants} участников</p>
            </div>
            <div className="shrink-0 rounded-xl bg-ink px-3 py-2 text-right text-white">
              <p className="text-xs opacity-70">Текущая</p>
              <p className="text-sm font-black tabular-nums">{formatKGS(live.currentBid)} сом</p>
              <Countdown endsAt={live.endsAt} className="!p-0 text-xs text-white" />
            </div>
          </div>
        </Link>

        {/* Bento 2x2 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white p-4 text-ink">
            <p className="text-xs font-bold tracking-wide text-ink-faint">GMV · сегодня</p>
            <p className="mt-1 text-xl font-black tabular-nums">1.2 млн сом</p>
            <p className="mt-1 text-xs text-success">▲ 12% к вчера</p>
          </div>
          <div className="rounded-2xl bg-brand-600 p-4 text-white">
            <p className="text-xs font-bold opacity-80">Активных торгов</p>
            <p className="mt-1 text-3xl font-black">20</p>
            <p className="text-xs opacity-80">заканчиваются &lt; 10 мин: 4</p>
          </div>
          <div className="rounded-2xl bg-white p-4 text-ink">
            <p className="text-xs font-bold text-ink-faint">Доверие</p>
            <p className="mt-1 flex items-center gap-1 text-sm font-bold">
              🛡 96% <span className="text-xs font-normal text-ink-faint">средний trust</span>
            </p>
            <p className="mt-1 text-xs text-ink-faint">Проверенные продавцы</p>
          </div>
          <Link href="/sell" className="flex flex-col justify-between rounded-2xl bg-auction-500 p-4 text-white">
            <p className="text-sm font-black">+ Продать</p>
            <p className="text-xs opacity-90">Фото → AI → цена → публикация</p>
            <span className="mt-2 inline-flex w-fit rounded-full bg-white px-3 py-1 text-xs font-bold text-auction-600">Начать →</span>
          </Link>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between px-1 text-xs">
        <span className="opacity-60">Кыргызстан · сом · ru · KZ/UZ скоро</span>
        <span className="hidden opacity-60 lg:inline">Apple + Airbnb + Vinted + StockX hissiyatı — editorial bento</span>
      </div>
    </section>
  );
}
