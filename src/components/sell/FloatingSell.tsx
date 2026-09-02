"use client";

import { useState } from "react";
import { IconPlus } from "@/components/icons/Icons";

export function FloatingSell() {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={() => {
        setPressed(true);
        setTimeout(() => setPressed(false), 900);
      }}
      className="fixed right-4 bottom-[86px] z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-auction-500 to-auction-700 text-white shadow-[0_8px_28px_-6px_rgba(249,115,22,0.55)] transition-transform duration-150 active:scale-95 hover:shadow-[0_12px_36px_-8px_rgba(249,115,22,0.65)]"
      aria-label="Продать"
    >
      {pressed ? (
        <span className="rise-in text-[10px] font-bold">AI…</span>
      ) : (
        <IconPlus size={22} strokeWidth={2.4} />
      )}
    </button>
  );
}
