import type { NamespaceMessages } from "../config";

export const coupons: NamespaceMessages = {
  ru: {
    invalid: "Неверный или просроченный купон",
    applied: "Применён {code} — −{pct}%",
    placeholder: "Код купона",
    apply: "Применить",
    demo_hint: "Демо-коды: SALAM10 · ITOrgo20 · KG5",
  },
  ky: {
    invalid: "Купон туура эмес же мөөнөтү өткөн",
    applied: "{code} колдонулду — −{pct}%",
    placeholder: "Купон коду",
    apply: "Колдонуу",
    demo_hint: "Демо-коддор: SALAM10 · ITOrgo20 · KG5",
  },
  tr: {
    invalid: "Kupon geçersiz veya süresi dolmuş",
    applied: "{code} uygulandı — −%{pct}",
    placeholder: "Kupon kodu",
    apply: "Uygula",
    demo_hint: "Demo kodlar: SALAM10 · ITOrgo20 · KG5",
  },
};
