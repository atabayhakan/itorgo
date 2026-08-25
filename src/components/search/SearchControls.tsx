"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/data/mock-data";

const CITIES = ["Все города", "Бишкек", "Ош", "Джалал-Абад", "Каракол", "Токмок"];

function setParam(router: ReturnType<typeof useRouter>, sp: URLSearchParams, key: string, value: string) {
  const next = new URLSearchParams(sp.toString());
  if (!value || value === "Все города" || value === "all") next.delete(key);
  else next.set(key, value);
  router.push(`/search?${next.toString()}`);
}

export function SearchControls() {
  const router = useRouter();
  const sp = useSearchParams();
  const q = sp.get("q") ?? "";
  const cat = sp.get("cat") ?? "all";
  const city = sp.get("city") ?? "Все города";
  const sort = sp.get("sort") ?? "new";

  return (
    <div className="space-y-3">
      {/* q */}
      <div className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 shadow-card">
        <span className="text-ink-faint">🔍</span>
        <input
          defaultValue={q}
          placeholder="Что вы ищете?  ·  iPhone до 50000 сом в Бишкеке"
          className="w-full bg-transparent text-sm outline-none placeholder:text-ink-faint"
          onKeyDown={(e) => {
            if (e.key === "Enter") setParam(router, sp, "q", (e.target as HTMLInputElement).value);
          }}
        />
        <button
          onClick={() => setParam(router, sp, "q", (document.querySelector('input[placeholder*="Что вы"]') as HTMLInputElement)?.value ?? "")}
          className="rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white"
        >
          Найти
        </button>
      </div>

      {/* AI parsing preview */}
      {q && (
        <div className="rounded-2xl bg-brand-50 px-4 py-3 text-sm">
          <span className="font-semibold">🤖 AI:</span>{" "}
          <span className="text-ink-soft">
            Понял запрос как <b>{q}</b> — категория, цена и город определены автоматически. <span className="text-ink-faint">(демо-парсинг)</span>
          </span>
        </div>
      )}

      {/* Chips */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        <select
          value={cat}
          onChange={(e) => setParam(router, sp, "cat", e.target.value)}
          className="rounded-full border border-line bg-surface px-3 py-2 text-sm font-medium"
        >
          <option value="all">Все категории</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.emoji} {c.label}
            </option>
          ))}
        </select>

        <select
          value={city}
          onChange={(e) => setParam(router, sp, "city", e.target.value)}
          className="rounded-full border border-line bg-surface px-3 py-2 text-sm font-medium"
        >
          {CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setParam(router, sp, "sort", e.target.value)}
          className="rounded-full border border-line bg-surface px-3 py-2 text-sm font-medium"
        >
          <option value="new">Новинки</option>
          <option value="price_asc">Дешевле</option>
          <option value="price_desc">Дороже</option>
        </select>

        <button
          onClick={() => {
            const next = new URLSearchParams(sp.toString());
            if (next.get("auction") === "1") next.delete("auction");
            else next.set("auction", "1");
            router.push(`/search?${next.toString()}`);
          }}
          className={`shrink-0 rounded-full px-3 py-2 text-sm font-bold ${sp.get("auction") === "1" ? "bg-auction-500 text-white" : "border border-line bg-surface text-ink-soft"}`}
        >
          🔥 Аукцион
        </button>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push("/search")}
          className="text-xs font-semibold text-ink-faint underline"
        >
          Сбросить фильтры
        </button>
        <span className="text-xs text-ink-faint">🤖 Помочь найти? — опишите словами, AI разберёт</span>
      </div>
    </div>
  );
}
