"use client";

import { useState } from "react";

const LOCALES = [
  { code: "ru", label: "Русский" },
  { code: "ky", label: "Кыргызча" },
  { code: "en", label: "English" },
  { code: "kk", label: "Қазақша" },
  { code: "uz", label: "Oʻzbekcha" },
  { code: "tr", label: "Türkçe" },
] as const;

export function LocaleSwitcher() {
  const [open, setOpen] = useState(false);
  const [cur, setCur] = useState("ru");

  function select(code: string) {
    setCur(code);
    document.cookie = `itorgo_locale=${code}; path=/; max-age=31536000`;
    setOpen(false);
    location.reload();
  }

  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)} className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold">
        {LOCALES.find((l) => l.code === cur)?.label} ▾
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-2 w-36 overflow-hidden rounded-xl bg-surface shadow-lifted">
          {LOCALES.map((l) => (
            <button key={l.code} onClick={() => select(l.code)} className={`block w-full px-3 py-2 text-left text-xs hover:bg-surface-dim ${cur === l.code ? "font-bold text-brand-600" : ""}`}>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function CountrySwitcher() {
  const [cur, setCur] = useState("KG");
  const opts = [
    { code: "KG", label: "Кыргызстан · сом", active: true },
    { code: "KZ", label: "Қазақстан · ₸", active: false },
    { code: "UZ", label: "Ўзбекистон · soʻm", active: false },
  ] as const;
  function select(code: string) {
    if (code !== "KG") return; // KZ/UZ not yet active — spec #67
    setCur(code);
    document.cookie = `itorgo_country=${code}; path=/; max-age=31536000`;
    location.reload();
  }
  return (
    <div className="flex items-center gap-1">
      {opts.map((o) => (
        <button
          key={o.code}
          onClick={() => select(o.code)}
          disabled={!o.active}
          className={`rounded-full px-2.5 py-1 text-xs font-bold ${cur === o.code ? "bg-ink text-white" : o.active ? "bg-surface border border-line" : "bg-surface-sunken text-ink-faint"}`}
          title={o.active ? undefined : "Скоро — активируется из админки"}
        >
          {o.code}
        </button>
      ))}
    </div>
  );
}
