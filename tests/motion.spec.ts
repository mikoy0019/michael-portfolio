import { expect, test } from "@playwright/test";

test.describe("no scroll animation", () => {
  test("ships no animation library or scroll hooks", async ({ page }) => {
    const bodies: Promise<string>[] = [];
    page.on("response", (r) => {
      if (r.url().includes(".js")) bodies.push(r.text().catch(() => ""));
    });
    await page.goto("/", { waitUntil: "networkidle" });
    const js = await Promise.all(bodies);
    expect(js.length).toBeGreaterThan(0);
    expect(js.filter((b) => b.includes("ScrollTrigger") || b.includes("WebGLRenderer"))).toEqual([]);
    await expect(page.locator("canvas")).toHaveCount(0);
  });

  test("everything below the hero is fully visible without scrolling through it", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const faded = await page.evaluate(() =>
      [...document.querySelectorAll("#skills *, #work *, #more *, #automation *, #builds *, #sites *, #experience *, #contact *")]
        .filter((e) => Number(getComputedStyle(e).opacity) < 1 || getComputedStyle(e).transform !== "none")
        .filter((e) => !e.closest("[aria-hidden]"))
        .map((e) => e.tagName + "." + String(e.getAttribute("class")).slice(0, 40)),
    );
    expect(faded).toEqual([]);
  });
});

test.describe("selected work", () => {
  test("one section shows all four projects in order", async ({ page }) => {
    await page.goto("/");
    const work = page.locator("#work");
    await expect(work.getByRole("heading", { level: 2 })).toHaveText(/designed, built and shipped/);
    await expect(work.locator("article")).toHaveCount(4);
    await expect(work.getByText("PROJECT 01 / 04")).toHaveCount(1);
    await expect(work.getByText("PROJECT 04 / 04")).toHaveCount(1);
    await expect(page.locator("#work-more")).toHaveCount(0);
  });

  test("project images are large", async ({ page }, info) => {
    await page.goto("/");
    const box = (await page.locator("#work article .shot").first().boundingBox())!;
    expect(box.width).toBeGreaterThanOrEqual(info.project.name === "phone" ? 320 : 540);
  });

  test("text never overlaps the image in a project", async ({ page }) => {
    await page.goto("/");
    const overlaps = await page.evaluate(() =>
      [...document.querySelectorAll("#work article")].flatMap((a) => {
        const img = a.querySelector(".shot")!.getBoundingClientRect();
        return [...a.querySelectorAll("h3, p")].filter((t) => {
          if (t.closest(".shot")) return false;
          const r = t.getBoundingClientRect();
          return r.left < img.right && r.right > img.left && r.top < img.bottom && r.bottom > img.top;
        }).map((t) => t.textContent?.slice(0, 30));
      }),
    );
    expect(overlaps).toEqual([]);
  });

  test("/#work lands on the work heading", async ({ page }) => {
    await page.goto("/#work");
    await expect(page.getByRole("heading", { name: /designed, built and shipped/ })).toBeInViewport();
  });
});

test.describe("hero", () => {
  for (const [width, height] of [[1440, 900], [1883, 900], [1366, 650], [1171, 788], [1024, 700], [800, 800]]) {
    test(`actions are on screen at ${width}x${height}`, async ({ page }, info) => {
      test.skip(info.project.name !== "desktop");
      await page.setViewportSize({ width, height });
      await page.goto("/");
      await expect(page.getByRole("link", { name: "Explore My Work" })).toBeInViewport({ ratio: 1 });
    });
  }

  test("the portrait is large and clear of the headline", async ({ page }, info) => {
    await page.goto("/");
    await expect(page.getByRole("img", { name: /Portrait of Michael Tejada/ })).toBeVisible();
    const box = (await page.locator("[data-portrait]").boundingBox())!;
    expect(box.width).toBeGreaterThanOrEqual(info.project.name === "phone" ? 300 : 340);
    const title = (await page.locator("#hero-title").boundingBox())!;
    expect(title.x + title.width <= box.x || title.y + title.height <= box.y).toBe(true);
  });
});

test.describe("phone", () => {
  test.beforeEach(({}, info) => test.skip(info.project.name !== "phone"));

  test("Explore My Work scrolls to the work section", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Explore My Work" }).click();
    await expect(page.getByRole("heading", { name: /designed, built and shipped/ })).toBeInViewport();
  });

  test("/#contact lands on contact", async ({ page }) => {
    await page.goto("/#contact");
    await expect(page.getByRole("heading", { name: /Hiring for a remote role/ })).toBeInViewport();
  });
});
