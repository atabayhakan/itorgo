"use client";

import React from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { DataDenseTable, type Column } from "@/components/admin/DataDenseTable";
import { FilterPanel, type FilterField, type FilterValue } from "@/components/admin/FilterPanel";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatKGS } from "@/lib/data/mock-data";

type Row = {
  id: string;
  buyer: string;
  items: number;
  total: number;
  status: "paid" | "pending" | "processing" | "shipped" | "delivered";
  at: string;
  city: string;
};

const rows: Row[] = [
  { id: "o2041", buyer: "Айгул С.", items: 1, total: 49500, status: "paid", at: "2026-08-20", city: "Бишкек" },
  { id: "o2042", buyer: "Нурлан А.", items: 1, total: 1320000, status: "pending", at: "2026-08-20", city: "Бишкек" },
  { id: "o2043", buyer: "Timur M.", items: 2, total: 5200, status: "processing", at: "2026-08-19", city: "Ош" },
  { id: "o2044", buyer: "Гульмира Ж.", items: 1, total: 85000, status: "paid", at: "2026-08-19", city: "Токмок" },
  { id: "o2045", buyer: "Bek Store", items: 3, total: 12400, status: "shipped", at: "2026-08-18", city: "Джалал-Абад" },
  { id: "o2046", buyer: "Эржан Б.", items: 1, total: 68900, status: "paid", at: "2026-08-18", city: "Каракол" },
];

const ORDER_FILTERS: FilterField[] = [
  { key: "status", label: "Статус", options: ["paid", "pending", "processing", "shipped", "delivered"] },
  { key: "city", label: "Город", options: ["Бишкек", "Ош", "Токмок", "Джалал-Абад", "Каракол"] },
];

export default function AdminOrdersPage() {
  const [filters, setFilters] = React.useState<FilterValue>({});
  const [sortKey, setSortKey] = React.useState("at");
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("desc");

  const filteredRows = React.useMemo(() => {
    return rows.filter((r) => {
      const statusMatch = !filters.status?.length || filters.status.includes(r.status);
      const cityMatch = !filters.city?.length || filters.city.includes(r.city);
      return statusMatch && cityMatch;
    });
  }, [filters]);

  const sortedRows = React.useMemo(() => {
    const copy = [...filteredRows];
    copy.sort((a, b) => {
      const cmp = String(a[sortKey as keyof Row]).localeCompare(String(b[sortKey as keyof Row]), "ru", { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [filteredRows, sortKey, sortDir]);

  function handleSort(key: string) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const cols: Column<Row>[] = [
    { key: "id", header: "ID", width: "90px", sortable: true },
    { key: "buyer", header: "Покупатель", sortable: true },
    { key: "city", header: "Город", sortable: true },
    { key: "items", header: "Товары", align: "right", width: "70px" },
    { key: "total", header: "Сумма", align: "right", sortable: true, render: (r) => formatKGS(r.total) + " сом" },
    { key: "status", header: "Статус", align: "center", render: (r) => <StatusBadge status={r.status} /> },
    { key: "at", header: "Дата", width: "110px", sortable: true },
  ];

  return (
    <AdminShell title="Заказы">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-lg font-extrabold">
          Заказы <span className="font-semibold text-ink-faint">· {sortedRows.length}</span>
        </h1>
      </div>
      <div className="mb-4">
        <FilterPanel fields={ORDER_FILTERS} value={filters} onChange={setFilters} />
      </div>
      <DataDenseTable columns={cols} rows={sortedRows} onSort={handleSort} sortKey={sortKey} sortDir={sortDir} />
    </AdminShell>
  );
}
