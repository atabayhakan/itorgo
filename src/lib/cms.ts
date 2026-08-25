// @ts-nocheck
// Dynamic CMS — spec #42
// Admin can edit buttons/labels/menu/headings/placeholders/errors/banners
// Source of truth: DB Translation table. Fallback: dictionaries.ts.

import { dictionaries } from "@/lib/i18n/dictionaries";

export type CmsEntry = { key: string; locale: string; value: string };

// Flatten dictionaries for display (demo)
export function flattenRu(): CmsEntry[] {
  const out: CmsEntry[] = [];
  const walk = (obj: Record<string, unknown>, prefix = "") => {
    for (const [k, v] of Object.entries(obj)) {
      const key = prefix ? `${prefix}.${k}` : k;
      if (typeof v === "string") out.push({ key, locale: "ru", value: v });
      else if (v && typeof v === "object") walk(v as Record<string, unknown>, key);
    }
  };
  walk(dictionaries.ru as unknown as Record<string, unknown>);
  return out;
}

// TODO: replace with prisma.translation.findMany / upsert
export async function getCmsEntries(): Promise<CmsEntry[]> {
  return flattenRu().slice(0, 50);
}
