import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/data/mock-data";
import { track } from "@/lib/analytics/events";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") ?? "").toLowerCase();
  const cat = searchParams.get("cat");
  const city = searchParams.get("city");

  let list = [...PRODUCTS];
  if (q) list = list.filter((p) => p.title.toLowerCase().includes(q));
  if (cat) list = list.filter((p) => p.categoryId === cat);
  if (city) list = list.filter((p) => p.city === city);

  track("search", { q, cat, city, results: list.length });
  return NextResponse.json({ data: list.slice(0, 50), meta: { total: list.length } });
}
