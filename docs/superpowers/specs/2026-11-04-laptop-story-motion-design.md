> **Superseded** by `2026-11-04-inside-the-machine-design.md`. Kept for history only.

# "Laptop Story" Motion Design — Spec

**Date:** 2026-11-04 · **App:** `apps/michael-portfolio` · **Builds on:** `2026-11-04-employer-portfolio-redesign-design.md` · **Status:** awaiting review

## 1. Goal

Make the portfolio feel like animated motion graphics. A stylised 3D laptop opens, breaks into its components as the visitor scrolls, and each component tells one chapter of Michael's story. At the end the laptop snaps back together. The visitor should come away impressed without losing any facts a recruiter needs.

**Success criteria**
- On desktop, scrolling the homepage plays one continuous, smooth (≥ 50 fps) animation from closed laptop, to exploded pieces, to reassembled laptop.
- Every fact on the current site stays in the HTML as real text: readable without JS, by screen readers and by search engines.
- Phones get the same story with a lighter animation. Reduced-motion users get a static page.
- Usable content is visible within 2.5 s on a mid-range phone. three.js is never downloaded on phones.

## 2. Story structure (homepage)

The laptop is fixed in a canvas behind the content, and scroll position drives a single master timeline. Each chapter pins its text panel while its laptop piece performs.

| # | Chapter | Laptop state | Content panel |
|---|---|---|---|
| 0 | **Boot** (intro) | Closed laptop, standby LED pulsing; your name types in; "Press start" / Skip | One-time intro (~1.8 s), once per visit |
| 1 | **Origin** | Lid opens and the screen powers on with your photo and greeting | Hero: name, positioning, availability, location, CTAs |
| 2 | **The Screen: what I've built** | Screen detaches, floats forward and plays flagship screenshots like a slideshow | The 4 flagships, one per scroll step (counter 1/4 → 4/4), each linking to its case study |
| 3 | **The Keyboard: my arsenal** | Keyboard lifts off; keys pop up and light in sequence, and keycaps show tech names | Stack groups |
| 4 | **The Motherboard: how I build** | Board slides out; traces light up as data paths run trigger → steps → outcome | Automation pipelines plus secondary projects (architecture-led cards) |
| 5 | **The Battery: my journey** | Battery cell slides out; the charge level fills as the timeline advances | Experience timeline and education |
| 6 | **Reassembly: ready for your team** | All pieces fly back; the laptop closes, then reopens showing "Let's build" | Contact form, email, GitHub |

Smaller builds and the 14 client websites stay as compact sections after chapter 4. They're light reveals with no laptop choreography.

A small HUD in the bottom-left shows `CH.0N · <title>` and a progress bar. Clicking a chapter jumps to it.

## 3. The 3D laptop

- **Built procedurally in three.js:** rounded boxes, extruded shapes, simple materials. There are no external model files, so there are no licensing questions and the scene stays small.
- **Parts as separate meshes:** lid shell, screen panel (a texture that swaps between photo, screenshots and "Let's build"), keyboard deck with about 60 instanced keycaps, trackpad, motherboard (traces drawn as emissive line geometry, plus chips), battery, bottom case.
- **Look:** dark graphite body, violet emissive edges using the site accent `--accent`, soft rim light and a subtle bloom-like glow. The materials follow the theme: light theme gives an aluminium body with violet accents.
- **Explode choreography:** each part has `home` and `exploded` transforms. A GSAP timeline tweens between them, scrubbed by ScrollTrigger and smoothed with Lenis.
- **Cursor:** gentle parallax tilt of the whole rig (±6°).
- **Performance:**
  - Device pixel ratio is capped at 1.75.
  - If fps drops below 40 for 2 s, the scene falls back to fewer keycaps and no glow pass.
  - Rendering pauses when the tab is hidden or the canvas is off-screen.
  - The scene loads via dynamic `import()` after first paint.

## 4. Mobile and fallbacks

- **Phones** (`< 768px` or `pointer: coarse`):
  - No three.js.
  - The laptop states are **pre-rendered stills**: 7 WebP images, one per chapter, captured from the 3D scene at build time with a script.
  - Images crossfade and drift slightly as each chapter scrolls in.
  - No pinning. Chapter title cards and simple reveals still play.
- **`prefers-reduced-motion`:** no intro, no scrubbing, no cursor effects. A static still per chapter and fully readable sections.
- **No WebGL or JS:** the page looks like the mobile version, minus the crossfades. Content is unaffected.

## 5. Other motion

- **Intro:** typed name, "Press start". Skippable, shown once per session (sessionStorage, try/catch).
- **Chapter title cards:** `CH.02 — The Screen` sweeps across, using a mask reveal.
- **Text:** headings reveal by word (split into spans, aria-label keeps the whole string). Numbers count up.
- **Micro-interactions** (desktop only):
  - A custom cursor ring that grows over links.
  - Buttons that pull slightly toward the cursor.
  - Project cards that tilt toward the cursor.
  - A small particle burst on "Hire me" and "Send message".
- **Page transitions:** a full-screen wipe in the accent colour between the homepage and case studies.

## 6. Case studies as "missions"

These use GSAP scroll scenes, not the 3D laptop.
- **Briefing:** the title and facts row slam in.
- **Then:**
  - "The problem" on a pinned panel.
  - "What I built" with items checking off one by one.
  - An architecture diagram whose nodes connect with animated lines.
  - Key decisions as cards that flip in.
  - Outcomes with counting numbers.
- **Mission complete:** a card leads into the next case study.

Phones and reduced-motion get simple reveals.

## 7. Tech

- **New dependencies:**
  - `gsap` with ScrollTrigger (about 70 KB gzipped).
  - `lenis` (about 4 KB).
  - `three`, loaded only on desktop as a separate chunk (about 150 KB gzipped).
- **framer-motion:** removed if it ends up unused.
- **Code layout:**
  - `src/motion/` holds the GSAP setup, Lenis, the reduced-motion and device checks, and the cursor.
  - `src/scene/` holds the laptop builder, the parts' home and exploded transforms, the chapter timeline and the render loop.
- **Chapters:** each one declares `{ id, title, part, enter(), progress(p) }` so that content and scene stay decoupled.
- **Still-image script:** `scripts/render-stills.mjs` captures the 7 mobile stills from the scene with headless Chrome.

## 8. Verification

- Extend the existing check script with:
  - Desktop: canvas present, fps sampled over a 5 s scripted scroll stays ≥ 45 headless, no console errors.
  - Phone: no three.js request in the network log, stills load.
  - Reduced motion: no intro, everything visible.
  - No-JS: all content visible.
  - Client-string leak check, both themes, no horizontal overflow, redirects, 404.
- **Lighthouse on mobile:** performance ≥ 85, accessibility ≥ 95.
- **Manual review:** screen recordings of the scroll on desktop and mobile, reviewed before deploy.
- **Deploy:** Vercel production, only after review.

## 9. Out of scope

Sound, WebGL on phones, a photoreal model, a CMS.
