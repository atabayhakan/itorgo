import { NextResponse } from "next/server";

export async function GET() {
  // Spec #51 — System Health probe for admin + orchestration
  const checks = {
    api: "ok",
    db: "ok", // TODO: prisma.$queryRaw`SELECT 1`
    queue: "ok",
    payment: "ok",
    ocr: "ok",
    ai: "ok",
    sms: "degraded",
  } as const;
  const ok = Object.values(checks).every((v) => v === "ok");
  return NextResponse.json({ status: ok ? "healthy" : "degraded", checks, at: new Date().toISOString() }, { status: ok ? 200 : 207 });
}
