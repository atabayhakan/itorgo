"use client";

import { useMemo, useState } from "react";
import { formatKGS, getLiveAuctions } from "@/lib/data/mock-data";
import { IconGavel, IconShield } from "@/components/icons/Icons";

const STEP = 500;

/**
 * Premium BidSheet — spec #20
 * Текущая ставка → Следующая ставка → Моя максимальная ставка + auto note
 */
export function BidSheet({ auctionId, onClose }: { auctionId: string; onClose: () => void }) {
  const a = getLiveAuctions().find((x) => x.id === auctionId)!;
  const next = a.currentBid + STEP;
  const suggestions = useMemo(() => [next, next + STEP, next + 2 * STEP], [next]);
  const [selected, setSelected] = useState<number>(suggestions[0]);
  const [maxMode, setMaxMode] = useState(false);
  const [maxBid, setMaxBid] = useState<string>("");
  const [placed, setPlaced] = useState(false);

  const value = maxMode ? Number(maxBid || 0) : selected;
  const effectiveNext = next;

  return (
    <div className="fixed inset-0 z-50 flex items-end" role="dialog" aria-modal="true" aria-label="Ставка">
      <button className="absolute inset-0 bg-black/50 backdrop-blur-[3px]" onClick={onClose} aria-label="Закрыть" />
      <div className="sheet-enter relative w-full rounded-t-[20px] bg-surface px-5 pt-3 pb-6 shadow-lifted safe-bottom">
        <div className="mx-auto mb-4 h-1.5 w-9 rounded-full bg-line/80" />

        {!placed ? (
          <>
            {/* Header — текущая */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-wide text-ink-faint">ТЕКУЩАЯ СТАВКА</p>
                <p className="text-2xl font-black tabular-nums tracking-tight">
                  {formatKGS(a.currentBid)} <span className="text-sm font-semibold text-ink-soft">сом</span>
                </p>
                <p className="text-xs text-ink-faint">📈 {a.bidsCount} ставок · 👥 {a.participants} участников</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-success-bg px-2.5 py-1 text-xs font-bold text-success">
                <IconShield size={12} /> Безопасно
              </span>
            </div>

            {/* Следующая ставка — highlighted */}
            <div className="mt-4 rounded-[12px] border border-line bg-surface-dim px-4 py-3">
              <p className="text-xs font-bold tracking-wide text-ink-faint">СЛЕДУЮЩАЯ СТАВКА</p>
              <p className="text-lg font-black tabular-nums">{formatKGS(effectiveNext)} сом</p>
            </div>

            {/* Pill suggestions */}
            <div className="mt-3">
              <p className="mb-2 text-xs font-bold tracking-wide text-ink-faint">{maxMode ? "ВАША МАКСИМАЛЬНАЯ СТАВКА" : "БЫСТРЫЙ ВЫБОР"}</p>
              {!maxMode ? (
                <>
                  <div className="grid grid-cols-3 gap-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelected(s)}
                        className={`rounded-[10px] border py-3 text-center text-sm font-bold tabular-nums transition active:scale-[0.98] ${
                          selected === s ? "border-ink bg-ink text-white" : "border-line bg-surface text-ink-soft hover:bg-surface-dim"
                        }`}
                      >
                        {formatKGS(s)}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setMaxMode(true)} className="mt-3 w-full text-center text-xs font-semibold text-ink-soft underline">
                    Указать свою максимальную ставку →
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 rounded-[12px] border border-line bg-surface px-4 py-2 focus-within:border-ink">
                    <input
                      autoFocus
                      inputMode="numeric"
                      placeholder={`${effectiveNext}`}
                      value={maxBid}
                      onChange={(e) => setMaxBid(e.target.value.replace(/\D/g, ""))}
                      className="min-h-12 w-full bg-transparent text-lg font-black tabular-nums outline-none"
                    />
                    <span className="text-sm font-bold text-ink-faint">сом</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-ink-faint">Автоматическая ставка будет использоваться до указанной вами суммы.</p>
                  <button onClick={() => setMaxMode(false)} className="mt-2 w-full text-center text-xs font-semibold text-ink-faint">
                    ← к быстрому выбору
                  </button>
                </>
              )}
            </div>

            <button
              disabled={!value || value <= a.currentBid}
              onClick={() => setPlaced(true)}
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[12px] bg-ink px-4 text-sm font-bold text-white transition hover:bg-black disabled:opacity-40 active:scale-[0.98]"
            >
              <IconGavel size={16} strokeWidth={2.2} /> Подтвердить ставку — {formatKGS(value || 0)} сом
            </button>
            <p className="mt-2 text-center text-[11px] text-ink-faint">Оплата только при победе · Защита покупателя</p>
          </>
        ) : (
          <div className="rise-in py-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-success-bg text-2xl">✓</div>
            <h3 className="text-lg font-bold">Вы лидируете!</h3>
            <p className="mt-1 text-sm text-ink-faint">
              Ставка {formatKGS(value)} сом принята · уведомим если перебьют
            </p>
            <button onClick={onClose} className="mt-5 inline-flex w-full items-center justify-center rounded-[10px] bg-ink px-4 py-3 text-sm font-bold text-white">
              Готово
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
