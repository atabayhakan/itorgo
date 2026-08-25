"use client";

import { useState } from "react";

export function ShareSheet({ url, title, onClose }: { url: string; title: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : url;

  function copy() {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end" role="dialog" aria-modal="true">
      <button className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" onClick={onClose} aria-label="Закрыть" />
      <div className="sheet-enter relative w-full rounded-t-3xl bg-surface px-5 pt-3 pb-8 safe-bottom">
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-line" />
        <h3 className="font-bold">Поделиться</h3>
        <p className="mt-1 line-clamp-1 text-sm text-ink-faint">{title}</p>

        <div className="mt-4 grid grid-cols-4 gap-3 text-center text-xs">
          <a href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noreferrer" className="rounded-2xl bg-surface-dim px-2 py-3">
            <span className="text-xl">✈️</span>
            <p className="mt-1 font-semibold">Telegram</p>
          </a>
          <a href={`https://wa.me/?text=${encodeURIComponent(title + " " + shareUrl)}`} target="_blank" rel="noreferrer" className="rounded-2xl bg-surface-dim px-2 py-3">
            <span className="text-xl">💬</span>
            <p className="mt-1 font-semibold">WhatsApp</p>
          </a>
          <button onClick={copy} className="rounded-2xl bg-brand-50 px-2 py-3 text-brand-700">
            <span className="text-xl">🔗</span>
            <p className="mt-1 font-semibold">{copied ? "Скопировано!" : "Копировать"}</p>
          </button>
          <button onClick={() => (navigator as unknown as { share?: (d: unknown) => void }).share?.({ title, url: shareUrl })} className="rounded-2xl bg-surface-dim px-2 py-3">
            <span className="text-xl">↗️</span>
            <p className="mt-1 font-semibold">Ещё</p>
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl bg-surface-dim px-3 py-2">
          <span className="flex-1 truncate text-xs">{shareUrl}</span>
          <button onClick={copy} className="rounded-full bg-ink px-3 py-1 text-xs font-bold text-white">
            {copied ? "✓" : "Копировать"}
          </button>
        </div>
      </div>
    </div>
  );
}
