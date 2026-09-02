"use client";

import { useState } from "react";

/** Premium AI floating button — bottom-right, always visible on home. */
export function AIFloatingButton() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-[0_6px_20px_rgba(111,92,247,0.4)] hover:shadow-[0_8px_28px_rgba(111,92,247,0.55)] transition hover:-translate-y-0.5 active:translate-y-0"
        aria-label="AI помощник"
      >
        <svg
          className="h-5 w-5 fill-current text-white"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-4 14.5c.83 0 1.5-.67 1.5-1.5S7.33 15.5 6.5 15.5 5 16.17 5 15.5 5.83 14.5 7 14.5zm9.5-5.83l-1.46 1.46c-.39.39-1.02.39-1.41 0L18.5 7.41c-.39-.39-1.02-.39-1.41 0L17 8.86l1.46 1.46c.39.39.39 1.02 0 1.41zM7 17a5 5 0 1 0 10 0 5 5 0 0 0-10 0z" />
        </svg>
      </button>
      {open && (
        <div
          className="mb-2 w-[260px] rounded-[16px] bg-[#16161f] border border-white/[0.08] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)] animate-in-from-bottom-0"
        >
          <p>Что вы ищете?</p>
          <input
            defaultValue="iPhone до 50000 сом"
            className="w-full bg-transparent border-none outline-none text-ink-soft placeholder:text-ink-soft py-1"
            placeholder="Что вы ищем? · Я хочу iPhone до 50000 сом в Бишкеке"
          />
          <div className="mt-2 grid grid-cols-2 gap-1">
            <button
              className="rounded-full bg-brand-50 px-2 py-1 text-[10px] font-bold text-brand-700"
            >
              Телефон
            </button>
            <button
              className="rounded-full bg-brand-50 px-2 py-1 text-[10px] font-bold text-brand-700"
            >
              Автомобиль
            </button>
            <button
              className="rounded-full bg-brand-50 px-2 py-1 text-[10px] font-bold text-brand-700"
            >
              Дом
            </button>
            <button
              className="rounded-full bg-brand-50 px-2 py-1 text-[10px] font-bold text-brand-700"
            >
              Аукцион
            </button>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="mt-2 w-full rounded-[10px] bg-ink px-3 py-1.5 text-sm font-bold text-white"
          >
            Найти
          </button>
        </div>
      )}
    </div>
  );
}