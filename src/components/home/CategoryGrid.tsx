import Link from "next/link";
import { CATEGORIES } from "@/lib/data/mock-data";

export function CategoryGrid() {
  const shown = CATEGORIES.slice(0, 16);
  return (
    <div className="grid grid-cols-4 gap-2 px-2">
      {shown.map((c) => (
        <Link
          key={c.id}
          href={`/search?cat=${c.id}`}
          className="flex flex-col items-center gap-1.5 rounded-2xl bg-surface px-1 py-3 shadow-card transition active:scale-[0.98]"
        >
          <span className="text-[22px] leading-none">{c.emoji}</span>
          <span className="text-center text-[11px] leading-tight font-medium">{c.label}</span>
        </Link>
      ))}
      <Link
        href="/categories"
        className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-line bg-surface-dim px-1 py-3 text-ink-soft"
      >
        <span className="text-lg">⊕</span>
        <span className="text-[11px] font-semibold">Все категории</span>
      </Link>
    </div>
  );
}
