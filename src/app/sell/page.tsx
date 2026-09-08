"use client";

import { useState } from "react";
import Link from "next/link";
import { IconBack } from "@/components/icons/Icons";
import { useT } from "@/lib/i18n/LocaleProvider";

/**
 * Sell wizard — mobile step flow.
 * TODO(backend): upload → POST /media, POST /products/detect (AI), POST /products
 * TODO(AI): image classification + price suggestion via vision model.
 * TODO(payments): delivery options, etc.
 */
const STEPS = ["sell.step_photo", "sell.step_ai", "sell.step_details", "sell.step_price", "sell.step_publish"] as const;

export default function SellPage() {
  const t = useT();
  const [step, setStep] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [photo, setPhoto] = useState(false);

  function handlePhoto() {
    setPhoto(true);
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setStep(1);
    }, 1300);
  }

  return (
    <main className="px-4 py-4">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex h-9 w-9 items-center justify-center rounded-full bg-surface shadow-card">
          <IconBack size={18} />
        </Link>
        <h1 className="text-lg font-extrabold">{t("nav.sell")}</h1>
        <span className="ml-auto text-xs text-ink-faint">{t("sell.step_of", { n: step + 1, total: STEPS.length })}</span>
      </div>

      <div className="mt-3 flex gap-1.5">
        {STEPS.map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-brand-600" : "bg-line"}`} />
        ))}
      </div>

      {step === 0 && (
        <section className="mt-6">
          <div className="rounded-2xl border-2 border-dashed border-line bg-surface p-6 text-center shadow-card">
            <p className="text-4xl">📸</p>
            <p className="mt-2 font-bold">{t("sell.upload_photo_title")}</p>
            <p className="mt-1 text-sm text-ink-faint">{t("sell.upload_photo_hint")}</p>
            <button onClick={handlePhoto} className="btn-primary mt-4 w-full">
              {photo ? t("sell.photo_uploaded") : t("sell.choose_photo")}
            </button>
            <input type="file" accept="image/*" className="hidden" />
          </div>
          <p className="mt-3 text-center text-xs text-ink-faint">{t("sell.supported_formats")}</p>
        </section>
      )}

      {step === 1 && (
        <section className="mt-6 rounded-2xl bg-surface p-5 shadow-card">
          {analyzing ? (
            <p className="animate-pulse text-sm font-semibold">🤖 {t("sell.analyzing")}</p>
          ) : (
            <>
              <p className="font-bold">🤖 {t("sell.recognized", { name: "Apple iPhone 17 Pro Max" })}</p>
              <div className="mt-3 space-y-2 text-sm">
                <p>
                  {t("sell.category_label")}: <b>Смартфоны · Электроника</b>
                </p>
                <p>
                  {t("sell.recommended_price")}: <b>45 000–52 000 {t("currency.som")}</b>
                </p>
                <p className="text-ink-faint">
                  {t("sell.title_label")}: Apple iPhone 17 Pro Max 256GB · {t("sell.description_generated")}
                </p>
              </div>
              <button onClick={() => setStep(2)} className="btn-primary mt-4 w-full">
                {t("sell.next")}
              </button>
              <button onClick={() => setStep(0)} className="btn-secondary mt-2 w-full">
                {t("sell.upload_another")}
              </button>
            </>
          )}
        </section>
      )}

      {step === 2 && (
        <section className="mt-6 space-y-3">
          <label className="block">
            <span className="text-sm font-semibold">{t("sell.title_label")}</span>
            <input defaultValue="Apple iPhone 17 Pro Max 256GB" className="mt-1 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">{t("sell.description_label")}</span>
            <textarea
              defaultValue="Состояние новое, полный комплект, гарантия. Доставка по Бишкеку."
              rows={3}
              className="mt-1 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">{t("sell.condition_label")}</span>
            <select className="mt-1 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm">
              <option>{t("common.new")}</option>
              <option>{t("sell.condition_used_excellent")}</option>
              <option>{t("sell.condition_used_good")}</option>
            </select>
          </label>
          <button onClick={() => setStep(3)} className="btn-primary w-full">
            {t("sell.next")}
          </button>
        </section>
      )}

      {step === 3 && (
        <section className="mt-6 space-y-3">
          <label className="block">
            <span className="text-sm font-semibold">{t("sell.price_label", { currency: t("currency.som") })}</span>
            <input defaultValue="49500" inputMode="numeric" className="mt-1 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm font-bold tabular-nums" />
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button className="rounded-xl border-2 border-brand-600 bg-brand-50 px-3 py-3 text-sm font-bold text-brand-700">⚡ {t("sell.fixed_price")}</button>
            <button className="rounded-xl border border-line bg-surface px-3 py-3 text-sm font-semibold">🔨 {t("sell.auction")}</button>
          </div>
          <p className="text-xs text-ink-faint">{t("sell.auction_hint")}</p>
          <button onClick={() => setStep(4)} className="btn-primary w-full">
            {t("sell.next")}
          </button>
        </section>
      )}

      {step === 4 && (
        <section className="mt-6 rounded-2xl bg-surface p-5 text-center shadow-card">
          <p className="text-3xl">🎉</p>
          <p className="mt-2 font-bold">{t("sell.ready_title")}</p>
          <p className="mt-1 text-sm text-ink-faint">{t("sell.ready_text")}</p>
          <button onClick={() => setStep(0)} className="btn-primary mt-4 w-full">
            {t("sell.publish")}
          </button>
        </section>
      )}
    </main>
  );
}
