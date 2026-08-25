"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { formatKGS, getSeller, getStore } from "@/lib/data/mock-data";
import { ProductImage } from "@/components/ui/ProductImage";
import { IconBolt, IconFire, IconHeart, IconStar } from "@/components/icons/Icons";

export function ProductCard({ product }: { product: Product }) {
  const seller = getSeller(product.sellerId);
  const store = getStore(product.storeId);
  const [fav, setFav] = useState(false);
  const [pop, setPop] = useState(false);

  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

  function toggleFav(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setFav((f) => !f);
    setPop(true);
  }

  return (
    <Link href={`/product/${product.id}`} className="card block overflow-hidden">
      <div className="relative">
        <ProductImage product={product} className="h-[150px] w-full" />
        <button
          onClick={toggleFav}
          aria-label={fav ? "Убрать из избранного" : "В избранное"}
          className={`absolute top-2.5 right-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 backdrop-blur-sm transition-colors ${fav ? "text-danger" : "text-ink-soft"}`}
        >
          <IconHeart size={18} filled={fav} className={pop ? "heart-pop" : ""} onAnimationEnd={() => setPop(false)} />
        </button>
        <div className="absolute top-2.5 left-2.5 flex gap-1.5">
          {product.isAuction && (
            <span className="chip gap-1 bg-white/90 text-auction-700 backdrop-blur-sm">
              <IconFire size={11} /> AUCTION
            </span>
          )}
          {!product.isAuction && discount >= 10 && <span className="chip bg-auction-500 text-white">-{discount}%</span>}
        </div>
        {!product.isAuction && !discount && product.condition === "new" && (
          <span className="chip absolute bottom-2.5 left-2.5 bg-brand-600 text-white">NEW</span>
        )}
      </div>

      <div className="flex flex-col gap-1.5 p-3">
        <p className="text-base font-extrabold tabular-nums">
          {formatKGS(product.price)} <span className="text-xs font-semibold text-ink-faint">сом</span>
        </p>
        <h3 className="line-clamp-2 min-h-[2.4em] text-[13px] leading-snug font-medium">{product.title}</h3>

        <div className="flex items-center gap-1.5 text-[11px] text-ink-faint">
          {product.isAuction && <span className="font-semibold text-auction-600">⚡ Купить сейчас</span>}
          <span className="inline-flex items-center gap-0.5">
            <IconStar size={12} filled /> {product.rating}
          </span>
          <span>·</span>
          <span>{product.city}</span>
        </div>

        <p className="truncate text-[11px] text-ink-faint">{store?.name ?? seller.name}</p>
      </div>
    </Link>
  );
}
