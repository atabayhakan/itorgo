import { notFound } from "next/navigation";
import Link from "next/link";
import { SELLERS, getSeller, PRODUCTS } from "@/lib/data/mock-data";
import { Avatar } from "@/components/ui/ProductImage";
import { IconBack, IconShield, IconStar, IconVerified } from "@/components/icons/Icons";
import { ProductCard } from "@/components/product/ProductCard";
import { getT } from "@/lib/i18n/server";

export function generateStaticParams() {
  return SELLERS.slice(0, 10).map((s) => ({ id: s.id }));
}

export default async function SellerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const seller = SELLERS.find((s) => s.id === id);
  if (!seller) notFound();
  const t = await getT();
  const items = PRODUCTS.filter((p) => p.sellerId === seller.id).slice(0, 8);
  const years = t("seller.years", { y: seller.yearsOnPlatform });

  return (
    <main className="pb-6">
      <div className="safe-top sticky top-0 z-10 flex items-center gap-3 bg-surface/90 px-4 py-3 backdrop-blur-md">
        <Link href="/" className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-dim">
          <IconBack size={18} />
        </Link>
        <span className="font-bold">{t("seller.profile_title")}</span>
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
              · 🛡 {t("seller.positive_reviews", { p: seller.positivePct })} · {t("seller.sales", { n: seller.salesCount })} · {t("seller.on_itorgo_since", { y: years })}
            </p>
            <p className="mt-1 text-xs text-ink-faint">{seller.city} · {t("seller.on_platform", { y: years })}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl bg-surface-dim px-2 py-3">
            <p className="text-lg font-black">{seller.salesCount}</p>
            <p className="text-xs text-ink-faint">{t("seller.sales_label")}</p>
          </div>
          <div className="rounded-2xl bg-surface-dim px-2 py-3">
            <p className="text-lg font-black">{seller.positivePct}%</p>
            <p className="text-xs text-ink-faint">{t("seller.positive")}</p>
          </div>
          <div className="rounded-2xl bg-success-bg px-2 py-3 text-success">
            <p className="flex items-center justify-center gap-1 text-lg font-black">
              <IconShield size={16} /> 96%
            </p>
            <p className="text-xs">{t("seller.score")}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="btn-primary">{t("seller.follow")}</button>
          <button className="btn-secondary">{t("seller.message")}</button>
        </div>
      </section>

      <div className="mt-4 flex gap-2 px-4 text-sm font-semibold">
        <span className="rounded-full bg-ink px-3 py-1.5 text-white">{t("seller.products_tab")}</span>
        <span className="rounded-full bg-surface px-3 py-1.5 text-ink-soft shadow-card">{t("seller.auctions_tab")}</span>
        <span className="rounded-full bg-surface px-3 py-1.5 text-ink-soft shadow-card">{t("seller.reviews_tab")}</span>
      </div>

      <section className="mt-4 grid grid-cols-2 gap-3 px-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
        {items.length === 0 && <p className="col-span-2 py-10 text-center text-sm text-ink-faint">{t("seller.no_products")}</p>}
      </section>
    </main>
  );
}
