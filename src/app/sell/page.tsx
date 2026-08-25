"use client";

import { useState } from "react";
import Link from "next/link";
import { IconBack } from "@/components/icons/Icons";

/**
 * Sell wizard — mobile step flow.
 * TODO(backend): upload → POST /media, POST /products/detect (AI), POST /products
 * TODO(AI): image classification + price suggestion via vision model.
 * TODO(payments): delivery options, etc.
 */
const STEPS = ["Фото", "AI анализ", "Детали", "Цена", "Публикация"] as const;

export default function SellPage() {
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
        <h1 className="text-lg font-extrabold">Продать</h1>
        <span className="ml-auto text-xs text-ink-faint">Шаг {step + 1} из 5</span>
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
            <p className="mt-2 font-bold">Загрузите фото товара</p>
            <p className="mt-1 text-sm text-ink-faint">AI распознает товар и предложит категорию и цену</p>
            <button onClick={handlePhoto} className="btn-primary mt-4 w-full">
              {photo ? "Фото загружено ✓" : "Выбрать фото"}
            </button>
            <input type="file" accept="image/*" className="hidden" />
          </div>
          <p className="mt-3 text-center text-xs text-ink-faint">Поддержка: JPG/PNG, до 10 МБ · Реальная загрузка — TODO(media)</p>
        </section>
      )}

      {step === 1 && (
        <section className="mt-6 rounded-2xl bg-surface p-5 shadow-card">
          {analyzing ? (
            <p className="animate-pulse text-sm font-semibold">🤖 AI анализирует товар…</p>
          ) : (
            <>
              <p className="font-bold">🤖 Apple iPhone 17 Pro Max — распознано</p>
              <div className="mt-3 space-y-2 text-sm">
                <p>
                  Категория: <b>Смартфоны · Электроника</b>
                </p>
                <p>
                  Рекомендованная цена: <b>45 000–52 000 сом</b>
                </p>
                <p className="text-ink-faint">Заголовок: Apple iPhone 17 Pro Max 256GB · Описание сгенерировано.</p>
              </div>
              <button onClick={() => setStep(2)} className="btn-primary mt-4 w-full">
                Далее
              </button>
              <button onClick={() => setStep(0)} className="btn-secondary mt-2 w-full">
                Загрузить другое фото
              </button>
            </>
          )}
        </section>
      )}

      {step === 2 && (
        <section className="mt-6 space-y-3">
          <label className="block">
            <span className="text-sm font-semibold">Заголовок</span>
            <input defaultValue="Apple iPhone 17 Pro Max 256GB" className="mt-1 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Описание</span>
            <textarea
              defaultValue="Состояние новое, полный комплект, гарантия. Доставка по Бишкеку."
              rows={3}
              className="mt-1 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Состояние</span>
            <select className="mt-1 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm">
              <option>Новый</option>
              <option>Б/у — отличное</option>
              <option>Б/у — хорошее</option>
            </select>
          </label>
          <button onClick={() => setStep(3)} className="btn-primary w-full">
            Далее
          </button>
        </section>
      )}

      {step === 3 && (
        <section className="mt-6 space-y-3">
          <label className="block">
            <span className="text-sm font-semibold">Цена (сом)</span>
            <input defaultValue="49500" inputMode="numeric" className="mt-1 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm font-bold tabular-nums" />
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button className="rounded-xl border-2 border-brand-600 bg-brand-50 px-3 py-3 text-sm font-bold text-brand-700">⚡ Фикс. цена</button>
            <button className="rounded-xl border border-line bg-surface px-3 py-3 text-sm font-semibold">🔨 Аукцион</button>
          </div>
          <p className="text-xs text-ink-faint">Аукцион: укажите стартовую цену и «Купить сейчас» (опционально).</p>
          <button onClick={() => setStep(4)} className="btn-primary w-full">
            Далее
          </button>
        </section>
      )}

      {step === 4 && (
        <section className="mt-6 rounded-2xl bg-surface p-5 text-center shadow-card">
          <p className="text-3xl">🎉</p>
          <p className="mt-2 font-bold">Готово к публикации!</p>
          <p className="mt-1 text-sm text-ink-faint">Объявление появится после модерации. Вы получите уведомление.</p>
          <button onClick={() => setStep(0)} className="btn-primary mt-4 w-full">
            Опубликовать
          </button>
          <p className="mt-2 text-xs text-ink-faint">TODO: POST /products — черновик → модерация → публикация</p>
        </section>
      )}
    </main>
  );
}
