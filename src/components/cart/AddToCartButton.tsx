"use client";

import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart/CartContext";
import { useState } from "react";

export function AddToCartButton({ product }: { product: Product }) {
  const { add, items } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = items.some((i) => i.product.id === product.id);
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        add(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 900);
      }}
      className={`rounded-xl border px-3 py-2 text-sm font-semibold ${inCart ? "border-success bg-success-bg text-success" : "border-line bg-surface"}`}
    >
      {added ? "✓ В корзине" : inCart ? "В корзине" : "В корзину"}
    </button>
  );
}
