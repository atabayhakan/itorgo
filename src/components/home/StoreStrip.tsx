import { STORES } from "@/lib/data/mock-data";
import { Avatar } from "@/components/ui/ProductImage";
import { IconVerified } from "@/components/icons/Icons";

export function StoreStrip() {
  return (
    <div className="no-scrollbar flex gap-3 overflow-x-auto px-4">
      {STORES.slice(0, 8).map((s) => (
        <div key={s.id} className="flex w-[168px] shrink-0 flex-col overflow-hidden rounded-2xl bg-surface shadow-card">
          <div className="h-[62px] w-full" style={{ background: `linear-gradient(135deg, #e0e7ff, #c7d2fe)` }} />
          <div className="-mt-6 px-3 pb-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-surface px-2 py-1 shadow-card">
              <Avatar name={s.name} seed={s.logoSeed} size={28} />
              {s.verified && <IconVerified size={14} />}
            </div>
            <p className="mt-2 line-clamp-1 text-sm font-semibold">{s.name}</p>
            <p className="text-xs text-ink-faint">
              ⭐ {s.rating} · {s.followers.toLocaleString("ru-RU")} подписчиков
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
