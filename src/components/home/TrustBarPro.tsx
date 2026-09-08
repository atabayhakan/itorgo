import { IconShield } from "@/components/icons/Icons";
import { getT } from "@/lib/i18n/server";

export async function TrustBarPro() {
  const t = await getT();
  return (
    <div className="mx-4 flex items-center justify-between gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-card lg:mx-0">
      <span className="inline-flex items-center gap-1.5 text-xs font-black">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success-bg text-success">
          <IconShield size={12} />
        </span>
        <span className="hidden sm:inline">{t("home.safe_deal")}</span>
        <span className="sm:hidden">{t("home.safe")}</span>
      </span>
      <span className="h-4 w-px bg-line" />
      <span className="flex items-center gap-1 text-xs font-bold">
        <span className="text-amber-400">★★★★★</span>
        <span className="hidden sm:inline">{t("home.rating_reviews", { rating: "4.9", n: "2.1k" })}</span>
        <span className="sm:hidden">4.9</span>
      </span>
      <span className="h-4 w-px bg-line" />
      <span className="text-xs font-bold text-ink-soft">💳 {t("home.buyer_protection")}</span>
      <span className="hidden h-4 w-px bg-line lg:inline" />
      <span className="hidden text-xs font-bold text-success lg:inline-flex">● 4 210 {t("common.online")}</span>
    </div>
  );
}
