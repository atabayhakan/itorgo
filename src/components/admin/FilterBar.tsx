"use client";

import { useState, useMemo } from "react";

/**
 * Standard admin filter bar.
 * - Role filter (multi)
 * - City filter (multi)
 * - KYC status filter (single)
 * - Trust score range (slider)
 * - Applied filters summary
 * Shared across all admin pages.
 */
export function FilterBar({
  roles,
  setRoles,
  cities,
  setCities,
  kyc,
  setKyc,
  trustMin,
  setTrustMin,
  trustMax,
  setTrustMax,
  onApply,
}: {
  roles: string[];
  setRoles: React.Dispatch<React.SetStateAction<string[]>>;
  cities: string[];
  setCities: React.Dispatch<React.SetStateAction<string[]>>;
  kyc: "all" | "verified" | "pending" | "rejected";
  setKyc: React.Dispatch<React.SetStateAction<"all" | "verified" | "pending" | "rejected">>;
  trustMin: number;
  setTrustMin: React.Dispatch<React.SetStateAction<number>>;
  trustMax: number;
  setTrustMax: React.Dispatch<React.SetStateAction<number>>;
  onApply: () => void;
}) {
  const applied = useMemo(() => {
    const parts: string[] = [];
    if (roles.length && roles.length < 4) parts.push(`роль: ${roles.join(", ")}`);
    if (cities.length && cities.length < 4) parts.push(`город: ${cities.join(", ")}`);
    if (kyc !== "all") parts.push(`KYC: ${kyc}`);
    if (trustMin > 0 || trustMax < 100) parts.push(`доверие: ${trustMin}–${trustMax}%`);
    return parts.length ? parts.join(" · ") : "";
  }, [roles, cities, kyc, trustMin, trustMax]);

  return (
    <>
      <div className="space-y-4 mb-4">
        {/* Role filter */}
        <div className="sm:w-48">
          <label className="block text-[10px] uppercase tracking-wider text-ink-faint mb-1">Роль</label>
          <div className="multi-select rounded-lg border border-line bg-surface px-2 py-1 text-[10px] font-semibold text-ink-soft" style={{ maxHeight: "120px", overflow: "auto" }}>
            <span className="flex gap-1">{roles.map((r) => (
              <span key={r} className="chip bg-surface-dim text-ink-soft">{r}</span>
            ))}</span>
            <span className="text-xs text-ink-faint/50">—</span>
            <span>seller</span>
            <span>store_owner</span>
            <span>moderator</span>
          </div>
        </div>

        {/* City filter */}
        <div className="sm:w-48 flex flex-col gap-1">
          <label className="block text-[10px] uppercase tracking-wider text-ink-faint mb-1">Город</label>
          <div className="multi-select rounded-lg border border-line bg-surface px-2 py-1 text-[10px] font-semibold text-ink-soft" style={{ maxHeight: "100px", overflow: "auto" }}>
            <span className="flex gap-1">{cities.map((c) => (
              <span key={c} className="chip bg-surface-dim text-ink-soft">{c}</span>
            ))}</span>
            <span className="text-xs text-ink-faint/50">—</span>
            <span>Бишкек</span>
            <span>Ош</span>
            <span>Каракол</span>
            <span>Токмок</span>
            <span>Джалал-Абад</span>
          </div>
        </div>

        {/* KYC filter */}
        <div className="sm:w-40 flex items-end gap-2">
          <label className="block text-[10px] uppercase tracking-wider text-ink-faint mb-0">KYC</label>
          <div className="flex gap-1">
            <button
              onClick={() => setKyc("all")}
              className={`chip ${kyc === "all" ? "bg-brand-50 text-brand-700" : "bg-surface text-ink-soft"} rounded-full text-[10px] font-bold px-2 py-1`}
            >
              все
            </button>
            <button
              onClick={() => setKyc("verified")}
              className={`chip ${kyc === "verified" ? "bg-success-bg text-success" : "bg-surface text-ink-soft"} rounded-full text-[10px] font-bold px-2 py-1`}
            >
             verified
            </button>
            <button
              onClick={() => setKyc("pending")}
              className={`chip ${kyc === "pending" ? "bg-warning-bg text-warning" : "bg-surface text-ink-soft"} rounded-full text-[10px] font-bold px-2 py-1`}
            >
             pending
            </button>
            <button
              onClick={() => setKyc("rejected")}
              className={`chip ${kyc === "rejected" ? "bg-danger-bg text-danger" : "bg-surface text-ink-soft"} rounded-full text-[10px] font-bold px-2 py-1`}
            >
             rejected
            </button>
          </div>
        </div>

        {/* Trust range */}
        <div className="sm:w-48 flex flex-col sm:items-end gap-1">
          <label className="block text-[10px] uppercase tracking-wider text-ink-faint mb-0">Доверие</label>
          <div className="flex items-center gap-2 text-[10px] font-bold text-ink-soft">
            <span className="w-24 text-right">{trustMin}%</span>
            <span>—</span>
            <span className="w-24 text-left">{trustMax}%</span>
          </div>
          <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r bg-brand-500 to-brand-600 rounded-full"
              style={{ width: `${(trustMax - trustMin) / 100 * 100}%` }}
            />
            <div
              className="absolute left-${trustMin}% -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"
              style={{ left: `${trustMin}%` }}
            />
            <div
              className="absolute left-${trustMax}% -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"
              style={{ left: `${trustMax}%` }}
            />
          </div>

          {/* Apply button */}
          <button
            onClick={onApply}
            className="mt-2 sm:mt-0 rounded-full bg-ink px-4 py-1.5 text-sm font-bold text-white transition-colors hover:bg-black/90"
          >
            Применить
          </button>
        </div>
      </div>

      <div className="mt-3 text-xs text-ink-faint">{applied || "Фильтры не применены"}</div>
    </>
  );
}