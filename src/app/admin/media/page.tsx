"use client";

import { DataDenseTable, type Column } from "@/components/admin/DataDenseTable";

type MediaRow = { id: string; name: string; type: string; size: string; hash: string; folder: string; dup?: boolean };

const rows: MediaRow[] = [
  { id: "m1", name: "iphone-17-pro.jpg", type: "image", size: "2.4 MB", hash: "a1b2", folder: "/products" },
  { id: "m2", name: "camry-2019-01.jpg", type: "image", size: "3.1 MB", hash: "c3d4", folder: "/products" },
  { id: "m3", name: "banner-auction.webp", type: "image", size: "890 KB", hash: "e5f6", folder: "/banners" },
  { id: "m4", name: "demo-video.mp4", type: "video", size: "18 MB", hash: "g7h8", folder: "/videos" },
  { id: "m5", name: "logo-itorgo.svg", type: "image", size: "12 KB", hash: "a1b2", folder: "/brand", dup: true },
  { id: "m6", name: "store-cover-1.jpg", type: "image", size: "1.1 MB", hash: "k9l0", folder: "/stores" },
  { id: "m7", name: "avatar-s1.webp", type: "image", size: "240 KB", hash: "m1n2", folder: "/avatars" },
];

export default function AdminMediaPage() {
  const cols: Column<MediaRow>[] = [
    { key: "name", header: "Файл", sortable: true, render: (r) => <span className="flex items-center gap-1.5"><span>{r.type === "video" ? "🎬" : "🖼️"}</span><span className="font-mono text-xs font-bold">{r.name}</span>{r.dup && <span className="chip bg-warning-bg text-warning">дубль</span>}</span> },
    { key: "folder", header: "Папка", sortable: true },
    { key: "type", header: "Тип", align: "center", width: "70px" },
    { key: "size", header: "Размер", align: "right", width: "90px", sortable: true },
    { key: "hash", header: "Hash", width: "80px", render: (r) => <span className={`font-mono text-xs ${r.dup ? "font-black text-warning" : ""}`}>{r.hash}</span> },
  ];

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
          <span className="chip bg-surface-sunken">📁 Все папки · {rows.length}</span>
          <span className="chip bg-warning-bg text-warning">⚠ Дубликаты: 1 · hash a1b2</span>
          <span className="chip bg-success-bg text-success">WebP/AVIF · сжатие</span>
        </div>
        <div className="mt-3">
          {/* @ts-ignore */}
          <DataDenseTable columns={cols} rows={rows} sortKey="name" />
        </div>
        <p className="mt-2 text-xs text-ink-faint">Spec #50 · Поиск · папки · теги · превью · дедупликация по hash · WebP/AVIF · TODO: S3/Neon Object Storage</p>
      </div>
    </main>
  );
}
