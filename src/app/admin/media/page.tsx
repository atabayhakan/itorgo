"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { DataDenseTable, type Column } from "@/components/admin/DataDenseTable";
import { FilterBar } from "@/components/admin/FilterBar";
import React from "react";

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
  // Filter state
  const [cities, setCities] = React.useState<string[]>(["Бишкек", "Ош", "Токмок", "Джалал-Абад", "Каракол"]);
  const [kyc, setKyc] = React.useState<"all" | "verified" | "pending" | "rejected">("all");
  const [trustMin, setTrustMin] = React.useState(0);
  const [trustMax, setTrustMax] = React.useState(100);

  // Filtered rows (client-side for demo)
  const filteredRows = React.useMemo(() => {
    return rows.filter((r) => {
      const cityMatch = cities.includes(r.folder?.replace("/", "") || ""); // demo filter on folder
      const kycMatch = kyc === "all" || (r.dup ? "pending" : "verified"); // demo kyc match
      const trustMatch = r.name.length >= trustMin && r.name.length <= trustMax;
      return cityMatch && kycMatch && trustMatch;
    });
  }, [cities, kyc, trustMin, trustMax]);

  const cols: Column<MediaRow>[] = [
    { key: "name", header: "Файл", sortable: true, render: (r) => <span className="flex items-center gap-1.5"><span>{r.type === "video" ? "🎬" : "🖼️"}</span><span className="font-mono text-xs font-bold">{r.name}</span>{r.dup && <span className="chip bg-warning-bg text-warning">дубль</span>}</span> },
    { key: "folder", header: "Папка", sortable: true },
    { key: "type", header: "Тип", align: "center", width: "70px" },
    { key: "size", header: "Размер", align: "right", width: "90px", sortable: true },
    { key: "hash", header: "Hash", width: "80px", render: (r) => <span className={`font-mono text-xs ${r.dup ? "font-black text-warning" : ""}`}>{r.hash}</span> },
  ];

  return (
    <AdminShell title="Media Library">
      <FilterBar
        roles={[]}
        setRoles={() => {}}
        cities={cities}
        setCities={setCities}
        kyc={kyc}
        setKyc={setKyc}
        trustMin={trustMin}
        setTrustMin={setTrustMin}
        trustMax={trustMax}
        setTrustMax={setTrustMax}
        onApply={() => {
          // Re-render with filteredRows
        }}
      />
      <div className="mb-4">
        <DataDenseTable
          columns={cols}
          rows={filteredRows}
          sortKey="name"
        />
      </div>
      <p className="mt-2 text-xs text-ink-faint">
        Filterlar client-side (demo). Prod: prisma.media.findMany + search tags + dedup by hash + S3/Neon Object Storage
      </p>
    </AdminShell>
  );
}