"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { DataDenseTable, type Column } from "@/components/admin/DataDenseTable";
import { FilterBar } from "@/components/admin/FilterBar";
import React from "react";

type PushRow = { id: string; to: string; title: string; status: string; at: string };

const rows: PushRow[] = [
  { id: "ps1", to: "s1 · +996555***01", title: "Ваша ставка перебита — 43 000 сом", status: "delivered", at: "2026-08-25 10:14" },
  { id: "ps2", to: "broadcast · 4 210", title: "Новые аукционы — iPhone 17 Pro", status: "sent", at: "2026-08-25 09:00" },
  { id: "ps3", to: "s7 · +996555***07", title: "KYC одобрен", status: "delivered", at: "2026-08-24 18:22" },
  { id: "ps4", to: "s5 · +996555***05", title: "Заказ o2041 оплачен", status: "failed", at: "2026-08-24 16:00" },
];

export default function AdminPushPage() {
  // Filter state
  const [cities, setCities] = React.useState<string[]>(["Бишкек", "Ош", "Токмок", "Джалал-Абад", "Каракол"]);
  const [kyc, setKyc] = React.useState<"all" | "verified" | "pending" | "rejected">("all");
  const [trustMin, setTrustMin] = React.useState(0);
  const [trustMax, setTrustMax] = React.useState(100);

  // Filtered rows (client-side for demo)
  const filteredRows = React.useMemo(() => {
    return rows.filter((r) => {
      const cityMatch = cities.includes(r.to.split("·")[0] || ""); // demo filter on recipient
      const kycMatch = kyc === "all" || r.status === kyc;
      const trustMatch = r.title.length >= trustMin && r.title.length <= trustMax;
      return cityMatch && kycMatch && trustMatch;
    });
  }, [cities, kyc, trustMin, trustMax]);

  const cols: Column<PushRow>[] = [
    { key: "id", header: "ID", width: "70px" },
    { key: "to", header: "Кому", sortable: true },
    { key: "title", header: "Сообщение" },
    { key: "status", header: "Статус", align: "center", render: (r) => <span className={`chip ${r.status === "delivered" ? "bg-success-bg text-success" : r.status === "sent" ? "bg-info-bg text-info" : "bg-danger-bg text-danger"}`}>{r.status}</span> },
    { key: "at", header: "Время", width: "130px", sortable: true },
  ];

  return (
    <AdminShell title="Push log">
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
        Filterlar client-side (demo). Prod: prisma.pushSubscription + web-push + /api/push/send
      </p>
    </AdminShell>
  );
}