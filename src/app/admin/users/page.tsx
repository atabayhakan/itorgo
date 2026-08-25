"use client";

import Link from "next/link";
import { DataDenseTable, type Column } from "@/components/admin/DataDenseTable";

function AdminShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="min-h-dvh bg-surface-dim">
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-surface px-4 py-3 shadow-sm">
        <Link href="/admin" className="text-sm font-bold">← Admin</Link>
        <span className="text-sm font-semibold">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </main>
  );
}

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

export default function AdminUsersPage() {
  const cols: Column<UserRow>[] = [
    { key: "id", header: "ID", width: "70px", sortable: true },
    { key: "name", header: "Имя", sortable: true },
    { key: "role", header: "Роль", render: (r) => <span className="chip bg-brand-50 text-brand-700">{r.role}</span> },
    { key: "city", header: "Город", sortable: true },
    { key: "trust", header: "Trust", align: "right", sortable: true, render: (r) => <span className={r.trust >= 90 ? "font-black text-success" : r.trust >= 80 ? "font-bold" : "text-warning"}>{r.trust}%</span> },
    { key: "kyc", header: "KYC", align: "center", render: (r) => <span className={`chip ${r.kyc === "verified" ? "bg-success-bg text-success" : r.kyc === "pending" ? "bg-warning-bg text-warning" : "bg-danger-bg text-danger"}`}>{r.kyc}</span> },
    { key: "sales", header: "Продажи", align: "right", sortable: true },
  ];

  return (
    <AdminShell title="Пользователи">
      <div className="mb-3 flex items-center justify-between text-xs">
        <span className="text-ink-faint">{rows.length} пользователей · density + KYC</span>
        <span className="rounded-full bg-surface px-3 py-1 font-bold shadow-card">Поиск ▾</span>
      </div>
      {/* @ts-ignore — DataDenseTable generic */}
      <DataDenseTable columns={cols} rows={rows} sortKey="trust" sortDir="desc" />
      <p className="mt-2 text-xs text-ink-faint">TODO: pagination + `prisma.user.findMany` + RBAC filter</p>
    </AdminShell>
  );
}
