"use client";

import { useState } from "react";
import { MOCK_WALLET } from "@/lib/payments/payments";
import { formatKGS } from "@/lib/data/mock-data";
import { useT } from "@/lib/i18n/LocaleProvider";

/**
 * Wallet + Receipt OCR stub — spec #48–49.
 * TODO: POST /wallet/topup, POST /receipts/upload (OCR: amount/date/sender/receiver/txId)
 */
export default function WalletPage() {
  const t = useT();
  const [fileName, setFileName] = useState<string | null>(null);
  const [ocr, setOcr] = useState<null | { amount: number; date: string; txId: string }>(null);
  const som = t("currency.som");

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    // Demo OCR — fake parse
    setTimeout(() => setOcr({ amount: 49500, date: "2026-08-24", txId: "TX-" + Math.random().toString(36).slice(2, 8).toUpperCase() }), 800);
  }

  return (
    <main className="px-4 py-4">
      <h1 className="text-lg font-extrabold">{t("nav.wallet")}</h1>

      <section className="mt-4 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white shadow-lifted">
        <p className="text-xs opacity-80">{t("wallet.balance")}</p>
        <p className="mt-1 text-3xl font-black tabular-nums">
          {formatKGS(MOCK_WALLET.balance)} <span className="text-lg font-semibold">{som}</span>
        </p>
        <p className="mt-1 text-xs opacity-75">{t("wallet.currency_country", { currency: MOCK_WALLET.currency, country: "KG" })}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="rounded-xl bg-white px-3 py-2.5 text-sm font-bold text-brand-700">{t("wallet.top_up")}</button>
          <button className="rounded-xl bg-white/15 px-3 py-2.5 text-sm font-bold backdrop-blur">{t("wallet.withdraw")}</button>
        </div>
      </section>

      <section className="mt-4 rounded-2xl bg-surface p-4 shadow-card">
        <h2 className="font-bold">📄 {t("wallet.upload_receipt_title")}</h2>
        <p className="mt-1 text-xs text-ink-faint">{t("wallet.upload_receipt_hint")}</p>
        <label className="mt-3 flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line bg-surface-dim px-4 py-6 text-sm font-semibold">
          <input type="file" accept="image/*,.pdf" className="hidden" onChange={onFile} />
          {fileName ? `📎 ${fileName}` : t("wallet.choose_receipt_file")}
        </label>
        {ocr && (
          <div className="mt-3 rounded-xl bg-success-bg px-3 py-2 text-sm text-success">
            {t("wallet.recognized")} {formatKGS(ocr.amount)} {som} · {ocr.date} · {ocr.txId}
          </div>
        )}
      </section>

      <section className="mt-4 rounded-2xl bg-surface p-4 shadow-card">
        <h3 className="font-bold">{t("wallet.history")}</h3>
        <ul className="mt-2 divide-y divide-line">
          {MOCK_WALLET.transactions.map((tx) => (
            <li key={tx.id} className="flex items-center justify-between py-3 text-sm">
              <span>
                {t(tx.labelKey)}
                {tx.detail ? ` · ${tx.detail}` : ""}
              </span>
              <span className={`font-bold tabular-nums ${tx.amount < 0 ? "text-ink" : "text-success"}`}>{tx.amount > 0 ? "+" : ""}{formatKGS(tx.amount)} {som}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
