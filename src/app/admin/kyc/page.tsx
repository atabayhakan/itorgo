"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { DataDenseTable, type Column } from "@/components/admin/DataDenseTable";
import { FilterPanel, type FilterField, type FilterValue } from "@/components/admin/FilterPanel";
import { StatusBadge } from "@/components/admin/StatusBadge";
import React from "react";

type KycRow = { id: string; user: string; type: string; status: string; at: string; score: number };

const rows: KycRow[] = [
  { id: "k1", user: "s2 · Bek Store", type: "doc · паспорт", status: "pending", at: "2026-08-25 09:14", score: 72 },
  { id: "k2", user: "s7 · Гульмира Ж.", type: "doc · паспорт", status: "rejected", at: "2026-08-25 08:40", score: 44 },
  { id: "k3", user: "s5 · TechMarket KG", type: "business · ИП", status: "verified", at: "2026-08-24 16:02", score: 96 },
  { id: "k4", user: "s9 · Нурлан А.", type: "bank · счёт", status: "pending", at: "2026-08-25 10:00", score: 68 },
  { id: "k5", user: "s12 · Ulut Shop", type: "doc · паспорт", status: "verified", at: "2026-08-24 18:11", score: 94 },
  { id: "k6", user: "s15 · Эржан Б.", type: "phone · +996", status: "verified", at: "2026-08-25 07:30", score: 88 },
];

const KYC_FILTERS: FilterField[] = [
  { key: "status", label: "Статус", options: ["verified", "pending", "rejected"] },
  { key: "type", label: "Тип", options: ["doc · паспорт", "business · ИП", "bank · счёт", "phone · +996"] },
];

export default function AdminKycPage() {
  const [filters, setFilters] = React.useState<FilterValue>({});

  const filteredRows = React.useMemo(() => {
    return rows.filter((r) => {
      const statusMatch = !filters.status?.length || filters.status.includes(r.status);
      const typeMatch = !filters.type?.length || filters.type.includes(r.type);
      return statusMatch && typeMatch;
    });
  }, [filters]);

  const cols: Column<KycRow>[] = [
    { key: "id", header: "ID", width: "60px" },
    { key: "user", header: "Пользователь", sortable: true },
    { key: "type", header: "Тип", sortable: true },
    { key: "status", header: "Статус", align: "center", render: (r) => <StatusBadge status={r.status} /> },
    { key: "score", header: "Доверие", align: "right", sortable: true, render: (r) => <span className={`font-black tabular-nums ${r.score >= 80 ? "text-success" : r.score >= 60 ? "text-warning" : "text-danger"}`}>{r.score}%</span> },
    { key: "at", header: "Время", width: "130px", sortable: true },
  ];

  return (
    <AdminShell title="KYC очередь">
      <div className="mb-4">
        <FilterPanel fields={KYC_FILTERS} value={filters} onChange={setFilters} />
      </div>
      <div className="mb-4">
        <DataDenseTable
          columns={cols}
          rows={filteredRows}
          sortKey="score"
          sortDir="desc"
        />
      </div>
    </AdminShell>
  );
}
