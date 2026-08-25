"use client";

import { useMemo, useState } from "react";
import { formatKGS, getLiveAuctions } from "@/lib/data/mock-data";
import { IconGavel, IconShield } from "@/components/icons/Icons";

const STEP = 500;

/**
 * Bid bottom sheet — mobile-first.
 * TODO(backend): POST /auctions/:id/bids with max-bid proxy bidding + WS broadcast.
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

  return (
    <div className="fixed inset-0 z-50 flex items-end" role="dialog" aria-modal="true" aria-label="Ставка">
      <button className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" onClick={onClose} aria-label="Закрыть" />
      <div className="sheet-enter relative w-full rounded-t-3xl bg-surface px-5 pt-3 pb-8 shadow-lifted safe-bottom">
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-line" />

        {!placed ? (
          <>
            <div className="mb-4 flex items-baseline justify-between">
              <div>
                <p className="text-xs text-ink-faint">Текущая ставка</p>
                <p className="text-2xl font-extrabold tabular-nums">
                  {formatKGS(a.currentBid)} <span className="text-sm font-semibold text-ink-soft">сом</span>
                </p>
              </div>
              <span className="chip bg-success-bg text-success">
                <IconShield size={13} /> Безопасная сделка
              </span>
            </div>

            <p className="mb-2 text-sm font-semibold">{maxMode ? "Ваша максимальная ставка" : "Предложения"}</p>

            {!maxMode ? (
              <>
                <div className="mb-3 grid grid-cols-3 gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelected(s)}
                      className={`rounded-xl border py-3.5 text-center font-bold tabular-nums transition-all active:scale-95 ${
                        selected === s
                          ? "border-brand-600 bg-brand-50 text-brand-700 shadow-cta"
                          : "border-line text-ink-soft"
                      }`}
                    >
                      {formatKGS(s)}
                    </button>
                  ))}
                </div>
                <button onClick={() => setMaxMode(true)} className="mb-4 w-full text-center text-sm font-medium text-brand-600">
                  Указать свою максимальную ставку
                </button>
              </>
            ) : (
              <>
                <div className="mb-3 flex items-center gap-2 rounded-xl border border-line px-4 py-1 focus-within:border-brand-500">
                  <input
                    autoFocus
                    inputMode="numeric"
                    placeholder={`${next}`}
                    value={maxBid}
                    onChange={(e) => setMaxBid(e.target.value.replace(/\D/g, ""))}
                    className="min-h-14 w-full bg-transparent text-xl font-bold tabular-nums outline-none"
                  />
                  <span className="text-sm font-semibold text-ink-faint">сом</span>
                </div>
                <button onClick={() => setMaxMode(false)} className="mb-4 w-full text-center text-sm font-medium text-ink-faint">
                  ← К предложениям
                </button>
              </>
            )}

            <button
              disabled={!value || value <= a.currentBid}
              onClick={() => setPlaced(true)}
              className="btn-primary w-full disabled:opacity-40"
            >
              <IconGavel size={18} strokeWidth={2.2} />
              Подтвердить ставку — {formatKGS(value || 0)} сом
            </button>
            <p className="mt-2 text-center text-[11px] text-ink-faint">Ставка бесплатна. Оплата только при победе.</p>
          </>
        ) : (
          <div className="rise-in py-6 text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-success-bg text-3xl">✅</div>
            <h3 className="text-lg font-bold">Ваша ставка принята!</h3>
            <p className="mt-1 text-sm text-ink-soft tabular-nums">
              {formatKGS(value)} сом · мы уведомим о новых ставках
            </p>
            <button onClick={onClose} className="btn-secondary mt-5 w-full">Готово</button>
          </div>
        )}
      </div>
    </div>
  );
}
