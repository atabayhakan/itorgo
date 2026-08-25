// Search abstraction — spec #54
// Ready to swap to Elasticsearch/OpenSearch without touching UI.
// Current: Memory provider (fast, clean). Future: Elastic provider.

import type { Product } from "@/lib/types";
import { PRODUCTS } from "@/lib/data/mock-data";

export interface SearchQuery {
  q?: string;
  categoryId?: string;
  city?: string;
  priceMin?: number;
  priceMax?: number;
  auctionOnly?: boolean;
  sort?: "new" | "price_asc" | "price_desc";
  limit?: number;
  offset?: number;
}

export interface SearchResult {
  items: Product[];
  total: number;
  tookMs: number;
}

export interface SearchProvider {
  search(query: SearchQuery): Promise<SearchResult>;
  suggest(prefix: string): Promise<string[]>;
}

// ── Memory (default) ───────────────────────────────────────
export const MemorySearchProvider: SearchProvider = {
  async search(q) {
    const t0 = Date.now();
    let list = [...PRODUCTS];
    const term = (q.q ?? "").toLowerCase().trim();
    const priceMatch = term.match(/до\s*(\d[\d ]*)/);
    const keyword = term.replace(/до\s*\d[\d ]*.*/, "").trim();
    if (keyword) list = list.filter((p) => p.title.toLowerCase().includes(keyword));
    if (priceMatch) {
      const cap = Number(priceMatch[1].replace(/\s/g, ""));
      if (cap) list = list.filter((p) => p.price <= cap);
    }
    if (q.categoryId) list = list.filter((p) => p.categoryId === q.categoryId);
    if (q.city) list = list.filter((p) => p.city === q.city);
    if (q.priceMin != null) list = list.filter((p) => p.price >= q.priceMin!);
    if (q.priceMax != null) list = list.filter((p) => p.price <= q.priceMax!);
    if (q.auctionOnly) list = list.filter((p) => p.isAuction);
    if (q.sort === "price_asc") list.sort((a, b) => a.price - b.price);
    else if (q.sort === "price_desc") list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    const total = list.length;
    const sliced = list.slice(q.offset ?? 0, (q.offset ?? 0) + (q.limit ?? 50));
    return { items: sliced, total, tookMs: Date.now() - t0 };
  },
  async suggest(prefix) {
    const p = prefix.toLowerCase();
    return [...new Set(PRODUCTS.filter((x) => x.title.toLowerCase().includes(p)).map((x) => x.title))].slice(0, 5);
  },
};

// ── Elastic stub (swap via env) ────────────────────────────
// TODO: implement with @elastic/elasticsearch or opensearch-js
// export const ElasticSearchProvider: SearchProvider = { ... };

export function getSearchProvider(): SearchProvider {
  if (process.env.SEARCH_PROVIDER === "elastic") {
    // return ElasticSearchProvider;
  }
  return MemorySearchProvider;
}
