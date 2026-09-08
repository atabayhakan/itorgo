// Auth helpers — admin session (HMAC-signed) + password hashing (PBKDF2).
// Dependency-free, Web Crypto only → works in both the Edge middleware and Node route handlers.

export interface SessionPayload {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

export const ADMIN_COOKIE = "itorgo_admin";
export const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12h

export const ROLES = ["super_admin","administrator","editor","auction_manager","seller_manager","finance_manager","kyc_manager","fraud_manager","support_manager","marketing_manager","moderator"] as const;

const enc = new TextEncoder();

function b64url(bytes: ArrayBuffer | Uint8Array): string {
  const u8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let s = "";
  for (const b of u8) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function fromB64url(s: string): Uint8Array<ArrayBuffer> {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/") + pad);
  const out = new Uint8Array(new ArrayBuffer(bin.length));
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

function secret(): string {
  const s = process.env.NEXTAUTH_SECRET;
  if (!s || s === "change-me-in-production") {
    throw new Error("NEXTAUTH_SECRET is missing or still the placeholder — set a real secret before enabling admin auth.");
  }
  return s;
}

async function hmacKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey("raw", enc.encode(secret()), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

/** Create a signed session token: base64url(payload).base64url(hmac). */
export async function signSession(payload: Omit<SessionPayload, "iat" | "exp">): Promise<string> {
  const now = Date.now();
  const body = b64url(enc.encode(JSON.stringify({ ...payload, iat: now, exp: now + SESSION_TTL_MS })));
  const sig = await crypto.subtle.sign("HMAC", await hmacKey(), enc.encode(body));
  return `${body}.${b64url(sig)}`;
}

/** Verify signature + expiry. Returns null on any failure. */
export async function verifySession(token: string | undefined): Promise<SessionPayload | null> {
  try {
    if (!token) return null;
    const [body, sig] = token.split(".");
    if (!body || !sig) return null;
    const expected = await crypto.subtle.sign("HMAC", await hmacKey(), enc.encode(body));
    if (!timingSafeEqual(new Uint8Array(expected), fromB64url(sig))) return null;
    const p = JSON.parse(new TextDecoder().decode(fromB64url(body))) as SessionPayload;
    if (typeof p.exp !== "number" || p.exp < Date.now()) return null;
    return p;
  } catch {
    return null;
  }
}

// ---------- Password hashing: PBKDF2-SHA256 ----------
// Format: pbkdf2:<iterations>:<salt b64url>:<hash b64url>
// (":" instead of "$" so env loaders with variable expansion don't mangle it)
const PBKDF2_ITER = 210_000;

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations: PBKDF2_ITER }, key, 256);
  return `pbkdf2:${PBKDF2_ITER}:${b64url(salt)}:${b64url(bits)}`;
}

export async function verifyPassword(password: string, stored: string | undefined): Promise<boolean> {
  try {
    if (!stored) return false;
    const [algo, iterStr, saltB64, hashB64] = stored.split(":");
    if (algo !== "pbkdf2") return false;
    const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
    const bits = await crypto.subtle.deriveBits(
      { name: "PBKDF2", hash: "SHA-256", salt: fromB64url(saltB64), iterations: Number(iterStr) },
      key,
      256,
    );
    return timingSafeEqual(new Uint8Array(bits), fromB64url(hashB64));
  } catch {
    return false;
  }
}
