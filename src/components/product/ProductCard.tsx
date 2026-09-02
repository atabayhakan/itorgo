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
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-sunken">
        <ProductImage product={product} className="h-full w-full transition duration-500 group-hover:scale-[1.03]" />
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
        <h3 className="line-clamp-1 text-[14px] font-semibold leading-snug tracking-tight">{product.title}</h3>
        <p className="mt-1.5 flex items-baseline gap-1.5">
          <span className="text-[18px] font-extrabold tabular-nums tracking-tight">{formatKGS(product.price)}</span>
          <span className="text-[11px] font-semibold text-ink-faint">сом</span>
          {product.oldPrice && <span className="ml-auto text-[11px] text-ink-faint line-through">{formatKGS(product.oldPrice)}</span>}
        </p>
        <div className="mt-2 flex items-center gap-2 text-[11px] text-ink-faint">
          <span className="inline-flex items-center gap-0.5 font-medium text-ink-soft">
            <IconStar size={11} filled /> {product.rating}
          </span>
          <span className="text-line">·</span>
          <span>{product.city}</span>
          {seller.verified && <span className="text-info text-[10px] font-bold" title="Проверен">✓</span>}
        </div>
        <p className="mt-0.5 truncate text-[10px] text-ink-faint/70">{store?.name ?? seller.name}</p>
      </div>
    </Link>
  );
}
