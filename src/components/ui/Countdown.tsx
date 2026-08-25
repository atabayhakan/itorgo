"use client";

import { useEffect, useState } from "react";

function fmt(ms: number) {
  const t = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(t / 86400);
  if (d >= 1) return `${d}д ${String(Math.floor((t % 86400) / 3600)).padStart(2, "0")}:${String(Math.floor((t % 3600) / 60)).padStart(2, "0")}`;
  const m = Math.floor(t / 60);
  return `${String(m).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
}

export function Countdown({ endsAt, urgentSec = 10, className = "" }: {
  endsAt: string;
  urgentSec?: number;
  className?: string;
}) {
  const [now, setNow] = useState(() => Date.parse(endsAt));
  const ended = Date.parse(endsAt);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [endsAt]);
  const left = ended - now;
  const urgent = left <= urgentSec * 1000 && left > 0;
  if (left <= 0) return <span className={`chip bg-surface-sunken text-ink-faint ${className}`}>Завершён</span>;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-lg px-1.5 py-0.5 font-mono font-bold tabular-nums ${urgent ? "animate-pulse bg-danger-bg text-danger" : "text-ink-soft"} ${className}`}
      suppressHydrationWarning
    >
      {fmt(left)}
    </span>
  );
}
