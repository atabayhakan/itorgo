// ITOrgo — message registry. Flat keys "<namespace>.<key>", locales ru (source) / ky / tr.
// Add a namespace: create messages/<ns>.ts and register it in MODULES.
import { LOCALES, type Locale, type Messages, type NamespaceMessages } from "./config";
import { common } from "./messages/common";
import { nav } from "./messages/nav";
import { currency, cities } from "./messages/currency";
import { states } from "./messages/states";
import { home } from "./messages/home";
import { ai } from "./messages/ai";
import { pwa } from "./messages/pwa";
import { auction } from "./messages/auction";
import { product } from "./messages/product";
import { seller } from "./messages/seller";
import { cart } from "./messages/cart";
import { checkout } from "./messages/checkout";
import { profile } from "./messages/profile";
import { sell } from "./messages/sell";
import { search } from "./messages/search";
import { orders } from "./messages/orders";
import { wallet } from "./messages/wallet";
import { kyc } from "./messages/kyc";
import { notifications } from "./messages/notifications";
import { messages as msgs } from "./messages/messages";
import { reviews } from "./messages/reviews";
import { auth } from "./messages/auth";
import { coupons } from "./messages/coupons";
import { share } from "./messages/share";

const MODULES: Record<string, NamespaceMessages> = {
  common, nav, currency, cities, states, home, ai, pwa, auction, product, seller, cart, checkout,
  profile, sell, search, orders, wallet, kyc, notifications, messages: msgs, reviews, auth, coupons, share,
};

function build(locale: Locale): Messages {
  const out: Messages = {};
  for (const [ns, mod] of Object.entries(MODULES)) {
    const m = mod[locale] ?? {};
    for (const [k, v] of Object.entries(m)) out[`${ns}.${k}`] = v;
  }
  return out;
}

export const dictionaries: Record<Locale, Messages> = Object.fromEntries(
  LOCALES.map((l) => [l, build(l)]),
) as Record<Locale, Messages>;

export const ru = dictionaries.ru;
export type Dictionary = Messages;
export type TranslationKey = keyof typeof ru;
export { defaultLocale } from "./config";
