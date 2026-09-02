// ITOrgo — Catalog data-access layer.
// Single source of truth for products, sellers, stores, auctions, categories.
// Reads from Prisma when a real database is available; falls back to
// in-memory mock-data so the app still boots for demos and tests.
//
// The exported functions preserve the same surface as the legacy mock-data
// module: every server component / route handler can `import { getProduct }`
// from here without changing call sites.

import "server-only";

import type { Auction, AuctionStatus, Category, Product, Seller, Store } from "@/lib/types";
import {
  CATEGORIES as MOCK_CATEGORIES,
  PRODUCTS as MOCK_PRODUCTS,
  SELLERS as MOCK_SELLERS,
  STORES as MOCK_STORES,
  getLiveAuctions as mockGetLiveAuctions,
  getProduct as mockGetProduct,
  getSeller as mockGetSeller,
  getStore as mockGetStore,
  getFeed as mockGetFeed,
  getAuctionForProduct as mockGetAuctionForProduct,
  imageFor as mockImageFor,
} from "./mock-data";

// Prisma is only loaded when DATABASE_URL is configured. We do a try/require
// at module load to avoid `next build` failing before `prisma generate`.
type PrismaLike = {
  product: {
    findMany: (args?: any) => Promise<any[]>;
    findFirst: (args?: any) => Promise<any | null>;
    findUnique: (args?: any) => Promise<any | null>;
  };
  auction: {
    findMany: (args?: any) => Promise<any[]>;
    findFirst: (args?: any) => Promise<any | null>;
  };
  user: {
    findMany: (args?: any) => Promise<any[]>;
    findUnique: (args?: any) => Promise<any | null>;
  };
  store: {
    findMany: (args?: any) => Promise<any[]>;
    findUnique: (args?: any) => Promise<any | null>;
  };
  category: {
    findMany: () => Promise<any[]>;
  };
};

let prisma: PrismaLike | null = null;
try {
  if (process.env.DATABASE_URL) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { PrismaClient } = require("@prisma/client");
    const g = globalThis as unknown as { __prisma?: InstanceType<typeof PrismaClient> };
    const client =
      g.__prisma ??
      new PrismaClient({
        log: process.env.NODE_ENV === "production" ? ["error"] : ["warn", "error"],
      });
    if (process.env.NODE_ENV !== "production") g.__prisma = client;
    prisma = client as unknown as PrismaLike;
  }
} catch {
  prisma = null;
}

// The probe caches a one-time "DB reachable" verdict per process. If Prisma
// is not installed, this stays false and we never attempt a query.
let dbReady: boolean | null = null;
async function probe(): Promise<boolean> {
  if (dbReady !== null) return dbReady;
  if (!prisma) {
    dbReady = false;
    return false;
  }
  try {
    await prisma.category.findMany();
    dbReady = true;
  } catch {
    dbReady = false;
  }
  return dbReady;
}

// ── Mapping helpers (Prisma row → domain type) ──────────────────────────
function mapProduct(row: any): Product {
  return {
    id: row.id,
    title: row.title,
    imageSeed: row.id,
    imageUrl: row.media?.[0]?.url ?? undefined,
    price: row.price,
    oldPrice: row.oldPrice ?? undefined,
    condition: row.condition === "used" ? "used" : "new",
    categoryId: row.categoryId,
    sellerId: row.sellerId,
    storeId: row.storeId ?? undefined,
    rating: Number(row.rating ?? 0),
    reviewsCount: row.reviewsCount ?? 0,
    city: row.city ?? "",
    createdAt: (row.createdAt instanceof Date ? row.createdAt : new Date(row.createdAt)).toISOString(),
    isAuction: !!row.auction,
  };
}

function mapSeller(row: any): Seller {
  const profile = row.profile ?? {};
  return {
    id: row.id,
    name: profile.displayName ?? row.phone ?? "Продавец",
    avatarSeed: row.id,
    verified: row.trustScore >= 80,
    rating: 4.5,
    positivePct: 90 + (row.trustScore % 10),
    salesCount: row._count?.products ?? 0,
    yearsOnPlatform: Math.max(1, Math.floor((Date.now() - new Date(row.createdAt).getTime()) / (365 * 24 * 3600 * 1000))),
    city: profile.city ?? "Бишкек",
  };
}

function mapStore(row: any): Store {
  return {
    id: row.id,
    sellerId: row.ownerId,
    name: row.name,
    coverSeed: `store-cover-${row.id}`,
    logoSeed: `store-logo-${row.id}`,
    verified: !!row.verified,
    followers: row.followers ?? 0,
    rating: 4.5,
    salesCount: row._count?.products ?? 0,
  };
}

function mapAuction(row: any): Auction {
  const bids: { bidder: string; amount: number; at: string }[] = (row.bids ?? []).slice(0, 5).map((b: any) => ({
    bidder: `Покупатель ${b.userId?.slice(-3) ?? "***"}`,
    amount: b.amount,
    at: (b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt)).toISOString(),
  }));
  return {
    id: row.id,
    productId: row.productId,
    currentBid: row.currentBid,
    startingPrice: row.startingPrice,
    bidsCount: row._count?.bids ?? bids.length,
    participants: row._count?.participants ?? 0,
    endsAt: (row.endsAt instanceof Date ? row.endsAt : new Date(row.endsAt)).toISOString(),
    buyNowPrice: row.buyNowPrice ?? undefined,
    status: (row.status as AuctionStatus) ?? "live",
    lastBids: bids,
  };
}

function mapCategory(row: any): Category {
  // Seed file labels are richer than the schema; map by key to keep the
  // marketplace visual consistent.
  const mock = MOCK_CATEGORIES.find((c) => c.id === row.key);
  return {
    id: row.key,
    emoji: row.emoji ?? mock?.emoji ?? "📦",
    label: mock?.label ?? row.key,
  };
}

// ── Public API (matches the legacy mock-data surface) ─────────────────────
export async function getCategories(): Promise<Category[]> {
  if (await probe()) {
    const rows = await prisma!.category.findMany();
    return rows.map(mapCategory);
  }
  return MOCK_CATEGORIES;
}

export async function getProducts(): Promise<Product[]> {
  if (await probe()) {
    const rows = await prisma!.product.findMany({
      where: { status: "active" },
      include: { auction: true, media: { take: 1, orderBy: { position: "asc" } } },
      orderBy: { createdAt: "desc" },
      take: 200,
    });
    return rows.map(mapProduct);
  }
  return MOCK_PRODUCTS;
}

export async function getProduct(id: string): Promise<Product | undefined> {
  if (await probe()) {
    const row = await prisma!.product.findFirst({
      where: { OR: [{ id }, { title: { equals: id } }] },
      include: { auction: true, media: { take: 1, orderBy: { position: "asc" } } },
    });
    return row ? mapProduct(row) : undefined;
  }
  return mockGetProduct(id);
}

export async function getSellers(): Promise<Seller[]> {
  if (await probe()) {
    const rows = await prisma!.user.findMany({
      include: { profile: true, _count: { select: { products: true } } },
      take: 60,
    });
    return rows.map(mapSeller);
  }
  return MOCK_SELLERS;
}

export async function getSeller(id: string): Promise<Seller | undefined> {
  if (await probe()) {
    const row = await prisma!.user.findUnique({
      where: { id },
      include: { profile: true, _count: { select: { products: true } } },
    });
    return row ? mapSeller(row) : undefined;
  }
  return mockGetSeller(id);
}

export async function getStores(): Promise<Store[]> {
  if (await probe()) {
    const rows = await prisma!.store.findMany({
      include: { _count: { select: { products: true } } },
      take: 30,
    });
    return rows.map(mapStore);
  }
  return MOCK_STORES;
}

export async function getStore(id: string): Promise<Store | undefined> {
  if (await probe()) {
    const row = await prisma!.store.findUnique({
      where: { id },
      include: { _count: { select: { products: true } } },
    });
    return row ? mapStore(row) : undefined;
  }
  return mockGetStore(id);
}

export async function getLiveAuctions(): Promise<Auction[]> {
  if (await probe()) {
    const rows = await prisma!.auction.findMany({
      where: { status: { in: ["live", "ending_soon"] } },
      include: {
        bids: { orderBy: { createdAt: "desc" }, take: 5 },
        _count: { select: { bids: true, participants: true } },
      },
      orderBy: { endsAt: "asc" },
      take: 50,
    });
    return rows.map(mapAuction);
  }
  return mockGetLiveAuctions();
}

export async function getAuctionForProduct(productId: string): Promise<Auction | undefined> {
  if (await probe()) {
    const row = await prisma!.auction.findFirst({
      where: { productId, status: { in: ["live", "ending_soon"] } },
      include: {
        bids: { orderBy: { createdAt: "desc" }, take: 5 },
        _count: { select: { bids: true, participants: true } },
      },
    });
    return row ? mapAuction(row) : undefined;
  }
  return mockGetAuctionForProduct(productId);
}

export async function getFeed(limit: number): Promise<Product[]> {
  if (await probe()) {
    const rows = await prisma!.product.findMany({
      where: { status: "active" },
      include: { auction: true, media: { take: 1, orderBy: { position: "asc" } } },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    return rows.map(mapProduct);
  }
  return mockGetFeed(limit);
}

export function imageFor(categoryId: string, seed: string): string {
  // Image selection is deterministic per seed and is the same logic on
  // either backend, so we keep the mock implementation as the single source.
  return mockImageFor(categoryId, seed);
}

// ── Sync-friendly shims ──────────────────────────────────────────────────
// The marketplace's home + product page call these from async server
// components. The previous API was synchronous, so we expose both
// signatures. The async ones are the canonical path; the sync ones are
// thin wrappers that only work in mock mode and are deprecated.
export const _sync = {
  getProduct: (id: string) => mockGetProduct(id),
  getSeller: (id: string) => mockGetSeller(id),
  getStore: (id: string) => mockGetStore(id),
  getLiveAuctions: () => mockGetLiveAuctions(),
  getAuctionForProduct: (productId: string) => mockGetAuctionForProduct(productId),
  getFeed: (limit: number) => mockGetFeed(limit),
  imageFor,
  getCategories: () => MOCK_CATEGORIES,
  getProducts: () => MOCK_PRODUCTS,
  getSellers: () => MOCK_SELLERS,
  getStores: () => MOCK_STORES,
};
