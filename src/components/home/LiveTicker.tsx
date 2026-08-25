"use client";

import { useEffect, useState } from "react";

const EVENTS = [
  "Азамат выиграл iPhone 17 Pro Max",
  "Bek сделал ставку 41 500 сом",
  "Aida добавила в избранное MacBook Air M4",
  "Нурлан купил Toyota Camry",
  "TechMarket продал PlayStation 5",
  "Гульмира выиграла аукцион часов",
];

export function LiveTicker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % EVENTS.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="mx-4 flex items-center gap-2 rounded-full bg-ink px-3.5 py-2 text-xs text-white">
      <span className="live-dot h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
      <span className="truncate" key={i} role="status" aria-live="polite">
        {EVENTS[i]}
      </span>
      <span className="ml-auto hidden shrink-0 text-[11px] opacity-60 sm:inline">сейчас</span>
    </div>
  );
}
