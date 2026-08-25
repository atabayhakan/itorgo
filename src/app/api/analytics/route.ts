import { NextResponse } from "next/server";
import { track } from "@/lib/analytics/events";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  // body: { event, properties }
  if (body?.event) track(body.event, body.properties);
  return NextResponse.json({ ok: true });
}
