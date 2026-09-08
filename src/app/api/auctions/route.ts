import { NextResponse } from "next/server";
import { getLiveAuctions, getProducts } from "@/lib/data/catalog";
import { formatKGS } from "@/lib/data/mock-data";
import { track } from "@/lib/analytics/events";

// GET /api/auctions — live auctions backed by the catalog (Prisma if available)
export async function GET() {
  track("search", { source: "api/auctions" });
  const [live, products] = await Promise.all([getLiveAuctions(), getProducts()]);
  const productMap = new Map(products.map((p) => [p.id, p]));
  const data = live.map((a) => {
    const p = productMap.get(a.productId);
    return {
      ...a,
      product: p ? { id: p.id, title: p.title, price: p.price, city: p.city } : undefined,
    };
  });
  return NextResponse.json({ data, meta: { count: data.length, currency: "KGS" } });
}
