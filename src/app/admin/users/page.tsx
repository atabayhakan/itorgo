import Link from "next/link";

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

export default function AdminUsersPage() {
  const users = [
    { id: "s1", name: "Азамат Т.", role: "seller", city: "Бишкек", trust: 96 },
    { id: "s2", name: "Bek Store", role: "store_owner", city: "Ош", trust: 88 },
    { id: "s5", name: "TechMarket KG", role: "store_owner", city: "Бишкек", trust: 92 },
  ];
  return (
    <AdminShell title="Пользователи">
      <p className="text-xs text-ink-faint">RBAC · поиск · KYC статус · бан — TODO(table + pagination)</p>
      <ul className="mt-3 space-y-2">
        {users.map((u) => (
          <li key={u.id} className="flex items-center justify-between rounded-2xl bg-surface px-4 py-3 shadow-card">
            <div>
              <p className="text-sm font-semibold">{u.name}</p>
              <p className="text-xs text-ink-faint">{u.role} · {u.city} · trust {u.trust}%</p>
            </div>
            <span className="chip bg-surface-sunken text-ink-soft">{u.id}</span>
          </li>
        ))}
      </ul>
    </AdminShell>
  );
}
