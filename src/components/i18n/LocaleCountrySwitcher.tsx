"use client";

import { useState } from "react";
import { LOCALES, LOCALE_LABELS, LOCALE_COOKIE, type Locale } from "@/lib/i18n/config";
import { useLocale, useT } from "@/lib/i18n/LocaleProvider";

export function LocaleSwitcher() {
  const t = useT();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [cur, setCur] = useState<Locale>(locale);

  function select(code: Locale) {
    setCur(code);
    document.cookie = `${LOCALE_COOKIE}=${code}; path=/; max-age=31536000; samesite=lax`;
    setOpen(false);
    location.reload();
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t("nav.language")}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold"
      >
        {LOCALE_LABELS[cur]} ▾
      </button>
      {open && (
        <div role="listbox" aria-label={t("nav.language")} className="absolute right-0 z-20 mt-2 w-36 overflow-hidden rounded-xl bg-surface shadow-lifted">
          {LOCALES.map((code) => (
            <button
              key={code}
              role="option"
              aria-selected={cur === code}
              onClick={() => select(code)}
              className={`block w-full px-3 py-2 text-left text-xs hover:bg-surface-dim ${cur === code ? "font-bold text-brand-600" : ""}`}
            >
              {LOCALE_LABELS[code]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function CountrySwitcher() {
  const t = useT();
  const [cur, setCur] = useState("KG");
  const opts = [
    { code: "KG", labelKey: "nav.country_kg", active: true },
    { code: "KZ", labelKey: "nav.country_kz", active: false },
    { code: "UZ", labelKey: "nav.country_uz", active: false },
  ] as const;
  function select(code: string) {
    if (code !== "KG") return; // KZ/UZ are not active yet
    setCur(code);
    document.cookie = `itorgo_country=${code}; path=/; max-age=31536000`;
    location.reload();
  }
  return (
    <div className="flex items-center gap-1" role="group" aria-label={t("nav.country")}>
      {opts.map((o) => (
        <button
          key={o.code}
          onClick={() => select(o.code)}
          disabled={!o.active}
          className={`rounded-full px-2.5 py-1 text-xs font-bold ${cur === o.code ? "bg-ink text-white" : o.active ? "bg-surface border border-line" : "bg-surface-sunken text-ink-faint"}`}
          title={o.active ? t(o.labelKey) : `${t(o.labelKey)} — ${t("nav.country_soon")}`}
          aria-label={t(o.labelKey)}
        >
          {o.code}
        </button>
      ))}
    </div>
  );
}
