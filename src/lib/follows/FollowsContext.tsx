"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface FollowCtx { ids: Set<string>; toggle: (id: string) => void; has: (id: string) => boolean; }
const Ctx = createContext<FollowCtx | null>(null);

export function FollowsProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<Set<string>>(new Set());
  useEffect(() => { try { const r = localStorage.getItem("itorgo_follows"); if (r) setIds(new Set(JSON.parse(r))); } catch {} }, []);
  useEffect(() => { try { localStorage.setItem("itorgo_follows", JSON.stringify([...ids])); } catch {} }, [ids]);
  const toggle = (id: string) => setIds((p) => { const n = new Set(p); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  return <Ctx.Provider value={{ ids, toggle, has: (id) => ids.has(id) }}>{children}</Ctx.Provider>;
}

export function useFollows() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useFollows outside provider");
  return v;
}
