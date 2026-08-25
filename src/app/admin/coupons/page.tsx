"use client";

import { useState } from "react";
import { DataDenseTable, type Column } from "@/components/admin/DataDenseTable";
import { COUPONS, type Coupon } from "@/lib/coupons/coupons";

type Row = Coupon & { id: string };

export default function AdminCouponsPage() {
  const [rows, setRows] = useState<Row[]>(COUPONS.map((c) => ({ ...c, id: c.code })));
  const [code, setCode] = useState("");
  const [pct, setPct] = useState("10");

  function add() {
    if (!code.trim()) return;
    setRows((r) => [{ id: code.trim().toUpperCase(), code: code.trim().toUpperCase(), discountPct: Number(pct) || 10, active: true }, ...r]);
    setCode(""); setPct("10");
  }

  const cols: Column<Row>[] = [
    { key: "code", header: "Код", sortable: true, render: (r) => <span className="font-mono text-xs font-black">{r.code}</span> },
    { key: "discountPct", header: "Скидка", align: "right", sortable: true, render: (r) => <span className="font-black tabular-nums">−{r.discountPct}%</span> },
    { key: "active", header: "Статус", align: "center", render: (r) => <span className={`chip ${r.active ? "bg-success-bg text-success" : "bg-surface-sunken text-ink-faint"}`}>{r.active ? "active" : "inactive"}</span> },
    { key: "endsAt", header: "До", width: "110px", render: (r) => <span className="text-xs">{r.endsAt ?? "—"}</span> },
    {
      key: "actions",
      header: "",
      width: "90px",
      align: "center",
      render: (r) => (
        <button onClick={() => setRows((rs) => rs.map((x) => (x.id === r.id ? { ...x, active: !x.active } : x)))} className={`rounded-full px-3 py-1 text-xs font-bold ${r.active ? "bg-warning-bg text-warning" : "bg-success-bg text-success"}`}>
          {r.active ? "Выкл" : "Вкл"}
        </button>
      ),
    },
  ];

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
        <div className="mt-3">
          {/* @ts-ignore */}
          <DataDenseTable columns={cols} rows={rows} sortKey="code" />
        </div>
      </div>
    </main>
  );
}
