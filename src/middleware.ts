import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySession } from "@/lib/auth";

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

function isAdminPath(p: string) {
  return p === "/admin" || p.startsWith("/admin/") || p.startsWith("/api/admin/");
}
function isAdminPublic(p: string) {
  return p === "/admin/login" || p === "/api/admin/login";
}

/**
 * - Country detection (KG default, KZ/UZ via header/cookie/flag)
 * - Locale normalization (ru default)
 * - /admin guard: signed session cookie required; optional host pinning via ADMIN_HOST
 * - Rate limiting
 */
export async function middleware(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimit(ip)) {
    return new NextResponse("Too Many Requests", { status: 429, headers: { "Retry-After": "60" } });
  }

  const url = req.nextUrl;
  const path = url.pathname;

  if (isAdminPath(path)) {
    // Host pinning: when ADMIN_HOST is set (e.g. admin.itorgo.kg), admin routes only exist on that host.
    const adminHost = process.env.ADMIN_HOST;
    const host = (req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "").split(":")[0];
    if (adminHost && host !== adminHost) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (!isAdminPublic(path)) {
      const session = await verifySession(req.cookies.get(ADMIN_COOKIE)?.value);
      if (!session) {
        if (path.startsWith("/api/")) {
          return NextResponse.json({ error: "unauthorized" }, { status: 401 });
        }
        const login = new URL("/admin/login", req.url);
        login.searchParams.set("next", path);
        const res = NextResponse.redirect(login);
        res.cookies.delete(ADMIN_COOKIE);
        return res;
      }
    }
  }

  const country = req.cookies.get("itorgo_country")?.value ?? req.headers.get("x-country") ?? "KG";
  const rawLocale = req.cookies.get("itorgo_locale")?.value ?? "ru";
  const locale = ["ru", "ky", "tr"].includes(rawLocale) ? rawLocale : "ru";

  const res = NextResponse.next();
  res.headers.set("x-country", country.toUpperCase());
  res.headers.set("x-locale", locale.toLowerCase());
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  if (isAdminPath(path)) {
    res.headers.set("Cache-Control", "no-store");
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sw.js|manifest.json).*)"],
};
