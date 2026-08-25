import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, getAuctionForProduct, formatKGS, PRODUCTS } from "@/lib/data/mock-data";
import { ProductGallery } from "@/components/product/ProductGallery";
import { AuctionDetailSection, BidActivity } from "@/components/auction/AuctionDetailSection";
import { SellerCard } from "@/components/seller/SellerCard";
import { ProductCard } from "@/components/product/ProductCard";
import { IconBack, IconHeart, IconShare, IconStar } from "@/components/icons/Icons";

export function generateStaticParams() {
  return PRODUCTS.slice(0, 30).map((p) => ({ id: p.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();
  const auction = getAuctionForProduct(product.id);
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const related = PRODUCTS.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);

  return (
    <main className="pb-6">
      {/* Top bar */}
      <div className="safe-top sticky top-0 z-30 flex items-center justify-between bg-surface/90 px-2 py-2 backdrop-blur-md">
        <Link href="/" className="flex h-9 w-9 items-center justify-center rounded-full bg-surface shadow-card">
          <IconBack size={20} />
        </Link>
        <div className="flex gap-2">
          <button aria-label="Поделиться" className="flex h-9 w-9 items-center justify-center rounded-full bg-surface shadow-card">
            <IconShare size={18} />
          </button>
          <button aria-label="В избранное" className="flex h-9 w-9 items-center justify-center rounded-full bg-surface shadow-card">
            <IconHeart size={18} />
          </button>
        </div>
      </div>

      <ProductGallery product={product} />

      {/* Title block */}
      <section className="px-4 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-xl font-extrabold leading-tight">{product.title}</h1>
          {discount > 0 && <span className="chip shrink-0 bg-danger text-white">-{discount}%</span>}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
          <span className="inline-flex items-center gap-1 font-medium">
            <IconStar size={16} filled /> {product.rating} · {product.reviewsCount} отзывов
          </span>
          <span className="text-ink-faint">· {product.city}</span>
          <span className={`chip ${product.condition === "new" ? "bg-brand-50 text-brand-700" : "bg-surface-sunken text-ink-soft"}`}>
            {product.condition === "new" ? "Новый" : "Б/у"}
          </span>
        </div>

        {!auction && (
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black tabular-nums">{formatKGS(product.price)} сом</span>
            {product.oldPrice && <span className="text-sm text-ink-faint line-through">{formatKGS(product.oldPrice)} сом</span>}
          </div>
        )}
      </section>

      {/* Auction vs Buy Now */}
      {auction ? (
        <>
          <AuctionDetailSection auction={auction} />
          <BidActivity auction={auction} />
        </>
      ) : (
        <div className="mx-4 mt-4 grid gap-2">
          <button className="btn-primary w-full text-base">Купить сейчас — {formatKGS(product.price)} сом</button>
          <button className="btn-secondary w-full">В корзину</button>
          <p className="text-center text-xs text-ink-faint">Доставка по всему Кыргызстану · Защита покупателя</p>
        </div>
      )}

      {/* Seller */}
      <SellerCard product={product} />

      {/* Description */}
      <section className="mx-4 mt-4 rounded-2xl bg-surface p-4 shadow-card">
        <h3 className="font-bold">Описание</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {product.title} — состояние {product.condition === "new" ? "новое" : "б/у, в отличном состоянии"}. Город: {product.city}.
          Продавец проверен, рейтинг {product.rating}. Доставка по Кыргызстану. Защита покупателя ITOrgo.
        </p>
        <p className="mt-2 text-xs text-ink-faint">ID: {product.id} · Категория: {product.categoryId}</p>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-6 space-y-3">
          <h3 className="px-4 font-bold">Похожие товары</h3>
          <div className="grid grid-cols-2 gap-3 px-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
