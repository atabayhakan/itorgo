"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart/CartContext";

export function CartBadge() {
  const { count } = useCart();
  return (
    <Link href="/cart" aria-label="Корзина" className="relative flex h-9 w-9 items-center justify-center rounded-full bg-surface shadow-card">
      🛒
      {count > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-xs font-bold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
