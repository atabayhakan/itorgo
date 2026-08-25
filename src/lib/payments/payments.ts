// Payment abstraction — spec #48
// Bank adapters pluggable; statuses unified.

export type PaymentStatus = "pending" | "processing" | "paid" | "failed" | "refunded" | "cancelled";
export type PaymentMethod = "card" | "wallet" | "bank_transfer" | "receipt" | "cash_on_delivery";

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  currency: string; // сом / ₸ / so'm via CountryConfig
  method: PaymentMethod;
  status: PaymentStatus;
  createdAt: string;
  provider?: string; // e.g. "Optima Bank", "DemirBank", "PayBox" — pluggable
  receiptUrl?: string;
}

// Demo adapter interface — real banks implement this
export interface PaymentProvider {
  name: string;
  charge(amount: number, currency: string): Promise<{ status: PaymentStatus; txId: string }>;
  refund(paymentId: string): Promise<PaymentStatus>;
}

// Mock balances for wallet (#48)
export const MOCK_WALLET = {
  balance: 12450,
  currency: "сом" as const,
  transactions: [
    { id: "t1", label: "Пополнение", amount: 5000, at: "2026-08-20" },
    { id: "t2", label: "Покупка · iPhone 16", amount: -49500, at: "2026-08-19" },
    { id: "t3", label: "Возврат", amount: 2300, at: "2026-08-18" },
  ] as const,
};
