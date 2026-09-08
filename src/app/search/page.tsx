import { Suspense } from "react";
import { SearchControls } from "@/components/search/SearchControls";
import { ProductCard } from "@/components/product/ProductCard";
import { getSearchProvider } from "@/lib/search/provider";
import { getT } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const t = await getT();
  const sp = await searchParams;
  const provider = getSearchProvider();
  const { items: list, total } = await provider.search({
    q: sp.q,
    categoryId: sp.cat === "all" ? undefined : sp.cat,
    city: sp.city === "Все города" || sp.city === "all" ? undefined : sp.city,
    auctionOnly: sp.auction === "1",
    sort: (sp.sort as "new" | "price_asc" | "price_desc") ?? "new",
    limit: 40,
  });

  return (
    <main className="min-h-dvh bg-[#0f0f14] text-white">
      <div className="mx-auto max-w-xl px-4 py-5 space-y-5">
        <div>
          <h1 className="text-2xl font-black tracking-tight">{t("search.title")}</h1>
          <p className="text-xs text-white/30 mt-1">{t("search.subtitle")}</p>
        </div>

        <div className="rounded-[16px] bg-[#16161f] border border-white/[0.06] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
          <Suspense fallback={<div className="skeleton h-24 w-full rounded-xl" />}>
            <SearchControls />
          </Suspense>
        </div>

        <p className="text-sm font-extrabold tracking-tight">
          {t("search.found")} <span className="text-auction-400">{total}</span>{" "}
          {total === 1 ? t("search.found_one") : total < 5 ? t("search.found_few") : t("search.found_many")}
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
            <p className="mt-3 text-lg font-extrabold">{t("search.nothing_found")}</p>
            <p className="mt-1 text-sm text-white/30">{t("search.nothing_found_text")}</p>
          </div>
        )}
      </div>
    </main>
  );
}
