"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { DataDenseTable, type Column } from "@/components/admin/DataDenseTable";
import { FilterPanel, type FilterField, type FilterValue } from "@/components/admin/FilterPanel";
import { StatusBadge } from "@/components/admin/StatusBadge";
import React from "react";

type UserRow = { id: string; name: string; role: string; city: string; trust: number; kyc: string; sales: number };

const rows: UserRow[] = [
  { id: "s1", name: "Азамат Т.", role: "seller", city: "Бишкек", trust: 96, kyc: "verified", sales: 247 },
  { id: "s2", name: "Bek Store", role: "store_owner", city: "Ош", trust: 88, kyc: "pending", sales: 89 },
  { id: "s5", name: "TechMarket KG", role: "store_owner", city: "Бишкек", trust: 92, kyc: "verified", sales: 412 },
  { id: "s7", name: "Гульмира Ж.", role: "seller", city: "Токмок", trust: 74, kyc: "rejected", sales: 12 },
  { id: "s9", name: "Нурлан А.", role: "seller", city: "Каракол", trust: 81, kyc: "verified", sales: 67 },
  { id: "s12", name: "Ulut Shop", role: "store_owner", city: "Джалал-Абад", trust: 95, kyc: "verified", sales: 203 },
  { id: "s15", name: "Эржан Б.", role: "seller", city: "Бишкек", trust: 69, kyc: "pending", sales: 5 },
  { id: "s20", name: "Aida Market", role: "moderator", city: "Бишкек", trust: 99, kyc: "verified", sales: 0 },
];

const USER_FILTERS: FilterField[] = [
  { key: "role", label: "Роль", options: ["seller", "store_owner", "moderator"] },
  { key: "city", label: "Город", options: ["Бишкек", "Ош", "Токмок", "Джалал-Абад", "Каракол"] },
  { key: "kyc", label: "KYC", options: ["verified", "pending", "rejected"] },
];

export default function AdminUsersPage() {
  const [filters, setFilters] = React.useState<FilterValue>({});

  const filteredRows = React.useMemo(() => {
    return rows.filter((r) => {
      const roleMatch = !filters.role?.length || filters.role.includes(r.role);
      const cityMatch = !filters.city?.length || filters.city.includes(r.city);
      const kycMatch = !filters.kyc?.length || filters.kyc.includes(r.kyc);
      return roleMatch && cityMatch && kycMatch;
    });
  }, [filters]);

  const cols: Column<UserRow>[] = [
    { key: "id", header: "ID", width: "70px", sortable: true },
    { key: "name", header: "Имя", sortable: true },
    { key: "role", header: "Роль", render: (r) => <span className="chip bg-brand-50 text-brand-700">{r.role}</span> },
    { key: "city", header: "Город", sortable: true },
    { key: "trust", header: "Доверие", align: "right", sortable: true, render: (r) => <span className={r.trust >= 90 ? "font-black text-success" : r.trust >= 80 ? "font-bold" : "text-warning"}>{r.trust}%</span> },
    { key: "kyc", header: "KYC", align: "center", render: (r) => <StatusBadge status={r.kyc} /> },
    { key: "sales", header: "Продажи", align: "right", sortable: true },
  ];

  return (
    <AdminShell title="Пользователи">
      <div className="mb-4">
        <FilterPanel fields={USER_FILTERS} value={filters} onChange={setFilters} />
      </div>
      <div className="mb-4">
        <DataDenseTable
          columns={cols}
          rows={filteredRows}
          sortKey="trust"
          sortDir="desc"
        />
      </div>
    </AdminShell>
  );
}
