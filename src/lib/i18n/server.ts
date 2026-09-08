import { cookies, headers } from "next/headers";
import { LOCALE_COOKIE, defaultLocale, isLocale, type Locale } from "./config";
import { dictionaries } from "./dictionaries";
import { makeT, type TFunction } from "./t";

/** Resolve the request locale (cookie set by LocaleSwitcher, or x-locale from middleware). */
export async function getLocale(): Promise<Locale> {
  const c = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (isLocale(c)) return c;
  const h = (await headers()).get("x-locale");
  if (isLocale(h)) return h;
  return defaultLocale;
}

/** Server-component translator: `const t = await getT();` */
export async function getT(locale?: Locale): Promise<TFunction> {
  const l = locale ?? (await getLocale());
  return makeT(dictionaries[l], dictionaries.ru);
}
