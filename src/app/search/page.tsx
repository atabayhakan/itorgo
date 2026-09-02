import { Suspense } from "react";
import { SearchControls } from "@/components/search/SearchControls";
import { ProductCard } from "@/components/product/ProductCard";
import { getSearchProvider } from "@/lib/search/provider";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const provider = getSearchProvider();
  const { items: list, total } = await provider.search({
    q: sp.q,
    categoryId: sp.cat === "all" ? undefined : sp.cat,
    city: sp.city === "Все города" ? undefined : sp.city,
    auctionOnly: sp.auction === "1",
    sort: (sp.sort as "new" | "price_asc" | "price_desc") ?? "new",
    limit: 40,
  });

  return (
    <main className="min-h-dvh bg-[#0f0f14] text-white">
      <div className="mx-auto max-w-xl px-4 py-5 space-y-5">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Поиск</h1>
          <p className="text-xs text-white/30 mt-1">Ключевое слово · категория · город · цена — AI разберёт</p>
        </div>

        <div className="rounded-[16px] bg-[#16161f] border border-white/[0.06] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
          <Suspense fallback={<div className="skeleton h-24 w-full rounded-xl" />}>
            <SearchControls />
          </Suspense>
        </div>

        <p className="text-sm font-extrabold tracking-tight">
          Найдено <span className="text-auction-400">{total}</span> {total === 1 ? "товар" : total < 5 ? "товара" : "товаров"}
        </p>

        {list.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {list.slice(0, 40).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[20px] bg-[#16161f] border border-white/[0.06] p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
            <p className="text-4xl">🔍</p>
            <p className="mt-3 text-lg font-extrabold">Ничего не найдено</p>
            <p className="mt-1 text-sm text-white/30">Попробуйте изменить фильтры или запрос.</p>
          </div>
        )}
      </div>
    </main>
  );
}
