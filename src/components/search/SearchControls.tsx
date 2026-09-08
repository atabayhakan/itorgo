"use client";

import { useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/data/mock-data";
import { useT } from "@/lib/i18n/LocaleProvider";

// Option values stay Russian: product.city data is Russian and the search filter compares against it.
const CITIES = [
  { value: "Бишкек", key: "cities.bishkek" },
  { value: "Ош", key: "cities.osh" },
  { value: "Джалал-Абад", key: "cities.jalal_abad" },
  { value: "Каракол", key: "cities.karakol" },
  { value: "Токмок", key: "cities.tokmok" },
];
const RECENT = ["iPhone до 50000", "Кроссовки Nike", "Квартира центр"];
const POPULAR = ["Смартфоны", "Авто", "Часы", "Кроссовки", "Диван"];
const PROMPT_KEYS = ["search.prompt_phone", "search.prompt_car", "search.prompt_gift", "search.prompt_auction", "search.prompt_compare"];

function setParam(router: ReturnType<typeof useRouter>, sp: URLSearchParams, key: string, value: string) {
  const next = new URLSearchParams(sp.toString());
  if (!value || value === "Все города" || value === "all") next.delete(key);
  else next.set(key, value);
  router.push(`/search?${next.toString()}`);
}

export function SearchControls() {
  const t = useT();
  const router = useRouter();
  const sp = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const q = sp.get("q") ?? "";
  const cat = sp.get("cat") ?? "all";
  const city = sp.get("city") ?? "all";
  const sort = sp.get("sort") ?? "new";

  return (
    <div className="space-y-4">
      {/* Command palette input — premium dark */}
      <div className="rounded-[16px] border border-white/[0.06] bg-[#16161f] p-3 shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-black text-white shadow-[0_2px_8px_rgba(124,58,237,0.4)]">
            AI
          </span>
          <input
            ref={inputRef}
            defaultValue={q}
            placeholder={t("search.placeholder")}
            className="w-full bg-transparent text-[15px] font-medium text-white outline-none placeholder:text-white/30"
            onKeyDown={(e) => {
              if (e.key === "Enter") setParam(router, sp, "q", (e.target as HTMLInputElement).value);
            }}
          />
          <button
            onClick={() => setParam(router, sp, "q", inputRef.current?.value ?? "")}
            className="hidden rounded-[10px] bg-gradient-to-br from-auction-500 to-auction-600 px-4 py-2 text-sm font-bold text-white shadow-[0_2px_8px_rgba(249,115,22,0.4)] transition-transform active:scale-95 lg:inline-flex"
          >
            {t("search.find")}
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {PROMPT_KEYS.map((k) => {
            const p = t(k);
            return (
              <button
                key={k}
                onClick={() => setParam(router, sp, "q", p)}
                className="rounded-full border border-white/[0.06] bg-[#0f0f14] px-2.5 py-1 text-xs font-semibold text-white/70 transition-colors hover:border-brand-500/40 hover:bg-brand-500/10 hover:text-white"
              >
                {p}
              </button>
            );
          })}
        </div>
      </div>

      {q && (
        <div className="rounded-[12px] border border-brand-500/20 bg-brand-500/10 px-3 py-2.5 text-sm text-white/80">
          <span className="font-bold text-brand-400">AI:</span> {t("search.ai_parsed_prefix")} <b className="text-white">{q}</b> {t("search.ai_parsed_suffix")} <span className="text-white/40">{t("search.demo")}</span>
        </div>
      )}

      {/* Recent / Popular */}
      <div className="space-y-2">
        <p className="text-xs font-bold tracking-wide text-white/40">{t("search.recent")}</p>
        <div className="flex flex-wrap gap-1.5">
          {RECENT.map((r) => (
            <button
              key={r}
              onClick={() => setParam(router, sp, "q", r)}
              className="rounded-full border border-white/[0.06] bg-[#16161f] px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-brand-500/40 hover:text-white"
            >
              {r}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs font-bold tracking-wide text-white/40">{t("search.popular")}</p>
        <div className="flex flex-wrap gap-1.5">
          {POPULAR.map((p) => (
            <button
              key={p}
              onClick={() => setParam(router, sp, "q", p)}
              className="rounded-full border border-white/[0.06] bg-[#16161f] px-3 py-1.5 text-xs font-semibold text-white/70 transition-colors hover:border-auction-500/40 hover:text-white"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Filters — chips (dark) */}
      <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
        <select
          value={cat}
          onChange={(e) => setParam(router, sp, "cat", e.target.value)}
          className="rounded-full border border-white/[0.06] bg-[#16161f] px-3 py-2 text-xs font-bold text-white outline-none"
        >
          <option value="all">{t("search.all_categories")}</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id} className="bg-[#0f0f14]">
              {c.label}
            </option>
          ))}
        </select>
        <select
          value={city}
          onChange={(e) => setParam(router, sp, "city", e.target.value)}
          className="rounded-full border border-white/[0.06] bg-[#16161f] px-3 py-2 text-xs font-bold text-white outline-none"
        >
          <option value="all" className="bg-[#0f0f14]">
            {t("search.all_cities")}
          </option>
          {CITIES.map((c) => (
            <option key={c.value} value={c.value} className="bg-[#0f0f14]">
              {t(c.key)}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setParam(router, sp, "sort", e.target.value)}
          className="rounded-full border border-white/[0.06] bg-[#16161f] px-3 py-2 text-xs font-bold text-white outline-none"
        >
          <option value="new" className="bg-[#0f0f14]">{t("search.sort_new")}</option>
          <option value="price_asc" className="bg-[#0f0f14]">{t("search.sort_price_asc")}</option>
          <option value="price_desc" className="bg-[#0f0f14]">{t("search.sort_price_desc")}</option>
        </select>
        <button
          onClick={() => {
            const next = new URLSearchParams(sp.toString());
            if (next.get("auction") === "1") next.delete("auction");
            else next.set("auction", "1");
            router.push(`/search?${next.toString()}`);
          }}
          className={`shrink-0 rounded-full px-3 py-2 text-xs font-black transition-colors ${
            sp.get("auction") === "1"
              ? "bg-gradient-to-br from-auction-500 to-auction-600 text-white shadow-[0_2px_8px_rgba(249,115,22,0.4)]"
              : "border border-white/[0.06] bg-[#16161f] text-white/70"
          }`}
        >
          {t("search.auction")}
        </button>
        <button
          onClick={() => router.push("/search")}
          className="shrink-0 rounded-full border border-white/[0.06] bg-[#16161f] px-3 py-2 text-xs font-bold text-white/60 hover:text-white"
        >
          {t("search.reset")}
        </button>
      </div>
    </div>
  );
}
