"use client";

import { useState } from "react";
import Link from "next/link";
import { formatKGS } from "@/lib/data/mock-data";
import type { Auction } from "@/lib/types";
import { Countdown } from "@/components/ui/Countdown";
import { IconBolt, IconGavel, IconShield } from "@/components/icons/Icons";
import { BidSheet } from "@/components/auction/BidSheet";

export function AuctionDetailSection({ auction }: { auction: Auction }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <>
      <div className="card mx-4 -mt-3 p-4 shadow-lifted">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-wide text-ink-faint">Текущая ставка</p>
            <p className="text-3xl font-black tabular-nums">
              {formatKGS(auction.currentBid)} <span className="text-base font-semibold text-ink-soft">сом</span>
            </p>
            <p className="mt-1 flex items-center gap-2 text-xs text-ink-faint">
              <span className="chip bg-surface-sunken text-ink-soft">🔥 {auction.bidsCount} ставок</span>
              <span className="chip bg-surface-sunken text-ink-soft">👥 {auction.participants} участников</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-ink-faint">Осталось</p>
            <Countdown endsAt={auction.endsAt} className="text-lg" />
          </div>
        </div>

        <button onClick={() => setSheetOpen(true)} className="btn-primary mt-4 w-full text-base">
          <IconGavel size={20} strokeWidth={2.2} /> Сделать ставку
        </button>

        {auction.buyNowPrice && (
          <Link href={`/checkout?auction=${auction.id}`} className="btn-secondary mt-2 w-full gap-2">
            <IconBolt size={18} strokeWidth={2.2} /> Купить сейчас — {formatKGS(auction.buyNowPrice)} сом
          </Link>
        )}

        <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-faint">
          <IconShield size={14} /> Безопасная сделка · Защита покупателя
        </div>

        {auction.buyNowPrice && (
          <p className="mt-2 text-center text-xs text-ink-faint">
            Начальная цена {formatKGS(auction.startingPrice)} сом · Купить сейчас {formatKGS(auction.buyNowPrice)} сом
          </p>
        )}
      </div>
      {sheetOpen && <BidSheet auctionId={auction.id} onClose={() => setSheetOpen(false)} />}
    </>
  );
}

export function BidActivity({ auction }: { auction: Auction }) {
  return (
    <section className="mt-4 px-4">
      <h3 className="text-sm font-bold">Последние ставки</h3>
      <ul className="mt-2 divide-y divide-line overflow-hidden rounded-2xl bg-surface shadow-card">
        {auction.lastBids.map((b, i) => (
          <li key={`${b.bidder}-${b.amount}`} className={`flex items-center justify-between px-4 py-3 ${i === 0 ? "bid-flash" : ""}`}>
            <span className="text-sm font-medium">{b.bidder}</span>
            <span className="text-sm font-bold tabular-nums">{formatKGS(b.amount)} сом</span>
          </li>
        ))}
        {auction.lastBids.length === 0 && (
          <li className="px-4 py-3 text-sm text-ink-faint">Пока нет ставок — будьте первым!</li>
        )}
      </ul>
      <p className="mt-2 text-center text-xs text-ink-faint">Новые ставки появляются в реальном времени · TODO(ws)</p>
    </section>
  );
}
