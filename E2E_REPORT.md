# E2E Report — michael-portfolio

Date: 2026-11-08
Commit: (this commit) — siteUrl switched from Vercel to https://michael-portfolio.michaeltejada-work.workers.dev
Target: web, production build served by `wrangler dev` (Cloudflare assets runtime: `_headers`, `_redirects`, 404 exercised), Chrome, desktop + phone
Result: PASS — 127/127 flows green (124 in the main run + 3 re-run singly), 15 skipped (device-specific), 0 failed
Video: on for every test. 133 recordings in `e2e-artifacts/20261108-cloudflare/`, plus 2 in `…-rerun/` and 1 in `…-rerun2/` (gitignored)

Main run (`E2E_RUN_ID=20261108-cloudflare`, 2 workers): 124 passed, 3 reported as failed with
`Tearing down "context" exceeded the test timeout of 90000ms` — the test bodies had completed; Chrome under
swiftshader with video finalizing failed to close the context in time, and no `.webm` was written for those three.
Each was re-run alone (`--workers=1`, fresh run ids so nothing was overwritten): all 3 passed with video.
Harness note: `retries: 0` is now explicit in `playwright.config.ts`.

Flows covered: homepage and all case studies in both themes, navigation, phone menu, theme toggle, resume and live app
links, contact form setup and thank-you page, 404 page, old-route redirects, layout at short and narrow screens,
diagrams/SEO (robots, sitemap now pointing at the workers.dev URL), security headers.

Not covered: real delivery through FormSubmit. Sign-in inside the linked live apps.
