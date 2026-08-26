import Link from "next/link";
import { IconGavel, IconBolt, IconStore, IconHeart } from "@/components/icons/Icons";

const QUICK: { label: string; href: string; icon: React.ReactNode; bg: string }[] = [
  { label: "Аукционы", href: "/auctions", icon: <IconGavel size={18} />, bg: "bg-ink text-white" },
  { label: "Купить сейчас", href: "/search?filter=buy_now", icon: <IconBolt size={18} />, bg: "bg-auction-50 text-auction-600" },
  { label: "Магазины", href: "/stores", icon: <IconStore size={18} />, bg: "bg-surface-dim" },
  { label: "Новинки", href: "/search?sort=new", icon: <span className="text-[11px] font-black tracking-wide">NEW</span>, bg: "bg-surface-dim" },
  { label: "Избранное", href: "/favorites", icon: <IconHeart size={18} />, bg: "bg-surface-dim" },
  { label: "Авто", href: "/search?cat=auto", icon: <span>🚗</span>, bg: "bg-surface-dim" },
  { label: "Электроника", href: "/search?cat=electronics", icon: <span>📱</span>, bg: "bg-surface-dim" },
  { label: "Ферма", href: "/search?cat=farm", icon: <span>🌾</span>, bg: "bg-surface-dim" },
];

/** Compact quick nav. First tile is the signature dark auction entry. */
export function QuickActions() {
  return (
    <div className="no-scrollbar flex gap-2.5 overflow-x-auto px-4 py-1">
      {QUICK.map((q) => (
        <Link key={q.label} href={q.href} className="flex shrink-0 flex-col items-center gap-1.5">
          <span className={`flex h-12 w-12 items-center justify-center rounded-[12px] border border-line/60 shadow-card transition hover:-translate-y-0.5 ${q.bg}`}>
            {q.icon}
          </span>
          <span className="max-w-[64px] text-center text-[11px] font-medium leading-tight">{q.label}</span>
        </Link>
      ))}
    </div>
  );
}
