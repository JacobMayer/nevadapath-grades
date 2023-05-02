import { test, expect } from "@playwright/test";

test("should navigate to the home page", async ({ page }) => {
  await page.goto("/");
  //   await page.click("text=About");
  //   await expect(page).toHaveURL("/about");
  await expect(page.locator("h1")).toContainText(
    "Course Grade Distributions for UNR"
  );
});
