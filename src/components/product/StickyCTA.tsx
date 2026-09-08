"use client";

import Link from "next/link";
import { formatKGS } from "@/lib/data/mock-data";
import type { Product, Auction } from "@/lib/types";
import { useState } from "react";
import { BidSheet } from "@/components/auction/BidSheet";
import { useT } from "@/lib/i18n/LocaleProvider";

/** Sticky mobile CTA. Fixed bottom, price + primary action. */
export function StickyCTA({ product, auction }: { product: Product; auction?: Auction }) {
  const t = useT();
  const [sheetOpen, setSheetOpen] = useState(false);
  const price = auction ? auction.currentBid : product.price;
  const buyNow = auction?.buyNowPrice;
  const som = t("currency.som");

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 px-4 py-3 backdrop-blur-md safe-bottom lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-bold tracking-wide text-ink-faint">{t("product.total")}</p>
            <p className="text-base font-black tabular-nums leading-none">
              {formatKGS(price)} <span className="text-xs font-bold text-ink-faint">{som}</span>
            </p>
            {buyNow && <p className="text-xs text-ink-faint">{t("auction.buy_now")} {formatKGS(buyNow)} {som}</p>}
          </div>
          {auction ? (
            <button onClick={() => setSheetOpen(true)} className="ml-auto inline-flex min-h-12 flex-1 items-center justify-center rounded-[10px] bg-ink px-4 text-sm font-bold text-white">
              {t("auction.bid")}
            </button>
          ) : (
            <Link href={`/checkout?product=${product.id}`} className="ml-auto inline-flex min-h-12 flex-1 items-center justify-center rounded-[10px] bg-ink px-4 text-sm font-bold text-white">
              {t("auction.buy_now")}
            </Link>
          )}
        </div>
      </div>
      {sheetOpen && auction && <BidSheet auctionId={auction.id} onClose={() => setSheetOpen(false)} />}
      {/* spacer so content not hidden */}
      <div className="h-[76px] lg:hidden" aria-hidden />
    </>
  );
}
