"use client";

import Link from "next/link";
import { useFavorites } from "@/lib/favorites/FavoritesContext";
import { PRODUCTS } from "@/lib/data/mock-data";
import { ProductCard } from "@/components/product/ProductCard";
import { EmptyState } from "@/components/ui/States";

export default function FavoritesPage() {
  const { ids, count } = useFavorites();
  const favProducts = PRODUCTS.filter((p) => ids.has(p.id));

  if (favProducts.length === 0) {
    return (
      <main className="px-4 py-6">
        <h1 className="text-lg font-extrabold">Избранное · {count}</h1>
        <div className="mt-4">
          <EmptyState icon="❤️" title="Здесь пока пусто" text="Добавляйте товары, которые хотите сохранить." action={<Link href="/" className="btn-primary inline-flex">На главную</Link>} />
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 py-4">
      <h1 className="text-lg font-extrabold">Избранное · {count}</h1>
      <p className="text-xs text-ink-faint">Сохраняется локально · TODO: sync to /api/favorites</p>
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {favProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
