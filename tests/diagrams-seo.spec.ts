import { expect, test } from "@playwright/test";

test.describe("system diagrams", () => {
  for (const width of [1024, 1280, 1440]) {
    test(`no arrow is left hanging at a line wrap at ${width}px`, async ({ page }, info) => {
      test.skip(info.project.name !== "desktop");
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      const dangling = await page.locator("figure").evaluateAll((figures) =>
        figures.flatMap((figure) => {
          const box = figure.getBoundingClientRect();
          const nodes = [...figure.querySelectorAll("[data-node]")].map((n) => n.getBoundingClientRect());
          return [...figure.querySelectorAll("[data-arrow]")]
            .map((a) => a.getBoundingClientRect())
            .filter((a) => a.width > 0 && a.left >= box.left)
            .filter((a) => {
              const cy = a.top + a.height / 2;
              const left = nodes.some((n) => n.right <= a.left + 1 && Math.abs(n.top + n.height / 2 - cy) < 4);
              const right = nodes.some((n) => n.left >= a.right - 1 && Math.abs(n.top + n.height / 2 - cy) < 4);
              return !(left && right);
            })
            .map((a) => ({ figure: figure.getAttribute("aria-label"), x: Math.round(a.left), y: Math.round(a.top) }));
        }),
      );
      expect(dangling).toEqual([]);
    });
  }

  test("every node stays fully inside its diagram", async ({ page }) => {
    await page.goto("/");
    const cut = await page.locator("figure").evaluateAll((figures) =>
      figures.flatMap((figure) => {
        const box = figure.getBoundingClientRect();
        return [...figure.querySelectorAll("[data-node]")]
          .filter((n) => {
            const r = n.getBoundingClientRect();
            return r.left < box.left || r.right > box.right + 1;
          })
          .map((n) => n.textContent);
      }),
    );
    expect(cut).toEqual([]);
  });
});

test.describe("structured data", () => {
  const read = (page: import("@playwright/test").Page) =>
    page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent ?? "{}")));

  test("the person record says what Michael does and shows his photo", async ({ page }) => {
    await page.goto("/");
    const person = (await read(page)).find((d) => d["@type"] === "Person");
    expect(person.knowsAbout.length).toBeGreaterThan(5);
    expect(person.image).toContain("/michael");
  });

  test("case studies describe the project and credit Michael", async ({ page }) => {
    await page.goto("/work/dinkup");
    const work = (await read(page)).find((d) => d["@type"] === "CreativeWork");
    expect(work.name).toBe("DinkUp");
    expect(work.url).toMatch(/\/work\/dinkup$/);
    expect(work.author.name).toBe("Michael Tejada");
    expect(work.keywords.length).toBeGreaterThan(0);
  });
});
