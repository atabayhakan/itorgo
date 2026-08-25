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
      className="btn-primary fixed right-4 bottom-[86px] z-40 !min-h-14 !rounded-full !px-6 shadow-lifted"
      aria-label="Продать"
    >
      {pressed ? (
        <span className="rise-in flex items-center gap-2">🤖 Загружаем AI-помощника…</span>
      ) : (
        <>
          <IconPlus size={20} strokeWidth={2.4} /> Продать
        </>
      )}
    </button>
  );
}
