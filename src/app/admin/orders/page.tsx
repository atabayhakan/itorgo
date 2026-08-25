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

export default function AdminOrdersPage() {
  const orders = [
    { id: "o2041", buyer: "Айгул С.", total: 49500, status: "paid" },
    { id: "o2042", buyer: "Нурлан А.", total: 1320000, status: "pending" },
    { id: "o2043", buyer: "Timur M.", total: 5200, status: "processing" },
  ];
  const tone: Record<string, string> = { paid: "bg-success-bg text-success", pending: "bg-warning-bg text-warning", processing: "bg-info-bg text-info" };
  return (
    <Shell title="Заказы">
      <ul className="space-y-2">
        {orders.map((o) => (
          <li key={o.id} className="flex items-center justify-between rounded-2xl bg-surface px-4 py-3 shadow-card">
            <div>
              <p className="text-sm font-bold">{o.id}</p>
              <p className="text-xs text-ink-faint">{o.buyer}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold tabular-nums">{o.total.toLocaleString("ru-RU")} сом</p>
              <span className={`chip ${tone[o.status]}`}>{o.status}</span>
            </div>
          </li>
        ))}
      </ul>
    </Shell>
  );
}
