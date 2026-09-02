"use client";

import { useState } from "react";

export type FilterField = { key: string; label: string; options: string[] };
export type FilterValue = Record<string, string[] | undefined>;

/**
 * Generic multi-select filter popover for admin tables — one component,
 * any resource: pass a different `fields` list per page instead of
 * hardcoding fields per domain.
 */
export function FilterPanel({
  fields,
  value,
  onChange,
}: {
  fields: FilterField[];
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}) {
  const [open, setOpen] = useState(false);
  const activeCount = fields.reduce((n, f) => n + ((value[f.key]?.length ?? 0) > 0 ? 1 : 0), 0);

  function toggleOption(key: string, option: string) {
    const current = value[key] ?? [];
    const next = current.includes(option) ? current.filter((o) => o !== option) : [...current, option];
    onChange({ ...value, [key]: next });
  }

  function clearField(key: string) {
    onChange({ ...value, [key]: [] });
  }

  return (
    <div>
      <div className="relative inline-block">
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-1.5 text-sm font-bold text-ink-soft hover:bg-surface-dim"
        >
          Фильтры
          {activeCount > 0 && <span className="chip bg-brand-600 text-white">{activeCount}</span>}
        </button>

        {open && (
          <div className="absolute left-0 top-[calc(100%+8px)] z-20 w-72 rounded-[10px] border border-line bg-surface p-3 shadow-lifted">
            {fields.map((f) => (
              <div key={f.key} className="mb-3 last:mb-0">
                <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-ink-faint">{f.label}</p>
                <div className="flex flex-wrap gap-1.5">
                  {f.options.map((o) => {
                    const active = (value[f.key] ?? []).includes(o);
                    return (
                      <button
                        key={o}
                        onClick={() => toggleOption(f.key, o)}
                        className={`chip ${active ? "bg-brand-50 text-brand-700" : "bg-surface-dim text-ink-soft"}`}
                      >
                        {o}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            <button
              onClick={() => setOpen(false)}
              className="mt-1 w-full rounded-[10px] bg-ink px-3 py-2 text-sm font-bold text-white"
            >
              Готово
            </button>
          </div>
        )}
      </div>

      {activeCount > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {fields.map((f) =>
            (value[f.key]?.length ?? 0) > 0 ? (
              <span key={f.key} className="chip bg-brand-50 text-brand-700">
                {f.label}: {(value[f.key] ?? []).join(", ")}
                <button
                  onClick={() => clearField(f.key)}
                  className="text-brand-700/60 hover:text-brand-700"
                  aria-label={`${f.label} filtresini temizle`}
                >
                  ×
                </button>
              </span>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
