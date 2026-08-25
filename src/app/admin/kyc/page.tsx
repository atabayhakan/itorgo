"use client";

import { DataDenseTable, type Column } from "@/components/admin/DataDenseTable";

type KycRow = { id: string; user: string; type: string; status: string; at: string; score: number };

const rows: KycRow[] = [
  { id: "k1", user: "s2 · Bek Store", type: "doc · паспорт", status: "pending", at: "2026-08-25 09:14", score: 72 },
  { id: "k2", user: "s7 · Гульмира Ж.", type: "doc · паспорт", status: "rejected", at: "2026-08-25 08:40", score: 44 },
  { id: "k3", user: "s5 · TechMarket KG", type: "business · ИП", status: "verified", at: "2026-08-24 16:02", score: 96 },
  { id: "k4", user: "s9 · Нурлан А.", type: "bank · счёт", status: "pending", at: "2026-08-25 10:00", score: 68 },
  { id: "k5", user: "s12 · Ulut Shop", type: "doc · паспорт", status: "verified", at: "2026-08-24 18:11", score: 94 },
  { id: "k6", user: "s15 · Эржан Б.", type: "phone · +996", status: "verified", at: "2026-08-25 07:30", score: 88 },
];

export default function AdminKycPage() {
  const cols: Column<KycRow>[] = [
    { key: "id", header: "ID", width: "60px" },
    { key: "user", header: "Пользователь", sortable: true },
    { key: "type", header: "Тип" },
    { key: "status", header: "Статус", align: "center", render: (r) => <span className={`chip ${r.status === "verified" ? "bg-success-bg text-success" : r.status === "pending" ? "bg-warning-bg text-warning" : "bg-danger-bg text-danger"}`}>{r.status}</span> },
    { key: "score", header: "Trust", align: "right", sortable: true, render: (r) => <span className={`font-black tabular-nums ${r.score >= 80 ? "text-success" : r.score >= 60 ? "text-warning" : "text-danger"}`}>{r.score}%</span> },
    { key: "at", header: "Время", width: "130px", sortable: true },
  ];

  return (
    <main className="min-h-dvh bg-surface-dim">
      <div className="sticky top-0 bg-surface px-4 py-3 shadow-sm">
        <a href="/admin" className="text-sm font-bold">← Admin</a> <span className="ml-2 text-sm font-semibold">KYC очередь</span>
      </div>
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between text-xs">
          <span className="text-ink-faint">{rows.length} заявок · телефон/email/документы/банк — spec #47</span>
          <span className="rounded-full bg-surface px-3 py-1 font-bold shadow-card">Очередь ▾</span>
        </div>
        {/* @ts-ignore */}
        <DataDenseTable columns={cols} rows={rows} sortKey="score" sortDir="desc" />
        <p className="mt-2 text-xs text-ink-faint">TODO: `prisma.kyc.findMany` + `verification` + approve/reject → AuditLog</p>
      </div>
    </main>
  );
}
