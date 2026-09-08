"use client";

import { useState } from "react";
import Link from "next/link";
import { formatKGS } from "@/lib/data/mock-data";
import { CouponInput } from "@/components/coupons/CouponInput";
import { useT } from "@/lib/i18n/LocaleProvider";

/**
 * Checkout — spec #8 Buy Now / #48 Payment abstraction
 * TODO: POST /api/orders, POST /api/payments, wallet debit, delivery selection
 */
export default function CheckoutPage() {
  const t = useT();
  const [method, setMethod] = useState<"card" | "wallet" | "receipt">("card");
  const [discount, setDiscount] = useState(0);
  const price = 49500;
  const discounted = Math.round(price * (1 - discount / 100));
  const som = t("currency.som");

  return (
    <main className="px-4 py-4">
      <h1 className="text-lg font-extrabold">{t("checkout.title")}</h1>

      <section className="mt-4 rounded-2xl bg-surface p-4 shadow-card">
        <p className="font-bold">{t("checkout.product")}</p>
        <div className="mt-2 flex gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-surface-dim text-2xl">📱</div>
          <div className="flex-1">
            <p className="text-sm font-semibold">iPhone 17 Pro Max 256GB</p>
            <p className="text-xs text-ink-faint">
              {t("cities.bishkek")} · {t("common.new")} · {t("checkout.seller", { name: "Азамат Т." })}
            </p>
            <p className="mt-1 font-bold tabular-nums">{formatKGS(price)} {som}</p>
          </div>
        </div>
      </section>

      <section className="mt-3 rounded-2xl bg-surface p-4 shadow-card">
        <p className="font-bold">{t("checkout.delivery")}</p>
        <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
          <button className="rounded-xl border-2 border-brand-600 bg-brand-50 px-3 py-2.5 font-bold text-brand-700">{t("checkout.delivery")} · 300 {som}</button>
          <button className="rounded-xl border border-line bg-surface px-3 py-2.5">{t("checkout.pickup")}</button>
        </div>
        <input placeholder={t("checkout.address_placeholder")} className="mt-3 w-full rounded-xl border border-line bg-surface-dim px-3 py-2.5 text-sm" />
      </section>

      <section className="mt-3 rounded-2xl bg-surface p-4 shadow-card">
        <p className="font-bold">{t("checkout.payment")}</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {[
            ["card", t("checkout.method_card")],
            ["wallet", t("nav.wallet")],
            ["receipt", t("checkout.method_receipt")],
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
        {method === "receipt" && <p className="mt-2 text-xs text-ink-faint">{t("checkout.receipt_hint")}</p>}
      </section>

      <div className="mt-3">
        <CouponInput onApply={(d) => setDiscount(d)} />
      </div>

      <div className="mt-4 rounded-2xl bg-ink p-4 text-white">
        <div className="flex justify-between text-sm">
          <span>{t("checkout.product")}</span>
          <span className="tabular-nums">{formatKGS(discounted)} {som} {discount > 0 && <span className="line-through opacity-60">{formatKGS(price)}</span>}</span>
        </div>
        <div className="flex justify-between text-sm opacity-80">
          <span>{t("checkout.delivery")}</span>
          <span>300 {som}</span>
        </div>
        <div className="mt-2 flex justify-between border-t border-white/15 pt-2 text-base font-black">
          <span>{t("checkout.total")}</span>
          <span className="tabular-nums">{formatKGS(discounted + 300)} {som}</span>
        </div>
        <Link href="/wallet" className="btn-primary mt-4 w-full bg-white !text-ink">
          {t("checkout.pay_now")} · {formatKGS(discounted + 300)} {som}
        </Link>
        <p className="mt-2 text-center text-xs opacity-60">{t("checkout.buyer_protection")}</p>
      </div>
    </main>
  );
}
