const MOCK_MEDIA = [
  { id: "m1", name: "iphone-17-pro.jpg", type: "image", size: "2.4 MB", hash: "a1b2" },
  { id: "m2", name: "camry-2019-01.jpg", type: "image", size: "3.1 MB", hash: "c3d4" },
  { id: "m3", name: "banner-auction.webp", type: "image", size: "890 KB", hash: "e5f6" },
  { id: "m4", name: "demo-video.mp4", type: "video", size: "18 MB", hash: "g7h8" },
  { id: "m5", name: "logo-itorgo.svg", type: "image", size: "12 KB", hash: "a1b2" }, // duplicate hash demo
];

export default function AdminMediaPage() {
  return (
    <main className="min-h-dvh bg-surface-dim">
      <div className="sticky top-0 bg-surface px-4 py-3 shadow-sm">
        <a href="/admin" className="text-sm font-bold">← Admin</a> <span className="ml-2 text-sm font-semibold">Media Library</span>
      </div>
      <div className="p-4">
        <div className="flex gap-2">
          <input placeholder="Поиск по имени, тегу, хешу" className="flex-1 rounded-xl border border-line bg-surface px-3 py-2 text-sm" />
          <button className="rounded-xl bg-ink px-4 py-2 text-sm font-bold text-white">Загрузить</button>
        </div>
        <div className="mt-3 flex gap-2 text-xs">
          <span className="chip bg-surface-sunken">📁 Все папки</span>
          <span className="chip bg-warning-bg text-warning">⚠ Дубликаты: 1</span>
          <span className="chip bg-surface-sunken">WebP/AVIF · сжатие</span>
        </div>
        <ul className="mt-4 grid grid-cols-2 gap-2">
          {MOCK_MEDIA.map((m) => (
            <li key={m.id} className="rounded-2xl bg-surface p-3 shadow-card">
              <div className="flex h-20 items-center justify-center rounded-xl bg-surface-dim text-2xl">{m.type === "video" ? "🎬" : "🖼️"}</div>
              <p className="mt-2 truncate text-xs font-semibold">{m.name}</p>
              <p className="text-xs text-ink-faint">{m.size} · {m.hash} {m.hash === "a1b2" && <span className="text-warning">· дубль</span>}</p>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-ink-faint">Spec #50 · Поиск · папки · теги · превью · дедупликация по hash · WebP/AVIF</p>
      </div>
    </main>
  );
}
