import { expect, test, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";

const ROUTES = ["/", "/work/deskdev-studio", "/work/creator-ops-platform", "/work/clinic-booking-platform", "/work/dinkup"];
const CLIENT_STRINGS = /\b(cenvari|alagora|language ?break|mizen|miz en place|rico)\b/i;

async function revealAll(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
}

for (const colorScheme of ["dark", "light"] as const) {
  test.describe(`${colorScheme} theme`, () => {
    test.use({ colorScheme });

    for (const route of ROUTES) {
      test(`${route} renders cleanly`, async ({ page }) => {
        const errors: string[] = [];
        page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
        page.on("pageerror", (e) => errors.push(String(e)));

        const res = await page.goto(route, { waitUntil: "networkidle" });
        expect(res?.status()).toBe(200);
        await expect(page.locator("html")).toHaveAttribute("data-theme", colorScheme);

        await revealAll(page);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow).toBeLessThanOrEqual(1);

        const broken = await page.evaluate(() =>
          [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src),
        );
        expect(broken).toEqual([]);
        expect((await page.content()).match(CLIENT_STRINGS)).toBeNull();
        expect(errors).toEqual([]);
      });
    }
  });
}

test("utility colour classes win over base link styles", async ({ page }) => {
  await page.goto("/");
  const link = page.locator("a.bg-accent, .btn-primary").first();
  const expected = await page.evaluate(() => {
    const probe = document.createElement("span");
    probe.style.color = "var(--accent-ink)";
    document.body.appendChild(probe);
    const value = getComputedStyle(probe).color;
    probe.remove();
    return value;
  });
  expect(await link.evaluate((e) => getComputedStyle(e).color)).toBe(expected);
});

test("every rounded element uses a 15px radius", async ({ page }) => {
  for (const route of ROUTES) {
    await page.goto(route);
    const off = await page.evaluate(() =>
      [...document.querySelectorAll("body *")]
        .map((e) => ({ tag: e.tagName, cls: e.getAttribute("class")?.slice(0, 50), radius: getComputedStyle(e).borderTopLeftRadius }))
        .filter((e) => e.radius !== "0px" && e.radius !== "15px"),
    );
    expect(off).toEqual([]);
  }
});

test("old routes redirect to homepage sections", async ({ page }) => {
  for (const [from, hash] of [["/about", "#experience"], ["/portfolio", "#work"], ["/services", "#contact"], ["/contact", "#contact"]]) {
    await page.goto(from);
    expect(page.url().endsWith(`/${hash}`)).toBe(true);
  }
});

test("unknown case study returns 404", async ({ page }) => {
  expect((await page.goto("/work/nope"))?.status()).toBe(404);
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("all sections are visible", async ({ page }) => {
    await page.goto("/");
    for (const id of ["skills", "work", "more", "automation", "builds", "sites", "experience", "contact"]) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
  });
});

test("roles Michael removed stay removed", async ({ page }) => {
  await page.goto("/");
  const html = await page.content();
  expect(html).not.toContain("Senior Sales");
  expect(html).not.toContain("Department of Trade");
});

test("hero uses the approved copy", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("WEB DESIGNER & DEVELOPER / AI AUTOMATION SPECIALIST")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("I BUILD PRODUCTS AND THE AI AUTOMATIONS THAT RUN THEM.");
  await expect(page.getByRole("link", { name: "Explore My Work" })).toHaveAttribute("href", "/#work");
  await expect(page.getByRole("link", { name: "Let's Connect" })).toHaveAttribute("href", "/#contact");
});

test("demos that are offline are not linked", async ({ page }) => {
  await page.goto("/");
  const hrefs = await page.locator("a[href^='http']").evaluateAll((els) => els.map((e) => (e as HTMLAnchorElement).href));
  for (const dead of ["pos-app-rho-neon", "invoice-chase-brown", "inbox-ai-ten", "stock-sense-delta", "delivery-app-kappa-ashen", "fourstatesconcreterepair", "womblesglassandmirror"]) {
    expect(hrefs.filter((h) => h.includes(dead))).toEqual([]);
  }
  await expect(page.getByText("Demo offline").first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Command Desk" })).toBeVisible();
});

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

test("theme tokens match the spec and pass AA contrast", () => {
  const css = readFileSync("src/app/globals.css", "utf8");
  const block = (selector: string) => css.slice(css.indexOf(selector), css.indexOf("}", css.indexOf(selector)));
  const token = (b: string, name: string) => new RegExp(`--${name}: *(#[0-9a-fA-F]{6})`).exec(b)?.[1] ?? "";

  const dark = block(':root[data-theme="dark"]');
  expect(token(dark, "bg")).toBe("#08080C");
  expect(token(dark, "surface")).toBe("#111117");
  expect(token(dark, "surface-2")).toBe("#191921");
  expect(token(dark, "accent")).toBe("#9568FF");
  expect(token(dark, "accent-strong")).toBe("#BBA1FF");
  expect(token(dark, "ink")).toBe("#F7F7FA");
  expect(token(dark, "ink-soft")).toBe("#A4A4B2");

  for (const b of [dark, block(':root[data-theme="light"]')]) {
    for (const fg of ["ink", "ink-soft", "ink-muted"]) {
      expect(contrast(token(b, fg), token(b, "bg")), fg).toBeGreaterThanOrEqual(4.5);
      expect(contrast(token(b, fg), token(b, "surface")), fg).toBeGreaterThanOrEqual(4.5);
    }
    expect(contrast(token(b, "accent-ink"), token(b, "accent"))).toBeGreaterThanOrEqual(4.5);
  }
});
