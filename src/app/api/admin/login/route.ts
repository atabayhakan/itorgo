import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, SESSION_TTL_MS, signSession, verifyPassword } from "@/lib/auth";

export const runtime = "nodejs";

// Stricter limiter for credential attempts: 5 per 10 min per IP.
const attempts = new Map<string, { n: number; reset: number }>();
const WINDOW_MS = 10 * 60_000;
const MAX_ATTEMPTS = 5;

function tooMany(ip: string): boolean {
  const now = Date.now();
  const cur = attempts.get(ip);
  if (!cur || now > cur.reset) {
    attempts.set(ip, { n: 1, reset: now + WINDOW_MS });
    return false;
  }
  cur.n += 1;
  return cur.n > MAX_ATTEMPTS;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (tooMany(ip)) {
    return NextResponse.json({ error: "too_many_attempts" }, { status: 429, headers: { "Retry-After": "600" } });
  }

  let body: { email?: string; password?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");
  const expectedEmail = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  const expectedHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedEmail || !expectedHash) {
    return NextResponse.json({ error: "admin_not_configured" }, { status: 503 });
  }

  // Always run the hash check so timing doesn't reveal whether the email matched.
  const passwordOk = await verifyPassword(password, expectedHash);
  if (email !== expectedEmail || !passwordOk) {
    return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
  }

  const token = await signSession({ userId: email, role: "super_admin" });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  });
  return res;
}
