import { Suspense } from "react";
import { PRODUCTS } from "@/lib/data/mock-data";
import { SearchControls } from "@/components/search/SearchControls";
import { ProductCard } from "@/components/product/ProductCard";

export const dynamic = "force-dynamic";

function filterProducts(sp: Record<string, string | undefined>) {
  const q = (sp.q ?? "").toLowerCase().trim();
  const cat = sp.cat;
  const city = sp.city;
  const auction = sp.auction === "1";
  const sort = sp.sort ?? "new";

  let list = [...PRODUCTS];

  if (q) list = list.filter((p) => p.title.toLowerCase().includes(q));
  if (cat && cat !== "all") list = list.filter((p) => p.categoryId === cat);
  if (city && city !== "Все города") list = list.filter((p) => p.city === city);
  if (auction) list = list.filter((p) => p.isAuction);

  // Demo price parsing from q like "до 50000 сом"
  const m = q.match(/до\s*(\d[\d ]*)/);
  if (m) {
    const cap = Number(m[1].replace(/\s/g, ""));
    if (cap) list = list.filter((p) => p.price <= cap);
  }

  if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
  else if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
  else list.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

  return list;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const list = filterProducts(sp);

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
        Найдено {list.length} {list.length === 1 ? "товар" : list.length < 5 ? "товара" : "товаров"}
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
