import { notFound } from "next/navigation";
import Link from "next/link";
import { STORES, PRODUCTS, getSeller } from "@/lib/data/mock-data";
import { Avatar } from "@/components/ui/ProductImage";
import { IconBack, IconVerified } from "@/components/icons/Icons";
import { ProductCard } from "@/components/product/ProductCard";

export function generateStaticParams() {
  return STORES.slice(0, 6).map((s) => ({ id: s.id }));
}

export default async function StorePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const store = STORES.find((s) => s.id === id);
  if (!store) notFound();
  const seller = getSeller(store.sellerId);
  const items = PRODUCTS.filter((p) => p.storeId === store.id);

  return (
    <main className="pb-6">
      <div className="safe-top relative">
        <div className="h-28 w-full" style={{ background: "linear-gradient(135deg,#c7d2fe,#a5b4fc)" }} />
        <Link href="/" className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-md">
          <IconBack size={18} />
        </Link>
        <div className="-mt-8 flex items-end gap-3 px-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface text-xl font-black shadow-lifted">
            <Avatar name={store.name} seed={store.logoSeed} size={56} />
          </div>
          <div className="pb-1">
            <p className="flex items-center gap-1 font-extrabold">
              {store.name} {store.verified && <IconVerified size={16} />}
            </p>
            <p className="text-xs text-ink-faint">
              ⭐ {store.rating} · {store.followers.toLocaleString("ru-RU")} подписчиков · {store.salesCount} продаж
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2 px-4">
        <span className="rounded-full bg-ink px-3 py-1.5 text-sm font-semibold text-white">Товары · {items.length}</span>
        <span className="rounded-full bg-surface px-3 py-1.5 text-sm font-semibold text-ink-soft shadow-card">Аукционы</span>
        <span className="rounded-full bg-surface px-3 py-1.5 text-sm font-semibold text-ink-soft shadow-card">Отзывы</span>
      </div>

      <p className="mt-3 px-4 text-xs text-ink-faint">
        Владелец: <Link href={`/seller/${seller.id}`} className="font-semibold text-brand-600">{seller.name}</Link> · Магазин проверен
      </p>

      <section className="mt-4 grid grid-cols-2 gap-3 px-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
        {items.length === 0 && (
          <p className="col-span-2 rounded-2xl bg-surface p-8 text-center text-sm text-ink-faint shadow-card">В магазине пока нет товаров</p>
        )}
      </section>
    </main>
  );
}
