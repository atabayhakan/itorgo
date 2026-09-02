"use client";

import { useState } from "react";
import { ProductImage } from "@/components/ui/ProductImage";
import type { Product } from "@/lib/types";

/**
 * Full-width swipe gallery — mobile-first.
 * Real photo when available; neutral gradient + SVG icon fallback (never emoji).
 * Crossfade transition between slides.
 */
export function ProductGallery({ product }: { product: Product }) {
  const [idx, setIdx] = useState(0);
  // Demo: 4 virtual slides derived from seed variations
  const slides = [0, 1, 2, 3];

  return (
    <div className="relative bg-surface">
      <div className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto">
        {slides.map((s) => (
          <div key={s} className="w-full shrink-0 snap-start">
            <ProductImage product={product} big className="h-[360px] w-full transition-opacity duration-500" />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {slides.map((s) => (
          <button
            key={s}
            onClick={() => setIdx(s)}
            aria-label={`Фото ${s + 1}`}
            className={`h-1.5 rounded-full transition-all ${idx === s ? "w-6 bg-white" : "w-1.5 bg-white/55"}`}
          />
        ))}
      </div>

      <span className="chip absolute top-3 left-3 bg-black/55 text-white backdrop-blur-md">
        {product.city} · {product.condition === "new" ? "Новый" : "Б/у"}
      </span>
    </div>
  );
}