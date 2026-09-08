"use client";

import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart/CartContext";
import { useState } from "react";
import { useT } from "@/lib/i18n/LocaleProvider";

export function AddToCartButton({ product }: { product: Product }) {
  const t = useT();
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
      {added ? `✓ ${t("product.in_cart")}` : inCart ? t("product.in_cart") : t("product.add_to_cart")}
    </button>
  );
}
