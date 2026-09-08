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

/** i18n key (wallet namespace) for a transaction's label; translate at render time with t(). */
export type WalletTransactionLabelKey = "wallet.tx_topup" | "wallet.tx_purchase" | "wallet.tx_refund";

export interface WalletTransaction {
  id: string;
  labelKey: WalletTransactionLabelKey;
  /** Optional non-translatable detail (e.g. product name) appended after the label. */
  detail?: string;
  amount: number;
  at: string;
}

// Mock balances for wallet (#48)
export const MOCK_WALLET: { balance: number; currency: "сом"; transactions: readonly WalletTransaction[] } = {
  balance: 12450,
  currency: "сом",
  transactions: [
    { id: "t1", labelKey: "wallet.tx_topup", amount: 5000, at: "2026-08-20" },
    { id: "t2", labelKey: "wallet.tx_purchase", detail: "iPhone 16", amount: -49500, at: "2026-08-19" },
    { id: "t3", labelKey: "wallet.tx_refund", amount: 2300, at: "2026-08-18" },
  ],
};
