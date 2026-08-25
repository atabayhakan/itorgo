"use client";

import { useState } from "react";
import { DataDenseTable, type Column } from "@/components/admin/DataDenseTable";

type CmsRow = { key: string; value: string; locale: string };

const INITIAL: CmsRow[] = [
  { key: "auction.bid", value: "Сделать ставку", locale: "ru" },
  { key: "auction.buy_now", value: "Купить сейчас", locale: "ru" },
  { key: "auction.ends_in", value: "Осталось", locale: "ru" },
  { key: "common.search_placeholder", value: "Что вы ищете?", locale: "ru" },
  { key: "nav.home", value: "Главная", locale: "ru" },
  { key: "nav.auctions", value: "Аукционы", locale: "ru" },
  { key: "product.add_favorite", value: "В избранное", locale: "ru" },
  { key: "states.empty_favorites_title", value: "Здесь пока пусто", locale: "ru" },
  { key: "trust.score", value: "Надёжность", locale: "ru" },
  { key: "ai.help_find", value: "Помочь найти?", locale: "ru" },
];

export default function AdminCmsPage() {
  const [rows, setRows] = useState<CmsRow[]>(INITIAL);
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const cols: Column<CmsRow>[] = [
    { key: "key", header: "Ключ", width: "220px", sortable: true, render: (r) => <span className="font-mono text-xs font-bold">{r.key}</span> },
    { key: "locale", header: "Язык", width: "70px", align: "center", render: (r) => <span className="chip bg-surface-sunken text-xs">{r.locale}</span> },
    {
      key: "value",
      header: "Значение",
      render: (r) =>
        editing === r.key ? (
          <div className="flex gap-1">
            <input value={draft} onChange={(e) => setDraft(e.target.value)} className="flex-1 rounded-lg border border-brand-600 bg-surface px-2 py-1 text-xs" autoFocus />
            <button onClick={() => { setRows((rs) => rs.map((x) => (x.key === r.key ? { ...x, value: draft } : x))); setEditing(null); }} className="rounded-full bg-success px-2 py-1 text-xs font-bold text-white">✓</button>
            <button onClick={() => setEditing(null)} className="rounded-full bg-surface-sunken px-2 py-1 text-xs">✕</button>
          </div>
        ) : (
          <span className="text-xs">{r.value}</span>
        ),
    },
    {
      key: "id",
      header: "",
      width: "90px",
      align: "center",
      render: (r) => (editing === r.key ? null : <button onClick={() => { setEditing(r.key); setDraft(r.value); }} className="rounded-full bg-ink px-3 py-1 text-xs font-bold text-white">Ред.</button>),
    },
  ];

  return (
    <main className="min-h-dvh bg-surface-dim">
      <div className="sticky top-0 bg-surface px-4 py-3 shadow-sm">
        <a href="/admin" className="text-sm font-bold">← Admin</a> <span className="ml-2 text-sm font-semibold">CMS · Динамические тексты</span>
      </div>
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between text-xs">
          <span className="text-ink-faint">{rows.length} ключей · spec #42 · auction.bid / common.search_placeholder …</span>
          <span className="rounded-full bg-surface px-3 py-1 font-bold shadow-card">ru ▾</span>
        </div>
        {/* @ts-ignore */}
        <DataDenseTable columns={cols} rows={rows} sortKey="key" />
        <p className="mt-2 text-xs text-ink-faint">Click Ред. → inline edit · TODO: upsert Translation(key,locale) + revalidatePath + auditLog</p>
      </div>
    </main>
  );
}
