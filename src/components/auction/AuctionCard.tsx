"use client";

import { useState } from "react";
import { IconBolt, IconFire, IconGavel, IconVerified } from "@/components/icons/Icons";
import { formatKGS, getLiveAuctions, getProduct, getSeller } from "@/lib/data/mock-data";
import { Countdown } from "@/components/ui/Countdown";
import { Avatar, ProductImage } from "@/components/ui/ProductImage";
import { BidSheet } from "./BidSheet";

export function AuctionCard({ auctionId }: { auctionId: string }) {
  const a = getLiveAuctions().find((x) => x.id === auctionId);
  if (!a) return null;
  const p = getProduct(a.productId)!;
  const seller = getSeller(p.sellerId);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <article className="card relative w-[272px] shrink-0 overflow-hidden shadow-lifted">
        <div className="relative">
          <ProductImage product={p} big className="h-[190px] w-full" />
          {a.buyNowPrice && (
            <span className="chip absolute top-3 left-3 gap-1 bg-brand-600 text-white">
              <IconBolt size={12} strokeWidth={2.4} /> BUY NOW
            </span>
          )}
          <span className="chip absolute top-3 right-3 gap-1 bg-white/90 text-auction-700 backdrop-blur-sm">
            <IconFire size={12} /> AUCTION
          </span>
          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-xl bg-black/55 px-3 py-2 text-white backdrop-blur-md">
            <div>
              <div className="text-[11px] opacity-75">{formatKGS(a.startingPrice)} сом старт</div>
              <div className="text-lg leading-none font-extrabold tabular-nums">
                {formatKGS(a.currentBid)} <span className="text-xs font-semibold">сом</span>
              </div>
            </div>
            <div className="text-right">
              <Countdown endsAt={a.endsAt} className="!bg-transparent !p-0 text-white" />
              <div className="mt-0.5 flex items-center justify-end gap-1 text-[11px] opacity-85">
                <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-red-400" />
                🔥 {a.bidsCount} ставок
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 p-4">
          <h3 className="line-clamp-2 min-h-[2.6em] text-[15px] leading-snug font-semibold">{p.title}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-ink-faint">
              <Avatar name={seller.name} seed={seller.avatarSeed} size={22} />
              <span className="max-w-[120px] truncate">{seller.name}</span>
              {seller.verified && <IconVerified size={14} />}
            </div>
            <span className="chip bg-success-bg text-success">🛡 {seller.positivePct}%</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setSheetOpen(true)} className="btn-primary !min-h-11 !rounded-xl !text-sm">
              <IconGavel size={16} strokeWidth={2.2} /> Ставка
            </button>
            {a.buyNowPrice && (
              <button className="btn-secondary !min-h-11 !rounded-xl !text-sm">
                <IconBolt size={15} strokeWidth={2.2} /> {formatKGS(a.buyNowPrice)}
              </button>
            )}
          </div>

          {a.buyNowPrice && (
            <p className="-mt-1 text-center text-[11px] text-ink-faint">
              Купить сейчас — <b className="text-ink-soft">{formatKGS(a.buyNowPrice)} сом</b>
            </p>
          )}
        </div>
      </article>

      {sheetOpen && <BidSheet auctionId={a.id} onClose={() => setSheetOpen(false)} />}
    </>
  );
}
