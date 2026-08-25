"use client";

import { DataDenseTable, type Column } from "@/components/admin/DataDenseTable";

type PushRow = { id: string; to: string; title: string; status: string; at: string };

const rows: PushRow[] = [
  { id: "ps1", to: "s1 · +996555***01", title: "Ваша ставка перебита — 43 000 сом", status: "delivered", at: "2026-08-25 10:14" },
  { id: "ps2", to: "broadcast · 4 210", title: "Новые аукционы — iPhone 17 Pro", status: "sent", at: "2026-08-25 09:00" },
  { id: "ps3", to: "s7 · +996555***07", title: "KYC одобрен", status: "delivered", at: "2026-08-24 18:22" },
  { id: "ps4", to: "s5 · +996555***05", title: "Заказ o2041 оплачен", status: "failed", at: "2026-08-24 16:00" },
];

export default function AdminPushPage() {
  const cols: Column<PushRow>[] = [
    { key: "id", header: "ID", width: "70px" },
    { key: "to", header: "Кому", sortable: true },
    { key: "title", header: "Сообщение" },
    { key: "status", header: "Статус", align: "center", render: (r) => <span className={`chip ${r.status === "delivered" ? "bg-success-bg text-success" : r.status === "sent" ? "bg-info-bg text-info" : "bg-danger-bg text-danger"}`}>{r.status}</span> },
    { key: "at", header: "Время", width: "130px", sortable: true },
  ];

  return (
    <main className="min-h-dvh bg-surface-dim">
      <div className="sticky top-0 bg-surface px-4 py-3 shadow-sm">
        <a href="/admin" className="text-sm font-bold">← Admin</a> <span className="ml-2 text-sm font-semibold">Push log</span>
      </div>
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between text-xs">
          <span className="text-ink-faint">{rows.length} отправок · PWA push · spec #56 · TODO: VAPID + SW</span>
          <span className="rounded-full bg-surface px-3 py-1 font-bold shadow-card">Фильтр ▾</span>
        </div>
        {/* @ts-ignore */}
        <DataDenseTable columns={cols} rows={rows} sortKey="at" sortDir="desc" />
        <p className="mt-2 text-xs text-ink-faint">TODO: `prisma.pushSubscription` + `web-push` + `/api/push/send`</p>
      </div>
    </main>
  );
}
