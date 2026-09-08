export const LOCALES = ["ru", "ky", "tr"] as const;
export type Locale = (typeof LOCALES)[number];
export const defaultLocale: Locale = "ru";
export const LOCALE_COOKIE = "itorgo_locale";

export const LOCALE_LABELS: Record<Locale, string> = {
  ru: "Русский",
  ky: "Кыргызча",
  tr: "Türkçe",
};

export function isLocale(v: unknown): v is Locale {
  return typeof v === "string" && (LOCALES as readonly string[]).includes(v);
}

/** Flat key → string map for one locale. */
export type Messages = Record<string, string>;
/** One namespace file: same keys in every locale. ky/tr may omit keys → falls back to ru. */
export type NamespaceMessages = { ru: Messages; ky?: Messages; tr?: Messages };
