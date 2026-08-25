import { getCmsEntries } from "@/lib/cms";

export default async function AdminCmsPage() {
  const entries = await getCmsEntries();
  return (
    <main className="min-h-dvh bg-surface-dim">
      <div className="sticky top-0 bg-surface px-4 py-3 shadow-sm">
        <a href="/admin" className="text-sm font-bold">← Admin</a> <span className="ml-2 text-sm font-semibold">CMS · Динамические тексты</span>
      </div>
      <div className="p-4">
        <p className="text-xs text-ink-faint">Spec #42 · Кнопки / лейблы / меню / заголовки / плейсхолдеры / ошибки / баннеры — без деплоя. Ключи: auction.bid, auction.buy_now…</p>
        <div className="mt-3 overflow-hidden rounded-2xl bg-surface shadow-card">
          <div className="max-h-[60vh] overflow-auto">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-surface-dim text-ink-faint">
                <tr><th className="px-3 py-2">Ключ</th><th className="px-3 py-2">Значение (ru)</th><th className="px-3 py-2" /></tr>
              </thead>
              <tbody className="divide-y divide-line">
                {entries.map((e) => (
                  <tr key={e.key}>
                    <td className="px-3 py-2 font-mono text-[11px]">{e.key}</td>
                    <td className="px-3 py-2">
                      <input defaultValue={e.value} className="w-full rounded-lg border border-line bg-surface-dim px-2 py-1 text-xs" />
                    </td>
                    <td className="px-3 py-2"><button className="rounded-full bg-ink px-3 py-1 text-xs font-bold text-white">Сохранить</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-2 text-xs text-ink-faint">TODO: upsert → Translation(key,locale), revalidatePath, auditLog</p>
      </div>
    </main>
  );
}
