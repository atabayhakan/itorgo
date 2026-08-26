"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/data/mock-data";
import { CategoryIcon } from "@/components/icons/CategoryIcon";

const CITIES = ["Все города", "Бишкек", "Ош", "Джалал-Абад", "Каракол", "Токмок"];
const RECENT = ["iPhone до 50000", "Кроссовки Nike", "Квартира центр"];
const POPULAR = ["Смартфоны", "Авто", "Часы", "Кроссовки", "Диван"];

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
    <div className="space-y-4">
      {/* Command palette input — editorial */}
      <div className="rounded-[16px] border border-line bg-surface p-3 shadow-card">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-ink text-white">⌘</span>
          <input
            defaultValue={q}
            placeholder="Что вы ищете?  ·  Я хочу iPhone до 50000 сом в Бишкеке"
            className="w-full bg-transparent text-[15px] font-medium outline-none placeholder:text-ink-faint"
            onKeyDown={(e) => {
              if (e.key === "Enter") setParam(router, sp, "q", (e.target as HTMLInputElement).value);
            }}
          />
          <button
            onClick={() => setParam(router, sp, "q", (document.querySelector('input[placeholder*="Что вы"]') as HTMLInputElement)?.value ?? "")}
            className="hidden rounded-[10px] bg-ink px-4 py-2 text-sm font-bold text-white lg:inline-flex"
          >
            Найти
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["Найти телефон", "Найти автомобиль", "Найти подарок", "Найти аукцион", "Сравнить товары"].map((p) => (
            <button key={p} onClick={() => setParam(router, sp, "q", p)} className="rounded-full bg-surface-dim px-2.5 py-1 text-xs font-semibold hover:bg-brand-50">
              {p}
            </button>
          ))}
        </div>
      </div>

      {q && (
        <div className="rounded-[12px] bg-brand-50 px-3 py-2.5 text-sm">
          <span className="font-bold">🤖 AI:</span> Понял как <b>{q}</b> — категория/цена/город auto. <span className="text-ink-faint">(демо)</span>
        </div>
      )}

      {/* Recent / Popular */}
      <div className="space-y-2">
        <p className="text-xs font-bold tracking-wide text-ink-faint">НЕДАВНИЕ</p>
        <div className="flex flex-wrap gap-1.5">
          {RECENT.map((r) => (
            <button key={r} onClick={() => setParam(router, sp, "q", r)} className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium">
              🕘 {r}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs font-bold tracking-wide text-ink-faint">ПОПУЛЯРНЫЕ</p>
        <div className="flex flex-wrap gap-1.5">
          {POPULAR.map((p) => (
            <button key={p} onClick={() => setParam(router, sp, "q", p)} className="rounded-full bg-surface-dim px-3 py-1.5 text-xs font-semibold">
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Filters — chips */}
      <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
        <select value={cat} onChange={(e) => setParam(router, sp, "cat", e.target.value)} className="rounded-full border border-line bg-surface px-3 py-2 text-xs font-bold">
          <option value="all">Все категории</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
        <select value={city} onChange={(e) => setParam(router, sp, "city", e.target.value)} className="rounded-full border border-line bg-surface px-3 py-2 text-xs font-bold">
          {CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setParam(router, sp, "sort", e.target.value)} className="rounded-full border border-line bg-surface px-3 py-2 text-xs font-bold">
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
          className={`shrink-0 rounded-full px-3 py-2 text-xs font-black ${sp.get("auction") === "1" ? "bg-ink text-white" : "border border-line bg-surface"}`}
        >
          Аукцион
        </button>
        <button onClick={() => router.push("/search")} className="shrink-0 rounded-full bg-surface-dim px-3 py-2 text-xs font-bold">
          Сброс
        </button>
      </div>
    </div>
  );
}
