// Fraud engine stubs — spec #46
// Each rule returns a score 0..1; aggregator opens FraudCase above threshold.

export type FraudSignal = {
  kind: string;
  score: number;
  meta?: Record<string, unknown>;
};

export function checkDuplicateAccount(userId: string, _context: unknown): FraudSignal | null {
  // TODO: compare phone/email/device fingerprint, image hash
  void userId;
  return null;
}

export function checkShillBidding(auctionId: string, _bids: unknown[]): FraudSignal | null {
  void auctionId;
  // TODO: seller-bidder graph, velocity, retraction rate
  return null;
}

export function checkSuspiciousPayment(paymentId: string): FraudSignal | null {
  void paymentId;
  return null;
}

export async function evaluateFraud(subjectId: string, signals: (FraudSignal | null)[]): Promise<void> {
  const active = signals.filter(Boolean) as FraudSignal[];
  const max = Math.max(0, ...active.map((s) => s.score));
  if (max > 0.7) {
    // TODO: prisma.fraudCase.create({ data: { kind: active[0].kind, subjectId, score: max, meta: active[0].meta } })
    console.warn("[fraud] case would be opened", { subjectId, max, active });
  }
}
