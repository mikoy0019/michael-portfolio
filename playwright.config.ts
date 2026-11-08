import { defineConfig, devices } from "@playwright/test";

const PORT = 4400;
const RUN_ID = process.env.E2E_RUN_ID;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 2,
  timeout: 90_000,
  reporter: [["line"]],
  outputDir: RUN_ID ? `./e2e-artifacts/${RUN_ID}` : "./test-results",
  use: { baseURL: `http://localhost:${PORT}`, channel: "chrome", video: RUN_ID ? { mode: "on", size: { width: 1280, height: 720 } } : "off" },
  webServer: {
    // Serve the static export through the Cloudflare assets runtime so _headers/_redirects/404 are exercised too.
    command: `npm run build && npx wrangler dev --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    timeout: 240_000,
    reuseExistingServer: true,
  },
  projects: [
    {
      name: "desktop",
      use: {
        viewport: { width: 1440, height: 900 },
        launchOptions: { args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] },
      },
    },
    { name: "phone", use: { ...devices["Pixel 7"], channel: "chrome", viewport: { width: 390, height: 844 } } },
  ],
});
