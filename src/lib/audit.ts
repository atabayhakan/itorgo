// @ts-nocheck
import { prisma } from "@/lib/db";

export async function logAudit(params: {
  actorId?: string;
  action: string;
  targetType?: string;
  targetId?: string;
  oldValue?: unknown;
  newValue?: unknown;
  ip?: string;
}) {
  try {
    await (prisma as any).auditLog.create({
      data: {
        actorId: params.actorId,
        action: params.action,
        targetType: params.targetType,
        targetId: params.targetId,
        oldValue: params.oldValue as never,
        newValue: params.newValue as never,
        ip: params.ip,
      },
    });
  } catch (e) {
    console.warn("[audit] failed to persist", e);
  }
}
