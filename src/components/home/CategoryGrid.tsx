import Link from "next/link";
import { CATEGORIES } from "@/lib/data/mock-data";
import { CategoryIcon } from "@/components/icons/CategoryIcon";

/** Compact professional categories — SVG icons, white cards, product counts. */
const COUNTS: Record<string, number> = {
  electronics: 1240, auto: 860, realty: 430, clothes: 2100, beauty: 640,
  home: 980, animals: 320, farm: 210, services: 540, construction: 380,
  watches: 150, jewelry: 260, games: 470, books: 690, sport: 520, collectibles: 180,
};

export function CategoryGrid() {
  const shown = CATEGORIES.slice(0, 16);
  return (
    <div className="grid grid-cols-4 gap-2 px-4 lg:grid-cols-8 lg:px-0">
      {shown.map((c) => (
        <Link
          key={c.id}
          href={`/search?cat=${c.id}`}
          className="group flex flex-col items-center gap-2 rounded-[12px] border border-line/60 bg-surface px-1 py-3.5 transition-all hover:-translate-y-0.5 hover:border-line hover:shadow-card"
        >
          <span className="text-ink-soft transition group-hover:text-brand-700">
            <CategoryIcon id={c.id} size={20} />
          </span>
          <span className="text-center text-[11px] font-medium leading-tight">{c.label}</span>
          <span className="text-[10px] text-ink-faint">{(COUNTS[c.id] ?? 0).toLocaleString("ru-RU")}</span>
        </Link>
      ))}
    </div>
  );
}
