"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n/LocaleProvider";

/** AI assistant launcher — desktop only; on mobile the header search already carries the AI entry and the corner is taken by FloatingSell + BottomNav. */
export function AIFloatingButton() {
  const t = useT();
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 hidden flex-col items-end gap-2 lg:flex"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-[0_6px_20px_rgba(111,92,247,0.4)] hover:shadow-[0_8px_28px_rgba(111,92,247,0.55)] transition hover:-translate-y-0.5 active:translate-y-0"
        aria-label={t("ai.assistant")}
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
          className="rise-in mb-2 w-[260px] rounded-[16px] bg-[#16161f] border border-white/[0.08] p-4 text-white shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        >
          <p className="text-sm font-semibold">{t("common.search_placeholder")}</p>
          <input
            defaultValue={t("ai.example_query")}
            className="w-full bg-transparent border-none outline-none text-white/80 placeholder:text-white/40 py-1 text-sm"
            placeholder={t("ai.placeholder")}
          />
          <div className="mt-2 grid grid-cols-2 gap-1">
            <button
              className="rounded-full bg-brand-50 px-2 py-1 text-[10px] font-bold text-brand-700"
            >
              {t("ai.chip_phone")}
            </button>
            <button
              className="rounded-full bg-brand-50 px-2 py-1 text-[10px] font-bold text-brand-700"
            >
              {t("ai.chip_car")}
            </button>
            <button
              className="rounded-full bg-brand-50 px-2 py-1 text-[10px] font-bold text-brand-700"
            >
              {t("ai.chip_house")}
            </button>
            <button
              className="rounded-full bg-brand-50 px-2 py-1 text-[10px] font-bold text-brand-700"
            >
              {t("ai.chip_auction")}
            </button>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="mt-2 w-full rounded-[10px] bg-ink px-3 py-1.5 text-sm font-bold text-white"
          >
            {t("ai.find")}
          </button>
        </div>
      )}
    </div>
  );
}
