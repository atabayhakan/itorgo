"use client";

import { DataDenseTable, type Column } from "@/components/admin/DataDenseTable";

type FraudRow = { id: string; kind: string; subject: string; score: number; status: string; at: string };

const rows: FraudRow[] = [
  { id: "f1", kind: "shill_bidding", subject: "auction a3", score: 82, status: "open", at: "2026-08-25 08:15" },
  { id: "f2", kind: "duplicate_account", subject: "user s7", score: 64, status: "reviewing", at: "2026-08-25 09:02" },
  { id: "f3", kind: "fake_listing", subject: "product p12", score: 91, status: "open", at: "2026-08-25 09:41" },
  { id: "f4", kind: "suspicious_payment", subject: "payment pay_9x", score: 77, status: "open", at: "2026-08-25 10:02" },
  { id: "f5", kind: "abnormal_login", subject: "user s15", score: 58, status: "closed", at: "2026-08-24 22:11" },
  { id: "f6", kind: "duplicate_image", subject: "product p27", score: 88, status: "open", at: "2026-08-24 18:33" },
];

export default function AdminFraudPage() {
  const cols: Column<FraudRow>[] = [
    { key: "id", header: "ID", width: "70px", sortable: true },
    { key: "kind", header: "Тип", sortable: true, render: (r) => <span className="font-mono text-xs font-bold">{r.kind}</span> },
    { key: "subject", header: "Субъект", render: (r) => <span className="text-xs">{r.subject}</span> },
    { key: "score", header: "Score", align: "right", sortable: true, render: (r) => <span className={`font-black tabular-nums ${r.score >= 80 ? "text-danger" : r.score >= 60 ? "text-warning" : "text-ink-soft"}`}>{r.score}%</span> },
    { key: "status", header: "Статус", align: "center", render: (r) => <span className={`chip ${r.status === "open" ? "bg-danger-bg text-danger" : r.status === "reviewing" ? "bg-warning-bg text-warning" : "bg-success-bg text-success"}`}>{r.status}</span> },
    { key: "at", header: "Время", width: "130px", sortable: true },
  ];

  return (
    <main className="min-h-dvh bg-surface-dim">
      <div className="sticky top-0 bg-surface px-4 py-3 shadow-sm">
        <a href="/admin" className="text-sm font-bold">← Admin</a> <span className="ml-2 text-sm font-semibold">Fraud Center</span>
      </div>
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between text-xs">
          <span className="text-ink-faint">{rows.length} кейсов · score &gt;70 → auto-case · spec #46</span>
          <span className="rounded-full bg-surface px-3 py-1 font-bold shadow-card">Фильтр ▾</span>
        </div>
        {/* @ts-ignore */}
        <DataDenseTable columns={cols} rows={rows} sortKey="score" sortDir="desc" />
        <p className="mt-2 text-xs text-ink-faint">TODO: `prisma.fraudCase.findMany` + engine evaluateFraud(subjectId)</p>
      </div>
    </main>
  );
}
