import { expect, test } from "@playwright/test";

test.describe("what I can do", () => {
  test("comes straight after the hero and before the work", async ({ page }) => {
    await page.goto("/");
    const order = await page.evaluate(() => {
      const top = (s: string) => document.querySelector(s)!.getBoundingClientRect().top;
      return [top(".hero"), top("#skills"), top("#work")];
    });
    expect(order[0]).toBeLessThan(order[1]);
    expect(order[1]).toBeLessThan(order[2]);
  });

  test("lists jobs, skills and tools", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#skills");
    await expect(section.getByRole("heading", { name: "Full-Stack Developer" })).toHaveCount(1);
    await expect(section.getByRole("heading", { name: "AI Automation Engineer" })).toHaveCount(1);
    await expect(section.locator("[data-job]")).toHaveCount(6);
    await expect(section.locator("[data-skill]").first()).toBeAttached();
    await expect(section.getByText("Next.js (App Router)")).toHaveCount(1);
  });

  test("the tools appear once on the page", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#stack")).toHaveCount(0);
  });

  test("the nav links to it", async ({ page }, info) => {
    test.skip(info.project.name !== "desktop");
    await page.goto("/");
    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Skills", exact: true }).click();
    await expect(page.locator("#skills-title")).toBeInViewport();
  });
});

test.describe("hero", () => {
  test("introduces Michael personally and shows verified proof points", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".hero").getByText("I'm Michael")).toBeVisible();
    const stats = page.locator(".hero [data-stat]");
    await expect(stats).toHaveCount(4);
    await expect(stats.first()).toBeVisible();
  });
});

test("unknown pages show a designed 404 with a way home", async ({ page }) => {
  const res = await page.goto("/this-page-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page).toHaveTitle(/Page not found/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/not here/i);
  await page.getByRole("main").getByRole("link", { name: "Back to home" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("the contact form returns visitors to a thank-you page", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('form input[name="_next"]')).toHaveAttribute("value", /\/thanks$/);
  await expect(page.locator('form input[name="_captcha"]')).toHaveAttribute("value", "false");
  await page.goto("/thanks");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Message sent/i);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

test("project cards use their visible text as their accessible name", async ({ page }) => {
  await page.goto("/");
  expect(await page.locator('a[href="/work/creator-ops-platform"]').first().getAttribute("aria-label")).toBeNull();
});

test("text links are at least 24px tall", async ({ page }) => {
  for (const route of ["/", "/work/dinkup"]) {
    await page.goto(route);
    const small = await page.evaluate(() =>
      [...document.querySelectorAll("a, button")]
        .filter((e) => !e.classList.contains("sr-only") && !e.closest("[aria-hidden]"))
        .map((e) => ({ t: e.textContent?.trim().slice(0, 30), h: e.getBoundingClientRect().height }))
        .filter((e) => e.h > 0 && e.h < 24),
    );
    expect(small).toEqual([]);
  }
});

test("favicon.ico resolves", async ({ request }) => {
  expect((await request.get("/favicon.ico")).status()).toBe(200);
});

test("Escape closes the phone menu and returns focus", async ({ page }, info) => {
  test.skip(info.project.name !== "phone");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open menu" });
  await toggle.tap();
  await expect(page.locator("#mobile-menu")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-menu")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
});
