import Link from "next/link";
import { getLiveAuctions, getProduct, formatKGS } from "@/lib/data/mock-data";
import { Countdown } from "@/components/ui/Countdown";
import { ProductImage, Avatar } from "@/components/ui/ProductImage";
import { IconBolt, IconGavel, IconVerified } from "@/components/icons/Icons";
import { getSeller } from "@/lib/data/mock-data";

/**
 * LIVE AUCTION HERO — editorial, not dashboard.
 * 2/3 real product photo · 1/3 bid info + CTA. Signature of the platform.
 */
export function PremiumHero() {
  const live = getLiveAuctions()[0];
  if (!live) return null;
  const p = getProduct(live.productId)!;
  const seller = getSeller(p.sellerId);

  return (
    <section className="mx-4 overflow-hidden rounded-[16px] bg-ink text-white shadow-lifted lg:mx-0">
      <div className="grid lg:grid-cols-[1.6fr_1fr]">
        {/* Photo */}
        <Link href={`/product/${p.id}`} className="group relative block overflow-hidden">
          <ProductImage product={p} big priority className="h-[240px] w-full lg:h-[420px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-xs font-bold tracking-wide text-danger">
            <span className="live-dot h-2 w-2 rounded-full bg-danger" /> LIVE
          </span>
          {/* live activity — social proof */}
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-md bg-black/55 px-2.5 py-1.5 text-xs font-medium text-white backdrop-blur">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Aigerim повысила ставку · +500 сом · 2 сек назад
          </span>
        </Link>

        {/* Info */}
        <div className="flex flex-col justify-between gap-4 p-5 lg:p-6">
          <div>
            <p className="text-xs font-bold tracking-widest text-white/50">СЕЙЧАС НА ТОРГАХ</p>
            <Link href={`/product/${p.id}`} className="mt-1 block text-xl font-semibold leading-tight tracking-tight hover:underline lg:text-2xl">
              {p.title}
            </Link>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-white/50">Текущая ставка</span>
            </div>
            <p className="text-[32px] font-extrabold leading-none tracking-tight lg:text-[40px]">
              {formatKGS(live.currentBid)} <span className="text-sm font-semibold text-white/60">сом</span>
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/70">
              <span>📈 {live.bidsCount} ставок</span>
              <span>👀 {live.participants * 3} смотрят</span>
              <Countdown endsAt={live.endsAt} className="!bg-transparent !p-0 font-mono text-base font-bold text-white" />
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-2 text-sm">
              <Avatar name={seller.name} seed={seller.avatarSeed} size={28} />
              <span className="font-medium">{seller.name}</span>
              {seller.verified && <IconVerified size={15} />}
              <span className="ml-auto inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-xs font-bold text-emerald-300">
                🛡 {seller.positivePct}%
              </span>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1.2fr_1fr]">
              <Link href={`/product/${p.id}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-auction-500 px-4 text-sm font-bold text-white transition hover:bg-auction-600">
                <IconGavel size={16} strokeWidth={2.2} /> Сделать ставку
              </Link>
              {live.buyNowPrice && (
                <Link href={`/checkout?auction=${live.id}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] border border-white/25 px-4 text-sm font-bold text-white transition hover:bg-white/10">
                  <IconBolt size={15} /> Купить · {formatKGS(live.buyNowPrice)}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
