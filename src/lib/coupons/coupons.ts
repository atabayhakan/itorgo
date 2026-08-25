// Coupon mock — spec Coupon model

export interface Coupon {
  code: string;
  discountPct: number; // 0-100
  active: boolean;
  endsAt?: string;
}

export const COUPONS: Coupon[] = [
  { code: "SALAM10", discountPct: 10, active: true },
  { code: "ITOrgo20", discountPct: 20, active: true, endsAt: "2026-12-31" },
  { code: "KG5", discountPct: 5, active: true },
];

export function validateCoupon(code: string): Coupon | null {
  const c = COUPONS.find((x) => x.code.toLowerCase() === code.toLowerCase().trim());
  if (!c || !c.active) return null;
  if (c.endsAt && new Date(c.endsAt) < new Date()) return null;
  return c;
}
