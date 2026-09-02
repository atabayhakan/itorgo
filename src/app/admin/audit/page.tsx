"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { DataDenseTable, type Column } from "@/components/admin/DataDenseTable";
import { FilterBar } from "@/components/admin/FilterBar";
import React from "react";

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
  // Filter state
  const [cities, setCities] = React.useState<string[]>(["Бишкек", "Ош", "Токмок", "Джалал-Абад", "Каракол"]);
  const [kyc, setKyc] = React.useState<"all" | "verified" | "pending" | "rejected">("all");
  const [trustMin, setTrustMin] = React.useState(0);
  const [trustMax, setTrustMax] = React.useState(100);

  // Filtered rows (client-side for demo)
  const filteredRows = React.useMemo(() => {
    return rows.filter((r) => {
      const cityMatch = cities.includes(r.actor.split("@")[0] || ""); // demo filter on actor
      const kycMatch = kyc === "all" || r.action.includes(kyc);
      const trustMatch = r.diff.length >= trustMin && r.diff.length <= trustMax;
      return cityMatch && kycMatch && trustMatch;
    });
  }, [cities, kyc, trustMin, trustMax]);

  const cols: Column<AuditRow>[] = [
    { key: "at", header: "Когда", width: "130px", sortable: true },
    { key: "actor", header: "Кто", sortable: true },
    { key: "action", header: "Что", sortable: true, render: (r) => <span className="font-mono text-xs font-bold">{r.action}</span> },
    { key: "target", header: "Кого/что", render: (r) => <span className="text-xs">{r.target}</span> },
    { key: "diff", header: "Старое → новое", render: (r) => <span className="font-mono text-xs">{r.diff}</span> },
    { key: "ip", header: "IP", width: "110px" },
  ];

  return (
    <AdminShell title="Audit Log">
      <FilterBar
        roles={[]}
        setRoles={() => {}}
        cities={cities}
        setCities={setCities}
        kyc={kyc}
        setKyc={setKyc}
        trustMin={trustMin}
        setTrustMin={setTrustMin}
        trustMax={trustMax}
        setTrustMax={setTrustMax}
        onApply={() => {
          // Re-render with filteredRows
        }}
      />
      <div className="mb-4">
        <DataDenseTable
          columns={cols}
          rows={filteredRows}
          sortKey="at"
          sortDir="desc"
        />
      </div>
      <p className="mt-2 text-xs text-ink-faint">
        Filterlar client-side (demo). Prod: prisma.auditLog.findMany + logAudit(actorId, action, target, oldValue, newValue)
      </p>
    </AdminShell>
  );
}