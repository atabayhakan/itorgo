// @ts-nocheck
// Prisma seed — mirrors src/lib/data/mock-data.ts (realistic KG data).
// Usage:  npx prisma db seed   (requires prisma.seed in package.json)
// Or:     npx tsx prisma/seed.ts

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const CITIES = ["Бишкек", "Ош", "Джалал-Абад", "Каракол", "Токмок"];

async function main() {
  console.log("Seeding countries & languages...");
  await prisma.country.upsert({ where: { code: "KG" }, update: { active: true }, create: { code: "KG", name: "Кыргызстан", currency: "сом", phonePrefix: "+996", active: true } });
  await prisma.country.upsert({ where: { code: "KZ" }, update: {}, create: { code: "KZ", name: "Қазақстан", currency: "₸", phonePrefix: "+7", active: false } });
  await prisma.country.upsert({ where: { code: "UZ" }, update: {}, create: { code: "UZ", name: "Ўзбекистон", currency: "so'm", phonePrefix: "+998", active: false } });

  for (const [code, name] of [["ru","Русский"],["ky","Кыргызча"],["en","English"],["kk","Қазақша"],["uz","Oʻzbekcha"],["tr","Türkçe"]]) {
    await prisma.language.upsert({ where: { code }, update: {}, create: { code, name } });
  }

  for (const key of ["auction","buy_now","wallet","ai","reviews","stores","kyc","sms","dark_mode","kz","uz"]) {
    await prisma.featureFlag.upsert({ where: { key }, update: {}, create: { key, enabled: ["auction","buy_now","ai","reviews","stores","kyc","sms"].includes(key) } });
  }

  for (const [key, name] of [["super_admin","Super Admin"],["auction_manager","Auction Manager"],["kyc_manager","KYC Manager"],["fraud_manager","Fraud Manager"],["support_manager","Support Manager"]] ) {
    await prisma.role.upsert({ where: { key }, update: {}, create: { key, name } });
  }

  // Categories — from CATEGORIES constant
  const cats = ["electronics","auto","realty","clothes","beauty","home","animals","farm","services","construction","watches","jewelry","games","books","sport","collectibles"];
  for (const k of cats) await prisma.category.upsert({ where: { key: k }, update: {}, create: { key: k, emoji: "📦" } });

  console.log("Seed done. Add users/products via app or extend this script with SELLERS/SEEDS.");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
