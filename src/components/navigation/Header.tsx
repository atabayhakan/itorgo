"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconBell, IconSearch, IconUser } from "@/components/icons/Icons";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className="safe-top sticky top-0 z-40 bg-surface-dim/85 backdrop-blur-lg">
      <div className={`mx-auto flex max-w-xl items-center gap-2.5 px-4 transition-all duration-300 ${scrolled ? "py-2" : "py-3.5"}`}>
        {!scrolled && (
          <Link href="/" className="shrink-0 text-[19px] font-black tracking-tight">
            <span className="text-brand-700">IT</span>
            <span className="text-auction-600">Orgo</span>
          </Link>
        )}
        <Link
          href="/search"
          className="flex min-h-10 flex-1 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm text-ink-faint shadow-card"
        >
          <IconSearch size={17} />
          <span className="truncate">Что вы ищете?</span>
          <span className="ml-auto chip hidden bg-brand-50 text-brand-600 sm:inline-flex">🤖 AI</span>
        </Link>
        <Link href="/notifications" aria-label="Уведомления" className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface text-ink-soft shadow-card">
          <IconBell size={20} />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-danger ring-2 ring-white" />
        </Link>
        <Link href="/profile" aria-label="Профиль" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface text-ink-soft shadow-card">
          <IconUser size={20} />
        </Link>
      </div>
    </header>
  );
}
