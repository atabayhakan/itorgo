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
    <main className="px-4 py-4">
      <h1 className="text-lg font-extrabold">Поиск</h1>
      <p className="text-xs text-ink-faint">Ключевое слово · категория · город · цена — AI разберёт</p>

      <div className="mt-4">
        <Suspense fallback={<div className="skeleton h-24 w-full" />}>
          <SearchControls />
        </Suspense>
      </div>

      <p className="mt-4 text-sm font-semibold">
        Найдено {total} {total === 1 ? "товар" : total < 5 ? "товара" : "товаров"}
      </p>

      {list.length > 0 ? (
        <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {list.slice(0, 40).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl bg-surface p-8 text-center shadow-card">
          <p className="text-3xl">🔍</p>
          <p className="mt-2 font-bold">Ничего не найдено</p>
          <p className="mt-1 text-sm text-ink-faint">Попробуйте изменить фильтры или запрос.</p>
        </div>
      )}
    </main>
  );
}
