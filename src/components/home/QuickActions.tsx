import Link from "next/link";
import { IconGavel, IconBolt, IconStore, IconHeart, IconSearch } from "@/components/icons/Icons";

const QUICK: { label: string; href: string; icon: React.ReactNode; bg: string }[] = [
  { label: "Аукционы", href: "/auctions", icon: <IconGavel size={18} />, bg: "bg-brand-50 text-brand-700" },
  { label: "Купить сейчас", href: "/search?filter=buy_now", icon: <IconBolt size={18} />, bg: "bg-auction-50 text-auction-600" },
  { label: "Магазины", href: "/stores", icon: <IconStore size={18} />, bg: "bg-emerald-50 text-emerald-700" },
  { label: "Новинки", href: "/search?sort=new", icon: <span className="text-sm font-black">NEW</span>, bg: "bg-surface-dim" },
  { label: "Избранное", href: "/favorites", icon: <IconHeart size={18} />, bg: "bg-rose-50 text-rose-600" },
  { label: "Авто", href: "/search?cat=auto", icon: <span>🚗</span>, bg: "bg-surface-dim" },
  { label: "Электроника", href: "/search?cat=electronics", icon: <IconSearch size={18} />, bg: "bg-surface-dim" },
  { label: "Ферма", href: "/search?cat=farm", icon: <span>🌾</span>, bg: "bg-surface-dim" },
];

export function QuickActions() {
  return (
    <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 py-2">
      {QUICK.map((q) => (
        <Link key={q.label} href={q.href} className="flex shrink-0 flex-col items-center gap-1.5">
          <span className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-card ${q.bg}`}>{q.icon}</span>
          <span className="max-w-[64px] text-center text-[11px] leading-tight font-semibold">{q.label}</span>
        </Link>
      ))}
    </div>
  );
}
