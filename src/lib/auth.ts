// @ts-nocheck
// Auth helpers — spec #45 (authentication, session security, device tracking)
// TODO: replace with NextAuth / Lucia + argon2, JWT httpOnly cookies, CSRF.

export interface SessionPayload {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

export function signSession(payload: Omit<SessionPayload, "iat" | "exp">): string {
  // Stub — in prod: JWT sign with NEXTAUTH_SECRET
  return Buffer.from(JSON.stringify({ ...payload, iat: Date.now(), exp: Date.now() + 864e5 })).toString("base64url");
}

export function verifySession(token: string): SessionPayload | null {
  try {
    const p = JSON.parse(Buffer.from(token, "base64url").toString());
    if (p.exp < Date.now()) return null;
    return p;
  } catch { return null; }
}

export const ROLES = ["super_admin","administrator","editor","auction_manager","seller_manager","finance_manager","kyc_manager","fraud_manager","support_manager","marketing_manager","moderator"] as const;
