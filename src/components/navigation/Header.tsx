"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconBell, IconSearch, IconUser } from "@/components/icons/Icons";
import { CartBadge } from "@/components/cart/CartBadge";
import { useT } from "@/lib/i18n/LocaleProvider";

export function Header() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className="safe-top sticky top-0 z-40 bg-[#0f0f14]/95 backdrop-blur-xl lg:hidden">
      <div className={`mx-auto flex max-w-xl items-center gap-2 px-3 transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}>
        {!scrolled && (
          <Link href="/" className="shrink-0 text-[18px] font-black tracking-tight">
            <span className="text-brand-400">IT</span>
            <span className="text-auction-400">Orgo</span>
          </Link>
        )}
        <Link
          href="/search"
          className="flex min-h-11 min-w-0 flex-1 items-center gap-2.5 rounded-2xl border border-white/[0.08] bg-[#16161f] px-3.5 text-[14px] text-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:border-white/15 hover:bg-[#1a1a28] transition"
        >
          <IconSearch size={18} className="shrink-0 text-white/40" />
          <span className="min-w-0 truncate font-medium">{t("common.search_placeholder")}</span>
          <span className="ml-auto shrink-0 rounded-lg bg-auction-600/20 px-1.5 py-0.5 text-[10px] font-bold text-auction-400 tracking-wide">AI</span>
        </Link>
        <CartBadge />
        <Link href="/notifications" aria-label={t("nav.notifications")} className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a1a22] text-white/70 shadow-lg shadow-black/20">
          <IconBell size={20} />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-auction-500 ring-2 ring-[#0f0f14]" />
        </Link>
        <Link href="/profile" aria-label={t("nav.profile")} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a1a22] text-white/70 shadow-lg shadow-black/20">
          <IconUser size={20} />
        </Link>
      </div>
    </header>
  );
}
