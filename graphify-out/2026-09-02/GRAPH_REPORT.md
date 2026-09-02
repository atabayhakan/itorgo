# Graph Report - itorgo  (2026-09-02)

## Corpus Check
- Corpus is ~28,696 words - fits in a single context window. You may not need a graph.

## Summary
- 519 nodes · 922 edges · 35 communities (34 shown, 1 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 22 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Auctions and Messaging Pages
- Admin Console and CMS
- Dependencies and Manifest
- Cart and App Shell
- API Routes Analytics and Products
- Auth Pages and Threads
- External Type References
- Categories and Icons
- Search Page and Controls
- Wallet and Payments
- Profile and Trust Bar
- CMS and i18n Library
- PWA Manifest
- Checkout and Coupons
- Audit, DB and Feature Flags
- Prisma Seed
- Fraud Detection Engine
- Auth Library
- Reviews Components
- Middleware and Rate Limit
- Next Config

## God Nodes (most connected - your core abstractions)
1. `formatKGS()` - 31 edges
2. `CategoryIcon()` - 20 edges
3. `compilerOptions` - 16 edges
4. `getLiveAuctions()` - 14 edges
5. `Product` - 14 edges
6. `ProductCard()` - 12 edges
7. `PRODUCTS` - 12 edges
8. `getSeller()` - 12 edges
9. `AdminShell()` - 11 edges
10. `Column` - 10 edges

## Surprising Connections (you probably didn't know these)
- `CheckoutPage()` --calls--> `formatKGS()`  [EXTRACTED]
  src/app/checkout/page.tsx → src/lib/data/mock-data.ts
- `ProfilePage()` --indirect_call--> `IconShield()`  [INFERRED]
  src/app/profile/page.tsx → src/components/icons/Icons.tsx
- `SearchResult` --references--> `Product`  [EXTRACTED]
  src/lib/search/provider.ts → src/lib/types.ts
- `AdminOrdersPage()` --calls--> `formatKGS()`  [EXTRACTED]
  src/app/admin/orders/page.tsx → src/lib/data/mock-data.ts
- `POST()` --calls--> `track()`  [EXTRACTED]
  src/app/api/analytics/route.ts → src/lib/analytics/events.ts

## Import Cycles
- None detected.

## Communities (35 total, 1 thin omitted)

### Community 0 - "Auctions and Messaging Pages"
Cohesion: 0.05
Nodes (67): AuctionsPage(), dynamic, THREADS, OrderDetailPage(), ORDERS, MOCK_ORDERS, OrdersPage(), tone (+59 more)

### Community 1 - "Admin Console and CMS"
Cohesion: 0.06
Nodes (36): AuditRow, rows, CmsRow, INITIAL, AdminCouponsPage(), Row, FRAUD_FILTERS, FraudRow (+28 more)

### Community 2 - "Dependencies and Manifest"
Cohesion: 0.05
Nodes (42): next, dependencies, next, @prisma/client, react, react-dom, devDependencies, prisma (+34 more)

### Community 3 - "Cart and App Shell"
Cohesion: 0.08
Nodes (25): CartPage(), inter, metadata, viewport, AddToCartButton(), CartBadge(), IconPlus(), StorefrontShell() (+17 more)

### Community 4 - "API Routes Analytics and Products"
Cohesion: 0.08
Nodes (20): POST(), GET(), GET(), FavoritesPage(), GROUPS, IconShare(), ProductTopBar(), PushSubscribe() (+12 more)

### Community 5 - "Auth Pages and Threads"
Cohesion: 0.08
Nodes (19): SellPage(), STEPS, QUICK, QuickActions(), SectionHeader(), IconBack(), IconBell(), IconChevron() (+11 more)

### Community 6 - "External Type References"
Cohesion: 0.07
Nodes (26): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+18 more)

### Community 7 - "Categories and Icons"
Cohesion: 0.14
Nodes (21): CategoryGrid(), COUNTS, CatBook(), CatCar(), CatDumbbell(), CategoryIcon(), CatGamepad(), CatGem() (+13 more)

### Community 8 - "Search Page and Controls"
Cohesion: 0.13
Nodes (14): GET(), dynamic, SearchPage(), CITIES, POPULAR, RECENT, SearchControls(), setParam() (+6 more)

### Community 9 - "Wallet and Payments"
Cohesion: 0.18
Nodes (7): TODO: POST /wallet/topup, POST /receipts/upload (OCR:…, WalletPage(), MOCK_WALLET, Payment, PaymentMethod, PaymentProvider, PaymentStatus

### Community 10 - "Profile and Trust Bar"
Cohesion: 0.25
Nodes (7): ProfilePage(), TrustBarPro(), CountrySwitcher(), select(), LOCALES, LocaleSwitcher(), IconShield()

### Community 11 - "CMS and i18n Library"
Cohesion: 0.22
Nodes (9): CmsEntry, flattenRu(), getCmsEntries(), TODO: replace with prisma.translation.findMany / upsert, defaultLocale, dictionaries, Dictionary, ru (+1 more)

### Community 12 - "PWA Manifest"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, lang, name, short_name, start_url (+1 more)

### Community 13 - "Checkout and Coupons"
Cohesion: 0.27
Nodes (7): CheckoutPage(), TODO: POST /api/orders, POST /api/payments, wallet debit, delivery selection, CouponInput(), apply(), Coupon, COUPONS, validateCoupon()

### Community 14 - "Audit, DB and Feature Flags"
Cohesion: 0.20
Nodes (3): FALLBACK, FLAG_KEYS, FlagKey

### Community 15 - "Prisma Seed"
Cohesion: 0.25
Nodes (8): AUCTION_SEEDS, CITIES, main(), pick(), prisma, SEEDS, SELLER_NAMES, STORE_NAMES

### Community 16 - "Fraud Detection Engine"
Cohesion: 0.22
Nodes (4): FraudSignal, TODO: compare phone/email/device fingerprint, image hash, TODO: seller-bidder graph, velocity, retraction rate, TODO: prisma.fraudCase.create({ data: { kind: active[0].kind, subjectId, score:…

### Community 17 - "Auth Library"
Cohesion: 0.33
Nodes (3): TODO: replace with NextAuth / Lucia + argon2, JWT httpOnly cookies, CSRF., ROLES, SessionPayload

### Community 18 - "Reviews Components"
Cohesion: 0.40
Nodes (3): MOCK_REVIEWS, Review, ReviewList()

### Community 19 - "Middleware and Rate Limit"
Cohesion: 0.50
Nodes (4): config, hits, middleware(), rateLimit()

## Knowledge Gaps
- **154 isolated node(s):** `nextConfig`, `name`, `version`, `private`, `dev` (+149 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `formatKGS()` connect `Auctions and Messaging Pages` to `Admin Console and CMS`, `Cart and App Shell`, `API Routes Analytics and Products`, `Wallet and Payments`, `Checkout and Coupons`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Why does `CategoryIcon()` connect `Categories and Icons` to `Auctions and Messaging Pages`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Are the 16 inferred relationships involving `CategoryIcon()` (e.g. with `CatBook()` and `CatCar()`) actually correct?**
  _`CategoryIcon()` has 16 INFERRED edges - model-reasoned connections that need verification._
- **What connects `nextConfig`, `name`, `version` to the rest of the system?**
  _154 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Auctions and Messaging Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.05148514851485148 - nodes in this community are weakly interconnected._
- **Should `Admin Console and CMS` be split into smaller, more focused modules?**
  _Cohesion score 0.06346153846153846 - nodes in this community are weakly interconnected._
- **Should `Dependencies and Manifest` be split into smaller, more focused modules?**
  _Cohesion score 0.046511627906976744 - nodes in this community are weakly interconnected._