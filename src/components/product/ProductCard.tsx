"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { formatKGS, getSeller, getStore } from "@/lib/data/mock-data";
import { ProductImage } from "@/components/ui/ProductImage";
import { IconHeart, IconStar } from "@/components/icons/Icons";
import { useFavorites } from "@/lib/favorites/FavoritesContext";

/** Image-first commerce card. 60/30/10: photo hero, quiet surface, one accent. */
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
    <Link
      href={`/product/${product.id}`}
      className="group block overflow-hidden rounded-[14px] border border-line/70 bg-surface transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lifted"
    >
      <div className="relative aspect-square overflow-hidden bg-[#f6f6f9]">
        <ProductImage product={product} className="h-full w-full transition duration-500 group-hover:scale-[1.04]" />
        <button
          onClick={toggleFav}
          aria-label={fav ? "Убрать из избранного" : "В избранное"}
          className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition ${fav ? "bg-white text-danger" : "bg-white/85 text-ink-soft hover:bg-white"}`}
        >
          <IconHeart size={15} filled={fav} className={pop ? "heart-pop" : ""} onAnimationEnd={() => setPop(false)} />
        </button>
        {product.isAuction ? (
          <span className="absolute left-2 top-2 rounded-md bg-ink px-2 py-1 text-[11px] font-bold tracking-wide text-white">Аукцион</span>
        ) : discount >= 10 ? (
          <span className="absolute left-2 top-2 rounded-md bg-auction-600 px-2 py-1 text-[11px] font-bold text-white">−{discount}%</span>
        ) : null}
      </div>

      <div className="p-3">
        <p className="flex items-baseline gap-1.5">
          <span className="text-[16px] font-extrabold tabular-nums tracking-tight">{formatKGS(product.price)}</span>
          <span className="text-[11px] font-semibold text-ink-faint">сом</span>
          {product.oldPrice && <span className="ml-auto text-[11px] text-ink-faint line-through">{formatKGS(product.oldPrice)}</span>}
        </p>
        <h3 className="mt-1 line-clamp-1 text-[13px] font-medium leading-snug">{product.title}</h3>
        <p className="mt-1 flex items-center gap-1 text-[11px] text-ink-faint">
          <IconStar size={11} filled /> <span className="font-medium text-ink-soft">{product.rating}</span>
          <span>·</span>
          <span>{product.city}</span>
        </p>
        <p className="mt-0.5 flex items-center gap-1 truncate text-[11px] text-ink-faint">
          {store?.name ?? seller.name}
          {seller.verified && <span className="text-info" title="Проверен">✓</span>}
        </p>
      </div>
    </Link>
  );
}
