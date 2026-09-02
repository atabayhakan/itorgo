"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { DataDenseTable, type Column } from "@/components/admin/DataDenseTable";
import { FilterPanel, type FilterField, type FilterValue } from "@/components/admin/FilterPanel";
import { StatusBadge } from "@/components/admin/StatusBadge";
import React from "react";

type FraudRow = { id: string; kind: string; subject: string; score: number; status: string; at: string };

const rows: FraudRow[] = [
  { id: "f1", kind: "shill_bidding", subject: "auction a3", score: 82, status: "open", at: "2026-08-25 08:15" },
  { id: "f2", kind: "duplicate_account", subject: "user s7", score: 64, status: "reviewing", at: "2026-08-25 09:02" },
  { id: "f3", kind: "fake_listing", subject: "product p12", score: 91, status: "open", at: "2026-08-25 09:41" },
  { id: "f4", kind: "suspicious_payment", subject: "payment pay_9x", score: 77, status: "open", at: "2026-08-25 10:02" },
  { id: "f5", kind: "abnormal_login", subject: "user s15", score: 58, status: "closed", at: "2026-08-24 22:11" },
  { id: "f6", kind: "duplicate_image", subject: "product p27", score: 88, status: "open", at: "2026-08-24 18:33" },
];

const FRAUD_FILTERS: FilterField[] = [
  { key: "status", label: "Статус", options: ["open", "reviewing", "closed"] },
  { key: "kind", label: "Тип", options: ["shill_bidding", "duplicate_account", "fake_listing", "suspicious_payment", "abnormal_login", "duplicate_image"] },
];

export default function AdminFraudPage() {
  const [filters, setFilters] = React.useState<FilterValue>({});

  const filteredRows = React.useMemo(() => {
    return rows.filter((r) => {
      const statusMatch = !filters.status?.length || filters.status.includes(r.status);
      const kindMatch = !filters.kind?.length || filters.kind.includes(r.kind);
      return statusMatch && kindMatch;
    });
  }, [filters]);

  const cols: Column<FraudRow>[] = [
    { key: "id", header: "ID", width: "70px", sortable: true },
    { key: "kind", header: "Тип", sortable: true, render: (r) => <span className="font-mono text-xs font-bold">{r.kind}</span> },
    { key: "subject", header: "Субъект", sortable: true, render: (r) => <span className="text-xs">{r.subject}</span> },
    { key: "score", header: "Score", align: "right", sortable: true, render: (r) => <span className={`font-black tabular-nums ${r.score >= 80 ? "text-danger" : r.score >= 60 ? "text-warning" : "text-ink-soft"}`}>{r.score}%</span> },
    { key: "status", header: "Статус", align: "center", render: (r) => <StatusBadge status={r.status} /> },
    { key: "at", header: "Время", width: "130px", sortable: true },
  ];

  return (
    <AdminShell title="Fraud Center">
      <div className="mb-4">
        <FilterPanel fields={FRAUD_FILTERS} value={filters} onChange={setFilters} />
      </div>
      <div className="mb-4">
        <DataDenseTable
          columns={cols}
          rows={filteredRows}
          sortKey="score"
          sortDir="desc"
        />
      </div>
      <p className="mt-2 text-xs text-ink-faint">
        Filterlar client-side (demo). Prod: prisma.fraudCase.findMany + engine evaluateFraud(subjectId)
      </p>
    </AdminShell>
  );
}
