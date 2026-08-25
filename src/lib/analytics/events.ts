// Event-based analytics — spec #58
// Abstraction ready for Elasticsearch / Segment / Mixpanel later.

export type AnalyticsEvent =
  | "view_product"
  | "search"
  | "favorite"
  | "bid"
  | "buy_now"
  | "add_to_cart"
  | "checkout"
  | "payment"
  | "auction_won"
  | "auction_lost"
  | "seller_created"
  | "store_created"
  | "listing_created"
  | "review_created";

export interface AnalyticsPayload {
  event: AnalyticsEvent;
  at: string;
  userId?: string;
  properties?: Record<string, unknown>;
  // Country/locale context — spec #44
  country?: string;
  locale?: string;
}

// In-memory queue for demo; TODO: batch + sendBeacon to /api/analytics
const queue: AnalyticsPayload[] = [];

export function track(event: AnalyticsEvent, properties?: Record<string, unknown>) {
  const payload: AnalyticsPayload = {
    event,
    at: new Date().toISOString(),
    properties,
    country: "KG",
    locale: "ru",
  };
  queue.push(payload);
  // Keep demo visible in devtools without spamming prod
  if (process.env.NODE_ENV !== "production") console.debug("[analytics]", payload);
  // TODO: navigator.sendBeacon('/api/analytics', JSON.stringify(payload))
}

export function getQueue() {
  return [...queue];
}
