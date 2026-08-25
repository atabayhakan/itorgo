"use client";

import Link from "next/link";
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
  const urgent = Date.parse(a.endsAt) - Date.now() < 10 * 60 * 1000;

  return (
    <>
      <article
        className={`group relative flex w-[280px] shrink-0 flex-col overflow-hidden rounded-[22px] bg-surface shadow-lifted transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
          urgent ? "ring-1 ring-auction-200" : ""
        }`}
      >
        <Link href={`/product/${p.id}`} className="absolute inset-0 z-[1]" aria-label={p.title} />
        {/* gradient hairline */}
        <div className="h-[3px] w-full bg-gradient-to-r from-brand-600 via-brand-400 to-auction-400" />

        <div className="relative">
          <ProductImage product={p} big className="h-[188px] w-full" />
          {/* badges */}
          <div className="absolute left-3 top-3 flex gap-1.5">
            {a.buyNowPrice && (
              <span className="inline-flex items-center gap-1 rounded-full bg-ink px-2.5 py-1 text-xs font-black text-white">
                <IconBolt size={12} strokeWidth={2.4} /> BUY NOW
              </span>
            )}
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-black text-auction-700 shadow">
              <IconFire size={11} /> AUCTION
            </span>
          </div>
          {/* live strip — premium glass */}
          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-2xl bg-ink/75 px-3.5 py-2.5 text-white backdrop-blur-xl">
            <div>
              <p className="text-[10px] font-bold tracking-widest opacity-60">ТЕКУЩАЯ</p>
              <p className="text-[18px] font-black leading-none tabular-nums">
                {formatKGS(a.currentBid)} <span className="text-xs font-bold opacity-80">сом</span>
              </p>
              <p className="text-[10px] opacity-60">{formatKGS(a.startingPrice)} старт · 🔥 {a.bidsCount}</p>
            </div>
            <div className="text-right">
              <Countdown endsAt={a.endsAt} className={`!bg-transparent !p-0 text-white ${urgent ? "animate-pulse !text-auction-200" : ""}`} />
              <p className="mt-1 flex items-center justify-end gap-1 text-[11px] font-bold opacity-90">
                <span className="live-dot h-1.5 w-1.5 rounded-full bg-red-400" /> {a.bidsCount} ставок
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <h3 className="line-clamp-2 min-h-[2.7em] text-[14px] font-bold leading-snug tracking-tight">{p.title}</h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Avatar name={seller.name} seed={seller.avatarSeed} size={24} />
              <span className="max-w-[110px] truncate text-xs font-medium text-ink-soft">{seller.name}</span>
              {seller.verified && <IconVerified size={14} />}
            </div>
            <span className="rounded-full bg-success-bg px-2 py-1 text-xs font-black text-success">🛡 {seller.positivePct}%</span>
          </div>

          {/* participants stack + CTA */}
          <div className="mt-auto">
            <div className="mb-3 flex items-center justify-between text-xs text-ink-faint">
              <span className="flex items-center gap-1">
                <span className="flex -space-x-1">
                  <span className="h-5 w-5 rounded-full bg-brand-200 ring-2 ring-white" />
                  <span className="h-5 w-5 rounded-full bg-auction-200 ring-2 ring-white" />
                  <span className="h-5 w-5 rounded-full bg-emerald-200 ring-2 ring-white" />
                </span>
                {a.participants} участников
              </span>
              {a.buyNowPrice && <span className="font-bold text-ink-soft">{formatKGS(a.buyNowPrice)} сом · buy now</span>}
            </div>

            <div className="relative z-[2] grid grid-cols-[1.15fr_0.85fr] gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSheetOpen(true);
                }}
                className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-ink px-3 text-sm font-black text-white shadow transition hover:bg-black active:scale-[0.98]"
              >
                <IconGavel size={15} strokeWidth={2.4} /> Ставка
              </button>
              {a.buyNowPrice ? (
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex min-h-11 items-center justify-center gap-1 rounded-xl border border-line bg-surface px-2 text-xs font-bold hover:bg-surface-dim active:scale-[0.98]"
                >
                  <IconBolt size={13} strokeWidth={2.4} /> {formatKGS(a.buyNowPrice)}
                </button>
              ) : (
                <span className="inline-flex min-h-11 items-center justify-center rounded-xl bg-surface-dim px-3 text-xs font-bold text-ink-faint">
                  Без buy now
                </span>
              )}
            </div>
          </div>
        </div>
      </article>

      {sheetOpen && <BidSheet auctionId={a.id} onClose={() => setSheetOpen(false)} />}
    </>
  );
}
