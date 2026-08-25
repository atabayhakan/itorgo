import { NextResponse } from "next/server";
import { getSearchProvider } from "@/lib/search/provider";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? undefined;
  const categoryId = searchParams.get("cat") ?? searchParams.get("categoryId") ?? undefined;
  const city = searchParams.get("city") ?? undefined;
  const auctionOnly = searchParams.get("auction") === "1";
  const sort = (searchParams.get("sort") as "new" | "price_asc" | "price_desc" | null) ?? "new";

  const provider = getSearchProvider();
  const result = await provider.search({ q, categoryId, city, auctionOnly, sort, limit: 50 });
  return NextResponse.json({ data: result.items, meta: { total: result.total, tookMs: result.tookMs } });
}
