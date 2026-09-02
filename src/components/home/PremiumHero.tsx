import Link from "next/link";
import { getLiveAuctions, getProduct, formatKGS } from "@/lib/data/mock-data";
import { Countdown } from "@/components/ui/Countdown";
import { ProductImage, Avatar } from "@/components/ui/ProductImage";
import { IconBolt, IconGavel, IconVerified } from "@/components/icons/Icons";
import { getSeller } from "@/lib/data/mock-data";

/**
 * LIVE AUCTION HERO — editorial, premium live commerce.
 * 2/3 real product photo · 1/3 bid info + CTA. Signature of the platform.
 */
export function PremiumHero() {
  const live = getLiveAuctions()[0];
  if (!live) return null;
  const p = getProduct(live.productId)!;
  const seller = getSeller(p.sellerId);

  return (
    <section className="mx-4 overflow-hidden rounded-[20px] bg-gradient-to-br from-[#0a0a12] via-[#0f0f14] to-[#12121a] text-white shadow-[0_12px_40px_-16px_rgba(0,0,0,0.7)] lg:mx-0">
      <div className="grid lg:grid-cols-[1.6fr_1fr]">
        {/* Photo */}
        <Link href={`/product/${p.id}`} className="group relative block overflow-hidden">
          <ProductImage product={p} big priority className="h-[320px] w-full lg:h-[480px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12]/80 via-transparent to-[#0a0a12]/20" />
          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-lg bg-white/10 backdrop-blur-md px-3 py-1.5 text-xs font-extrabold tracking-[0.1em] text-white border border-white/10">
            <span className="live-dot h-2.5 w-2.5 rounded-full bg-auction-400 shadow-[0_0_8px_rgba(249,115,22,0.6)]" /> LIVE AUCTION
          </span>
          {/* live activity */}
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-xl bg-black/50 backdrop-blur-md px-3 py-2 text-xs font-medium text-white/90 border border-white/5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
            Aigerim повысила ставку · +500 сом · 2 сек назад
          </span>
        </Link>

        {/* Info */}
        <div className="flex flex-col justify-between gap-5 p-6 lg:p-8">
          <div>
            <p className="text-[10px] font-extrabold tracking-[0.2em] text-white/30 uppercase">Live Auction · Сейчас на торгах</p>
            <Link href={`/product/${p.id}`} className="mt-3 block text-[24px] font-black leading-[1.1] tracking-tight hover:underline lg:text-[32px]">
              {p.title}
            </Link>
            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-[10px] font-extrabold tracking-[0.15em] text-white/30 uppercase">Текущая ставка</span>
            </div>
            <p className="text-[42px] font-black leading-none tracking-tighter lg:text-[52px]">
              {formatKGS(live.currentBid)} <span className="text-xl font-semibold text-white/40">сом</span>
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/60">
              <span className="inline-flex items-center gap-1.5 font-semibold text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-auction-400 shadow-[0_0_6px_rgba(249,115,22,0.5)]" />
                {live.bidsCount} ставок
              </span>
              <span>👀 {live.participants * 3} смотрят</span>
              <Countdown endsAt={live.endsAt} className="!bg-transparent !p-0 font-mono text-base font-extrabold text-white tracking-tight" />
            </div>
          </div>

          <div>
            <div className="mb-5 flex items-center gap-3 text-sm">
              <Avatar name={seller.name} seed={seller.avatarSeed} size={32} />
              <div className="min-w-0">
                <span className="block font-semibold truncate">{seller.name}</span>
                <span className="text-[11px] text-white/30">Проверенный продавец</span>
              </div>
              {seller.verified && <IconVerified size={16} className="text-emerald-400 shrink-0" />}
              <span className="ml-auto inline-flex items-center gap-1 rounded-lg bg-white/[0.08] border border-white/[0.08] px-2.5 py-1 text-[11px] font-extrabold text-emerald-300">
                🛡 {seller.positivePct}%
              </span>
            </div>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-[1.3fr_1fr]">
              <Link href={`/product/${p.id}`} className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-[14px] bg-gradient-to-r from-auction-500 to-auction-600 px-5 text-[15px] font-extrabold text-white shadow-[0_6px_20px_-4px_rgba(249,115,22,0.45)] transition hover:shadow-[0_8px_28px_-4px_rgba(249,115,22,0.6)] hover:-translate-y-0.5 active:translate-y-0">
                <IconGavel size={18} strokeWidth={2.4} /> Сделать ставку
              </Link>
              {live.buyNowPrice && (
                <Link href={`/checkout?auction=${live.id}`} className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-[14px] border border-white/20 bg-white/[0.06] px-5 text-[15px] font-extrabold text-white transition hover:bg-white/[0.1] hover:-translate-y-0.5 active:translate-y-0">
                  <IconBolt size={16} /> Купить · {formatKGS(live.buyNowPrice)}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
