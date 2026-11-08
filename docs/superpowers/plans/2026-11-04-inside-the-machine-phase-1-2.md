# Inside the Machine: Phases 01–02 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver the audit plus a reviewable vertical slice: a procedural 3D laptop that opens on scroll, detaches its screen and reveals the first flagship project, with working mobile, reduced-motion, no-WebGL and no-JS fallbacks.

**Architecture:** The homepage stays server-rendered HTML in normal document flow. A client-only `ExperienceStage` decides a device profile and, only for `cinematic`, dynamically imports the scene chunk. A pure function maps scroll progress to a laptop pose, so every frame is reproducible in both scroll directions. If anything fails, the page stays as plain HTML plus a pre-rendered still.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind 4, three.js (dynamic chunk), GSAP + ScrollTrigger, Playwright Test (Chrome channel) for both pure-logic and browser tests.

**Spec:** `docs/superpowers/specs/2026-11-04-inside-the-machine-design.md`

## Global Constraints

- Branch `feat/inside-the-machine`, from `feat/employer-portfolio`. Only `apps/michael-portfolio` changes. No production deploy in this plan; a Vercel preview is allowed for review.
- Phones never download three.js: `three` is imported only through dynamic `import()` behind the profile check.
- Essential content is real HTML in the initial response. Scroll must never be required to reveal it.
- Pose state is computed from progress, never incremented from the previous frame.
- One scroll system: native scroll plus ScrollTrigger. No Lenis in this slice (the spec makes it optional).
- No client names in rendered output: `alpine, cenvari, alagora, language break, mizen, miz en place, rico`.
- No invented facts. Hero label: `FULL-STACK DEVELOPER / PORTFOLIO`. Intro line, when the intro is built: `Full-stack developer. AI and automation.`
- Experience stays NixGen and Freelance only. Sales, DTI and Education are deliberate exclusions (Michael's decision, 2026-11-04) and override the spec's preserve-everything rule.
- Dark palette from spec §3.1: `#08080C #111117 #191921 #9568FF #BBA1FF #F7F7FA #A4A4B2`, border `rgba(255,255,255,0.08)`, glow `rgba(149,104,255,0.35)`.
- Device pixel ratio capped at 1.75. Render only while visible and while the pose changes.

## Review Focus

1. Reversing scroll mid-way or jumping to an anchor must give the same pose as arriving forwards. Test: `samplePose` is a pure function; browser test scrolls down, up, and compares `window.__experience.pose()`.
2. Window resize, or crossing the phone breakpoint, while the scene is live must not leave a stretched canvas or stale pin. Test: resize mid-scroll, assert canvas size matches the viewport and no overflow.
3. three.js failing to load or WebGL context creation failing must leave the still and full content, with one attempt only. Test: block the chunk route, assert the still shows and no console error other than the handled warning.
4. Page navigation to `/work/*` and back must not leak renderers or pins. Test: navigate away and back three times, assert one canvas and one set of triggers.
5. A visitor who loads `/#work` directly must land on the content, not the top of a pinned sequence. Test: load the hash, assert `#work` heading is in the viewport.

---

### Task 1: Audit and content map (Phase 01)

**Files:** Create `docs/superpowers/content-map.md`

**Produces:** the table Tasks 3+ rely on: every content item, its source file, its destination chapter, and status (`kept`, `excluded by Michael`, `needs input`).

- [ ] **Step 1:** Create the branch, and confirm `package-lock.json` at the repo root stays uncommitted.
- [ ] **Step 2:** Inventory `src/content/*`, `git show 7fa6e86:apps/michael-portfolio/src/app/{page,about,portfolio,services,contact}` (old site content), and each item in spec §22.
- [ ] **Step 3:** Record the map. Also list old-site content not on the current site, marking each as restore or drop, and list: every dependency with its status (`framer-motion` is unused and can go), external links with HTTP status, and open inputs (LinkedIn, resume PDF, contact-form email service, DeliverEase demo login).
- [ ] **Step 4:** Commit: `docs: Add content map for Inside the Machine`

### Task 2: Foundation: tokens, test runner, hero copy

**Files:**
- Modify: `src/app/globals.css`, `src/components/Hero.tsx`, `src/content/profile.ts`, `package.json`
- Create: `playwright.config.ts`, `tests/content-integrity.spec.ts`

- [ ] **Step 1:** Add dev dependency `@playwright/test`. Config: `channel: "chrome"`, `webServer: npm run build && npx next start -p 4400`, base URL `http://localhost:4400`, projects `desktop` (1440×900) and `phone` (390×844, `hasTouch`, `isMobile`). Add script `"test": "playwright test"`.
- [ ] **Step 2:** Port the checks from the session's `verify.mjs` into `tests/content-integrity.spec.ts`: status 200 on all routes in both themes, no console errors, no overflow, no broken images, redirects, `/work/nope` 404, client-string check with `/\b(alpine|cenvari|alagora|language ?break|mizen|miz en place|rico)\b/i`, no-JS content visible. Add a test that `Senior Sales` and `Saturnino` are absent.
- [ ] **Step 3:** Run `npx playwright test`. Expected: all pass on the current site, before any motion work.
- [ ] **Step 4:** Update tokens to the spec palette. Keep the light theme, retuned per spec §3.1. Assert contrast with a test: body text ≥ 4.5:1 and button label on accent ≥ 4.5:1 in both themes.
- [ ] **Step 5:** Update `Hero.tsx`: label `FULL-STACK DEVELOPER / PORTFOLIO`, headline `BUILDING DIGITAL EXPERIENCES THAT ACTUALLY WORK.`, keep the current introduction text, CTAs `Explore My Work` (`/#work`) and `Let's Connect` (`/#contact`). Portrait stays as HTML for non-cinematic profiles.
- [ ] **Step 6:** Run tests, then commit: `feat: Apply Inside the Machine tokens and hero copy`

### Task 3: Device profile and pose logic (pure, tested)

**Files:**
- Create: `src/experience/profile.ts`, `src/scene/pose.ts`
- Test: `tests/experience.spec.ts`

**Produces:**
- `type Profile = "cinematic" | "balanced" | "essential"`
- `resolveProfile(i: { width: number; coarsePointer: boolean; reducedMotion: boolean; webgl: boolean }): Profile`
- `type PartPose = { position: [number, number, number]; rotation: [number, number, number] }`
- `type LaptopPose = { lidAngle: number; screenGlow: number; screenTexture: 0 | 1; screen: PartPose; base: PartPose; camera: { position: [number, number, number]; target: [number, number, number] } }`
- `samplePose(progress: number): LaptopPose`, using keyframes `closed` 0, `open` 0.35, `detached` 0.7, `presenting` 1, eased with smoothstep per segment, clamped to 0..1.

- [ ] **Step 1:** Write failing tests: `essential` for width < 768, coarse pointer, reduced motion or no WebGL, otherwise `cinematic`; `samplePose(0.5)` deep-equals itself after sampling other values in any order; values at each keyframe match exactly; `samplePose(-1)` equals `samplePose(0)`; `samplePose(2)` equals `samplePose(1)`; every sampled number is finite.
- [ ] **Step 2:** Run `npx playwright test tests/experience.spec.ts`. Expected: FAIL, modules not found.
- [ ] **Step 3:** Implement both modules with no DOM or three.js imports.
- [ ] **Step 4:** Run again. Expected: PASS.
- [ ] **Step 5:** Commit: `feat: Add device profile and deterministic laptop pose`

### Task 4: Procedural laptop and scene

**Files:**
- Create: `src/scene/LaptopBuilder.ts`, `src/scene/LaptopScene.ts`, `src/scene/materials.ts`
- Add dependency: `three`, `@types/three`

**Interfaces:**
- Consumes: `LaptopPose`, `samplePose`
- Produces: `class LaptopScene { constructor(canvas: HTMLCanvasElement, opts: { theme: "dark" | "light"; transparent?: boolean }); ready: Promise<void>; setProgress(p: number): void; setPointer(x: number, y: number): void; setTheme(t): void; resize(w: number, h: number): void; destroy(): void }`

- [ ] **Step 1:** `LaptopBuilder`: rounded-box chassis, deck, trackpad, lid shell, bezel, screen plane, hinge, and about 60 instanced keycaps. The lid pivots at the hinge. The screen panel is a group that can leave the lid.
- [ ] **Step 2:** Materials per spec §15.2 and studio lighting per §15.3: soft key, rim, low fill, violet accent, no post-processing in this slice.
- [ ] **Step 3:** Screen textures: index 0 is `profile.photo` with greeting on a canvas texture; index 1 is `/work/deskdev-studio/workspace.png`.
- [ ] **Step 4:** `LaptopScene`: render on demand only (when pose, pointer tilt or size changes), pause on `visibilitychange`, DPR cap 1.75, pointer tilt max ±6°, full dispose in `destroy()`.
- [ ] **Step 5:** Add dev-only route `src/app/still/page.tsx` that renders the scene at `?p=<progress>&theme=<theme>` and calls `notFound()` when `NODE_ENV === "production"` unless `ENABLE_STILLS=1`. Check `p=0, 0.35, 0.7, 1` by screenshot, tuning proportions and lighting until the laptop reads as convincing. Keep these review screenshots out of the repo.
- [ ] **Step 6:** Commit: `feat: Add procedural laptop scene`

### Task 5: Scroll stage and first project reveal

**Files:**
- Create: `src/components/ExperienceStage.tsx`, `src/experience/ScrollOrchestrator.ts`
- Modify: `src/app/page.tsx`, `src/components/Hero.tsx`, `src/components/FlagshipCard.tsx`, `src/app/layout.tsx`, `src/app/globals.css`

**Interfaces:**
- Consumes: `resolveProfile`, `LaptopScene`
- Produces: `startScroll(el: { root: HTMLElement; panels: HTMLElement[] }, onProgress: (p: number) => void): () => void` (returns cleanup); `html[data-profile]`; and, in non-production builds or when `?debug` is set, `window.__experience = { profile, pose(), triggers() }`

- [ ] **Step 1:** Write failing browser tests in `tests/experience.spec.ts` for Review Focus 1, 2, 4 and 5, and: desktop has exactly one canvas and three.js chunk requested; phone has no canvas, no three.js chunk and no pinned element; project 1 text is in the DOM before any scroll.
- [ ] **Step 2:** Run. Expected: FAIL.
- [ ] **Step 3:** `ExperienceStage`: server HTML renders a `<picture>` still and an empty canvas slot, both `aria-hidden`. On mount it resolves the profile and sets `html[data-profile]`. For `cinematic` it dynamically imports the scene, fades the canvas in after `ready`, then hides the still. Any failure logs one `console.warn` and keeps the still.
- [ ] **Step 4:** `ScrollOrchestrator`: register GSAP only inside `cinematic`. Pin a wrapper containing the hero and the first flagship panel, scrub 0.5, and call `onProgress`. Hero fades out over progress 0.35–0.5; project 1 panel fades in over 0.75–1. Panels default to fully visible in CSS, and only `html[data-profile=cinematic]` animates them. `scroll-behavior: smooth` is disabled for that profile. On a hash load, skip to the end of the pin.
- [ ] **Step 5:** Run. Expected: PASS.
- [ ] **Step 6:** Commit: `feat: Add scroll-driven laptop opening and first project reveal`

### Task 6: Fallback stills

**Files:**
- Create: `scripts/render-stills.mjs`, `public/stills/{hero,project}-{dark,light}.{webp,avif}`, `tests/fallbacks.spec.ts`
- Modify: `src/components/ExperienceStage.tsx`

- [ ] **Step 1:** Script: with `ENABLE_STILLS=1`, start the app, screenshot `/still` with transparent background via Chrome at the two poses in both themes, and write WebP and AVIF at 1280 wide using `sharp` (a Next dependency). Deterministic, re-runnable, stills committed.
- [ ] **Step 2:** Use the stills in the `<picture>`, with explicit width and height, theme-matched by CSS.
- [ ] **Step 3:** Write `tests/fallbacks.spec.ts`: reduced motion gives no canvas, no pin, stills visible, all content visible; WebGL disabled (`--disable-gpu --disable-webgl`, or a stubbed `getContext`) gives the same; blocked three.js chunk gives the same with a single warning; no-JS gives all content; `/still` returns 404 in the production build.
- [ ] **Step 4:** Run everything: `npm run lint && npm run build && npx playwright test`. Expected: PASS.
- [ ] **Step 5:** Commit: `feat: Add pre-rendered fallback stills`

### Task 7: Vertical-slice review gate

- [ ] **Step 1:** Measure on real hardware, not headless: run a headed Chrome scripted scroll and record frame times. Target ≥ 45 fps sustained. Report the machine and the numbers.
- [ ] **Step 2:** Lighthouse mobile on the production build. Report performance, accessibility and SEO, plus the size of the initial JS and the separate scene chunk.
- [ ] **Step 3:** Record desktop and phone scroll videos, down and back up, in both themes.
- [ ] **Step 4:** Deploy a Vercel **preview** only (`vercel deploy --yes`), and give Michael the preview URL and recordings.
- [ ] **Step 5:** Stop. Phases 03–08 get their own plan after Michael approves the slice.
