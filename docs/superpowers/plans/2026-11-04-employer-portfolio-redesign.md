# Employer Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the freelancer-services site with an employer-facing portfolio: a long homepage plus 4 case-study pages, dark and light themes, then deploy to Vercel production.

**Architecture:** All content lives in typed data files under `src/content/`. Server components render it, and only the theme toggle, nav and reveal animations run on the client. Colour tokens are CSS custom properties keyed on `html[data-theme]`, exposed to Tailwind 4 through `@theme inline`. Old routes redirect from `next.config.ts`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, framer-motion, playwright-core (Chrome channel, used for screenshots and checks only).

**Spec:** `docs/superpowers/specs/2026-11-04-employer-portfolio-redesign-design.md`

## Global Constraints

- Only `apps/michael-portfolio` changes.
- Rendered output must not contain the client strings `Alpine`, `Cenvari`, `ALAGORA`, `Language Break`, `Mizen`, `Miz En Place` or `Rico`.
- Case-study outcomes are only facts found in the source repos.
- Links with an empty value in `profile.ts` (LinkedIn, resume) are not rendered.
- WCAG AA contrast in both themes. No horizontal scroll at 360px.
- No theme flash: the theme is set by an inline `<head>` script before first paint.
- Motion respects `prefers-reduced-motion`.
- GitHub links point to the public mikoy0019 repos: `deskdev`, `dinkup-app`, `deliverease`, `pos-app`, `laptop-checker`.

## Review Focus

1. JS disabled or blocked localStorage: the page must still render in dark theme. The theme script needs a try/catch.
2. Long titles or tag lists on 360px cards must wrap, not overflow.
3. Unknown `/work/<slug>` must return 404 via `notFound()`, not crash.
4. Old links (`/portfolio`, `/services`, `/about`, `/contact`) are shared on job boards and must redirect.
5. A missing screenshot must fall back to `ArchitectureDiagram`, never a broken `<img>`.

There's no test runner in this app, and the work is mostly markup. Verification is `npm run build` + lint, plus `scripts/verify.mjs`, a playwright-core script that loads every route at 390 and 1440 widths in both themes. It asserts: no console errors, no horizontal overflow, the old routes redirect, `/work/nope` returns 404, and the page HTML contains no client strings.

---

### Task 1: Content model
**Files:** Create `src/content/profile.ts`, `src/content/projects.ts`
**Produces:**
- `profile: { name, role, location, timezoneNote, availability, email, github, linkedin, resumeUrl, photo }`
- `type CaseStudy = { slug, title, tagline, kind, role, timeframe, status, problem, built: string[], architecture: { nodes: string[]; bullets: string[] }, decisions: { title, body }[], stack: string[], outcomes: string[], shots: { src, alt }[], links: { live?, code? } }`
- `flagships: CaseStudy[]` (4)
- `secondary: { name, blurb, stack, links, shot? }[]` (4)
- `miniBuilds`, `pipelines`, `clientSites`, `stackGroups`, `experience`
- [ ] Fill with spec §3 data and facts from the READMEs. Anonymised names per the spec.

### Task 2: Theme + tokens + layout shell
**Files:** Rewrite `src/app/globals.css`, `src/app/layout.tsx`. Create `src/components/ThemeToggle.tsx`, `SiteNav.tsx`, `SiteFooter.tsx`. Delete `Navbar.tsx`, `Footer.tsx`, `AnimatedCounter.tsx`.
- [ ] Tokens: `--bg --surface --surface-2 --ink --ink-soft --ink-muted --line --accent --accent-ink --ok`, defined for dark (default) and `[data-theme=light]`.
- [ ] Inline head script: read localStorage `theme`, else `prefers-color-scheme`, then set `data-theme`.
- [ ] Metadata, Person JSON-LD.

### Task 3: Homepage sections
**Files:** Rewrite `src/app/page.tsx`. Create `Hero`, `FlagshipCard`, `ProjectCard`, `PipelineRow`, `MiniBuildGrid`, `ClientSitesList`, `StackGroups`, `ExperienceTimeline`, `ContactSection`, `ArchitectureDiagram`, `Section` in `src/components/`.
- [ ] Section order and anchors (`#work #more #automation #stack #experience #contact`) per spec §2.

### Task 4: Case-study route
**Files:** Create `src/app/work/[slug]/page.tsx` (`generateStaticParams`, `generateMetadata`, `notFound()`), `src/components/CaseStudyLayout.tsx`.

### Task 5: Redirects, cleanup, SEO
**Files:** `next.config.ts` (permanent redirects). Delete `src/app/{about,services,portfolio,contact}`. Create `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/opengraph-image.tsx`.

### Task 6: Screenshots
**Files:** Create `scripts/shots.mjs` (playwright-core, `channel: "chrome"`). Output to `public/work/<slug>/*.png`.
- [ ] DeskDev: live nixgensolutions.com.
- [ ] DinkUp: local `web` dev server.
- [ ] Clinic: ALAGORA local `pnpm dev`, synthetic data.
- [ ] DeliverEase: live URL.
- [ ] Laptop Checker: copy `docs/overview.png` and `docs/performance.png`.
- [ ] Creator Ops, Language Directory, Storefront: `ArchitectureDiagram` only.

### Task 7: Verify + deploy
- [ ] `npm run lint && npm run build` pass.
- [ ] `node scripts/verify.mjs` passes (see Review Focus).
- [ ] Commit on a branch, then merge to main.
- [ ] Deploy to Vercel production. The CLI isn't logged in, so use the Git integration or `vercel login`. Smoke-test the production URL.
