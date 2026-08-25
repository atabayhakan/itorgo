import { test, expect } from "@playwright/test";

test("homepage shows live auctions", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Сейчас на торгах")).toBeVisible();
  await expect(page.getByText("Ставка").first()).toBeVisible();
});

test("search filters work", async ({ page }) => {
  await page.goto("/search");
  await expect(page.getByText("Найдено")).toBeVisible();
});
