"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IconBack, IconHeart, IconShare } from "@/components/icons/Icons";
import { ShareSheet } from "@/components/share/ShareSheet";
import { useFavorites } from "@/lib/favorites/FavoritesContext";

export function ProductTopBar({ productId, title, price, oldPrice, condition }: {
  productId: string;
  title: string;
  price?: number;
  oldPrice?: number;
  condition?: "new" | "used";
}) {
  const [shareOpen, setShareOpen] = useState(false);
  const { has, toggle } = useFavorites();
  const fav = has(productId);
  const discount = oldPrice && price ? Math.round((1 - price / oldPrice) * 100) : 0;

  return (
    <>
      <div className="safe-top sticky top-0 z-30 flex items-center justify-between bg-surface/90 px-2 py-2 backdrop-blur-md">
        <Link href="/" className="flex h-9 w-9 items-center justify-center rounded-full bg-surface shadow-card">
          <IconBack size={20} />
        </Link>
        <div className="flex gap-2">
          <button onClick={() => setShareOpen(true)} aria-label="Поделиться" className="flex h-9 w-9 items-center justify-center rounded-full bg-surface shadow-card">
            <IconShare size={18} />
          </button>
          <button onClick={() => toggle(productId)} aria-label="В избранное" className={`flex h-9 w-9 items-center justify-center rounded-full shadow-card ${fav ? "bg-danger text-white" : "bg-surface"}`}>
            <IconHeart size={18} filled={fav} />
          </button>
        </div>
      </div>
      {shareOpen && <ShareSheet url={`https://www.itorgo.kg/product/${productId}`} title={title} onClose={() => setShareOpen(false)} />}

      <div className="mx-auto max-w-7xl px-4 py-2 bg-surface-dim border-y border-line">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-xl font-extrabold leading-tight tracking-tight text-white">{title}</h1>

          <div className="flex items-baseline gap-2">
            {price !== undefined && (
              <span className="font-black tabular-nums text-[32px] lg:text-[40px] text-white">
                {price} сом
              </span>
            )}

            {condition && (
              <span className={`chip ${condition === "new" ? "bg-brand-50 text-brand-700" : "bg-surface-sunken text-ink-soft"}`}>
                {condition === "new" ? "Новый" : "Б/у"}
              </span>
            )}

            {discount > 0 && oldPrice && (
              <span className="text-sm text-ink-faint line-through ml-2">
                {oldPrice} сом
              </span>
            )}

            {discount > 0 && (
              <span className="ml-1 text-xs font-bold uppercase tracking-wider text-danger">-{discount}%</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}