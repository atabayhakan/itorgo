// ITOrgo — realistic seed data (demo layer).
// TODO(backend): replace with API/service-layer calls. Same interfaces.

import type { Auction, Category, Product, Seller, Store } from "../types";

export const CATEGORIES: Category[] = [
  { id: "electronics", emoji: "📱", label: "Электроника" },
  { id: "auto", emoji: "🚗", label: "Авто" },
  { id: "realty", emoji: "🏠", label: "Недвижимость" },
  { id: "clothes", emoji: "👕", label: "Одежда" },
  { id: "beauty", emoji: "💄", label: "Красота" },
  { id: "home", emoji: "🛋", label: "Дом" },
  { id: "animals", emoji: "🐄", label: "Животные" },
  { id: "farm", emoji: "🌾", label: "Ферма" },
  { id: "services", emoji: "🔧", label: "Услуги" },
  { id: "construction", emoji: "🏗", label: "Строительство" },
  { id: "watches", emoji: "⌚", label: "Часы" },
  { id: "jewelry", emoji: "💎", label: "Ювелирные изделия" },
  { id: "games", emoji: "🎮", label: "Игры" },
  { id: "books", emoji: "📚", label: "Книги" },
  { id: "sport", emoji: "🏋", label: "Спорт" },
  { id: "collectibles", emoji: "🎨", label: "Коллекции" },
];

const CITIES = ["Бишкек", "Ош", "Джалал-Абад", "Каракол", "Токмок"];

const SELLER_NAMES = [
  "Азамат Т.", "Айгүл С.", "Bek Store", "Нурлан А.", "Динара К.",
  "TechMarket KG", "Эржан Б.", "Гульмира Ж.", "Ulut Shop", "Тимур М.",
  "Асель Н.", "OshTrade", "Марат О.", "Жанара П.", "Кубат Р.",
  "Иссуф Ш.", "Aida Market", "Виктор Л.", "Нургуль Ф.", "Санжар Х.",
];

const FIRST_BIDDERS = ["Ali", "Bek", "Aida", "Nur", "Timur", "Dana", "Eldik", "Sasha", "Gulnara", "Maksat"];

function pick<T>(arr: T[], i: number): T {
  return arr[i % arr.length];
}

export const SELLERS: Seller[] = Array.from({ length: 30 }, (_, i) => ({
  id: `s${i + 1}`,
  name: pick(SELLER_NAMES, i),
  avatarSeed: `seller-${i + 1}`,
  verified: i % 3 !== 2,
  rating: Number((4.3 + ((i * 7) % 7) / 10).toFixed(1)),
  positivePct: 90 + ((i * 13) % 10),
  salesCount: 12 + ((i * 37) % 480),
  yearsOnPlatform: 1 + (i % 4),
  city: pick(CITIES, i),
}));

const STORE_NAMES = [
  "ApplePoint Bishkek", "AutoPrime KG", "HomeStyle Osh", "TechnoDom", "GoldTime",
  "FarmLine", "BeautyBar", "SportLife", "BookNook", "KyrgyzCraft",
];

export const STORES: Store[] = STORE_NAMES.map((name, i) => ({
  id: `st${i + 1}`,
  sellerId: SELLERS[i].id,
  name,
  coverSeed: `store-cover-${i + 1}`,
  logoSeed: `store-logo-${i + 1}`,
  verified: true,
  followers: 340 + ((i * 611) % 9000),
  rating: Number((4.5 + ((i * 5) % 5) / 10).toFixed(1)),
  salesCount: 150 + ((i * 233) % 3200),
}));

type Seed = [title: string, price: number, catId: string, condition: "new" | "used"];

const SEEDS: Seed[] = [
  ["iPhone 17 Pro Max 256GB", 49500, "electronics", "new"],
  ["MacBook Air M4 13\"", 68900, "electronics", "new"],
  ["Samsung Galaxy S25 Ultra", 58900, "electronics", "new"],
  ["PlayStation 5 Slim + 2 геймпада", 42000, "games", "new"],
  ["Apple Watch Series 11 GPS", 31500, "electronics", "used"],
  ["Xiaomi 15 Pro 512GB", 38900, "electronics", "used"],
  ["AirPods Max Space Gray", 27900, "electronics", "new"],
  ["Toyota Camry 2019, 2.5L", 1450000, "auto", "used"],
  ["Hyundai Elantra 2021", 1180000, "auto", "used"],
  ["Mercedes-Benz C180 W205", 1750000, "auto", "used"],
  ["Квартира 2-комн., центр Бишкека", 5200000, "realty", "used"],
  ["Дом в Караколе, 120 м²", 3800000, "realty", "used"],
  ["Пуховик The North Face оригинал", 8900, "clothes", "new"],
  ["Кроссовки Nike Air Force 1", 7200, "clothes", "new"],
  ["Золотое кольцо 585 проба", 24500, "jewelry", "new"],
  ["Часы Casio G-Shock GA-2100", 11500, "watches", "new"],
  ["Диван угловой, новый", 28900, "home", "new"],
  ["Кухонный гарнитур 3.2 м", 45500, "home", "new"],
  ["Телевизор Samsung 55\" QLED 4K", 46900, "electronics", "new"],
  ["Ноутбук Lenovo Legion 5 RTX4060", 62000, "electronics", "used"],
  ["Корова молочная альпийская", 85000, "animals", "used"],
  ["Овцы эдильбаевской породы (5 шт)", 62000, "animals", "used"],
  ["Трактор МТЗ-82, 1995 г.", 480000, "farm", "used"],
  ["Мотоблок с плугом и прицепом", 68000, "farm", "used"],
  ["Гантели разборные 24 кг", 4500, "sport", "used"],
  ["Велосипед горный Merida Big Nine", 26500, "sport", "used"],
  ["Коллекционная монета СССР 1965", 3500, "collectibles", "used"],
  ["Электросамокат Ninebot MAX G2", 32900, "sport", "new"],
  ["Ремонт квартир под ключ", 0, "services", "new"],
  ["Маникюр + гель-лак на дому", 800, "beauty", "new"],
  ["Кирпич облицовочный (поддон)", 5600, "construction", "new"],
  ["Цемент М400, мешок 50 кг", 480, "construction", "new"],
  ["iPad Air M2 128GB Wi-Fi", 39800, "electronics", "new"],
  ["Canon EOS R50 kit 18–45", 54000, "electronics", "new"],
  ["Nintendo Switch OLED White", 34200, "games", "used"],
  ["Шуба норковая натуральная", 89000, "clothes", "used"],
  ["Стол обеденный дуб + 6 стульев", 36800, "home", "new"],
  ["Холодильник LG InstaView", 58900, "electronics", "new"],
  ["Кондиционер Gree 12000 BTU", 32400, "home", "new"],
  ["Лодка надувная Intex Excursion 5", 18900, "sport", "new"],
  ["Козлы заангенские (3 шт)", 36000, "animals", "used"],
  ["Сеялка точного высева", 210000, "farm", "used"],
  ["iPhone 16 Pro 128GB Natural Titanium", 56400, "electronics", "new"],
  ["Dyson V15 Detect Absolute", 48700, "home", "new"],
  ["Стиральная машина Bosch Serie 6", 41500, "electronics", "new"],
  ["Куртка кожаная мужская", 12400, "clothes", "used"],
  ["Наушники Sony WH-1000XM6", 44200, "electronics", "new"],
  ["Кровать двуспальная + матрас", 31700, "home", "new"],
  ["Серебряная цепь 925, 60 см", 6800, "jewelry", "new"],
  ["Аквариум 200 л с тумбой", 21500, "home", "new"],
  ["Газовая плита Gorenje 4 конфорки", 19800, "home", "new"],
  ["Электроинструмент набор 108 предметов", 15600, "construction", "new"],
  ["Коляска Cybex Balios S Lux", 28900, "clothes", "new"],
  ["Гитара Yamaha F310", 9700, "collectibles", "used"],
  ["Прогулочный катамаран Hobie", 195000, "sport", "used"],
  ["Пчелиные семьи (10 ульев)", 74000, "farm", "used"],
  ["Компьютер игровой Ryzen 7 / RTX 4070", 89500, "electronics", "new"],
  ["Куртка зимняя Columbia -35°", 13800, "clothes", "new"],
  ["Смартфон Honor Magic 7 Lite", 24900, "electronics", "new"],
  ["Массажное кресло Yamaguchi", 78600, "home", "new"],
];

export const PRODUCTS: Product[] = SEEDS.map(([title, price, categoryId, condition], i) => {
  const seller = SELLERS[i % SELLERS.length];
  return {
    id: `p${i + 1}`,
    title,
    imageSeed: `product-${i + 1}`,
    price: price || Math.round((500 + ((i * 173) % 3000)) / 100) * 100,
    oldPrice: i % 4 === 0 ? Math.round((price * 1.18) / 100) * 100 : undefined,
    condition,
    categoryId,
    sellerId: seller.id,
    storeId: i % 5 === 0 ? STORES[i % STORES.length].id : undefined,
    rating: Number((4.2 + ((i * 3) % 8) / 10).toFixed(1)),
    reviewsCount: 3 + ((i * 29) % 140),
    city: pick(CITIES, i),
    createdAt: new Date(Date.now() - (i + 1) * 3.7e6).toISOString(),
    isAuction: false,
  };
});

// ---- Demo auctions: live offsets from load-time ----
const AUCTION_SEEDS: { productIdx: number; startBid: number; buyNow?: number; minutesLeft: number; bids: number; participants: number }[] = [
  { productIdx: 0, startBid: 41500, buyNow: 49000, minutesLeft: 2.7, bids: 27, participants: 14 },
  { productIdx: 1, startBid: 58200, buyNow: 66900, minutesLeft: 14, bids: 19, participants: 11 },
  { productIdx: 2, startBid: 54100, buyNow: 61500, minutesLeft: 47, bids: 33, participants: 21 },
  { productIdx: 3, startBid: 36500, buyNow: 43000, minutesLeft: 8.5, bids: 22, participants: 16 },
  { productIdx: 15, startBid: 9800, buyNow: 12500, minutesLeft: 31, bids: 12, participants: 7 },
  { productIdx: 14, startBid: 21300, buyNow: 26000, minutesLeft: 65, bids: 15, participants: 9 },
  { productIdx: 7, startBid: 1320000, buyNow: 1490000, minutesLeft: 122, bids: 9, participants: 5 },
  { productIdx: 20, startBid: 76500, buyNow: 92000, minutesLeft: 96, bids: 11, participants: 8 },
  { productIdx: 23, startBid: 61000, buyNow: 74000, minutesLeft: 54, bids: 14, participants: 10 },
  { productIdx: 42, startBid: 51800, buyNow: 60000, minutesLeft: 19, bids: 24, participants: 13 },
  { productIdx: 17, startBid: 41000, buyNow: 48000, minutesLeft: 76, bids: 10, participants: 6 },
  { productIdx: 43, startBid: 43200, buyNow: 52000, minutesLeft: 41, bids: 17, participants: 12 },
  { productIdx: 21, startBid: 55800, buyNow: 68000, minutesLeft: 110, bids: 8, participants: 4 },
  { productIdx: 4, startBid: 27600, buyNow: 33000, minutesLeft: 5.2, bids: 21, participants: 15 },
  { productIdx: 47, startBid: 28400, buyNow: 34500, minutesLeft: 88, bids: 13, participants: 9 },
  { productIdx: 33, startBid: 48900, buyNow: 57500, minutesLeft: 63, bids: 16, participants: 11 },
  { productIdx: 57, startBid: 80200, buyNow: 95000, minutesLeft: 134, bids: 7, participants: 5 },
  { productIdx: 34, startBid: 30500, buyNow: 37000, minutesLeft: 26, bids: 20, participants: 14 },
  { productIdx: 59, startBid: 70500, buyNow: 83000, minutesLeft: 101, bids: 12, participants: 8 },
  { productIdx: 28, startBid: 18500, buyNow: 23000, minutesLeft: 37, bids: 18, participants: 13 },
];

export const AUCTIONS: Auction[] = AUCTION_SEEDS.map((a, i) => {
  const p = PRODUCTS[a.productIdx];
  p.isAuction = true;
  const step = Math.round(((a.startBid * 0.06) / a.bids) / 500) * 500 || 500;
  const lastBids = Array.from({ length: Math.min(a.bids, 5) }, (_, j) => ({
    bidder: `${pick(FIRST_BIDDERS, i + j)} ${["A", "Б", "В", "Г"][j % 4]}.`,
    amount: a.startBid + (j + 1) * step,
    at: new Date(Date.now() - (j + 1) * 4.2e5).toISOString(),
  })).reverse();
  return {
    id: `a${i + 1}`,
    productId: p.id,
    currentBid: lastBids[0]?.amount ?? a.startBid,
    startingPrice: a.startBid,
    bidsCount: a.bids,
    participants: a.participants,
    endsAt: new Date(Date.now() + a.minutesLeft * 60000).toISOString(),
    buyNowPrice: a.buyNow,
    status: a.minutesLeft < 10 ? "ending_soon" : "live",
    lastBids,
  };
});

export function getSeller(id: string): Seller {
  return SELLERS.find((s) => s.id === id)!;
}
export function getStore(id?: string): Store | undefined {
  return STORES.find((s) => s.id === id);
}
export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
export function getAuctionForProduct(productId: string): Auction | undefined {
  return AUCTIONS.find((a) => a.productId === productId);
}

/** Live auctions sorted by time remaining (hottest first). */
export function getLiveAuctions(): Auction[] {
  return [...AUCTIONS].sort((a, b) => Date.parse(a.endsAt) - Date.parse(b.endsAt));
}

/** Smart feed: mixed new items + auctions, demo-personalized by category rotation. */
export function getFeed(limit = 12): Product[] {
  const fresh = [...PRODUCTS].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  const auctionIds = new Set(AUCTIONS.map((a) => a.productId));
  const withAuction = fresh.filter((p) => auctionIds.has(p.id));
  const rest = fresh.filter((p) => !auctionIds.has(p.id));
  const mixed: Product[] = [];
  for (let i = 0; i < limit; i++) mixed.push(i % 3 === 1 && withAuction.length ? withAuction.shift()! : rest.shift()!);
  return mixed.filter(Boolean);
}

export function formatKGS(n: number): string {
  return n.toLocaleString("ru-RU").replace(/,/g, " ");
}
