# Employer-Facing Portfolio Redesign — Design Spec

**Date:** 2026-11-04 · **App:** `apps/michael-portfolio` only (`joel-portfolio` untouched) · **Status:** awaiting review

## 1. Goal

Turn Michael Tejada's freelancer service site into a portfolio that gets him hired for **remote international full-time, contract, and part-time developer roles**, while still converting freelance clients.

**Positioning:** a developer who ships AI-powered products and the automations that run them. Web development and AI/automation are the two proof pillars. VA, SEO and sales work stay as supporting background, not as headline services.

**Success criteria**
- A recruiter can answer "what does he do, what has he built, can I see code, how do I contact him" within one scroll of the homepage.
- Every flagship project has a case-study page covering the problem, Michael's role, architecture/stack, key decisions and screenshots.
- No client is named, and no client live link is shown, without confirmed permission.
- Dark and light themes both pass WCAG AA contrast. Layout works from 360px wide.
- `npm run build` and `npm run lint` pass, with no console errors.

## 2. Information architecture

```
/                 Long homepage (single scroll)
/work/[slug]      Case study page, one per flagship (4)
/about, /portfolio, /services, /contact  → permanent redirects to homepage anchors
```

**Homepage sections, in order**
1. **Hero:** personal, warm intro. Includes photo, name, one-line positioning, "Butuan City, PH · works US/AU/EU hours", an availability badge ("Open to remote roles & contracts"), and CTAs: View work · Download resume · GitHub · LinkedIn.
2. **Selected work:** 4 flagship cards (large, screenshot-led), each linking to `/work/[slug]`.
3. **More projects:** 4 secondary cards (one paragraph, stack tags, links when allowed).
4. **Automation & AI:** the 6 existing automation pipelines, shown as compact trigger → steps → outcome rows.
5. **Smaller builds:** the 6 existing Vercel mini apps (POS, DeliverEase, Supernova, ChaseFlow, InboxAI, StockSense) in a dense grid.
6. **Client websites:** the 14 WordPress sites as a compact list or logo strip. These are already public live sites, so they stay named.
7. **Stack:** grouped skills (Frontend · Backend & data · Infra & deploy · AI & automation · Also: WordPress, SEO, ops). Text tags only, no percentage bars.
8. **Experience:** timeline. NixGen Solutions (founder/developer, current) → Freelance Web Developer 2023–2025 → D-Best Value 2022–23 → DTI 2020–21. Education goes in a single line.
9. **Contact:** email, the existing FormSubmit form, links, and a short "also available for freelance projects" line. This line replaces the Services page.

Nav: Work · Experience · Contact, a theme toggle, and a "Resume" button.

## 3. Projects content

All project data lives in one typed file, `src/content/projects.ts`. Pages render from that data, with no copy hard-coded in JSX.

| Slug | Public name | Tier | Real source | Disclosure |
|---|---|---|---|---|
| `deskdev-studio` | DeskDev Studio | Flagship | NixGen product | Named; live link nixgensolutions.com |
| `creator-ops-platform` | Creator Operations Platform | Flagship | Alpine Creator Scout | **Anonymised**: "consumer brand (US)", no link |
| `clinic-booking-platform` | Clinic Booking Platform | Flagship | ALAGORA (Cenvari) | **Anonymised**, no link; noted as a prototype on synthetic data |
| `dinkup` | DinkUp | Flagship | Personal | Named; GitHub link only if the repo is public |
| — | Language School Directory | Secondary | Language Break v2 | Anonymised, no link |
| — | DeliverEase | Secondary | Personal | Named + live link |
| — | Headless Storefront | Secondary | Miz En Place | Anonymised, no link |
| — | Laptop Checker | Secondary | Personal | Named; download link appears once a GitHub release exists |

Each case study has these fields: `title, tagline, role, timeframe, status, problem, whatIBuilt[], architecture (diagram + bullets), decisions[] (2–4 trade-offs), stack[], outcomes[], screenshots[], links{live?, code?}`. Outcomes must be factual, taken from the repos (e.g. "474 commits", "web + iOS/Android + Windows clients", "row-level security on every table"). No invented metrics.

**Anonymisation rules:** no client names, domains, logos or real personal data. Screenshots must use synthetic data, or have names, emails and brand marks blurred.

## 4. Visual design

- **Themes:** refined dark (default) plus light. CSS custom-property tokens live on `:root[data-theme]`. A small inline script in `<head>` applies the saved theme or `prefers-color-scheme` before paint, so there's no flash. The toggle saves to `localStorage`.
- **Palette:** keep the current dark canvas (#08090d family) with a single violet accent. Cyan only for small status details. Light theme: warm off-white (#fafaf7), ink #0d0f14, a deeper violet for AA contrast.
- **Type:** Space Grotesk for display and Inter for body, both via `next/font`. Mono for small labels.
- **Cut back:** emoji icons, animated counters (including "25 Years Old"), heavy gradient text, glow blobs and the marquee. Screenshots carry the visual weight.
- **Motion:** keep framer-motion, but limit it to subtle fade-up on first reveal, and respect `prefers-reduced-motion`.
- **Hard-coded colours:** classes like `text-white` and `from-[#8b7cff]` are replaced with tokens so both themes work.

## 5. Components (in `src/components/`)

| Component | Purpose |
|---|---|
| `ThemeToggle` | Switches `data-theme` and saves the choice |
| `SiteNav` / `SiteFooter` | Replace Navbar/Footer: anchor nav, resume button |
| `Hero` | Intro, photo, CTAs, availability |
| `FlagshipCard` | Screenshot-led card linking to a case study |
| `ProjectCard` | Secondary project card |
| `PipelineRow` | Automation pipeline: trigger → steps → outcome |
| `MiniBuildGrid`, `ClientSitesList` | Condensed legacy content |
| `StackGroups`, `ExperienceTimeline`, `ContactSection` | Homepage sections |
| `CaseStudyLayout` | Template for `/work/[slug]` (header, meta row, sections, screenshot gallery, next-project link) |
| `ArchitectureDiagram` | Simple themed inline SVG/flex diagram, used when a screenshot isn't possible |

`ScrollReveal` and `HeroText` are kept and simplified.

**Profile config:** `src/content/profile.ts` holds `name, email, github, linkedin, resumeUrl, location, availability`. Any link with an empty value is not rendered, so missing LinkedIn or resume data never shows a broken button.

## 6. Screenshots

The images are captured by running each project or opening its live URL, then saved to `public/work/<slug>/*.webp` (1600px wide, compressed).

| Project | Source |
|---|---|
| DeskDev Studio | Live nixgensolutions.com, plus the workspace run locally with demo data |
| DinkUp | Run locally (Next.js) |
| Clinic Booking | ALAGORA run locally (already uses synthetic data) |
| DeliverEase | Live URL |
| Laptop Checker | Existing images in its `docs/` folder |
| Creator Ops (Alpine) | Login-protected and holds real creator data, so only shown with synthetic data or blurred; otherwise an `ArchitectureDiagram` |
| Language School Directory | Live Vercel URL, with brand blurred |
| Headless Storefront | Its `src/` folder is deleted locally; needs `git restore` (Michael's OK). Until then, an `ArchitectureDiagram` |

Rule: if a project can't be captured cleanly, it gets a diagram instead of a placeholder box.

## 7. SEO & metadata

Every page gets a title and description, Open Graph and Twitter images (a static OG image for the homepage, and one per case study from its first screenshot), `sitemap.ts`, `robots.ts`, and Person JSON-LD (name, jobTitle, sameAs = GitHub/LinkedIn, address locality).

## 8. Out of scope

- Deploying, pushing, or changing Vercel settings. These need Michael's explicit go-ahead.
- `joel-portfolio`.
- Fixing the client repos, committing Laptop Checker, or reviewing the Alpine credential files. These are flagged separately.
- A CMS or blog.

## 9. Verification

1. `npm run lint` and `npm run build` pass.
2. Run locally, then capture desktop (1440) and mobile (390) screenshots of the homepage and each case study, in both themes.
3. Check the console has no errors. Keyboard tab order reaches every CTA, and the theme toggle has an accessible label.
4. Check there's no theme flash on reload.
5. Grep the built output for client names (Alpine, Cenvari, ALAGORA, Language Break, Mizen, Rico). Expected result: zero hits.
6. Confirm the old routes redirect to the correct anchors.

## 10. Open inputs (non-blocking)

LinkedIn URL · resume PDF · whether the DinkUp GitHub repo is public · permission to `git restore` Mizen/Language Break for screenshots · any client permissions to un-anonymise.
