"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconBell, IconSearch, IconUser } from "@/components/icons/Icons";
import { CartBadge } from "@/components/cart/CartBadge";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className="safe-top sticky top-0 z-40 bg-[#0f0f14]/95 backdrop-blur-xl lg:hidden">
      <div className={`mx-auto flex max-w-xl items-center gap-2.5 px-4 transition-all duration-300 ${scrolled ? "py-2" : "py-3.5"}`}>
        {!scrolled && (
          <Link href="/" className="shrink-0 text-[19px] font-black tracking-tight">
            <span className="text-brand-400">IT</span>
            <span className="text-auction-400">Orgo</span>
          </Link>
        )}
        <Link
          href="/search"
          className="flex min-h-12 flex-1 items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#16161f] px-5 text-[15px] text-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:border-white/15 hover:bg-[#1a1a28] transition"
        >
          <IconSearch size={20} className="text-white/40" />
          <span className="truncate font-medium">Что вы ищете?</span>
          <span className="ml-auto shrink-0 rounded-lg bg-auction-600/20 px-2 py-0.5 text-[10px] font-bold text-auction-400 tracking-wide">AI</span>
        </Link>
        <CartBadge />
        <Link href="/notifications" aria-label="Уведомления" className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a1a22] text-white/70 shadow-lg shadow-black/20">
          <IconBell size={20} />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-auction-500 ring-2 ring-[#0f0f14]" />
        </Link>
        <Link href="/profile" aria-label="Профиль" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a1a22] text-white/70 shadow-lg shadow-black/20">
          <IconUser size={20} />
        </Link>
      </div>
    </header>
  );
}
