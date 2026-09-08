"use client";

import Link from "next/link";
import { useFavorites } from "@/lib/favorites/FavoritesContext";
import { PRODUCTS } from "@/lib/data/mock-data";
import { ProductCard } from "@/components/product/ProductCard";
import { EmptyState } from "@/components/ui/States";
import { useT } from "@/lib/i18n/LocaleProvider";

export default function FavoritesPage() {
  const t = useT();
  const { ids, count } = useFavorites();
  const favProducts = PRODUCTS.filter((p) => ids.has(p.id));

  if (favProducts.length === 0) {
    return (
      <main className="px-4 py-6">
        <h1 className="text-lg font-extrabold">{t("nav.favorites")} · {count}</h1>
        <div className="mt-4">
          <EmptyState icon="❤️" title={t("states.empty_favorites_title")} text={t("states.empty_favorites_text")} action={<Link href="/" className="btn-primary inline-flex">{t("states.go_home")}</Link>} />
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 py-4">
      <h1 className="text-lg font-extrabold">{t("nav.favorites")} · {count}</h1>
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {favProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
