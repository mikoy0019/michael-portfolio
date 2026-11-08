import { expect, test } from "@playwright/test";

test.describe("section layout", () => {
  test("gaps between sections stay tight", async ({ page }) => {
    await page.goto("/");
    const gap = await page.evaluate(() => {
      const heading = (id: string) => document.querySelector(`#${id} h2`)!.getBoundingClientRect().top;
      const lastCard = document.querySelector("#more article:last-child")!.getBoundingClientRect().bottom;
      return heading("automation") - lastCard;
    });
    expect(gap).toBeLessThanOrEqual(200); // 160px of padding plus the eyebrow label above the heading
  });

  test("visuals in More Projects line up on desktop", async ({ page }, info) => {
    test.skip(info.project.name !== "desktop");
    await page.goto("/");
    const heights = await page.locator("#more article .shot").evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().height)));
    expect(heights).toHaveLength(4);
    expect(new Set(heights).size).toBe(1);
  });

  test("only client work says screenshots are withheld", async ({ page }) => {
    await page.goto("/");
    const deliverease = page.locator("#more article", { hasText: "DeliverEase" });
    await expect(deliverease.getByText(/withheld/i)).toHaveCount(0);
    await expect(page.locator("#more article", { hasText: "Headless Storefront" }).getByText(/withheld/i)).toHaveCount(1);
  });

  test("no sign-in screen is the lead image of a project card", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('#more img[src*="delivery-app"]')).toHaveCount(0);
  });

  test("demos with working links or real screens come first", async ({ page }) => {
    await page.goto("/");
    const names = await page.locator("#builds h3").allTextContents();
    expect(names[0]).toContain("Command Desk");
    expect(names.at(-1)).toContain("POS System");
  });

  test("client site rows are the same height", async ({ page }) => {
    await page.goto("/");
    const heights = await page.locator("#sites li").evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().height)));
    expect(new Set(heights).size).toBe(1);
  });

  test("experience uses the full width on desktop", async ({ page }, info) => {
    test.skip(info.project.name !== "desktop");
    await page.goto("/");
    const roles = await page.locator("#experience [data-role]").evaluateAll((els) => els.map((e) => e.getBoundingClientRect()).map((r) => ({ x: Math.round(r.x), y: Math.round(r.y) })));
    expect(roles).toHaveLength(4);
    expect(roles[0].y).toBe(roles[1].y);
    expect(roles[1].x).toBeGreaterThan(roles[0].x + 300);
  });

  test("diagrams are never clipped", async ({ page }) => {
    await page.goto("/");
    const clipped = await page.locator("figure").evaluateAll((els) =>
      els.filter((f) => f.scrollHeight > f.clientHeight + 1 || f.parentElement!.scrollHeight > f.parentElement!.clientHeight + 1).length,
    );
    expect(clipped).toBe(0);
  });
});
