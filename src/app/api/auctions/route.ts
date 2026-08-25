import { NextResponse } from "next/server";
import { getLiveAuctions, PRODUCTS, formatKGS } from "@/lib/data/mock-data";
import { track } from "@/lib/analytics/events";

// GET /api/auctions — live auctions (demo backed by mock-data, DB-ready via prisma)
export async function GET() {
  track("search", { source: "api/auctions" });
  const live = getLiveAuctions().map((a) => {
    const p = PRODUCTS.find((x) => x.id === a.productId)!;
    return { ...a, product: { id: p.id, title: p.title, price: p.price, city: p.city } };
  });
  return NextResponse.json({ data: live, meta: { count: live.length, currency: "KGS" } });
}
