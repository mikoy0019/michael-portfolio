# Pre-Deploy Report — michael-portfolio

Date: 2026-11-08
Commit: 72d5f8e (+ this report, CI workflow and `typecheck` script in the next commit)
Gate: BLOCKED — Layer 7 (no remote, no CI). Every other layer passes or is a justified N/A.
Target: static Next.js export (`output: "export"`) served as Cloudflare Workers static assets (`wrangler.jsonc`: assets only, no Worker script), live at https://michael-portfolio.michaeltejada-work.workers.dev
Validator script: not run — the app lives outside `C:/Dev/Projects/Web App Projects/`, where the script's hardcoded path would produce a false Layer 1 FAIL (known limitation, verified 2026-08-24). All 13 layers were evaluated directly against the SOP checklists.
PROVE stage: `E2E_REPORT.md` 2026-11-08 — PASS, 127/127 flows, video on (136 recordings).

| # | Layer | Verdict | Evidence |
|---|-------|---------|----------|
| 1 | Frontend Foundations | PASS | `npm run lint` 0, `tsc --noEmit` 0, `npm run build` 12/12 pages (`out/` 20 MB); Lighthouse (live, 2026-11-08) desktop 96/100/100/100, mobile 99/100/100/100 (perf/a11y/best-practices/SEO), LCP 0.6 s desktop / 1.7 s mobile, CLS ≤ 0.03; e2e covers 390/1024/1366/1440/1883 px layouts; static site → no async loading/error states to provide |
| 2 | API & Backend Logic | N/A | Static export: no `app/api`, no Server Actions, `next.config.ts` `output: "export"`; the only form posts to formsubmit.co (third party) |
| 3 | Database & Storage | N/A | No database, no storage; all content is typed TS in `src/content/` |
| 4 | Auth & Permissions | N/A | Public read-only site; nothing to protect |
| 5 | Hosting & Deployment | PASS | Cloudflare Workers static assets (`wrangler.jsonc`), live HTTP 200 in 0.56 s, SSL on workers.dev (custom domain deliberately not used — /usr/bin/bash plan), `_redirects` (old routes → sections) and `not_found_handling: "404-page"` verified live (404 → 404) and in e2e. Deploy is manual `npm run deploy` (= build + `wrangler deploy`); no git-connected deploys yet — see Layer 7 |
| 6 | Cloud & Compute | N/A | Assets only — no request handlers, no scheduled jobs, no compute path |
| 7 | CI/CD & Version Control | **FAIL** | Local git only (4 commits), **no remote**, no CI, no branch protection. Owner's GitHub account `mikoy0019` is not logged in on this PC, so the repo cannot be created/pushed from here. Prepared: `.github/workflows/ci.yml` (lint + typecheck + build on push/PR) and a `typecheck` script, committed and ready to run the moment the repo is pushed. Unblock: `gh auth login` (mikoy0019) → `gh repo create mikoy0019/michael-portfolio --private --source . --push` → protect `main` |
| 8 | Security & RLS | PASS | Secret scan of `src/` + `public/` clean (no key/JWT/PEM patterns); no `.env` tracked (`.gitignore` `.env*`); live headers: CSP (default-src 'self', frame-ancestors 'none', form-action self + formsubmit.co, object-src 'none'), HSTS 2 y incl. subdomains, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy camera/mic/geo off; e2e "pages send security headers and still render" PASS on the deploy candidate. RLS: no database, so no tables to protect (not an exemption from the layer — the secrets + headers + zero-server-surface checks are the whole attack surface). Diff since last deploy: `siteUrl` string + Playwright `retries: 0` — reviewed, no security impact |
| 9 | Rate Limiting | N/A | No API, auth or write endpoints; Cloudflare's always-on DDoS protection fronts the asset host |
| 10 | Caching & CDN | PASS | `/_next/static/*` hashed + `Cache-Control: public, max-age=31536000, immutable` (verified live, CF-Cache-Status HIT on repeat); HTML `max-age=0, must-revalidate` so deploys are seen immediately; served from Cloudflare's edge; hit ratio observable in the Workers & Pages dashboard |
| 11 | Load Balancing & Scaling | N/A | Static assets on Cloudflare anycast; no origin, no functions, no DB connections to pool |
| 12 | Error Tracking & Logs | N/A (deferred, logged) | No runtime code to crash server-side; analytics/error SDKs deliberately removed (zero-cost, no third-party scripts under the CSP). Client console cleanliness is enforced by the e2e "renders cleanly" checks on every page in both themes. Request/status counts available in the Cloudflare dashboard. Deferral logged in `MainFrame/Runtime/projects/michael-portfolio.md` |
| 13 | Availability & Scalability | PASS | Live from Cloudflare's edge (0.56 s TTFB from PH); static-asset requests are served by Cloudflare's asset layer; rollback = `npx wrangler rollback` (Workers keeps prior versions) or redeploy the previous commit — source is the backup and the Vercel deployment still stands as a fallback. Not done (deferred, logged): external uptime monitor, SLO dashboard — out of proportion for a /usr/bin/bash personal site |

## Deploy recommendation

**BLOCKED.** Do not run `npm run deploy` until Layer 7 is green: push the repo to GitHub under `mikoy0019`, let `ci.yml` run once, protect `main`. Everything else — build, security, caching, the filmed e2e — is ready; the only change waiting to ship is `siteUrl` → workers.dev (affects `robots.txt`/`sitemap.xml` URLs; the currently live site still advertises the Vercel URL in its sitemap).
