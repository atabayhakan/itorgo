# Graph Report - itorgo  (2026-09-08)

## Corpus Check
- 155 files · ~37,018 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 681 nodes · 1463 edges · 34 communities (29 shown, 5 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 34 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `139272ba`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- admin/orders/page.tsx
- devDependencies
- catalog.ts
- useT
- External Type References
- CategoryIcon.tsx
- provider.ts
- payments.ts
- dictionaries.ts
- PWA Manifest
- Icons.tsx
- Audit, DB and Feature Flags
- Prisma Seed
- Fraud Detection Engine
- auth.ts
- ThreadChat.tsx
- Next Config
- States.tsx
- CLAUDE.md
- ITOrgo — Final Quality Test (spec #71)
- ITOrgo — Кыргызстандын жаңы муундагы соода платформасы
- Security — Dependabot Audit (2026-08-25)
- admin/login/page.tsx
- layout.tsx
- admin-hash.mjs

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
- `CategoriesPage()` --calls--> `getT()`  [EXTRACTED]
  src/app/categories/page.tsx → src/lib/i18n/server.ts
- `LoginPage()` --calls--> `useT()`  [EXTRACTED]
  src/app/login/page.tsx → src/lib/i18n/LocaleProvider.tsx
- `NotificationsPage()` --calls--> `getT()`  [EXTRACTED]
  src/app/notifications/page.tsx → src/lib/i18n/server.ts
- `SellerPage()` --calls--> `getT()`  [EXTRACTED]
  src/app/seller/[id]/page.tsx → src/lib/i18n/server.ts
- `ErrorState()` --calls--> `useT()`  [EXTRACTED]
  src/components/ui/States.tsx → src/lib/i18n/LocaleProvider.tsx

## Import Cycles
- None detected.

## Communities (34 total, 5 thin omitted)

### Community 1 - "admin/orders/page.tsx"
Cohesion: 0.06
Nodes (40): AuditRow, rows, CmsRow, INITIAL, AdminCouponsPage(), Row, FRAUD_FILTERS, FraudRow (+32 more)

### Community 2 - "devDependencies"
Cohesion: 0.05
Nodes (43): next, dependencies, next, @prisma/client, react, react-dom, devDependencies, prisma (+35 more)

### Community 3 - "catalog.ts"
Cohesion: 0.07
Nodes (39): POST(), GET(), GET(), AuctionsPage(), dynamic, generateStaticParams(), AnalyticsEvent, AnalyticsPayload (+31 more)

### Community 4 - "useT"
Cohesion: 0.06
Nodes (66): CartPage(), CheckoutPage(), TODO: POST /api/orders, POST /api/payments, wallet debit, delivery selection, Error(), FavoritesPage(), generateMetadata(), ProductPage(), SellerPage() (+58 more)

### Community 6 - "External Type References"
Cohesion: 0.07
Nodes (26): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+18 more)

### Community 7 - "CategoryIcon.tsx"
Cohesion: 0.14
Nodes (22): CategoriesPage(), CategoryGrid(), COUNTS, CatBook(), CatCar(), CatDumbbell(), CategoryIcon(), CatGamepad() (+14 more)

### Community 8 - "provider.ts"
Cohesion: 0.12
Nodes (15): GET(), dynamic, SearchPage(), CITIES, POPULAR, PROMPT_KEYS, RECENT, SearchControls() (+7 more)

### Community 9 - "payments.ts"
Cohesion: 0.20
Nodes (7): MOCK_WALLET, Payment, PaymentMethod, PaymentProvider, PaymentStatus, WalletTransaction, WalletTransactionLabelKey

### Community 11 - "dictionaries.ts"
Cohesion: 0.05
Nodes (51): GlobalError(), t, CmsEntry, flattenRu(), getCmsEntries(), TODO: replace with prisma.translation.findMany / upsert, defaultLocale, Locale (+43 more)

### Community 12 - "PWA Manifest"
Cohesion: 0.20
Nodes (9): background_color, description, display, icons, lang, name, short_name, start_url (+1 more)

### Community 13 - "Icons.tsx"
Cohesion: 0.05
Nodes (49): KycPage(), LoginPage(), MessagesPage(), THREADS, NotFound(), OrderDetailPage(), ORDERS, MOCK_ORDERS (+41 more)

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

### Community 23 - "States.tsx"
Cohesion: 0.22
Nodes (7): GROUPS, NotificationsPage(), PushSubscribe(), TODO: POST /api/push/subscribe with PushSubscription, EmptyState(), ErrorState(), TrustBadge()

### Community 38 - "ITOrgo — Final Quality Test (spec #71)"
Cohesion: 0.15
Nodes (12): Accessibility, Bilinen TODO (mock → gerçek), Conversion, Future (KZ/UZ), Infra, ITOrgo — Final Quality Test (spec #71), Localization, Mobile (390px) (+4 more)

### Community 39 - "ITOrgo — Кыргызстандын жаңы муундагы соода платформасы"
Cohesion: 0.29
Nodes (6): Deployment, Hızlı Başlangıç, ITOrgo — Кыргызстандын жаңы муундагы соода платформасы, Mimari, Roadmap (spec #68), Sayfalar

### Community 40 - "Security — Dependabot Audit (2026-08-25)"
Cohesion: 0.40
Nodes (4): Actions, Current, Fix, Security — Dependabot Audit (2026-08-25)

### Community 42 - "layout.tsx"
Cohesion: 0.07
Nodes (30): generateMetadata(), inter, OG_LOCALE, RootLayout(), viewport, AddToCartButton(), CartBadge(), CountrySwitcher() (+22 more)

## Knowledge Gaps
- **190 isolated node(s):** `nextConfig`, `name`, `version`, `private`, `dev` (+185 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useT()` connect `useT` to `provider.ts`, `layout.tsx`, `dictionaries.ts`, `Icons.tsx`, `ThreadChat.tsx`, `States.tsx`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Why does `formatKGS()` connect `useT` to `admin/orders/page.tsx`, `catalog.ts`, `Icons.tsx`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Why does `getT()` connect `Icons.tsx` to `catalog.ts`, `useT`, `CategoryIcon.tsx`, `provider.ts`, `layout.tsx`, `dictionaries.ts`, `States.tsx`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Are the 16 inferred relationships involving `CategoryIcon()` (e.g. with `CatBook()` and `CatCar()`) actually correct?**
  _`CategoryIcon()` has 16 INFERRED edges - model-reasoned connections that need verification._
- **What connects `nextConfig`, `name`, `version` to the rest of the system?**
  _190 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `admin/orders/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05755693581780538 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._