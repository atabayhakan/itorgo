# ITOrgo — Кыргызстандын жаңы муундагы соода платформасы

**Marketplace · Live Auctions · Магазины · AI · Trust** — www.itorgo.kg

Mobile-first WOW marketplace + live auction + mağaza + güvenli ticaret platformu. Varsayılan dil: **Русский**, ilk ülke: **Кыргызстан** (KG → KZ → UZ genişlemeye hazır).

## Hızlı Başlangıç

```bash
npm install
cp .env.example .env        # DATABASE_URL vs.
# DB (opsiyonel, mock-data ile de çalışır)
npx prisma migrate dev --name init
npx prisma db seed
npm run dev                 # http://localhost:3000
npm run build               # prod build
npm test                    # vitest
```

Docker:

```bash
docker compose up --build
# web: http://localhost:3000, db: postgres://itorgo:itorgo@localhost:5432/itorgo
```

## Mimari

- **Next.js 15 App Router + TypeScript + Tailwind v4** — SEO/SSR/PWA, Inter (cyrillic-ext)
- **Prisma + PostgreSQL** (Neon-ready) — tek schema, country-scoped (`prisma/schema.prisma`)
- **Design System** — `@theme` token'ları (`src/app/globals.css`), card/btn/chip/skeleton, light default + dark ready
- **Mock-data** — 60 ürün / 30 satıcı / 10 mağaza / 20 canlı auction (KGS, Бишкек/Ош/…), `src/lib/data/mock-data.ts`
- **Country Engine** — `KG active, KZ/UZ flag` (`src/lib/types.ts`, `src/lib/feature-flags.ts`), middleware `x-country/x-locale` header'ları
- **API** — `GET /api/products`, `GET /api/auctions`, `POST /api/analytics`

## Sayfalar

`/`, `/auctions`, `/search`, `/product/[id]` (+JSON-LD), `/seller/[id]`, `/store/[id]`, `/sell` (wizard), `/profile`, `/wallet` (OCR stub), `/notifications`, `/kyc`, `/login`, `/register`, `/admin/*` (users/orders/media/fraud/audit), `/sitemap.xml`, `/robots.txt`

## Deployment

`Dockerfile` (standalone output) + `docker-compose.yml` (web+postgres) + `.github/workflows/ci.yml` (build+test).

## Roadmap (spec #68)

PHASE 1–18 iskeleti tamam — gerçek ödeme/OCR/SMS/AI provider'ları, `prisma migrate` sonrası `mock-data` → `prisma` geçişi ve E2E testler sıradaki adımlar.
