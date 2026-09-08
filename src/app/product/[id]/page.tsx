import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, getAuctionForProduct, getProducts, getCategories } from "@/lib/data/catalog";
import { formatKGS } from "@/lib/data/mock-data";
import { ProductGallery } from "@/components/product/ProductGallery";
import { AuctionDetailSection, BidActivity } from "@/components/auction/AuctionDetailSection";
import { SellerCard } from "@/components/seller/SellerCard";
import { ProductCard } from "@/components/product/ProductCard";
import { AuctionCard } from "@/components/auction/AuctionCard";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ProductTopBar } from "@/components/product/ProductTopBar";
import { StickyCTA } from "@/components/product/StickyCTA";
import { ReviewList } from "@/components/reviews/ReviewList";
import { IconStar } from "@/components/icons/Icons";
import { getT } from "@/lib/i18n/server";
import type { Metadata } from "next";
import type { Product, Auction } from "@/lib/types";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.slice(0, 30).map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = await getProduct(id);
  if (!p) return {};
  const t = await getT();
  const title = t("product.meta_title", { title: p.title, price: formatKGS(p.price) });
  const desc = t("product.meta_description", {
    title: p.title,
    city: p.city,
    condition: p.condition === "new" ? t("product.condition_new") : t("product.condition_used"),
    rating: p.rating,
  });
  return {
    title,
    description: desc,
    openGraph: { title, description: desc, type: "website", url: `https://www.itorgo.kg/product/${p.id}` },
    alternates: { canonical: `https://www.itorgo.kg/product/${p.id}` },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = await getT();
  const product = await getProduct(id);
  if (!product) notFound();
  const auction = await getAuctionForProduct(product.id);
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const all = await getProducts();
  const related = all.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);
  const categories = await getCategories();
  const categoryLabel = categories.find((c) => c.id === product.categoryId)?.label ?? product.categoryId;
  const som = t("currency.som");
  const conditionLabel = product.condition === "new" ? t("product.condition_new") : t("product.condition_used");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    offers: {
      "@type": "Offer",
      price: auction ? auction.currentBid : product.price,
      priceCurrency: "KGS",
      availability: "https://schema.org/InStock",
      url: `https://www.itorgo.kg/product/${product.id}`,
    },
    aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviewsCount },
    brand: { "@type": "Brand", name: "ITOrgo" },
  };

  return (
    <main className="pb-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Breadcrumb */}
      <nav aria-label={t("product.breadcrumbs")} className="px-4 py-2 text-xs text-ink-faint">
        <Link href="/" className="hover:underline">
          {t("nav.home")}
        </Link>{" "}
        / <Link href={`/search?cat=${product.categoryId}`} className="hover:underline">{categoryLabel}</Link> / {product.title}
      </nav>
      <ProductTopBar productId={product.id} title={product.title} price={product.price} oldPrice={product.oldPrice} condition={product.condition} />

      <ProductGallery product={product} />

      {/* Title block */}
      <section className="px-4 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-xl font-extrabold leading-tight">{product.title}</h1>
          {discount > 0 && <span className="chip shrink-0 bg-danger text-white">{t("product.discount", { p: discount })}</span>}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
          <span className="inline-flex items-center gap-1 font-medium">
            <IconStar size={16} filled /> {product.rating} · {t("product.reviews_count", { n: product.reviewsCount })}
          </span>
          <span className="text-ink-faint">· {product.city}</span>
          <span className={`chip ${product.condition === "new" ? "bg-brand-50 text-brand-700" : "bg-surface-sunken text-ink-soft"}`}>
            {conditionLabel}
          </span>
        </div>

        {!auction && (
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black tabular-nums">{formatKGS(product.price)} {som}</span>
            {product.oldPrice && <span className="text-sm text-ink-faint line-through">{formatKGS(product.oldPrice)} {som}</span>}
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
          <Link href={`/checkout?product=${product.id}`} className="btn-primary w-full text-base">
            {t("auction.buy_now")} — {formatKGS(product.price)} {som}
          </Link>
          <AddToCartButton product={product} />
          <p className="text-center text-xs text-ink-faint">{t("product.delivery_note")}</p>
        </div>
      )}

      {/* Seller */}
      <SellerCard product={product} />

      {/* Reviews */}
      <ReviewList productId={product.id} />

      {/* Description */}
      <section className="mx-4 mt-4 rounded-2xl bg-surface p-4 shadow-card">
        <h3 className="font-bold">{t("product.description")}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {t("product.description_text", {
            title: product.title,
            condition: product.condition === "new" ? t("product.condition_new_lc") : t("product.condition_used_lc"),
            city: product.city,
            rating: product.rating,
          })}
        </p>
        <p className="mt-2 text-xs text-ink-faint">{t("product.id_category", { id: product.id, category: categoryLabel })}</p>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-6 space-y-3">
          <h3 className="px-4 font-bold">{t("product.related")}</h3>
          <div className="grid grid-cols-2 gap-3 px-4">
            {related.map((p) => {
              const isAuction = p.isAuction;
              return isAuction ? (
                <AuctionCard key={p.id} auctionId={p.id} />
              ) : (
                <ProductCard key={p.id} product={p} />
              );
            })}
          </div>
        </section>
      )}

      <StickyCTA product={product} auction={auction} />
    </main>
  );
}
