import Link from "next/link";
import { CATEGORIES } from "@/lib/data/mock-data";

export function CategoryGrid() {
  const shown = CATEGORIES.slice(0, 16);
  return (
    <div className="grid grid-cols-4 gap-2 px-2 lg:grid-cols-8">
      {shown.map((c) => (
        <Link
          key={c.id}
          href={`/search?cat=${c.id}`}
          className="group flex flex-col items-center gap-2 rounded-[18px] bg-surface px-1 py-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lifted active:scale-[0.98]"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-dim text-[20px] transition group-hover:bg-brand-50">{c.emoji}</span>
          <span className="text-center text-[11px] font-bold leading-tight tracking-tight">{c.label}</span>
        </Link>
      ))}
      <Link
        href="/categories"
        className="flex flex-col items-center justify-center gap-2 rounded-[18px] border border-dashed border-line bg-surface-dim px-1 py-4 text-ink-soft transition hover:bg-surface"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-lg">⊕</span>
        <span className="text-[11px] font-black tracking-wide">Все категории</span>
      </Link>
    </div>
  );
}
