"use client";

import Link from "next/link";
import { getSeller, getStore } from "@/lib/data/mock-data";
import { Avatar } from "@/components/ui/ProductImage";
import { IconShield, IconStar, IconVerified } from "@/components/icons/Icons";
import { useFollows } from "@/lib/follows/FollowsContext";
import { useT } from "@/lib/i18n/LocaleProvider";
import type { Product } from "@/lib/types";

export function SellerCard({ product }: { product: Product }) {
  const t = useT();
  const seller = getSeller(product.sellerId);
  const store = getStore(product.storeId);
  const { has, toggle } = useFollows();
  const following = has(seller.id);
  return (
    <section className="mx-4 mt-4 rounded-2xl bg-surface p-4 shadow-card">
      <Link href={`/seller/${seller.id}`} className="flex items-center gap-3">
        <Avatar name={seller.name} seed={seller.avatarSeed} size={48} />
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1 font-semibold">
            {seller.name} {seller.verified && <IconVerified size={16} />}
          </p>
          <p className="flex flex-wrap items-center gap-1.5 text-xs text-ink-faint">
            <span className="inline-flex items-center gap-1">
              <IconStar size={12} filled /> {seller.rating}
            </span>
            · {t("seller.positive_reviews", { p: seller.positivePct })} · {t("seller.sales", { n: seller.salesCount })} · {t("seller.on_itorgo_since", { y: t("seller.years", { y: seller.yearsOnPlatform }) })}
          </p>
        </div>
        <span className="chip bg-brand-50 text-brand-700">{t("seller.profile")}</span>
      </Link>
      {store && (
        <Link href={`/store/${store.id}`} className="mt-3 flex items-center justify-between rounded-xl bg-surface-dim px-3 py-2.5">
          <span className="text-sm font-semibold">🏪 {store.name}</span>
          <span className="text-xs text-ink-faint">{t("seller.open_store")}</span>
        </Link>
      )}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button onClick={() => toggle(seller.id)} className={`!min-h-10 rounded-xl px-3 py-2.5 text-sm font-semibold ${following ? "bg-ink text-white" : "btn-secondary"}`}>
          {following ? `✓ ${t("seller.following")}` : t("seller.follow")}
        </button>
        <button className="rounded-xl border border-line bg-surface px-3 py-2.5 text-sm font-semibold">{t("seller.message")}</button>
      </div>
      <p className="mt-2 flex items-center justify-center gap-1 text-xs text-success">
        <IconShield size={12} /> {t("seller.verified_seller")}
      </p>
    </section>
  );
}
