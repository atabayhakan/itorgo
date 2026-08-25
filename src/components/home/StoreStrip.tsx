import Link from "next/link";
import { STORES } from "@/lib/data/mock-data";
import { Avatar } from "@/components/ui/ProductImage";
import { IconVerified } from "@/components/icons/Icons";

export function StoreStrip() {
  return (
    <div className="no-scrollbar flex gap-3 overflow-x-auto px-4">
      {STORES.slice(0, 8).map((s) => (
        <Link
          key={s.id}
          href={`/store/${s.id}`}
          className="group flex w-[172px] shrink-0 flex-col overflow-hidden rounded-[18px] bg-surface shadow-card transition hover:-translate-y-0.5 hover:shadow-lifted"
        >
          <div className="h-[64px] w-full bg-gradient-to-br from-brand-100 to-brand-200" />
          <div className="-mt-7 px-3 pb-3">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-surface px-2 py-1 shadow">
              <Avatar name={s.name} seed={s.logoSeed} size={26} />
              {s.verified && <IconVerified size={13} />}
            </div>
            <p className="mt-2 line-clamp-1 text-sm font-black tracking-tight">{s.name}</p>
            <p className="text-xs text-ink-faint">⭐ {s.rating} · {s.followers.toLocaleString("ru-RU")} · {s.salesCount} продаж</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
