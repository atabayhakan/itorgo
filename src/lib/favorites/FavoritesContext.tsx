"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { track } from "@/lib/analytics/events";

interface FavCtx {
  ids: Set<string>;
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  count: number;
}

const Ctx = createContext<FavCtx | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem("itorgo_favs");
      if (raw) setIds(new Set(JSON.parse(raw)));
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem("itorgo_favs", JSON.stringify([...ids])); } catch {}
  }, [ids]);

  const toggle = (id: string) => setIds((prev) => {
    const next = new Set(prev);
    if (next.has(id)) { next.delete(id); track("favorite", { id, action: "remove" }); }
    else { next.add(id); track("favorite", { id, action: "add" }); }
    return next;
  });
  const has = (id: string) => ids.has(id);

  return <Ctx.Provider value={{ ids, toggle, has, count: ids.size }}>{children}</Ctx.Provider>;
}

export function useFavorites() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useFavorites must be inside FavoritesProvider");
  return v;
}
