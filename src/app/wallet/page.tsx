"use client";

import { useState } from "react";
import { MOCK_WALLET } from "@/lib/payments/payments";
import { formatKGS } from "@/lib/data/mock-data";

/**
 * Wallet + Receipt OCR stub — spec #48–49.
 * TODO: POST /wallet/topup, POST /receipts/upload (OCR: amount/date/sender/receiver/txId)
 */
export default function WalletPage() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [ocr, setOcr] = useState<null | { amount: number; date: string; txId: string }>(null);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    // Demo OCR — fake parse
    setTimeout(() => setOcr({ amount: 49500, date: "2026-08-24", txId: "TX-" + Math.random().toString(36).slice(2, 8).toUpperCase() }), 800);
  }

  return (
    <main className="px-4 py-4">
      <h1 className="text-lg font-extrabold">Кошелёк</h1>

      <section className="mt-4 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white shadow-lifted">
        <p className="text-xs opacity-80">Баланс</p>
        <p className="mt-1 text-3xl font-black tabular-nums">
          {formatKGS(MOCK_WALLET.balance)} <span className="text-lg font-semibold">сом</span>
        </p>
        <p className="mt-1 text-xs opacity-75">Валюта: {MOCK_WALLET.currency} · Страна: KG</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="rounded-xl bg-white px-3 py-2.5 text-sm font-bold text-brand-700">Пополнить</button>
          <button className="rounded-xl bg-white/15 px-3 py-2.5 text-sm font-bold backdrop-blur">Вывести</button>
        </div>
      </section>

      <section className="mt-4 rounded-2xl bg-surface p-4 shadow-card">
        <h2 className="font-bold">📄 Загрузить чек (OCR)</h2>
        <p className="mt-1 text-xs text-ink-faint">AI прочитает сумму, дату, отправителя/получателя и ID транзакции. Автоподбор платежа.</p>
        <label className="mt-3 flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line bg-surface-dim px-4 py-6 text-sm font-semibold">
          <input type="file" accept="image/*,.pdf" className="hidden" onChange={onFile} />
          {fileName ? `📎 ${fileName}` : "Выберите файл чека"}
        </label>
        {ocr && (
          <div className="mt-3 rounded-xl bg-success-bg px-3 py-2 text-sm text-success">
            Распознано: {formatKGS(ocr.amount)} сом · {ocr.date} · {ocr.txId}
          </div>
        )}
        <p className="mt-2 text-xs text-ink-faint">TODO: POST /receipts + OCR service (amount/date/sender/receiver/txId)</p>
      </section>

      <section className="mt-4 rounded-2xl bg-surface p-4 shadow-card">
        <h3 className="font-bold">История</h3>
        <ul className="mt-2 divide-y divide-line">
          {MOCK_WALLET.transactions.map((t) => (
            <li key={t.id} className="flex items-center justify-between py-3 text-sm">
              <span>{t.label}</span>
              <span className={`font-bold tabular-nums ${t.amount < 0 ? "text-ink" : "text-success"}`}>{t.amount > 0 ? "+" : ""}{formatKGS(t.amount)} сом</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-ink-faint">
          Статусы: pending → processing → paid / failed / refunded / cancelled · провайдеры подключаются через PaymentProvider
        </p>
      </section>
    </main>
  );
}
