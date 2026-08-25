import { notFound } from "next/navigation";
import Link from "next/link";
import { SELLERS, getSeller, PRODUCTS } from "@/lib/data/mock-data";
import { Avatar } from "@/components/ui/ProductImage";
import { IconBack, IconShield, IconStar, IconVerified } from "@/components/icons/Icons";
import { ProductCard } from "@/components/product/ProductCard";

export function generateStaticParams() {
  return SELLERS.slice(0, 10).map((s) => ({ id: s.id }));
}

export default async function SellerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const seller = SELLERS.find((s) => s.id === id);
  if (!seller) notFound();
  const items = PRODUCTS.filter((p) => p.sellerId === seller.id).slice(0, 8);

  return (
    <main className="pb-6">
      <div className="safe-top sticky top-0 z-10 flex items-center gap-3 bg-surface/90 px-4 py-3 backdrop-blur-md">
        <Link href="/" className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-dim">
          <IconBack size={18} />
        </Link>
        <span className="font-bold">Профиль продавца</span>
      </div>

      <section className="bg-surface px-4 pb-5 pt-4 shadow-card">
        <div className="flex gap-3">
          <Avatar name={seller.name} seed={seller.avatarSeed} size={64} />
          <div className="min-w-0">
            <p className="flex items-center gap-1 text-lg font-extrabold">
              {seller.name} {seller.verified && <IconVerified size={18} />}
            </p>
            <p className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-ink-faint">
              <span className="inline-flex items-center gap-1">
                <IconStar size={12} filled /> {seller.rating}
              </span>
              · 🛡 {seller.positivePct}% положительных · {seller.salesCount} продаж · {seller.yearsOnPlatform} года на ITOrgo
            </p>
            <p className="mt-1 text-xs text-ink-faint">{seller.city} · На площадке {seller.yearsOnPlatform} года</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl bg-surface-dim px-2 py-3">
            <p className="text-lg font-black">{seller.salesCount}</p>
            <p className="text-xs text-ink-faint">продаж</p>
          </div>
          <div className="rounded-2xl bg-surface-dim px-2 py-3">
            <p className="text-lg font-black">{seller.positivePct}%</p>
            <p className="text-xs text-ink-faint">положительных</p>
          </div>
          <div className="rounded-2xl bg-success-bg px-2 py-3 text-success">
            <p className="flex items-center justify-center gap-1 text-lg font-black">
              <IconShield size={16} /> 96%
            </p>
            <p className="text-xs">надёжность</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="btn-primary">Подписаться</button>
          <button className="btn-secondary">Сообщение</button>
        </div>
      </section>

      <div className="mt-4 flex gap-2 px-4 text-sm font-semibold">
        <span className="rounded-full bg-ink px-3 py-1.5 text-white">Товары</span>
        <span className="rounded-full bg-surface px-3 py-1.5 text-ink-soft shadow-card">Аукционы</span>
        <span className="rounded-full bg-surface px-3 py-1.5 text-ink-soft shadow-card">Отзывы</span>
      </div>

      <section className="mt-4 grid grid-cols-2 gap-3 px-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
        {items.length === 0 && <p className="col-span-2 py-10 text-center text-sm text-ink-faint">Товаров пока нет</p>}
      </section>
    </main>
  );
}
