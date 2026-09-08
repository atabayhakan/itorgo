# Graph Report - itorgo  (2026-09-08)

## Corpus Check
- 155 files · ~36,876 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 679 nodes · 1461 edges · 42 communities (37 shown, 5 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 34 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `139272ba`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Icons.tsx
- admin/orders/page.tsx
- devDependencies
- getProducts
- mock-data.ts
- ProductImage.tsx
- External Type References
- CategoryIcon.tsx
- ProductCard.tsx
- wallet/page.tsx
- StorefrontShell.tsx
- dictionaries.ts
- PWA Manifest
- getT
- Audit, DB and Feature Flags
- Prisma Seed
- Fraud Detection Engine
- auth.ts
- Reviews Components
- ThreadChat.tsx
- Next Config
- States.tsx
- cms.ts
- CLAUDE.md
- useT
- ITOrgo — Final Quality Test (spec #71)
- ITOrgo — Кыргызстандын жаңы муундагы соода платформасы
- Security — Dependabot Audit (2026-08-25)
- admin/login/page.tsx
- LocaleCountrySwitcher.tsx
- LocaleProvider.tsx
- admin-hash.mjs
- checkout/page.tsx

## God Nodes (most connected - your core abstractions)
1. `useT()` - 76 edges
2. `getT()` - 48 edges
3. `formatKGS()` - 31 edges
4. `NamespaceMessages` - 26 edges
5. `CategoryIcon()` - 20 edges
6. `compilerOptions` - 16 edges
7. `Product` - 15 edges
8. `ProductCard()` - 13 edges
9. `getSeller()` - 13 edges
10. `ITOrgo — Final Quality Test (spec #71)` - 12 edges

## Surprising Connections (you probably didn't know these)
- `LoginPage()` --calls--> `useT()`  [EXTRACTED]
  src/app/login/page.tsx → src/lib/i18n/LocaleProvider.tsx
- `NotificationsPage()` --calls--> `getT()`  [EXTRACTED]
  src/app/notifications/page.tsx → src/lib/i18n/server.ts
- `SellerPage()` --calls--> `getT()`  [EXTRACTED]
  src/app/seller/[id]/page.tsx → src/lib/i18n/server.ts
- `ErrorState()` --calls--> `useT()`  [EXTRACTED]
  src/components/ui/States.tsx → src/lib/i18n/LocaleProvider.tsx
- `TrustBadge()` --calls--> `useT()`  [EXTRACTED]
  src/components/ui/States.tsx → src/lib/i18n/LocaleProvider.tsx

## Import Cycles
- None detected.

## Communities (42 total, 5 thin omitted)

### Community 0 - "Icons.tsx"
Cohesion: 0.14
Nodes (19): ProfilePage(), IconArrowRight(), IconBell(), IconCheck(), IconCreditCard(), IconFileText(), IconHeart(), IconHistory() (+11 more)

### Community 1 - "admin/orders/page.tsx"
Cohesion: 0.06
Nodes (38): AuditRow, rows, CmsRow, INITIAL, AdminCouponsPage(), Row, FRAUD_FILTERS, FraudRow (+30 more)

### Community 2 - "devDependencies"
Cohesion: 0.05
Nodes (43): next, dependencies, next, @prisma/client, react, react-dom, devDependencies, prisma (+35 more)

### Community 3 - "getProducts"
Cohesion: 0.17
Nodes (13): POST(), GET(), GET(), generateStaticParams(), AnalyticsEvent, AnalyticsPayload, queue, TODO: navigator.sendBeacon('/api/analytics', JSON.stringify(payload)) (+5 more)

### Community 4 - "mock-data.ts"
Cohesion: 0.06
Nodes (60): AuctionsPage(), dynamic, HomePage(), generateMetadata(), ProductPage(), AuctionCard(), AuctionDetailSection(), BidActivity() (+52 more)

### Community 5 - "ProductImage.tsx"
Cohesion: 0.22
Nodes (10): CartPage(), AddToCartButton(), ProductGallery(), ProductImage(), CartCtx, CartItem, CartProvider(), Ctx (+2 more)

### Community 6 - "External Type References"
Cohesion: 0.07
Nodes (26): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+18 more)

### Community 7 - "CategoryIcon.tsx"
Cohesion: 0.18
Nodes (18): CatBook(), CatCar(), CatDumbbell(), CategoryIcon(), CatGamepad(), CatGem(), CatHelmet(), CatHome() (+10 more)

### Community 8 - "ProductCard.tsx"
Cohesion: 0.07
Nodes (33): GET(), FavoritesPage(), dynamic, SearchPage(), SellerPage(), StorePage(), StoreStrip(), IconStar() (+25 more)

### Community 9 - "wallet/page.tsx"
Cohesion: 0.15
Nodes (9): TODO: POST /wallet/topup, POST /receipts/upload (OCR:…, WalletPage(), MOCK_WALLET, Payment, PaymentMethod, PaymentProvider, PaymentStatus, WalletTransaction (+1 more)

### Community 10 - "StorefrontShell.tsx"
Cohesion: 0.40
Nodes (4): QUICK_FILTER_KEYS, StorefrontShell(), BottomNav(), FloatingSell()

### Community 11 - "dictionaries.ts"
Cohesion: 0.08
Nodes (35): defaultLocale, Locale, LOCALE_LABELS, LOCALES, Messages, NamespaceMessages, Dictionary, MODULES (+27 more)

### Community 12 - "PWA Manifest"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, lang, name, short_name, start_url (+1 more)

### Community 13 - "getT"
Cohesion: 0.06
Nodes (43): CategoriesPage(), GlobalError(), t, KycPage(), generateMetadata(), inter, OG_LOCALE, RootLayout() (+35 more)

### Community 14 - "Audit, DB and Feature Flags"
Cohesion: 0.20
Nodes (3): FALLBACK, FLAG_KEYS, FlagKey

### Community 15 - "Prisma Seed"
Cohesion: 0.25
Nodes (8): AUCTION_SEEDS, CITIES, main(), pick(), prisma, SEEDS, SELLER_NAMES, STORE_NAMES

### Community 16 - "Fraud Detection Engine"
Cohesion: 0.22
Nodes (4): FraudSignal, TODO: compare phone/email/device fingerprint, image hash, TODO: seller-bidder graph, velocity, retraction rate, TODO: prisma.fraudCase.create({ data: { kind: active[0].kind, subjectId, score:…

### Community 17 - "auth.ts"
Cohesion: 0.12
Nodes (25): attempts, POST(), runtime, tooMany(), runtime, ADMIN_COOKIE, b64url(), enc (+17 more)

### Community 18 - "Reviews Components"
Cohesion: 0.40
Nodes (3): MOCK_REVIEWS, Review, ReviewList()

### Community 23 - "States.tsx"
Cohesion: 0.22
Nodes (7): GROUPS, NotificationsPage(), PushSubscribe(), TODO: POST /api/push/subscribe with PushSubscription, EmptyState(), ErrorState(), TrustBadge()

### Community 24 - "cms.ts"
Cohesion: 0.50
Nodes (4): CmsEntry, flattenRu(), getCmsEntries(), TODO: replace with prisma.translation.findMany / upsert

### Community 36 - "useT"
Cohesion: 0.18
Nodes (10): Error(), CartBadge(), EVENTS, LiveTicker(), Header(), ProductTopBar(), PWAInstaller(), TODO: generate real SW with workbox / next-pwa, add offline fallback. (+2 more)

### Community 38 - "ITOrgo — Final Quality Test (spec #71)"
Cohesion: 0.15
Nodes (12): Accessibility, Bilinen TODO (mock → gerçek), Conversion, Future (KZ/UZ), Infra, ITOrgo — Final Quality Test (spec #71), Localization, Mobile (390px) (+4 more)

### Community 39 - "ITOrgo — Кыргызстандын жаңы муундагы соода платформасы"
Cohesion: 0.29
Nodes (6): Deployment, Hızlı Başlangıç, ITOrgo — Кыргызстандын жаңы муундагы соода платформасы, Mimari, Roadmap (spec #68), Sayfalar

### Community 40 - "Security — Dependabot Audit (2026-08-25)"
Cohesion: 0.40
Nodes (4): Actions, Current, Fix, Security — Dependabot Audit (2026-08-25)

### Community 42 - "LocaleCountrySwitcher.tsx"
Cohesion: 0.26
Nodes (7): CountrySwitcher(), select(), LocaleSwitcher(), DesktopNav(), TOP_LINKS, ThemeToggle(), useLocale()

### Community 43 - "LocaleProvider.tsx"
Cohesion: 0.22
Nodes (6): LoginPage(), SellPage(), STEPS, IconBack(), Ctx, LocaleContext

### Community 47 - "checkout/page.tsx"
Cohesion: 0.38
Nodes (5): CheckoutPage(), TODO: POST /api/orders, POST /api/payments, wallet debit, delivery selection, CouponInput(), apply(), validateCoupon()

## Knowledge Gaps
- **188 isolated node(s):** `nextConfig`, `name`, `version`, `private`, `dev` (+183 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useT()` connect `useT` to `Icons.tsx`, `mock-data.ts`, `ProductImage.tsx`, `ProductCard.tsx`, `wallet/page.tsx`, `LocaleCountrySwitcher.tsx`, `LocaleProvider.tsx`, `StorefrontShell.tsx`, `getT`, `checkout/page.tsx`, `Reviews Components`, `ThreadChat.tsx`, `States.tsx`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Why does `formatKGS()` connect `mock-data.ts` to `admin/orders/page.tsx`, `getProducts`, `ProductImage.tsx`, `ProductCard.tsx`, `wallet/page.tsx`, `getT`, `checkout/page.tsx`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Why does `getT()` connect `getT` to `Icons.tsx`, `ProductCard.tsx`, `mock-data.ts`, `States.tsx`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Are the 16 inferred relationships involving `CategoryIcon()` (e.g. with `CatBook()` and `CatCar()`) actually correct?**
  _`CategoryIcon()` has 16 INFERRED edges - model-reasoned connections that need verification._
- **What connects `nextConfig`, `name`, `version` to the rest of the system?**
  _188 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Icons.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14333333333333334 - nodes in this community are weakly interconnected._
- **Should `admin/orders/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0601404741000878 - nodes in this community are weakly interconnected._