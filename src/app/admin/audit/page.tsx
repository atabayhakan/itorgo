"use client";

import { DataDenseTable, type Column } from "@/components/admin/DataDenseTable";

type AuditRow = { id: string; actor: string; action: string; target: string; at: string; ip: string; diff: string };

const rows: AuditRow[] = [
  { id: "a1", actor: "admin@itorgo.kg", action: "feature.toggle", target: "kz=ON", at: "2026-08-25 10:02", ip: "212.112.***.45", diff: "kz: false → true" },
  { id: "a2", actor: "kyc@itorgo.kg", action: "kyc.approve", target: "user s5", at: "2026-08-25 09:41", ip: "212.112.***.12", diff: "kyc: pending → verified" },
  { id: "a3", actor: "fraud@itorgo.kg", action: "fraud.case_open", target: "auction a3", at: "2026-08-25 08:15", ip: "212.112.***.88", diff: "status: — → open" },
  { id: "a4", actor: "admin@itorgo.kg", action: "product.update", target: "p12", at: "2026-08-25 07:30", ip: "212.112.***.45", diff: "price: 24500 → 23900" },
  { id: "a5", actor: "support@itorgo.kg", action: "order.refund", target: "o2041", at: "2026-08-24 18:02", ip: "212.112.***.33", diff: "status: paid → refunded" },
  { id: "a6", actor: "admin@itorgo.kg", action: "cms.update", target: "auction.bid", at: "2026-08-24 14:11", ip: "212.112.***.45", diff: "ru: Ставка → Сделать ставку" },
];

export default function AdminAuditPage() {
  const cols: Column<AuditRow>[] = [
    { key: "at", header: "Когда", width: "130px", sortable: true },
    { key: "actor", header: "Кто", sortable: true },
    { key: "action", header: "Что", sortable: true, render: (r) => <span className="font-mono text-xs font-bold">{r.action}</span> },
    { key: "target", header: "Кого/что", render: (r) => <span className="text-xs">{r.target}</span> },
    { key: "diff", header: "Старое → новое", render: (r) => <span className="font-mono text-xs">{r.diff}</span> },
    { key: "ip", header: "IP", width: "110px" },
  ];

  return (
    <main className="min-h-dvh bg-surface-dim">
      <div className="sticky top-0 bg-surface px-4 py-3 shadow-sm">
        <a href="/admin" className="text-sm font-bold">← Admin</a> <span className="ml-2 text-sm font-semibold">Audit Log</span>
      </div>
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between text-xs">
          <span className="text-ink-faint">{rows.length} записей · кто/что/когда/old→new · spec #52</span>
          <span className="rounded-full bg-surface px-3 py-1 font-bold shadow-card">Фильтр ▾</span>
        </div>
        {/* @ts-ignore */}
        <DataDenseTable columns={cols} rows={rows} sortKey="at" sortDir="desc" />
        <p className="mt-2 text-xs text-ink-faint">TODO: `prisma.auditLog.findMany` + `logAudit(actorId, action, target, oldValue, newValue)`</p>
      </div>
    </main>
  );
}
