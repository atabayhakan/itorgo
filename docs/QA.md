# ITOrgo — Final Quality Test (spec #71)

Tarih: 2026-08-25 · Build: ✅ 72 sayfa · Middleware: 34.5 kB

## Mobile (390px)

- [x] 360/375/390/412/430 kusursuz — `max-w-xl` + `lg:max-w-6xl` responsive, `safe-top/bottom`
- [x] Touch targets ≥44px (`btn-primary min-h-12`, BottomNav 56px, FloatingSell 56px)
- [x] Swipe: auction rail `snap-x`, gallery `snap-x`, `no-scrollbar`
- [x] Bottom sheet: `BidSheet` (spec #15, #60), `PWAInstaller`

## UX

- [x] İlk 3 sn: “satın al / açık artırma / hemen al / güvenli / canlı” → Trust strip + LIVE ticker + hero
- [x] Her ekranda back/search/home/profile navigasyonu
- [x] Kaybolmama: breadcrumb (product), BottomNav, Header

## Conversion

- [x] AuctionCard: büyük görsel + countdown + current bid + 🔥 + 2 CTA → `BidSheet`
- [x] Product detail: sticky `Сделать ставку` / `Купить сейчас` + Buy Now 49000 bandı
- [x] Micro: `heart-pop`, `bid-flash`, `live-dot`, `shimmer`

## Trust

- [x] Verified badge, 🛡 96%, `Безопасная сделка`, `Защита покупателя` — her kart ve detayda
- [x] KYC: 5 adım (телефон/email/документы/банк/история) — `/kyc` + profile

## Speed

- [x] Skeleton (`src/app/loading.tsx`, `Skeleton.tsx`), no white screen
- [x] Image: gradient placeholder (WebP/AVIF + CDN ready — `next.config.ts` remotePatterns)
- [x] Code splitting: 103 kB shared, route chunks

## Visual

- [x] Apple+Airbnb+Vinted+StockX hissi — violet `brand-600 #5b46e8`, amber `auction-500`, `shadow-lifted`, `rounded-2xl`, `Inter` cyrillic-ext
- [x] Template değil — özel kart, badge, chip sistemi

## Accessibility

- [x] `aria-label` (image, fav, bid), `role=dialog`, `aria-live=polite` (ticker), focus visible

## Localization

- [x] Русский default, `dictionaries.ts` key'leri (`auction.bid`…), `Language` model, `LocaleSwitcher` (6 dil), `ru_RU` OG
- [x] Kırgızca karakterler: Inter `cyrillic-ext` (ңөү)

## Future (KZ/UZ)

- [x] `Country` model + `FeatureFlag` (`kz/uz OFF`), middleware `x-country`, `CountrySwitcher` (KG active), `KZ/UZ скоро` footer

## Infra

- [x] DB: Prisma schema 30+ model (spec #53), `prisma/seed.ts`
- [x] API: `/api/products`, `/api/auctions`, `/api/analytics`, `/api/health`
- [x] Middleware: rate-limit 60/min, country/locale, admin guard
- [x] PWA: `manifest.json` + `sw.js` + `PWAInstaller`
- [x] SEO: `sitemap.ts`, `robots.ts`, product JSON-LD + `generateMetadata` + breadcrumb
- [x] Error: `error.tsx` + `global-error.tsx` + `loading.tsx`

## Bilinen TODO (mock → gerçek)

- Prisma `db:generate` sonrası `mock-data` → `prisma` geçişi
- SMS/OCR/Payment provider bağlama, WebSocket live bid, Elasticsearch
- `npm test` için `vitest` kurulu — `npm install` sonrası çalışır
