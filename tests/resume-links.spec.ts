import { expect, test } from "@playwright/test";

const ALPINE = "https://creators.alpineprovisionsco.com";

test.describe("resume details", () => {
  test("the contact email matches the resume", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('a[href="mailto:michaeltejada.work@gmail.com"]').first()).toBeAttached();
    expect(await page.content()).not.toContain("mic.tejada02");
  });

  test("the hero links to the resume", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".hero").getByRole("link", { name: "View resume" })).toHaveAttribute("href", /drive\.google\.com\/file\/d\/1XGZvRAUmWyxmQkHE5tBZ7ePmhTL_4gFG/);
  });

  test("every resume role appears with its dates", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#experience");
    for (const [role, dates] of [
      ["Web Designer & Developer", "July 2021 to October 2026"],
      ["WordPress Developer", "June 2019 to February 2021"],
      ["Web Design Intern", "February 2017 to November 2018"],
    ]) {
      const card = section.locator("[data-role]", { hasText: role });
      await expect(card).toHaveCount(1);
      await expect(card).toContainText(dates);
    }
  });

  test("the NixGen co-founder role is not listed (Michael asked for it to be hidden)", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#experience [data-role]", { hasText: "NixGen Solutions" })).toHaveCount(0);
    await expect(page.locator("#experience [data-role]")).toHaveCount(3);
  });
});

test.describe("real app links", () => {
  test("the creator platform links to the live app from the homepage", async ({ page }) => {
    await page.goto("/");
    const card = page.locator("#work article", { hasText: "Alpine Creator Scout" });
    await expect(card.getByRole("link", { name: /Live app/ })).toHaveAttribute("href", ALPINE);
  });

  test("the creator case study links to the live app and isn't called anonymised", async ({ page }) => {
    await page.goto("/work/creator-ops-platform");
    await expect(page.getByRole("link", { name: /Live app/ }).first()).toHaveAttribute("href", ALPINE);
    await expect(page.locator("main")).not.toContainText(/anonymised/i);
  });

  test("DinkUp links to its live demo", async ({ page }) => {
    await page.goto("/");
    const card = page.locator("#work article", { hasText: "DinkUp" });
    await expect(card.getByRole("link", { name: /live demo/i })).toHaveAttribute("href", "https://dinkup-demo.vercel.app");
  });

  test("DeskDev shows its live link on the homepage", async ({ page }) => {
    await page.goto("/");
    const card = page.locator("#work article", { hasText: "DeskDev Studio" });
    await expect(card.getByRole("link", { name: /live site/i })).toHaveAttribute("href", "https://nixgensolutions.com");
  });
});

test("education matches the resume", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#education");
  await expect(section.getByText("Father Saturnino Urios University")).toBeVisible();
  await expect(section.getByText("Business Marketing Management")).toBeVisible();
  await expect(section.getByText("AMA Computer Learning Center")).toBeVisible();
  await expect(section.getByText("Computer System and Network")).toBeVisible();
  await expect(section.locator("[data-education]")).toHaveCount(2);
});

test("the headline leads with products and AI automation", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("I BUILD PRODUCTS AND THE AI AUTOMATIONS THAT RUN THEM.");
});

test("DeskDev offers a live demo with its sign-in details", async ({ page }) => {
  await page.goto("/");
  const card = page.locator("#work article", { hasText: "DeskDev Studio" });
  await expect(card.getByRole("link", { name: /Try the demo/ })).toHaveAttribute("href", "https://deskdev-demo.vercel.app");
  await expect(card).toContainText("admin@deskdev.local");
  await page.goto("/work/deskdev-studio");
  await expect(page.getByRole("link", { name: /Try the demo/ }).first()).toHaveAttribute("href", "https://deskdev-demo.vercel.app");
});

test("pages send security headers and still render under them", async ({ page, request }) => {
  const headers = (await request.get("/")).headers();
  expect(headers["strict-transport-security"]).toContain("max-age=");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(headers["content-security-policy"]).toContain("form-action 'self' https://formsubmit.co");

  const blocked: string[] = [];
  page.on("console", (m) => /Content Security Policy/i.test(m.text()) && blocked.push(m.text()));
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", /dark|light/);
  expect(blocked).toEqual([]);
});
