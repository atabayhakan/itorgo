import { NextResponse, type NextRequest } from "next/server";

// In-memory rate limiter (demo) — replace with Redis/Upstash in prod.
const hits = new Map<string, { n: number; reset: number }>();
const WINDOW_MS = 60_000;
const MAX_HITS = 60; // 60 req/min per IP

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const cur = hits.get(ip);
  if (!cur || now > cur.reset) {
    hits.set(ip, { n: 1, reset: now + WINDOW_MS });
    return false;
  }
  cur.n += 1;
  return cur.n > MAX_HITS;
}

/**
 * Spec #43–45, #67:
 * - Country detection (KG default, KZ/UZ via header/cookie/flag)
 * - Locale normalization (ru default)
 * - /admin guard (stub — checks `itorgo_session` cookie)
 * - Rate limiting
 */
export function middleware(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimit(ip)) {
    return new NextResponse("Too Many Requests", { status: 429, headers: { "Retry-After": "60" } });
  }

  const url = req.nextUrl;
  const country = req.cookies.get("itorgo_country")?.value ?? req.headers.get("x-country") ?? "KG";
  const locale = req.cookies.get("itorgo_locale")?.value ?? "ru";

  // Admin guard — TODO: verify session JWT via lib/auth
  if (url.pathname.startsWith("/admin")) {
    const session = req.cookies.get("itorgo_session")?.value;
    // Allow in demo; in prod: if (!session) return NextResponse.redirect(new URL("/login", req.url));
    void session;
  }

  const res = NextResponse.next();
  // Propagate country/locale to server components via headers
  res.headers.set("x-country", country.toUpperCase());
  res.headers.set("x-locale", locale.toLowerCase());
  // Security headers (defense in depth — next.config also sets these)
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sw.js|manifest.json).*)"],
};
