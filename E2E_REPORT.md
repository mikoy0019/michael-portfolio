# E2E Report — michael-portfolio

Date: 2026-11-08
Commit: 675f9ac + the test fix committed with this report, branch `feat/portfolio-refresh`
Target: static export (`npm run build`) served by `wrangler dev` (Cloudflare assets runtime) on :4400, Chrome, desktop 1440×900 and phone (Pixel 7, 390×844)
Result: PASS — 129 passed, 15 skipped (device-specific), 0 failed after re-runs
Video: on for every test (`E2E_RUN_ID` set), 136+ recordings under `e2e-artifacts/20261108-refresh*` (gitignored)

Run history for this release:

| Run | Result | Notes |
|---|---|---|
| `20261108-refresh` (full, 144 tests, 2 workers) | 120 passed, 9 failed, 15 skipped, 133 videos | 2 real failures: `motion.spec` still targeted the old `.shot` wrapper on flagship cards → fixed to `[data-visual]`. 7 were "Tearing down context exceeded 90000ms" (video encoding under 2 workers; same flake as 2026-11-07). |
| `20261108-refresh-rerun` (the 9 + their files, 54 tests) | 44 passed, 2 teardown timeouts, 8 skipped | Different tests timed out than before, confirming the flake is not a product defect. |
| `20261108-refresh-rerun2` / `-rerun3` (singly, 1 worker) | 1 passed each, video present | `hero › actions are on screen at 1171x788`, `light theme › / renders cleanly`. |

Flows covered: homepage and all four case studies in both themes (console clean, no broken images, no horizontal overflow, no client names); the new framed visuals (flagship cards show real screens, Alpine Creator Scout with its phone-portal inset, DeskDev with the NixGen site inset); the NixGen co-founder role absent from Experience; navigation, phone menu, theme toggle, resume and live-app links; contact form setup and thank-you page; 404 page; layouts at 390/800/1024/1171/1366/1440/1883 px; 15px radius rule; security headers; old-route redirects; structured data.

Not covered: real delivery through FormSubmit; sign-in inside the linked live apps; the Vercel copy (verified separately with curl after deploy — see PRE_DEPLOY_REPORT.md).
