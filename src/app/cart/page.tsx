"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart/CartContext";
import { formatKGS } from "@/lib/data/mock-data";
import { ProductImage } from "@/components/ui/ProductImage";
import { CouponInput } from "@/components/coupons/CouponInput";
import { useT } from "@/lib/i18n/LocaleProvider";

export default function CartPage() {
  const t = useT();
  const { items, remove, clear, count, total } = useCart();
  const [discount, setDiscount] = useState(0);
  const discounted = Math.round(total * (1 - discount / 100));

  if (items.length === 0) {
    return (
      <main className="px-4 py-10 text-center">
        <p className="text-4xl">🛒</p>
        <h1 className="mt-2 font-bold">{t("cart.empty")}</h1>
        <p className="mt-1 text-sm text-ink-faint">{t("cart.empty_text")}</p>
        <Link href="/" className="btn-primary mt-4 inline-flex">
          {t("states.go_home")}
        </Link>
      </main>
    );
  }

  return (
    <main className="px-4 py-4">
      <h1 className="text-lg font-extrabold">{t("cart.title", { n: count })}</h1>
      <ul className="mt-4 space-y-2">
        {items.map(({ product, qty }) => (
          <li key={product.id} className="flex gap-3 rounded-2xl bg-surface p-3 shadow-card">
            <ProductImage product={product} className="h-16 w-16 shrink-0 rounded-xl" />
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-sm font-semibold">{product.title}</p>
              <p className="mt-1 text-sm font-bold tabular-nums">{formatKGS(product.price)} {t("currency.som")} {t("cart.qty", { qty })}</p>
            </div>
            <button onClick={() => remove(product.id)} aria-label={t("cart.remove")} className="self-start rounded-full bg-surface-dim px-2 py-1 text-xs">
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-3">
        <CouponInput onApply={(d) => setDiscount(d)} />
        {discount > 0 && <p className="mt-2 text-sm font-bold text-success">{t("cart.discount_applied", { d: discount })}</p>}
      </div>

      <div className="mt-4 rounded-2xl bg-ink p-4 text-white">
        <div className="flex justify-between font-black">
          <span>{t("cart.total")}</span>
          <span className="tabular-nums">{formatKGS(discounted)} {t("currency.som")} {discount > 0 && <span className="text-xs line-through opacity-60">{formatKGS(total)}</span>}</span>
        </div>
        <Link href="/checkout" className="btn-primary mt-3 w-full bg-white !text-ink">
          {t("cart.checkout")}
        </Link>
        <button onClick={clear} className="mt-2 w-full text-center text-xs opacity-70">
          {t("cart.clear")}
        </button>
      </div>
    </main>
  );
}
