"use client";

import Link from "next/link";
import { useState } from "react";
import { IconBolt, IconGavel, IconVerified } from "@/components/icons/Icons";
import { formatKGS, getLiveAuctions, getProduct, getSeller } from "@/lib/data/mock-data";
import { Countdown } from "@/components/ui/Countdown";
import { Avatar, ProductImage } from "@/components/ui/ProductImage";
import { BidSheet } from "./BidSheet";

/** Auction card — real photo, tight hierarchy, 12px radius. `dark` = on dark section. */
export function AuctionCard({ auctionId, dark = false }: { auctionId: string; dark?: boolean }) {
  const a = getLiveAuctions().find((x) => x.id === auctionId);
  if (!a) return null;
  const p = getProduct(a.productId)!;
  const seller = getSeller(p.sellerId);
  const [sheetOpen, setSheetOpen] = useState(false);
  const urgent = Date.parse(a.endsAt) - Date.now() < 10 * 60 * 1000;

  const surface = dark ? "bg-white" : "bg-surface border border-line/70";
  const title = dark ? "text-ink" : "";
  const meta = dark ? "text-ink-faint" : "text-ink-faint";

  return (
    <>
      <article className={`relative flex w-[264px] shrink-0 flex-col overflow-hidden rounded-[12px] ${surface} shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lifted`}>
        <Link href={`/product/${p.id}`} className="absolute inset-0 z-[1]" aria-label={p.title} />
        <div className="relative aspect-[4/3] overflow-hidden bg-[#f6f6f9]">
          <ProductImage product={p} big className="h-full w-full" />
          {a.buyNowPrice && (
            <span className="absolute left-2 top-2 rounded-md bg-ink px-2 py-1 text-[11px] font-bold text-white">Buy now {formatKGS(a.buyNowPrice)}</span>
          )}
          {/* bid strip */}
          <div className="absolute inset-x-2 bottom-2 flex items-center justify-between rounded-[10px] bg-ink/85 px-3 py-2 text-white backdrop-blur">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider opacity-60">Ставка</p>
              <p className="text-[16px] font-extrabold leading-none tabular-nums">
                {formatKGS(a.currentBid)} <span className="text-[11px] font-semibold opacity-70">сом</span>
              </p>
            </div>
            <Countdown endsAt={a.endsAt} className={`!bg-transparent !p-0 font-mono text-sm font-bold text-white ${urgent ? "animate-pulse !text-auction-400" : ""}`} />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-3">
          <h3 className="line-clamp-1 text-[14px] font-semibold leading-snug tracking-tight">{title && <span className={title}>{p.title}</span>}{!title && p.title}</h3>
          <div className={`flex items-center gap-1.5 text-[11px] ${meta}`}>
            <Avatar name={seller.name} seed={seller.avatarSeed} size={18} />
            <span className="max-w-[110px] truncate font-medium">{seller.name}</span>
            {seller.verified && <IconVerified size={13} />}
            <span className="ml-auto inline-flex items-center gap-1 font-bold text-emerald-600">🛡 {seller.positivePct}%</span>
          </div>
          <p className={`text-[11px] ${meta}`}>📈 {a.bidsCount} ставок · 👀 {a.participants * 3}</p>

          <div className="relative z-[2] mt-auto grid grid-cols-[1.2fr_1fr] gap-2 pt-1">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSheetOpen(true);
              }}
              className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-[10px] bg-ink px-3 text-[13px] font-bold text-white transition hover:bg-black active:scale-[0.98]"
            >
              <IconGavel size={14} strokeWidth={2.2} /> Ставка
            </button>
            {a.buyNowPrice ? (
              <button
                onClick={(e) => e.stopPropagation()}
                className="inline-flex min-h-10 items-center justify-center rounded-[10px] border border-line px-2 text-[12px] font-bold text-ink-soft transition hover:bg-surface-dim active:scale-[0.98]"
              >
                <IconBolt size={12} className="mr-1" /> {formatKGS(a.buyNowPrice)}
              </button>
            ) : (
              <span className="inline-flex min-h-10 items-center justify-center rounded-[10px] bg-surface-dim px-2 text-[12px] font-semibold text-ink-faint">—</span>
            )}
          </div>
        </div>
      </article>

      {sheetOpen && <BidSheet auctionId={a.id} onClose={() => setSheetOpen(false)} />}
    </>
  );
}
