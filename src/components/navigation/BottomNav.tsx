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
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 backdrop-blur-lg safe-bottom">
      <div className="mx-auto grid max-w-xl grid-cols-5">
        {TABS.map(({ href, label, icon: Icon, live }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex min-h-[56px] flex-col items-center justify-center gap-0.5 pt-1 pb-1.5 text-[10px] font-medium transition-colors ${active ? "text-brand-600" : "text-ink-faint"}`}
            >
              <span className="relative">
                <Icon size={22} strokeWidth={active ? 2.2 : 1.8} />
                {live && <span className="live-dot absolute -top-0.5 -right-1 h-2 w-2 rounded-full bg-danger ring-2 ring-surface" />}
              </span>
              {label}
              {active && <span className="absolute top-0 h-0.75 w-8 rounded-full bg-brand-600" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
