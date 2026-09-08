import type { NamespaceMessages } from "../config";

export const cart: NamespaceMessages = {
  ru: {
    empty: "Корзина пуста",
    empty_text: "Добавьте товары, чтобы оформить заказ.",
    title: "Корзина · {n}",
    qty: "× {qty}",
    remove: "Удалить из корзины",
    discount_applied: "Скидка {d}% применена",
    total: "Итого",
    checkout: "Оформить заказ",
    clear: "Очистить корзину",
  },
  ky: {
    empty: "Себет бош",
    empty_text: "Буйрутма берүү үчүн товар кошуңуз.",
    title: "Себет · {n}",
    qty: "× {qty}",
    remove: "Себеттен өчүрүү",
    discount_applied: "{d}% арзандатуу колдонулду",
    total: "Жалпы",
    checkout: "Буйрутма берүү",
    clear: "Себетти тазалоо",
  },
  tr: {
    empty: "Sepet boş",
    empty_text: "Sipariş vermek için ürün ekleyin.",
    title: "Sepet · {n}",
    qty: "× {qty}",
    remove: "Sepetten kaldır",
    discount_applied: "%{d} indirim uygulandı",
    total: "Toplam",
    checkout: "Siparişi tamamla",
    clear: "Sepeti boşalt",
  },
};
