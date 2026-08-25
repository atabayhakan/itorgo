"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { formatKGS, getSeller, getStore } from "@/lib/data/mock-data";
import { ProductImage } from "@/components/ui/ProductImage";
import { IconFire, IconHeart, IconStar } from "@/components/icons/Icons";
import { useFavorites } from "@/lib/favorites/FavoritesContext";

export function ProductCard({ product }: { product: Product }) {
  const seller = getSeller(product.sellerId);
  const store = getStore(product.storeId);
  const { has, toggle } = useFavorites();
  const fav = has(product.id);
  const [pop, setPop] = useState(false);

  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

  function toggleFav(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
    setPop(true);
  }

  return (
    <Link href={`/product/${product.id}`} className="group relative block overflow-hidden rounded-[18px] bg-surface shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lifted">
      <div className="relative overflow-hidden">
        <ProductImage product={product} className="h-[158px] w-full transition duration-500 group-hover:scale-[1.03]" />
        <button
          onClick={toggleFav}
          aria-label={fav ? "Убрать из избранного" : "В избранное"}
          className={`absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition ${fav ? "bg-danger text-white" : "bg-white/90 text-ink-soft hover:bg-white"}`}
        >
          <IconHeart size={15} filled={fav} className={pop ? "heart-pop" : ""} onAnimationEnd={() => setPop(false)} />
        </button>
        <div className="absolute left-2.5 top-2.5 flex gap-1">
          {product.isAuction && (
            <span className="inline-flex items-center gap-1 rounded-full bg-ink px-2 py-1 text-[11px] font-black text-white">
              <IconFire size={10} /> AUCTION
            </span>
          )}
          {!product.isAuction && discount >= 10 && (
            <span className="rounded-full bg-auction-500 px-2 py-1 text-xs font-black text-white">−{discount}%</span>
          )}
          {!product.isAuction && !discount && product.condition === "new" && (
            <span className="rounded-full bg-brand-600 px-2 py-1 text-xs font-bold text-white">NEW</span>
          )}
        </div>
        {/* quick view on hover — desktop */}
        <span className="absolute bottom-2 left-1/2 hidden -translate-x-1/2 rounded-full bg-ink/80 px-3 py-1 text-xs font-bold text-white opacity-0 backdrop-blur transition group-hover:opacity-100 lg:inline-flex">
          Быстрый просмотр
        </span>
      </div>

      <div className="p-3">
        <p className="flex items-baseline gap-1">
          <span className="text-[15px] font-black tabular-nums">{formatKGS(product.price)}</span>
          <span className="text-xs font-bold text-ink-faint">сом</span>
          {product.oldPrice && <span className="ml-1 text-xs text-ink-faint line-through">{formatKGS(product.oldPrice)}</span>}
        </p>
        <h3 className="mt-1 line-clamp-2 min-h-[2.2em] text-[13px] font-semibold leading-snug tracking-tight">{product.title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-[11px] text-ink-faint">
          <span className="inline-flex items-center gap-1">
            <IconStar size={11} filled /> {product.rating}
          </span>
          <span>·</span>
          <span>{product.city}</span>
          {product.isAuction && <span className="ml-1 font-bold text-auction-600">· ⚡ buy now</span>}
        </p>
        <p className="mt-1 truncate text-[11px] text-ink-faint">{store?.name ?? seller.name}</p>
      </div>
    </Link>
  );
}
