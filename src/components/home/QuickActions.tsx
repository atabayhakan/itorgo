import Link from "next/link";

const QUICK = [
  { icon: "🔨", label: "Аукционы", href: "/auctions" },
  { icon: "⚡", label: "Купить сейчас", href: "/search?filter=buy_now" },
  { icon: "🏪", label: "Магазины", href: "/stores" },
  { icon: "🆕", label: "Новинки", href: "/search?sort=new" },
  { icon: "❤️", label: "Избранное", href: "/favorites" },
  { icon: "🚗", label: "Авто", href: "/search?cat=auto" },
  { icon: "📱", label: "Электроника", href: "/search?cat=electronics" },
  { icon: "🐄", label: "Ферма", href: "/search?cat=farm" },
];

export function QuickActions() {
  return (
    <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 py-2">
      {QUICK.map((q) => (
        <Link key={q.label} href={q.href} className="flex shrink-0 flex-col items-center gap-1.5">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface text-xl shadow-card">
            {q.icon}
          </span>
          <span className="max-w-[64px] text-center text-[11px] leading-tight font-medium">{q.label}</span>
        </Link>
      ))}
    </div>
  );
}
