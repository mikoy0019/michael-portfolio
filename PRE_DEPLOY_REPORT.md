# Pre-Deploy Report — michael-portfolio

Date: 2026-11-08
Commit: 18d75fa on `feat/portfolio-refresh` (on top of `main` 19a4ed0); fast-forwarded to `main` and pushed after this gate
Gate: PASS — every layer passes or is a justified N/A. Layer 7 keeps the one standing warning (branch protection on `main` still to be enabled by the owner).
Target: static Next.js export (`output: "export"`), deployed twice from the same build: **Vercel** (primary, canonical URL https://michael-portfolio-gamma-red.vercel.app, `vercel.json` carries headers + redirects) and **Cloudflare Workers static assets** (mirror, https://michael-portfolio.michaeltejada-work.workers.dev, `_headers`/`_redirects`). Michael named the Vercel URL as "the portfolio", so the canonical/sitemap/JSON-LD point there again; the Cloudflare copy advertises the same canonical, so search engines see one site.
Validator script: not run — the app lives outside `C:/Dev/Projects/Web App Projects/`, where the script's hardcoded path would produce a false Layer 1 FAIL (known limitation, verified 2026-08-24). All 13 layers were evaluated directly against the SOP checklists.
PROVE stage: `E2E_REPORT.md` 2026-11-08 — PASS, 129/129 flows green after re-runs, video on (136+ recordings under `e2e-artifacts/20261108-refresh*`).

What changed since the last gate (19a4ed0): Alpine Creator Scout case study with five demo-data screenshots (was a diagram-only "Creator Operations Platform"); browser-window frames + glow on every screenshot, with a second shot layered on flagship cards; dotted backdrop on anonymised diagrams; NixGen co-founder card removed from Experience; canonical back to Vercel; `vercel.json` headers/redirects; `.vercelignore`; 13 unreferenced legacy images (15 MB) removed from `public/`; README. No new dependencies, no scripts, no runtime code paths.

| # | Layer | Verdict | Evidence |
|---|-------|---------|----------|
| 1 | Frontend Foundations | PASS | `npm run lint` 0 problems, `tsc --noEmit` 0 errors, `npm run build` 12/12 pages (`out/` 5.6 MB after the asset cleanup, was 20 MB). E2E 129/129 across 390/800/1024/1171/1366/1440/1883 px in both themes: no console errors, no broken images, no horizontal overflow, 15 px radius rule holds for the new frames. New images: Alpine 1280×720 PNGs 95–135 KB each, portal crop 28 KB; all `next/image` with explicit width/height (no CLS), lazy below the fold. Lighthouse not re-run (CSS-only visual change + static images); last live scores 96/100/100/100 desktop, 99/100/100/100 mobile |
| 2 | API & Backend Logic | N/A | Static export: no `app/api`, no Server Actions; the only form posts to formsubmit.co (third party) |
| 3 | Database & Storage | N/A | No database, no storage; all content is typed TS in `src/content/`; screenshots are static files showing demo data only |
| 4 | Auth & Permissions | N/A | Public read-only site; nothing to protect |
| 5 | Hosting & Deployment | PASS | Same `out/` on two hosts. Cloudflare: `wrangler.jsonc` assets-only, `_headers` + `_redirects` + `not_found_handling: "404-page"` (verified by the e2e suite on the Cloudflare assets runtime). Vercel: `vercel build` produced `.vercel/output` with the routes config carrying the five security headers, the `/_next/static/*` immutable cache header, the `/opengraph-image` content type and the five redirects (favicon 307, old routes 308) — inspected in the build log. Deploy = `npm run deploy` (Cloudflare) and `vercel deploy --prebuilt --prod` (Vercel). Post-deploy checks are listed below and recorded in `MainFrame/Runtime/projects/michael-portfolio.md` |
| 6 | Cloud & Compute | N/A | Assets only — no request handlers, no scheduled jobs, no compute path on either host |
| 7 | CI/CD & Version Control | PASS (warning) | Remote https://github.com/mikoy0019/michael-portfolio, `main` = 19a4ed0 with CI (`.github/workflows/ci.yml`: npm ci, lint, typecheck, build on Node 24) green (run 42433655709). This branch is three commits on top, fast-forwarded to `main` after the gate so CI runs on the same tree. Lockfile unchanged (the lockfile churn from `vercel build`'s install step was reverted before commit). **Warning (unchanged):** branch protection on `main` is not enabled — owner action |
| 8 | Security & RLS | PASS | Secret scan of `src/`, `public/`, `vercel.json`, `wrangler.jsonc`, `next.config.ts`, `package.json`: 0 hits (keys, JWTs, PEM, GitHub/Slack tokens); no `.env*` tracked. Headers: identical five-header set on both hosts — CSP `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; form-action 'self' https://formsubmit.co; frame-ancestors 'none'; base-uri 'self'; object-src 'none'`, HSTS 2 y incl. subdomains, nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy camera/mic/geo off. The new images are same-origin PNGs (CSP `img-src 'self'` unchanged). RLS: no database, so no tables to protect — not an exemption; the secrets + headers + zero-server-surface checks are the whole attack surface. Client confidentiality: Alpine screenshots are the app's own demo fixtures (fictional creators), the Language School and Headless Storefront cards stay anonymised with diagrams, the e2e client-name scan is clean |
| 9 | Rate Limiting | N/A | No API, auth or write endpoints; Cloudflare's always-on DDoS protection and Vercel's platform limits front the asset hosts |
| 10 | Caching & CDN | PASS | `/_next/static/*` hashed + `Cache-Control: public, max-age=31536000, immutable` on both hosts (Cloudflare `_headers`, Vercel routes config); HTML revalidates on every deploy; both served from edge networks |
| 11 | Load Balancing & Scaling | N/A | Static assets on anycast edges; no origin, no functions, no DB connections to pool |
| 12 | Error Tracking & Logs | N/A (deferred, logged) | No runtime code to crash server-side; no third-party scripts under the CSP (zero-cost decision). Client console cleanliness enforced by the e2e "renders cleanly" checks on every page in both themes. Request/status counts in the Cloudflare and Vercel dashboards. Deferral logged in `MainFrame/Runtime/projects/michael-portfolio.md` |
| 13 | Availability & Scalability | PASS | Two independent edge hosts serving the same build; rollback = `npx wrangler rollback` or `vercel rollback` (both keep prior deployments), or redeploy the previous commit. Not done (deferred, logged): external uptime monitor, SLO dashboard — out of proportion for a personal static site |

## Deploy recommendation

**GO.** Ship the same build to both hosts, Cloudflare via `npm run deploy`, Vercel via `vercel deploy --prebuilt --prod` (promote after the preview checks if the CLI upload is flaky).

Post-deploy checks (both hosts): HTTP 200 on `/`, `/work/creator-ops-platform`, `/work/deskdev-studio`; 404 on an unknown route; `/favicon.ico` → `/icon.svg`; `/about` → `/#experience`; the five security headers present; canonical, `robots.txt` and `sitemap.xml` advertise `https://michael-portfolio-gamma-red.vercel.app`; the Alpine screenshots return 200.

## Post-gate verification on the Vercel preview (2026-11-08)

Preview of this exact build (`vercel build` → `vercel deploy --prebuilt --archive=tgz`): https://michael-portfolio-9fdu99q9k-nixgensolutions-collabs-projects.vercel.app (status Ready; protected by Vercel Authentication, checked through `vercel curl`).

- 200: `/`, `/work/creator-ops-platform`, `/work/deskdev-studio`, `/sitemap.xml`, `/robots.txt`, `/opengraph-image` (image/png), `/work/alpine-creator-scout/discover.png` and `creator-portal.png` (image/png). 404 on `/no-such-page`.
- Redirects: `/favicon.ico` 307, `/about` 308 → `/#experience`, `/contact` 308.
- Headers on `/`: CSP (as specified), HSTS 2 y incl. subdomains, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy camera/mic/geo off; HTML `public, max-age=0, must-revalidate`; `/_next/static/*.css` `public,max-age=31536000,immutable`; `X-Vercel-Cache: HIT`.
- Canonical and sitemap advertise `https://michael-portfolio-gamma-red.vercel.app`. Page HTML contains "Alpine Creator Scout" and the portal inset, and no "Developer & Co-Founder".

Production promotion (`vercel promote <preview-url>` or `vercel deploy --prebuilt --prod`) and the Cloudflare `npm run deploy` are blocked for the agent by the auto-mode permission policy and are owner steps. Repeat the checks above against the production URLs after promoting.
