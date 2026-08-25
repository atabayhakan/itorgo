"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("itorgo_theme") as "light" | "dark" | null;
    const initial = saved ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("itorgo_theme", next);
  }

  return (
    <button onClick={toggle} className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold">
      {theme === "light" ? "🌙 Тёмная" : "☀️ Светлая"}
    </button>
  );
}

// Inline script to prevent FOUC — inject in layout head
export const themeInitScript = `try{const s=localStorage.getItem("itorgo_theme");const t=s||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",t)}catch{}`;
