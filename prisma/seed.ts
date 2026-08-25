// @ts-nocheck
// Full realistic seed — 60 ürün / 30 satıcı / 10 mağaza / 20 canlı auction
// Kaynak: src/lib/data/mock-data.ts ile aynı SEEDS
// Usage: npx prisma db seed

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const CITIES = ["Бишкек", "Ош", "Джалал-Абад", "Каракол", "Токмок"];
const SELLER_NAMES = ["Азамат Т.", "Айгүл С.", "Bek Store", "Нурлан А.", "Динара К.", "TechMarket KG", "Эржан Б.", "Гульмира Ж.", "Ulut Shop", "Тимур М.", "Асель Н.", "OshTrade", "Марат О.", "Жанара П.", "Кубат Р.", "Иссуф Ш.", "Aida Market", "Виктор Л.", "Нургуль Ф.", "Санжар Х."];
const STORE_NAMES = ["ApplePoint Bishkek", "AutoPrime KG", "HomeStyle Osh", "TechnoDom", "GoldTime", "FarmLine", "BeautyBar", "SportLife", "BookNook", "KyrgyzCraft"];
const SEEDS = [
  ["iPhone 17 Pro Max 256GB", 49500, "electronics", "new"], ["MacBook Air M4 13\"", 68900, "electronics", "new"], ["Samsung Galaxy S25 Ultra", 58900, "electronics", "new"], ["PlayStation 5 Slim + 2 геймпада", 42000, "games", "new"], ["Apple Watch Series 11 GPS", 31500, "electronics", "used"], ["Xiaomi 15 Pro 512GB", 38900, "electronics", "used"], ["AirPods Max Space Gray", 27900, "electronics", "new"], ["Toyota Camry 2019, 2.5L", 1450000, "auto", "used"], ["Hyundai Elantra 2021", 1180000, "auto", "used"], ["Mercedes-Benz C180 W205", 1750000, "auto", "used"], ["Квартира 2-комн., центр Бишкека", 5200000, "realty", "used"], ["Дом в Караколе, 120 м²", 3800000, "realty", "used"], ["Пуховик The North Face оригинал", 8900, "clothes", "new"], ["Кроссовки Nike Air Force 1", 7200, "clothes", "new"], ["Золотое кольцо 585 проба", 24500, "jewelry", "new"], ["Часы Casio G-Shock GA-2100", 11500, "watches", "new"], ["Диван угловой, новый", 28900, "home", "new"], ["Кухонный гарнитур 3.2 м", 45500, "home", "new"], ["Телевизор Samsung 55\" QLED 4K", 46900, "electronics", "new"], ["Ноутбук Lenovo Legion 5 RTX4060", 62000, "electronics", "used"], ["Корова молочная альпийская", 85000, "animals", "used"], ["Овцы эдильбаевской породы (5 шт)", 62000, "animals", "used"], ["Трактор МТЗ-82, 1995 г.", 480000, "farm", "used"], ["Мотоблок с плугом и прицепом", 68000, "farm", "used"], ["Гантели разборные 24 кг", 4500, "sport", "used"], ["Велосипед горный Merida Big Nine", 26500, "sport", "used"], ["Коллекционная монета СССР 1965", 3500, "collectibles", "used"], ["Электросамокат Ninebot MAX G2", 32900, "sport", "new"], ["Ремонт квартир под ключ", 0, "services", "new"], ["Маникюр + гель-лак на дому", 800, "beauty", "new"], ["Кирпич облицовочный (поддон)", 5600, "construction", "new"], ["Цемент М400, мешок 50 кг", 480, "construction", "new"], ["iPad Air M2 128GB Wi-Fi", 39800, "electronics", "new"], ["Canon EOS R50 kit 18–45", 54000, "electronics", "new"], ["Nintendo Switch OLED White", 34200, "games", "used"], ["Шуба норковая натуральная", 89000, "clothes", "used"], ["Стол обеденный дуб + 6 стульев", 36800, "home", "new"], ["Холодильник LG InstaView", 58900, "electronics", "new"], ["Кондиционер Gree 12000 BTU", 32400, "home", "new"], ["Лодка надувная Intex Excursion 5", 18900, "sport", "new"], ["Козлы заангенские (3 шт)", 36000, "animals", "used"], ["Сеялка точного высева", 210000, "farm", "used"], ["iPhone 16 Pro 128GB Natural Titanium", 56400, "electronics", "new"], ["Dyson V15 Detect Absolute", 48700, "home", "new"], ["Стиральная машина Bosch Serie 6", 41500, "electronics", "new"], ["Куртка кожаная мужская", 12400, "clothes", "used"], ["Наушники Sony WH-1000XM6", 44200, "electronics", "new"], ["Кровать двуспальная + матрас", 31700, "home", "new"], ["Серебряная цепь 925, 60 см", 6800, "jewelry", "new"], ["Аквариум 200 л с тумбой", 21500, "home", "new"], ["Газовая плита Gorenje 4 конфорки", 19800, "home", "new"], ["Электроинструмент набор 108 предметов", 15600, "construction", "new"], ["Коляска Cybex Balios S Lux", 28900, "clothes", "new"], ["Гитара Yamaha F310", 9700, "collectibles", "used"], ["Прогулочный катамаран Hobie", 195000, "sport", "used"], ["Пчелиные семьи (10 ульев)", 74000, "farm", "used"], ["Компьютер игровой Ryzen 7 / RTX 4070", 89500, "electronics", "new"], ["Куртка зимняя Columbia -35°", 13800, "clothes", "new"], ["Смартфон Honor Magic 7 Lite", 24900, "electronics", "new"], ["Массажное кресло Yamaguchi", 78600, "home", "new"],
];
const AUCTION_SEEDS = [
  { productIdx: 0, startBid: 41500, buyNow: 49000, minutesLeft: 2.7, bids: 27 }, { productIdx: 1, startBid: 58200, buyNow: 66900, minutesLeft: 14, bids: 19 }, { productIdx: 2, startBid: 54100, buyNow: 61500, minutesLeft: 47, bids: 33 }, { productIdx: 3, startBid: 36500, buyNow: 43000, minutesLeft: 8.5, bids: 22 }, { productIdx: 15, startBid: 9800, buyNow: 12500, minutesLeft: 31, bids: 12 }, { productIdx: 14, startBid: 21300, buyNow: 26000, minutesLeft: 65, bids: 15 }, { productIdx: 7, startBid: 1320000, buyNow: 1490000, minutesLeft: 122, bids: 9 }, { productIdx: 20, startBid: 76500, buyNow: 92000, minutesLeft: 96, bids: 11 }, { productIdx: 23, startBid: 61000, buyNow: 74000, minutesLeft: 54, bids: 14 }, { productIdx: 42, startBid: 51800, buyNow: 60000, minutesLeft: 19, bids: 24 }, { productIdx: 17, startBid: 41000, buyNow: 48000, minutesLeft: 76, bids: 10 }, { productIdx: 43, startBid: 43200, buyNow: 52000, minutesLeft: 41, bids: 17 }, { productIdx: 21, startBid: 55800, buyNow: 68000, minutesLeft: 110, bids: 8 }, { productIdx: 4, startBid: 27600, buyNow: 33000, minutesLeft: 5.2, bids: 21 }, { productIdx: 47, startBid: 28400, buyNow: 34500, minutesLeft: 88, bids: 13 }, { productIdx: 33, startBid: 48900, buyNow: 57500, minutesLeft: 63, bids: 16 }, { productIdx: 57, startBid: 80200, buyNow: 95000, minutesLeft: 134, bids: 7 }, { productIdx: 34, startBid: 30500, buyNow: 37000, minutesLeft: 26, bids: 20 }, { productIdx: 59, startBid: 70500, buyNow: 83000, minutesLeft: 101, bids: 12 }, { productIdx: 28, startBid: 18500, buyNow: 23000, minutesLeft: 37, bids: 18 },
];

function pick(arr, i) { return arr[i % arr.length]; }

async function main() {
  console.log("Seeding countries, languages, flags, roles, categories...");
  await prisma.country.upsert({ where: { code: "KG" }, update: { active: true }, create: { code: "KG", name: "Кыргызстан", currency: "сом", phonePrefix: "+996", active: true } });
  await prisma.country.upsert({ where: { code: "KZ" }, update: {}, create: { code: "KZ", name: "Қазақстан", currency: "₸", phonePrefix: "+7", active: false } });
  await prisma.country.upsert({ where: { code: "UZ" }, update: {}, create: { code: "UZ", name: "Ўзбекистон", currency: "so'm", phonePrefix: "+998", active: false } });
  for (const [code, name] of [["ru","Русский"],["ky","Кыргызча"],["en","English"],["kk","Қазақша"],["uz","Oʻzbekcha"],["tr","Türkçe"]]) await prisma.language.upsert({ where: { code }, update: {}, create: { code, name } });
  for (const key of ["auction","buy_now","wallet","ai","reviews","stores","kyc","sms","dark_mode","kz","uz"]) await prisma.featureFlag.upsert({ where: { key }, update: {}, create: { key, enabled: ["auction","buy_now","ai","reviews","stores","kyc","sms"].includes(key) } });
  for (const [key, name] of [["super_admin","Super Admin"],["auction_manager","Auction Manager"],["kyc_manager","KYC Manager"],["fraud_manager","Fraud Manager"],["support_manager","Support Manager"]]) await prisma.role.upsert({ where: { key }, update: {}, create: { key, name } });
  const catKeys = ["electronics","auto","realty","clothes","beauty","home","animals","farm","services","construction","watches","jewelry","games","books","sport","collectibles"];
  for (const k of catKeys) await prisma.category.upsert({ where: { key: k }, update: {}, create: { key: k, emoji: "📦" } });

  console.log("Seeding users, stores, products...");
  const cats = await prisma.category.findMany();
  const catMap = Object.fromEntries(cats.map((c) => [c.key, c.id]));

  // Upsert sellers as Users
  for (let i = 0; i < SELLER_NAMES.length; i++) {
    const phone = `+996555${String(100000 + i).padStart(6,"0")}`;
    await prisma.user.upsert({
      where: { phone },
      update: {},
      create: { phone, phoneVerified: true, countryCode: "KG", trustScore: 80 + (i % 20) },
    });
    // profile
    const u = await prisma.user.findUnique({ where: { phone } });
    if (u) await prisma.userProfile.upsert({ where: { userId: u.id }, update: { displayName: SELLER_NAMES[i], city: pick(CITIES,i) }, create: { userId: u.id, displayName: SELLER_NAMES[i], city: pick(CITIES,i) } });
  }
  const users = await prisma.user.findMany({ take: 30, orderBy: { createdAt: "asc" } });

  // Stores
  for (let i = 0; i < STORE_NAMES.length; i++) {
    const owner = users[i % users.length];
    const slug = STORE_NAMES[i].toLowerCase().replace(/\s+/g,"-") + "-kg";
    await prisma.store.upsert({ where: { slug }, update: {}, create: { ownerId: owner.id, name: STORE_NAMES[i], slug, verified: true, followers: 500 + i * 300 } });
  }
  const stores = await prisma.store.findMany();

  // Products
  for (let i = 0; i < SEEDS.length; i++) {
    const [title, price, catKey, condition] = SEEDS[i];
    const seller = users[i % users.length];
    const catId = catMap[catKey];
    if (!catId) continue;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g,"-").slice(0,40) + `-${i}`;
    // Use findFirst + create to avoid unique slug collision on rerun
    const existing = await prisma.product.findFirst({ where: { title, sellerId: seller.id } });
    if (existing) continue;
    const p = await prisma.product.create({
      data: { title, description: `${title} — ${condition === "new" ? "Новый" : "Б/у"} · ${pick(CITIES,i)}`, price: price || 1000, oldPrice: i % 4 === 0 ? Math.round(price * 1.18) : null, currency: "KGS", condition, status: "active", categoryId: catId, sellerId: seller.id, storeId: i % 5 === 0 ? stores[i % stores.length]?.id : null, city: pick(CITIES,i), countryCode: "KG" },
    });
    // Auction for seeded indices
    const aSeed = AUCTION_SEEDS.find((a) => a.productIdx === i);
    if (aSeed) {
      await prisma.auction.create({ data: { productId: p.id, startingPrice: aSeed.startBid, currentBid: aSeed.startBid + 500, buyNowPrice: aSeed.buyNow, status: aSeed.minutesLeft < 10 ? "ending_soon" : "live", endsAt: new Date(Date.now() + aSeed.minutesLeft * 60000) } });
    }
  }

  console.log(`Seeded ${await prisma.user.count()} users, ${await prisma.store.count()} stores, ${await prisma.product.count()} products, ${await prisma.auction.count()} auctions`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
