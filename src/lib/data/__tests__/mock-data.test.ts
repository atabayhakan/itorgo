import { describe, it, expect } from "vitest";
import { formatKGS } from "@/lib/data/mock-data";

describe("formatKGS", () => {
  it("formats with space as thousand separator (ru-RU)", () => {
    expect(formatKGS(49500)).toBe("49 500");
    expect(formatKGS(1320000)).toBe("1 320 000");
    expect(formatKGS(0)).toBe("0");
  });
});
