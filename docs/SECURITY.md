# Security — Dependabot Audit (2026-08-25)

## Current

`npm audit` → **3 high** (postcss ≤8.5.22 + sharp <0.35.0 via `next@15.5.23`)

- `GHSA-qx2v-qp2m-jg93` — PostCSS XSS via `</style>` stringify
- `GHSA-6g55-p6wh-862q` / `GHSA-fxqj...` / `GHSA-r28c...` — sourceMappingURL arbitrary .map read
- `GHSA-f88m...` — sharp/libvips CVE-2026-*..

All are **build-time** (PostCSS CSS compilation, sharp image optimization at `next build`). Not reachable via user input at runtime — `next` does not expose `postcss` stringify to requests, `sharp` only processes `next/image` optimization with validated sources.

## Fix

- `npm audit fix --force` → `next@16.3.3` (breaking, canary → major). Not applied — Next 16 is preview, API changes (middleware, `next/image`).
- Mitigation: `overrides: { postcss: ^8.5.23, sharp: ^0.35.0 }` was tested — `next` nests its own `node_modules/next/node_modules/postcss`, override does not propagate. Waiting for Next 15.5 patch that bumps postcss/sharp.
- Alternative: pin `next@15.5.x` latest patch when released.

## Actions

- [x] Audited, documented, no runtime exposure
- [ ] Schedule Next 16 upgrade after stable (test `middleware`, `next/image`, `app router`)
- [ ] Enable Dependabot auto-PR in repo settings
