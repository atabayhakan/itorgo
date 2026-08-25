"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "@/lib/types";

export interface CartItem {
  product: Product;
  qty: number;
}

interface CartCtx {
  items: CartItem[];
  add: (p: Product) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
  total: number;
}

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Hydrate from localStorage (spec #55 — cache)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("itorgo_cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem("itorgo_cart", JSON.stringify(items)); } catch {}
  }, [items]);

  const add = (p: Product) => setItems((prev) => {
    const idx = prev.findIndex((x) => x.product.id === p.id);
    if (idx >= 0) { const c = [...prev]; c[idx] = { ...c[idx], qty: c[idx].qty + 1 }; return c; }
    return [...prev, { product: p, qty: 1 }];
  });
  const remove = (id: string) => setItems((prev) => prev.filter((x) => x.product.id !== id));
  const clear = () => setItems([]);
  const count = items.reduce((s, x) => s + x.qty, 0);
  const total = items.reduce((s, x) => s + x.product.price * x.qty, 0);

  return <Ctx.Provider value={{ items, add, remove, clear, count, total }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be inside CartProvider");
  return v;
}
