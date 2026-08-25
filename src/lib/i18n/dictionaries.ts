// ITOrgo — translation keys. Default: Russian.
// Structure ready for: ru (active), ky / en / kk / uz / tr.

export const ru = {
  common: {
    app_name: "ITOrgo",
    see_all: "Все",
    search_placeholder: "Что вы ищете?",
    cancel: "Отмена",
    retry: "Повторить",
    share: "Поделиться",
    loading: "Загрузка…",
  },
  nav: {
    home: "Главная",
    search: "Поиск",
    auctions: "Аукционы",
    favorites: "Избранное",
    profile: "Профиль",
    sell: "Продать",
  },
  home: {
    live_now: "Сейчас на торгах",
    quick_title: "",
    categories: "Категории",
    all_categories: "Все категории",
    for_you: "Для вас",
    new_items: "Новинки",
    ending_soon: "Скоро закончится",
    top_stores: "Популярные магазины",
  },
  auction: {
    bid: "Сделать ставку",
    buy_now: "Купить сейчас",
    current_bid: "Текущая ставка",
    bids_count: "{n} ставок",
    ends_in: "Осталось",
    starting_price: "Начальная цена",
    your_max_bid: "Ваша максимальная ставка",
    suggestions: "Предложения",
    recent_bids: "Последние ставки",
    confirm_bid: "Подтвердить ставку",
    participants: "{n} участников",
  },
  product: {
    add_favorite: "В избранное",
    in_favorites: "В избранном",
    seller: "Продавец",
    verified: "Проверен",
    condition_new: "Новый",
    condition_used: "Б/у",
    discount: "-{p}%",
  },
  seller: {
    follow: "Подписаться",
    following: "Вы подписаны",
    positive_reviews: "{p}% положительных отзывов",
    sales: "{n} продаж",
    on_itorgo_since: "{y} на ITOrgo",
    products_tab: "Товары",
    auctions_tab: "Аукционы",
    reviews_tab: "Отзывы",
    store_tab: "Магазин",
  },
  trust: {
    score: "Надёжность",
    phone: "Телефон",
    email: "Email",
    documents: "Документы",
    bank: "Банк",
    history: "История продаж",
  },
  states: {
    empty_favorites_title: "Здесь пока пусто",
    empty_favorites_text: "Добавляйте товары, которые хотите сохранить.",
    error_title: "Что-то пошло не так",
    error_text: "Попробуйте ещё раз.",
    offline: "Нет соединения. Проверьте интернет.",
  },
  ai: {
    help_find: "Помочь найти?",
    analyzing: "AI анализирует товар…",
    found_variants: "Я нашёл {n} вариантов.",
  },
  currency: {
    som: "сом",
  },
  cities: {
    bishkek: "Бишкек",
    osh: "Ош",
    jalal_abad: "Джалал-Абад",
    karakol: "Каракол",
    tokmok: "Токмок",
  },
};

export type TranslationKey = keyof typeof ru;
export type Dictionary = typeof ru;

export const dictionaries = { ru } as const;
export const defaultLocale = "ru" as const;
