"use client";

import { createContext, useContext, useMemo } from "react";
import { defaultLocale, type Locale, type Messages } from "./config";
import { makeT, type TFunction } from "./t";

type Ctx = { locale: Locale; t: TFunction };

const LocaleContext = createContext<Ctx | null>(null);

export function LocaleProvider({
  locale,
  messages,
  fallback,
  children,
}: {
  locale: Locale;
  messages: Messages;
  fallback: Messages;
  children: React.ReactNode;
}) {
  const value = useMemo<Ctx>(() => ({ locale, t: makeT(messages, fallback) }), [locale, messages, fallback]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

/** Client-component translator: `const t = useT();` */
export function useT(): TFunction {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useT() must be used inside <LocaleProvider>");
  return ctx.t;
}

export function useLocale(): Locale {
  return useContext(LocaleContext)?.locale ?? defaultLocale;
}
