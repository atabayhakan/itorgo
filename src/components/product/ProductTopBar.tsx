"use client";

import { useState } from "react";
import Link from "next/link";
import { IconBack, IconHeart, IconShare } from "@/components/icons/Icons";
import { ShareSheet } from "@/components/share/ShareSheet";
import { useFavorites } from "@/lib/favorites/FavoritesContext";

export function ProductTopBar({ productId, title }: { productId: string; title: string }) {
  const [shareOpen, setShareOpen] = useState(false);
  const { has, toggle } = useFavorites();
  const fav = has(productId);

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
    </>
  );
}
