import { describe, it, expect } from "vitest";
import { getLiveAuctions, getFeed, formatKGS, PRODUCTS } from "@/lib/data/mock-data";

describe("formatKGS", () => {
  it("formats with space", () => {
    expect(formatKGS(49500)).toBe("49 500");
    expect(formatKGS(1320000)).toBe("1 320 000");
  });
});

describe("getLiveAuctions", () => {
  it("returns sorted by endsAt ascending", () => {
    const live = getLiveAuctions();
    for (let i = 1; i < live.length; i++) {
      expect(Date.parse(live[i - 1].endsAt)).toBeLessThanOrEqual(Date.parse(live[i].endsAt));
    }
  });
  it("all have bids", () => {
    expect(getLiveAuctions().every((a) => a.bidsCount > 0)).toBe(true);
  });
});

describe("getFeed", () => {
  it("returns requested limit", () => {
    expect(getFeed(6)).toHaveLength(6);
    expect(getFeed(12)).toHaveLength(12);
  });
  it("mixes auction and regular products", () => {
    const feed = getFeed(12);
    expect(feed.some((p) => p.isAuction)).toBe(true);
    expect(feed.some((p) => !p.isAuction)).toBe(true);
  });
});

describe("mock data invariants", () => {
  it("every product has a city", () => {
    expect(PRODUCTS.every((p) => !!p.city)).toBe(true);
  });
});
