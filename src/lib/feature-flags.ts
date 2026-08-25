// @ts-nocheck
import { prisma } from "@/lib/db";

export const FLAG_KEYS = [
  "auction",
  "buy_now",
  "wallet",
  "ai",
  "reviews",
  "stores",
  "kyc",
  "sms",
  "dark_mode",
  "kz",
  "uz",
] as const;
export type FlagKey = (typeof FLAG_KEYS)[number];

const FALLBACK: Record<FlagKey, boolean> = {
  auction: true,
  buy_now: true,
  wallet: false,
  ai: true,
  reviews: true,
  stores: true,
  kyc: true,
  sms: true,
  dark_mode: false,
  kz: false,
  uz: false,
};

export async function isEnabled(key: FlagKey): Promise<boolean> {
  try {
    const row = await (prisma as any).featureFlag.findUnique({ where: { key } });
    if (row) return row.enabled;
  } catch {}
  return FALLBACK[key];
}

export async function allFlags(): Promise<Record<FlagKey, boolean>> {
  try {
    const rows = await (prisma as any).featureFlag.findMany();
    const map = Object.fromEntries(rows.map((r: any) => [r.key, r.enabled]));
    return { ...FALLBACK, ...map };
  } catch { return { ...FALLBACK }; }
}
