"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconGavel, IconHeart, IconHome, IconSearch, IconUser } from "@/components/icons/Icons";

const TABS = [
  { href: "/", label: "Главная", icon: IconHome },
  { href: "/categories", label: "Каталог", icon: IconSearch },
  { href: "/auctions", label: "Аукционы", icon: IconGavel, live: true as const },
  { href: "/favorites", label: "Избранное", icon: IconHeart },
  { href: "/profile", label: "Профиль", icon: IconUser },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0f0f14]/95 backdrop-blur-xl safe-bottom">
      <div className="mx-auto grid max-w-xl grid-cols-5">
        {TABS.map(({ href, label, icon: Icon, live }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex min-h-[60px] flex-col items-center justify-center gap-0.5 pt-1.5 pb-2 text-[10px] font-medium transition-colors ${active ? "text-white" : "text-white/40 hover:text-white/70"}`}
            >
              <span className="relative">
                <Icon size={22} strokeWidth={active ? 2.2 : 1.8} />
                {live && <span className="live-dot absolute -top-0.5 -right-1 h-2 w-2 rounded-full bg-auction-500 ring-2 ring-[#0f0f14]" />}
              </span>
              {label}
              {active && <span className="absolute top-0 h-[2px] w-6 rounded-full bg-auction-500" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
