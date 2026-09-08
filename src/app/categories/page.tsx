import { CATEGORIES } from "@/lib/data/mock-data";
import { CategoryIcon } from "@/components/icons/CategoryIcon";
import Link from "next/link";
import { getT } from "@/lib/i18n/server";

export default async function CategoriesPage() {
  const t = await getT();
  return (
    <main className="min-h-screen bg-[#0f0f14] pb-32 text-white">
      <div className="mx-auto max-w-[1440px] px-4 py-4 lg:px-10 lg:py-6">
        {/* Header */}
        <div className="rounded-[20px] border border-white/[0.06] bg-gradient-to-br from-[#0a0a12] via-[#0f0f14] to-[#12121a] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-400">{t("nav.catalog")}</p>
          <h1 className="mt-2 text-[28px] font-black leading-tight tracking-tight lg:text-[36px]">
            {t("home.all_categories")}
          </h1>
          <p className="mt-2 text-sm text-white/60">
            {t("home.categories_count_text", { n: CATEGORIES.length })}
          </p>
        </div>

        {/* Categories grid — premium 2-col cards */}
        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              href={`/search?cat=${c.id}`}
              className="group relative overflow-hidden rounded-[16px] border border-white/[0.06] bg-[#16161f] p-4 transition-all active:scale-[0.97] hover:border-brand-500/40 hover:shadow-[0_4px_20px_rgba(124,58,237,0.15)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-gradient-to-br from-brand-500/15 to-brand-700/15 transition-transform group-hover:scale-110">
                <CategoryIcon id={c.id} className="h-6 w-6 text-brand-400" />
              </div>
              <p className="mt-3 text-[14px] font-bold text-white">{c.label}</p>
              <p className="mt-0.5 text-[10px] font-medium text-white/40">
                {t("home.items_count", { n: Math.floor(Math.random() * 800) + 50 })}
              </p>

              <div className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500/20 text-[10px] font-black text-brand-400">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
