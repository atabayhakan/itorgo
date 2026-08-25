"use client";

import { useState } from "react";
import { COUPONS, type Coupon } from "@/lib/coupons/coupons";

export default function AdminCouponsPage() {
  const [list, setList] = useState<Coupon[]>(COUPONS);
  const [code, setCode] = useState("");
  const [pct, setPct] = useState("10");

  function add() {
    if (!code.trim()) return;
    setList((l) => [{ code: code.trim().toUpperCase(), discountPct: Number(pct) || 10, active: true }, ...l]);
    setCode(""); setPct("10");
  }

  return (
    <main className="min-h-dvh bg-surface-dim">
      <div className="sticky top-0 bg-surface px-4 py-3 shadow-sm">
        <a href="/admin" className="text-sm font-bold">← Admin</a> <span className="ml-2 text-sm font-semibold">Купоны</span>
      </div>
      <div className="p-4">
        <div className="flex gap-2">
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Код (SALAM20)" className="flex-1 rounded-xl border border-line bg-surface px-3 py-2 text-sm" />
          <input value={pct} onChange={(e) => setPct(e.target.value)} placeholder="%" className="w-20 rounded-xl border border-line bg-surface px-3 py-2 text-sm" />
          <button onClick={add} className="rounded-xl bg-ink px-4 py-2 text-sm font-bold text-white">Добавить</button>
        </div>
        <p className="mt-1 text-xs text-ink-faint">Spec Coupon · `code unique`, `discount`, `active`, `endsAt` — TODO: prisma.coupon</p>
        <ul className="mt-4 space-y-2">
          {list.map((c) => (
            <li key={c.code} className="flex items-center justify-between rounded-2xl bg-surface px-4 py-3 shadow-card">
              <div>
                <p className="font-mono text-sm font-bold">{c.code}</p>
                <p className="text-xs text-ink-faint">−{c.discountPct}% {c.endsAt ? `· до ${c.endsAt}` : ""}</p>
              </div>
              <span className={`chip ${c.active ? "bg-success-bg text-success" : "bg-surface-sunken text-ink-faint"}`}>{c.active ? "active" : "inactive"}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
