"use client";

// @ts-nocheck
import { DataDenseTable, type Column } from "@/components/admin/DataDenseTable";
import { formatKGS } from "@/lib/data/mock-data";

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="min-h-dvh bg-surface-dim">
      <div className="sticky top-0 z-10 bg-surface px-4 py-3 shadow-sm">
        <a href="/admin" className="text-sm font-bold">← Admin</a> <span className="ml-2 text-sm font-semibold">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </main>
  );
}

type Row = { id: string; buyer: string; items: number; total: number; status: string; at: string; city: string };

const rows: Row[] = [
  { id: "o2041", buyer: "Айгул С.", items: 1, total: 49500, status: "paid", at: "2026-08-20", city: "Бишкек" },
  { id: "o2042", buyer: "Нурлан А.", items: 1, total: 1320000, status: "pending", at: "2026-08-20", city: "Бишкек" },
  { id: "o2043", buyer: "Timur M.", items: 2, total: 5200, status: "processing", at: "2026-08-19", city: "Ош" },
  { id: "o2044", buyer: "Гульмира Ж.", items: 1, total: 85000, status: "paid", at: "2026-08-19", city: "Токмок" },
  { id: "o2045", buyer: "Bek Store", items: 3, total: 12400, status: "shipped", at: "2026-08-18", city: "Джалал-Абад" },
  { id: "o2046", buyer: "Эржан Б.", items: 1, total: 68900, status: "paid", at: "2026-08-18", city: "Каракол" },
];

const tone: Record<string, string> = {
  paid: "bg-success-bg text-success",
  pending: "bg-warning-bg text-warning",
  processing: "bg-info-bg text-info",
  shipped: "bg-brand-50 text-brand-700",
  delivered: "bg-success-bg text-success",
};

export default function AdminOrdersPage() {
  const cols: Column<Row>[] = [
    { key: "id", header: "ID", width: "90px", sortable: true },
    { key: "buyer", header: "Покупатель", sortable: true },
    { key: "city", header: "Город" },
    { key: "items", header: "Товары", align: "right", width: "70px" },
    { key: "total", header: "Сумма", align: "right", sortable: true, render: (r) => formatKGS(r.total) + " сом" },
    { key: "status", header: "Статус", align: "center", render: (r) => <span className={`chip ${tone[r.status] ?? "bg-surface-sunken"}`}>{r.status}</span> },
    { key: "at", header: "Дата", width: "110px", sortable: true },
  ];

  return (
    <Shell title="Заказы">
      <div className="mb-3 flex items-center justify-between text-xs">
        <span className="text-ink-faint">{rows.length} заказов · Bloomberg-terminal density</span>
        <span className="rounded-full bg-surface px-3 py-1 font-bold shadow-card">Фильтр ▾</span>
      </div>
      <DataDenseTable columns={cols} rows={rows as unknown as Row[] & Record<string, unknown>[]} sortKey="at" sortDir="desc" />
      <p className="mt-2 text-xs text-ink-faint">Click header to sort · TODO: server pagination + `prisma.order.findMany`</p>
    </Shell>
  );
}
