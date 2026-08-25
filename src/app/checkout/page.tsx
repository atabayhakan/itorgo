"use client";

import { useState } from "react";
import Link from "next/link";
import { formatKGS } from "@/lib/data/mock-data";
import { CouponInput } from "@/components/coupons/CouponInput";

/**
 * Checkout — spec #8 Buy Now / #48 Payment abstraction
 * TODO: POST /api/orders, POST /api/payments, wallet debit, delivery selection
 */
export default function CheckoutPage() {
  const [method, setMethod] = useState<"card" | "wallet" | "receipt">("card");
  const [discount, setDiscount] = useState(0);
  const price = 49500;
  const discounted = Math.round(price * (1 - discount / 100));

  return (
    <main className="px-4 py-4">
      <h1 className="text-lg font-extrabold">Оформление заказа</h1>

      <section className="mt-4 rounded-2xl bg-surface p-4 shadow-card">
        <p className="font-bold">Товар</p>
        <div className="mt-2 flex gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-surface-dim text-2xl">📱</div>
          <div className="flex-1">
            <p className="text-sm font-semibold">iPhone 17 Pro Max 256GB</p>
            <p className="text-xs text-ink-faint">Бишкек · Новый · продавец: Азамат Т.</p>
            <p className="mt-1 font-bold tabular-nums">{formatKGS(price)} сом</p>
          </div>
        </div>
      </section>

      <section className="mt-3 rounded-2xl bg-surface p-4 shadow-card">
        <p className="font-bold">Доставка</p>
        <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
          <button className="rounded-xl border-2 border-brand-600 bg-brand-50 px-3 py-2.5 font-bold text-brand-700">Доставка · 300 сом</button>
          <button className="rounded-xl border border-line bg-surface px-3 py-2.5">Самовывоз</button>
        </div>
        <input placeholder="Адрес · ул. Чуй 123, кв. 4" className="mt-3 w-full rounded-xl border border-line bg-surface-dim px-3 py-2.5 text-sm" />
      </section>

      <section className="mt-3 rounded-2xl bg-surface p-4 shadow-card">
        <p className="font-bold">Оплата</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {[
            ["card", "Карта"],
            ["wallet", "Кошелёк"],
            ["receipt", "Чек"],
          ].map(([k, label]) => (
            <button
              key={k}
              onClick={() => setMethod(k as never)}
              className={`rounded-xl px-3 py-2.5 text-sm font-bold ${method === k ? "bg-ink text-white" : "border border-line bg-surface"}`}
            >
              {label}
            </button>
          ))}
        </div>
        {method === "receipt" && <p className="mt-2 text-xs text-ink-faint">Загрузите чек на следующем шаге — OCR проверит сумму/дату (→ /wallet)</p>}
        <p className="mt-2 text-xs text-ink-faint">Статусы: pending → processing → paid / failed / refunded — PaymentProvider</p>
      </section>

      <div className="mt-3">
        <CouponInput onApply={(d) => setDiscount(d)} />
      </div>

      <div className="mt-4 rounded-2xl bg-ink p-4 text-white">
        <div className="flex justify-between text-sm">
          <span>Товар</span>
          <span className="tabular-nums">{formatKGS(discounted)} сом {discount > 0 && <span className="line-through opacity-60">{formatKGS(price)}</span>}</span>
        </div>
        <div className="flex justify-between text-sm opacity-80">
          <span>Доставка</span>
          <span>300 сом</span>
        </div>
        <div className="mt-2 flex justify-between border-t border-white/15 pt-2 text-base font-black">
          <span>Итого</span>
          <span className="tabular-nums">{formatKGS(discounted + 300)} сом</span>
        </div>
        <Link href="/wallet" className="btn-primary mt-4 w-full bg-white !text-ink">
          Оплатить · {formatKGS(discounted + 300)} сом
        </Link>
        <p className="mt-2 text-center text-xs opacity-60">Защита покупателя · возврат в течение 7 дней</p>
      </div>
    </main>
  );
}
