# MICHAEL PORTFOLIO

## Inside the Machine — Premium Interactive Experience

**Date:** 2026-11-04
**Application:** `apps/michael-portfolio`
**Builds on:** `2026-11-04-employer-portfolio-redesign-design.md`
**Replaces:** Original Laptop Story Motion Design specification
**Status:** Revised design — awaiting review
**Target deployment:** Vercel
**Experience:** Cinematic 3D portfolio with accessible, content-first alternatives

---

# 1. Executive Summary

## 1.1 Project Vision

Transform Michael's portfolio into a premium, cinematic, interactive experience built around a central concept:

**INSIDE THE MACHINE — THE ANATOMY OF A BUILDER**

The visitor explores Michael's professional identity through a stylized 3D laptop that opens, disassembles, transforms its components into interactive content, and reassembles at the end.

Each hardware component represents a different aspect of Michael's capabilities:

* **Screen:** What he has built.
* **Keyboard:** Technologies and expertise.
* **Motherboard:** Engineering and problem-solving.
* **Processor:** Technical decisions and architectural thinking.
* **Battery:** Experience and professional growth.
* **Reassembly:** His complete value as a developer.

The laptop is not simply decoration. It is the central storytelling mechanism.

The final result should resemble a carefully directed, premium technology product launch rather than a conventional developer portfolio.

## 1.2 Primary Objectives

The experience must accomplish five objectives:

1. **Create a memorable first impression.** Establish a distinctive visual identity through cinematic composition, controlled lighting, elegant typography, and purposeful motion.

2. **Demonstrate technical expertise.** Use interactive projects, technical diagrams, and real engineering decisions to communicate Michael's capabilities.

3. **Convert visitors into opportunities.** Make projects, professional qualifications, resume, and contact details immediately accessible.

4. **Maintain exceptional usability.** Support mobile devices, keyboard navigation, screen readers, reduced-motion preferences, and JavaScript-disabled browsing.

5. **Deliver production-grade performance.** Keep mobile lightweight, use adaptive rendering on desktop, and prevent decorative animation from delaying meaningful content.

## 1.3 Nonnegotiable Requirements

* Preserve every verified fact and meaningful content item from the existing portfolio.
* Never fabricate professional experience, project outcomes, technologies, or metrics.
* Essential content must exist as real, readable HTML.
* Animation must enhance content, never become a prerequisite for accessing it.
* Phones must never download Three.js.
* Reduced-motion visitors must receive a fully usable static experience.
* The experience must remain functional when WebGL is unavailable.
* All sections must be reachable without completing cinematic scroll sequences.
* Animations must work correctly when scrolling both forward and backward.
* Core content must remain usable if animation initialization fails.
* No production deployment until visual, functional, accessibility, and performance reviews are completed.

---

# 2. Creative Direction

## 2.1 Design Philosophy

**Premium technological minimalism meets cinematic engineering storytelling.**

The website should feel sophisticated, intentional, and technically advanced.

Its quality should come from composition, typography, interaction, and precise execution rather than excessive visual effects.

### Design principles

**Purposeful motion**

Every major animation communicates a transition, relationship, or piece of information.

**Visual restraint**

Use glow, particles, blur, and dramatic camera movement sparingly.

**Strong hierarchy**

Important content remains immediately recognizable.

**Physical believability**

Laptop components move with consistent spatial logic, convincing pivots, and deliberate timing.

**Editorial sophistication**

Large headlines, asymmetrical layouts, generous spacing, and carefully controlled contrast.

**Engineering precision**

Navigation, interactions, transitions, and technical visualizations should feel responsive and consistent.

---

# 3. Visual Design System

## 3.1 Color Palette

### Dark theme — primary experience

| Token            | Value                    | Purpose                |
| ---------------- | ------------------------ | ---------------------- |
| Background       | `#08080C`                | Main canvas            |
| Surface          | `#111117`                | Panels                 |
| Elevated surface | `#191921`                | Cards and overlays     |
| Primary accent   | `#9568FF`                | Interactive emphasis   |
| Light accent     | `#BBA1FF`                | Highlights             |
| Primary text     | `#F7F7FA`                | Headings               |
| Secondary text   | `#A4A4B2`                | Supporting information |
| Border           | `rgba(255,255,255,0.08)` | Subtle separation      |
| Glow             | `rgba(149,104,255,0.35)` | Selective emission     |

### Light theme

Use a premium aluminum-inspired palette:

* Warm off-white backgrounds.
* Dark graphite typography.
* Silver laptop materials.
* Violet interaction accents.
* Soft shadows instead of bright emissive effects.

Both themes must be deliberately designed.

The light theme must not simply invert the dark theme.

## 3.2 Typography

Use three complementary typography roles.

**Display**

A modern grotesk typeface for large cinematic headlines.

**Editorial**

Highly readable typography for descriptions, case studies, and professional information.

**Technical**

A monospace typeface for chapter identifiers, progress indicators, architecture labels, and supporting interface details.

### Typography behavior

* Large headings use carefully controlled line breaks.
* Titles reveal using masks and staggered word transitions.
* Body text uses restrained opacity and position transitions.
* Technical labels use subtle tracking and compact spacing.
* Avoid excessive text splitting that harms selection or accessibility.

## 3.3 Layout System

Desktop:

* Cinematic compositions.
* Asymmetrical two-column layouts.
* Large central 3D object.
* Sticky or pinned content only where necessary.
* Generous negative space.

Tablet:

* Simplified camera framing.
* Reduced animation intensity.
* More conventional content stacking.

Mobile:

* Single-column editorial layout.
* Dedicated optimized laptop compositions.
* No pinned sections.
* Clear section boundaries.
* Direct access to projects and contact information.

---

# 4. Narrative Architecture

The homepage contains seven principal scenes.

| Scene | Chapter         | Main visual                 | Purpose                               |
| ----- | --------------- | --------------------------- | ------------------------------------- |
| 00    | Initialization  | Laptop powers on            | Introduce the experience              |
| 01    | The Builder     | Laptop opens                | Introduce Michael                     |
| 02    | The Screen      | Display detaches            | Showcase flagship projects            |
| 03    | The Keyboard    | Keys reorganize             | Demonstrate expertise                 |
| 04    | The Motherboard | Components reveal circuitry | Explain engineering approach          |
| 05    | The Battery     | Energy progression          | Tell the professional journey         |
| 06    | Reassembly      | Laptop rebuilds             | Convert visitor interest into contact |

The Processor is a focused subscene within Chapter 04 rather than a separate full-length chapter.

This preserves the seven-scene narrative while incorporating engineering decisions.

Additional portfolio items appear as compact editorial sections, not additional 3D chapters.

These include:

* Secondary projects.
* Smaller builds.
* The existing collection of 14 client websites.
* Supporting professional information.

All existing content must be preserved and mapped to the revised structure.

---

# 5. Scene 00 — Initialization

## Goal

Deliver a memorable introduction without delaying access to the portfolio.

## Visual sequence

1. The page starts with a near-black background.
2. A thin violet light appears.
3. A stylized laptop silhouette becomes visible.
4. The standby light activates.
5. The camera moves gently toward the laptop.
6. Michael's name appears in large typography.
7. A short professional positioning statement fades in.
8. The laptop begins opening.
9. The sequence transitions into Chapter 01.

### Example visual copy

`INITIALIZING EXPERIENCE`

**MICHAEL**

*Developer. Engineer. Problem Solver.*

Actual professional positioning should be verified against the existing portfolio.

## Interaction behavior

* Play automatically when motion is permitted.
* Target approximately 1.5–2 seconds.
* Show a visible Skip Intro control.
* Do not require a Press Start button.
* Play only once per session.
* Store the session state using `sessionStorage` with error handling.
* Do not block access to essential content.
* Skip automatically when reduced motion is enabled.
* Skip when loading directly into a specific chapter.
* Avoid delaying or concealing the meaningful hero content during loading.

The introduction is an enhancement, not a loading screen.

---

# 6. Scene 01 — The Builder

## Goal

Immediately communicate Michael's identity, expertise, and availability.

## 3D choreography

The laptop sits in a premium studio-like environment.

The camera approaches from a three-quarter angle.

The lid slowly opens.

The screen powers on.

Michael's verified portrait and greeting appear on the display.

Violet accent lighting reflects subtly across the laptop body.

The laptop responds to pointer movement with a maximum tilt of approximately ±6 degrees.

## Content composition

### Left panel

Small technical identifier:

`INDEPENDENT DEVELOPER / PORTFOLIO`

Main headline:

**BUILDING DIGITAL EXPERIENCES THAT ACTUALLY WORK.**

Supporting text:

A concise introduction covering Michael's actual specialization, strengths, and professional positioning.

### Primary CTAs

**Explore My Work**

**Let's Connect**

### Supporting information

Include verified details such as:

* Professional experience.
* Primary specialization.
* Location.
* Availability.
* Selected achievements.

Do not invent numbers to fill the layout.

## Recruiter accessibility

Visible in the hero:

**View Resume**

**Quick Professional Summary**

Both actions must work without requiring the visitor to complete the animation.

## Transition

As Chapter 02 approaches:

* The camera shifts toward the display.
* The screen brightens.
* The display separates from the laptop.
* Supporting hardware moves into the background.

---

# 7. Scene 02 — The Screen: Selected Work

## Goal

Make Michael's strongest projects the centerpiece of the portfolio.

## Content

Feature the four existing flagship projects.

Each project must include:

* Project name.
* Category.
* Michael's role.
* Problem or objective.
* What was built.
* Verified technology stack.
* Actual outcome or deliverable.
* Project screenshots.
* Case-study link.
* Live project or repository link, when available.

## Animation sequence

### Step 1 — Screen detachment

The display separates from the laptop frame.

It moves toward the visitor.

Its orientation changes to present the display clearly.

### Step 2 — Project reveal

The first flagship screenshot appears.

The scene transitions into a wider editorial showcase.

Project metadata enters in a controlled sequence.

### Step 3 — Showcase expansion

The display visually expands beyond the laptop frame.

The project's image becomes the dominant visual element.

Supporting content appears alongside it.

### Step 4 — Project progression

Each scroll segment advances to the next flagship project.

Project counter:

`PROJECT 01 / 04`

Transitions should vary subtly without becoming inconsistent.

### Step 5 — Return

After the fourth project, the screen returns to its detached hardware form.

The camera shifts toward the keyboard.

## Interactive features

**Direct project navigation**

Visitors can select any featured project without scrolling through every previous project.

**Quick View**

An accessible panel reveals a compact overview and additional screenshots.

**View Full Case Study**

Navigates to the dedicated project page.

**Project preview**

Where appropriate, provide an optimized video or interactive preview, but never require autoplay video to understand the work.

## Design constraints

* Project screenshots must remain legible.
* Content must not be obscured by the laptop.
* The project carousel must support keyboard navigation.
* Images must use appropriate responsive sizes.
* Large media assets must load selectively.
* Every project must remain available in the HTML fallback.

---

# 8. Scene 03 — The Keyboard: Technology Explorer

## Goal

Show Michael's technical capabilities through meaningful interactions rather than a conventional logo wall.

## Animation sequence

1. The keyboard deck lifts from the laptop.
2. Selected keycaps rise in coordinated groups.
3. The camera transitions into a slightly elevated view.
4. Key groups reorganize into technology clusters.
5. Each cluster illuminates as its category becomes active.
6. The corresponding information panel reveals supporting details.

## Technology categories

Use categories that reflect Michael's actual expertise.

Possible groups:

* Frontend engineering.
* Backend engineering.
* Cloud and infrastructure.
* Automation and integrations.
* Development tools and workflows.

Do not add tools or languages that cannot be verified.

## Interactive technology cards

Each technology can display:

**Technology name**

**Specialization**

**How Michael uses it**

**Related project**

Where possible, connect technologies to actual project evidence.

## Motion requirements

* Approximately 60 visible keycaps in the full desktop scene.
* Use instanced geometry where practical.
* Animate groups rather than every key independently.
* Avoid continuous unnecessary motion.
* Disable decorative glow at lower performance levels.

## Chapter transition

The keycaps return toward the deck.

The keyboard moves upward and backward.

The internal components become visible.

The motherboard slides into focus.

---

# 9. Scene 04 — The Motherboard: Engineering Intelligence

## Goal

Demonstrate how Michael approaches technical problems and builds systems.

This is the signature technical chapter.

## Visual concept

The motherboard emerges from the laptop chassis.

Its circuitry begins illuminating.

The camera approaches the board.

Traces and components become clearer.

Selected circuit paths transform into actual system architecture diagrams.

The transition visually connects hardware engineering with software engineering.

## Main content areas

### 9.1 Architecture

Show real project architectures.

Examples may include:

* Frontend-to-backend communication.
* Data processing pipelines.
* Automation workflows.
* External service integrations.
* Database interactions.
* Authentication and permissions.

Use only architectures supported by Michael's actual work.

### 9.2 Interactive architecture visualization

Each diagram contains:

* Nodes representing system components.
* Connections showing data flow.
* Directional indicators.
* Progressive activation.
* Optional supporting technical details.

When a node becomes active, explain its responsibility.

On desktop, visitors can select nodes to inspect additional details.

On mobile, diagrams become responsive SVGs or vertically organized architecture steps.

### 9.3 Processor subscene — Technical Decisions

A processor component becomes the focal point.

It represents Michael's decision-making process.

Introduce a focused section:

**ENGINEERING THE RIGHT SOLUTION**

Each example answers:

**The challenge:** What needed to be solved?

**The decision:** What approach was chosen?

**The reasoning:** Why was that approach appropriate?

**The outcome:** What was delivered?

Where documented, also explain trade-offs and alternatives.

## Secondary portfolio content

Place supporting projects after the architecture-focused section.

Preserve:

* Smaller builds.
* Secondary technical projects.
* Fourteen existing client websites.

Use compact editorial cards with lightweight reveals.

These sections should not introduce additional laptop disassembly sequences.

## Transition

The motherboard returns toward the center.

The camera moves toward the battery assembly.

Illuminated circuits gradually resolve into the battery's charging indicator.

---

# 10. Scene 05 — The Battery: Professional Journey

## Goal

Communicate Michael's progression, experience, and professional development.

## Visual sequence

The battery detaches from the chassis.

An illuminated energy line moves across its surface.

A charging indicator progresses as the visitor scrolls through the timeline.

## Timeline information

Include:

* Education.
* Early professional experience.
* Important career milestones.
* Major responsibilities.
* Technical specialization growth.
* Current professional direction.

All dates and accomplishments must be verified.

## Content presentation

Each milestone contains:

**Date or period**

**Role or achievement**

**Organization, where applicable**

**Relevant responsibilities**

**Professional growth or contribution**

## Design approach

Use a clean horizontal or vertical timeline depending on viewport size.

The battery animation should complement the content rather than replace the timeline itself.

## Final state

At the last milestone, the battery reaches its fully illuminated visual state.

Technical label:

`SYSTEM STATUS: READY`

This represents narrative completion, not a numerical measure of skill.

---

# 11. Scene 06 — Reassembly: Ready to Build

## Goal

Deliver a satisfying visual conclusion and encourage direct contact.

## Animation sequence

1. The battery returns to the chassis.
2. The motherboard slides into place.
3. The internal components settle.
4. The keyboard reconnects.
5. The display returns to its hinge.
6. The bottom case closes.
7. The laptop briefly enters a complete closed state.
8. The lid opens again.
9. The screen displays the final message.

### Final headline

**LET'S BUILD SOMETHING GREAT.**

Supporting copy should communicate Michael's actual professional interests and availability.

## Contact experience

### Primary actions

**Let's Work Together**

**Download Resume**

### Additional options

* Email.
* GitHub.
* LinkedIn.
* Other existing professional links.

### Contact form

Fields:

* Name.
* Email.
* Message.

Requirements:

* Server-side input validation.
* Spam protection.
* Accessible errors.
* Clear submission states.
* Success confirmation.
* Appropriate data handling.
* Working fallback contact method.
* No dependency on animation initialization.

The contact section must remain visible in reduced-motion, mobile, and no-JavaScript modes.

---

# 12. Recruiter Experience

## 12.1 Objective

Provide immediate access to Michael's qualifications without requiring visitors to complete the cinematic experience.

## 12.2 Recruiter Shortcut

Add a prominent but unobtrusive action:

**Short on time? View professional summary.**

This opens an accessible overview containing:

* Professional headline.
* Specializations.
* Experience.
* Relevant technologies.
* Four flagship projects.
* Work history.
* Education.
* Resume.
* Contact details.

## 12.3 Simple View

Provide a switch between:

**Experience**

The complete cinematic presentation.

**Simple View**

A conventional, fully readable portfolio without decorative scroll choreography.

Simple View must:

* Preserve all content.
* Maintain the same project links.
* Avoid 3D initialization.
* Disable scroll pinning.
* Support keyboard navigation.
* Be accessible through a direct URL or equivalent persistent preference.

## 12.4 Unified Content

Both experiences must use the same structured content source.

Do not maintain separate manually duplicated copies of professional information.

---

# 13. Global Navigation

## 13.1 Main Navigation

Minimal floating navigation containing:

**MICHAEL.**

**WORK**

**EXPERTISE**

**EXPERIENCE**

**CONTACT**

**RESUME ↗**

The navigation should adapt to scroll position without becoming distracting.

## 13.2 Chapter HUD

Desktop HUD:

`CH. 03 / 06 — THE KEYBOARD`

Include a thin progress indicator.

Selecting the chapter identifier opens a compact chapter navigator.

## 13.3 Navigation Requirements

* Direct jumps to every chapter.
* Stable section anchors.
* Browser back/forward compatibility.
* Keyboard accessibility.
* Visible focus indicators.
* Proper scroll restoration.
* Clear active-section state.
* No interaction with invisible overlays.
* Ability to navigate without animation completion.

---

# 14. Case Studies — Interactive Engineering Reports

## 14.1 Creative Direction

Dedicated case studies should feel like premium editorial technology reports.

Use GSAP and CSS for motion.

Do not reuse the 3D laptop scene on case-study pages.

## 14.2 Case-Study Structure

### Section 1 — Project Hero

Large project name.

High-quality screenshot or visual.

Essential project facts.

### Section 2 — Project Overview

What the project is.

What Michael contributed.

Who or what it was built for, where disclosure is appropriate.

### Section 3 — The Challenge

Explain the problem and constraints.

### Section 4 — The Approach

Describe implementation and problem-solving.

### Section 5 — Architecture

Use interactive SVG diagrams when technical architecture is relevant.

### Section 6 — Engineering Decisions

Explain meaningful implementation choices and trade-offs.

### Section 7 — Final Product

Show actual screenshots, functional demonstrations, and completed deliverables.

### Section 8 — Results

Present verified outcomes.

Never invent performance statistics or business impact.

### Section 9 — Next Project

Provide a strong transition into the next relevant case study.

## 14.3 Motion

* Masked title reveals.
* Subtle perspective transitions.
* Scroll-triggered image movement.
* Progressive architecture connections.
* Restrained card reveals.
* Number animations only for verified metrics.

Avoid excessive pinning.

Mobile and reduced-motion users receive simplified or static presentations.

---

# 15. Three.js Laptop Design

## 15.1 Geometry

Build a stylized laptop procedurally.

No external 3D model files are required.

Components:

* Lid shell.
* Screen panel.
* Display bezel.
* Hinge assembly.
* Keyboard deck.
* Instanced keycaps.
* Trackpad.
* Motherboard.
* Processor.
* Chips and connectors.
* Battery cells.
* Bottom chassis.
* Decorative circuitry.

## 15.2 Materials

Dark theme:

* Graphite metal.
* Satin surfaces.
* Controlled violet accents.
* Subtle edge highlights.
* Restrained emissive details.

Light theme:

* Aluminum surfaces.
* Softer shadows.
* Muted violet accents.
* Reduced emissive intensity.

## 15.3 Scene Lighting

Use a studio-inspired lighting setup.

* Soft primary light.
* Controlled rim lighting.
* Low-intensity fill light.
* Accent illumination.
* Minimal environmental reflections.

Prioritize materials and lighting quality over computationally expensive effects.

## 15.4 Component Transforms

Each detachable component must define:

* Home position.
* Home rotation.
* Exploded position.
* Exploded rotation.
* Intermediate presentation states.
* Return transform.

Do not derive transforms incrementally from previous frames.

Every state must be reproducible from deterministic timeline progress.

## 15.5 Camera

Use a dedicated camera rig.

Support:

* Hero framing.
* Screen inspection.
* Keyboard view.
* Motherboard close-up.
* Battery focus.
* Reassembly composition.

Camera transitions must preserve visual continuity.

---

# 16. Motion Architecture

## 16.1 Core Technologies

* Three.js for rendering.
* GSAP for cinematic choreography.
* ScrollTrigger for scroll progress.
* Lenis as an optional smooth-scroll enhancement.
* CSS for simple interactions.
* SVG for diagrams.
* Existing application framework for UI composition.

Remove unused animation dependencies only after checking the full codebase.

## 16.2 Single Experience Controller

Build a central controller that coordinates scene progression.

Responsibilities:

* Current chapter.
* Local chapter progress.
* Global experience progress.
* Camera state.
* Component transforms.
* Device profile.
* Motion preferences.
* Scene readiness.
* Quality level.

## 16.3 Chapter Contract

Each chapter should declare a consistent interface.

Example:

```ts
interface ExperienceChapter {
  id: string;
  title: string;
  component: string | null;

  enter?: () => void;
  update: (progress: number) => void;
  leave?: () => void;
}
```

Separate chapter data from presentation logic.

## 16.4 Scroll Synchronization

Use ScrollTrigger to map chapter progress into the master timeline.

Requirements:

* Smooth forward scrolling.
* Correct reverse scrolling.
* Reliable chapter jumping.
* No conflicting transform writers.
* Proper resize recalculation.
* Stable scroll restoration.
* Cleanup on route changes.
* No accumulated animation drift.

## 16.5 Scroll Ownership

Use one primary scroll system.

If Lenis is enabled, integrate it with ScrollTrigger correctly.

Avoid nested smooth-scroll systems or competing animation loops.

Native scrolling must remain available when enhancement initialization fails.

---

# 17. Adaptive Performance System

## 17.1 Rendering Profiles

Create three profiles.

### Cinematic

For capable desktop devices.

* Full laptop geometry.
* Complete chapter choreography.
* Higher-quality lighting.
* Selective glow.
* Full keycap presentation.
* Pointer parallax.

### Balanced

For constrained desktop devices.

* Simplified effects.
* Reduced pixel ratio.
* No glow postprocessing.
* Reduced decorative motion.
* Optimized geometry.

### Essential

For unsupported or low-performance environments.

* Pre-rendered laptop compositions.
* Standard content layout.
* No Three.js.
* No GPU-heavy effects.
* No scroll-dependent content visibility.

## 17.2 Rendering Rules

* Cap device pixel ratio at 1.75.
* Dynamically reduce resolution when necessary.
* Render only when needed.
* Pause when the document is hidden.
* Pause when the scene is outside the relevant viewing area.
* Avoid unnecessary object allocations during animation frames.
* Dispose of resources when the experience is destroyed.

## 17.3 Performance Monitoring

Monitor frame timing during active animation.

If sustained performance falls below the acceptable range:

1. Reduce render resolution.
2. Disable optional postprocessing.
3. Reduce decorative updates.
4. Switch to Balanced mode.
5. Use Essential mode if performance remains unacceptable.

Avoid abrupt visible changes during quality transitions.

## 17.4 Loading Strategy

* Prioritize meaningful HTML content.
* Load critical CSS and fonts efficiently.
* Load project images according to visibility.
* Dynamically import Three.js only when eligible.
* Initialize the 3D scene after initial content rendering.
* Never block navigation or interaction while the scene loads.

---

# 18. Mobile Experience

## 18.1 Requirements

For phones:

**No Three.js.**

**No WebGL scene.**

**No desktop scroll pinning.**

**No custom cursor.**

**No expensive effects.**

## 18.2 Visual Strategy

Use layered 2.5D compositions based on pre-rendered laptop states.

Each chapter can contain:

* Optimized background render.
* Separate component layer.
* Foreground HTML content.

Use lightweight transforms, opacity transitions, and restrained reveals.

## 18.3 Asset Generation

Create a build-time rendering script:

`scripts/render-stills.mjs`

Generate seven baseline chapter compositions.

Where beneficial, generate additional component layers for mobile parallax.

Requirements:

* Deterministic camera positions.
* Consistent lighting.
* Transparent assets where appropriate.
* Responsive image dimensions.
* WebP fallbacks.
* AVIF versions when supported.
* Explicit image dimensions.

## 18.4 Mobile Layout

Use standard document flow.

Prioritize:

* Readable project descriptions.
* Clear CTAs.
* Legible screenshots.
* Accessible technical diagrams.
* Fast navigation.
* Stable scrolling.

The mobile experience should feel intentionally designed, not like a reduced desktop version.

---

# 19. Accessibility and Fallbacks

## 19.1 Reduced Motion

When `prefers-reduced-motion: reduce` is active:

* Skip the intro.
* Disable cinematic scroll choreography.
* Disable parallax.
* Disable decorative cursor movement.
* Avoid motion-heavy page transitions.
* Show static chapter compositions.
* Keep all content immediately readable.

## 19.2 No JavaScript

The page must retain:

* Hero content.
* Navigation.
* Projects.
* Skills.
* Experience.
* Education.
* Contact information.
* Case-study links.

The initial HTML must contain the essential information.

## 19.3 No WebGL

If WebGL is unavailable or initialization fails:

* Switch to pre-rendered compositions.
* Preserve navigation.
* Preserve all content.
* Avoid blank or broken canvas regions.
* Avoid repeated initialization attempts.

## 19.4 Screen Readers

* Treat decorative 3D elements as nonessential.
* Use semantic headings.
* Preserve accessible project links.
* Keep original heading text available to assistive technology.
* Avoid unnecessary live announcements during scroll.
* Ensure dialogs and overlays have correct focus behavior.

---

# 20. Interaction Design

## 20.1 Interaction Levels

### Ambient

* Subtle lighting.
* Restrained environmental motion.
* Gentle scene depth.

### Functional

* Navigation states.
* Hover feedback.
* Focus indicators.
* Form submission states.
* Project panel expansion.

### Cinematic

* Laptop opening.
* Component detachment.
* Project transformations.
* Motherboard inspection.
* Final reassembly.

## 20.2 Desktop Enhancements

Permitted:

* Subtle custom cursor enhancement.
* Restrained magnetic CTA behavior.
* Lightweight card tilt.
* Purposeful hover states.

Avoid:

* Excessive particle bursts.
* Large cursor followers.
* Continuous background particles.
* Unnecessary animation on every element.
* Interactions that interfere with text selection or normal navigation.

## 20.3 Page Transitions

Use a short accent-colored wipe between homepage and case-study pages.

Requirements:

* Navigation must not be delayed unnecessarily.
* Respect reduced-motion preferences.
* Preserve browser history.
* Support direct URL loading.
* Work when JavaScript transitions fail.

---

# 21. Proposed Code Architecture

```text
apps/michael-portfolio/
│
├── src/
│   │
│   ├── experience/
│   │   ├── ExperienceController.ts
│   │   ├── ChapterRegistry.ts
│   │   ├── ScrollOrchestrator.ts
│   │   ├── MotionPreferences.ts
│   │   └── QualityManager.ts
│   │
│   ├── scene/
│   │   ├── LaptopScene.ts
│   │   ├── LaptopBuilder.ts
│   │   ├── CameraRig.ts
│   │   │
│   │   ├── components/
│   │   │   ├── Screen.ts
│   │   │   ├── Keyboard.ts
│   │   │   ├── Motherboard.ts
│   │   │   ├── Processor.ts
│   │   │   ├── Battery.ts
│   │   │   └── Chassis.ts
│   │   │
│   │   ├── animations/
│   │   │   ├── BootSequence.ts
│   │   │   ├── ExplodeSequence.ts
│   │   │   ├── ComponentTransitions.ts
│   │   │   └── ReassemblySequence.ts
│   │   │
│   │   └── materials/
│   │       ├── GraphiteMaterial.ts
│   │       └── AccentMaterial.ts
│   │
│   ├── motion/
│   │   ├── GSAPProvider.ts
│   │   ├── ScrollManager.ts
│   │   ├── TextReveal.ts
│   │   ├── MagneticButtons.ts
│   │   └── PageTransitions.ts
│   │
│   ├── components/
│   │   ├── ChapterHUD.tsx
│   │   ├── RecruiterShortcut.tsx
│   │   ├── SimpleViewToggle.tsx
│   │   ├── ProjectShowcase.tsx
│   │   ├── ArchitectureDiagram.tsx
│   │   └── ContactSection.tsx
│   │
│   └── data/
│       ├── chapters.ts
│       ├── projects.ts
│       ├── experience.ts
│       └── skills.ts
│
├── scripts/
│   └── render-stills.mjs
│
└── tests/
    ├── experience.spec.ts
    ├── accessibility.spec.ts
    ├── performance.spec.ts
    └── content-integrity.spec.ts
```

Adapt filenames and structure to the existing application's actual framework and conventions.

Do not create duplicate infrastructure where equivalent systems already exist.

---

# 22. Content Integrity

Before implementation, audit the existing site and referenced redesign plan.

Create a content inventory covering:

* Professional biography.
* Skills.
* Technologies.
* Work history.
* Education.
* Flagship projects.
* Secondary projects.
* Fourteen client websites.
* Professional links.
* Contact information.
* Resume.
* Project images.
* Existing case studies.

For every content item, record its destination in the new design.

No factual content may be discarded solely to simplify animation.

## Content Architecture

Store structured professional information separately from animation code.

Use one source of truth for both the cinematic experience and Simple View.

Validate all existing links.

Preserve appropriate redirects.

Avoid exposing confidential client information or internal development details.

---

# 23. Performance and Quality Targets

| Category                      | Requirement                      |
| ----------------------------- | -------------------------------- |
| Desktop animation             | Target 60 FPS                    |
| Sustained minimum             | ≥ 45 FPS in representative tests |
| Mobile Lighthouse Performance | ≥ 90                             |
| Lighthouse Accessibility      | ≥ 95                             |
| Lighthouse SEO                | ≥ 95                             |
| LCP                           | ≤ 2.5 seconds                    |
| INP                           | ≤ 200 ms                         |
| CLS                           | ≤ 0.1                            |
| Mobile Three.js requests      | Zero                             |
| Reduced-motion support        | Required                         |
| No-JavaScript content         | Fully readable                   |
| WebGL fallback                | Required                         |
| Console errors                | Zero                             |
| Horizontal overflow           | Zero                             |
| Broken internal links         | Zero                             |

Performance measurements must use documented test devices, network conditions, and repeatable runs.

Lab scores are release gates, not guarantees of identical performance for every real visitor.

---

# 24. Verification Strategy

## 24.1 Automated Testing

Extend the existing verification workflow.

### Desktop

Verify:

* Canvas initializes.
* Scene loads successfully.
* Chapter transitions function.
* Forward scrolling works.
* Reverse scrolling works.
* Direct chapter navigation works.
* Frame timing is recorded across representative animation states.
* No animation-related console errors occur.

### Mobile

Verify:

* No Three.js bundle requests.
* Optimized chapter compositions load.
* All content remains accessible.
* Navigation works.
* No horizontal overflow.
* No unexpected scroll trapping.

### Reduced Motion

Verify:

* Intro does not play.
* Scene choreography is disabled.
* Static content appears.
* All important information remains accessible.

### No JavaScript

Verify:

* Essential content appears in the rendered HTML.
* Navigation and project links work.
* No critical content requires animation initialization.

### Other Checks

* Both themes.
* Responsive breakpoints.
* Broken links.
* Redirects.
* 404 behavior.
* Contact form validation.
* Keyboard navigation.
* Focus management.
* Content integrity.
* Client-string leakage.
* Resource cleanup.
* Route transitions.

## 24.2 Visual Review

Capture screenshots of:

1. Initial hero.
2. Fully opened laptop.
3. Flagship project showcase.
4. Keyboard exploration.
5. Motherboard architecture.
6. Processor decision sequence.
7. Battery timeline.
8. Final reassembly.
9. Contact section.
10. Mobile hero and project sections.

Review composition, alignment, contrast, typography, lighting, and animation continuity.

## 24.3 Manual Review

Record desktop and mobile sessions.

Evaluate:

* Visual polish.
* Motion smoothness.
* Scroll responsiveness.
* Information accessibility.
* Navigation clarity.
* CTA effectiveness.
* Perceived loading performance.
* Overall narrative continuity.

Do not approve production merely because automated tests pass.

---

# 25. Implementation Roadmap

## Phase 01 — Audit and Foundation

### Tasks

* Inspect the existing application.
* Read the previous redesign specification.
* Inventory all portfolio content.
* Identify existing dependencies.
* Review routing and deployment setup.
* Establish design tokens.
* Establish accessibility requirements.

### Deliverables

* Content preservation map.
* Final design system.
* Technical implementation plan.
* Component and dependency audit.

### Exit criteria

All existing content has a mapped destination.

No unresolved architectural blockers remain.

---

## Phase 02 — Cinematic Vertical Slice

This is the first major implementation milestone.

### Build

* Procedural laptop prototype.
* Premium hero composition.
* Laptop opening animation.
* First project reveal.
* Working scroll synchronization.
* Mobile static fallback.
* Reduced-motion fallback.

### Validate

* Visual quality.
* Lighting.
* Animation continuity.
* Scroll behavior.
* Device compatibility.
* Loading performance.

### Exit criteria

The prototype demonstrates the intended premium quality without compromising usability.

Do not scale the experience to all chapters until this milestone passes review.

---

## Phase 03 — Complete Laptop Scene

### Build

* Detailed laptop geometry.
* Display system.
* Keyboard deck.
* Motherboard.
* Processor.
* Battery.
* Chassis.
* Lighting and materials.
* Camera states.
* Component transform definitions.

### Exit criteria

All component states work consistently.

The scene can move between states without transform drift or visual discontinuities.

---

## Phase 04 — Homepage Storytelling

### Build

* Seven chapter sequences.
* Four flagship showcases.
* Technology explorer.
* Architecture visualizations.
* Engineering decisions.
* Professional timeline.
* Reassembly sequence.
* Contact section.

### Exit criteria

All chapters function correctly when moving forward, backward, and through direct navigation.

All verified content remains available.

---

## Phase 05 — Recruiter Experience

### Build

* Quick Professional Summary.
* Simple View.
* Direct chapter navigation.
* Resume access.
* Accessible project inspection.
* Shared content architecture.

### Exit criteria

A recruiter can evaluate the essential qualifications and reach the contact section without experiencing the 3D sequence.

---

## Phase 06 — Case Studies

### Build

* Premium editorial case-study template.
* Four flagship case studies.
* Architecture diagrams.
* Verified project evidence.
* Project navigation.
* Motion enhancements.

### Exit criteria

Each case study clearly communicates the problem, contribution, implementation, and verified outcome.

---

## Phase 07 — Mobile and Performance

### Build

* Seven baseline mobile compositions.
* Optional 2.5D component layers.
* Responsive layouts.
* Adaptive desktop quality system.
* Asset loading strategy.
* Fallback handling.
* Resource cleanup.

### Exit criteria

Mobile contains no Three.js requests.

The page meets agreed performance and accessibility targets under defined test conditions.

---

## Phase 08 — QA and Production

### Tasks

* Run automated tests.
* Run Lighthouse audits.
* Inspect visual screenshots.
* Review screen recordings.
* Validate contact forms.
* Check both themes.
* Validate all project content.
* Test production build.
* Review final deployment preview.

### Deployment

Deploy to Vercel production only after the required checks pass and the final experience is approved.

---

# 26. Production Acceptance Criteria

The project is complete only when:

**Visual quality**

* The design feels premium and cohesive.
* The laptop is visually convincing.
* Every chapter has a clear visual purpose.
* Typography and spacing are consistent.
* The final reassembly feels complete.

**Functionality**

* All navigation works.
* All project links work.
* Contact methods are functional.
* Case studies are complete.
* Scroll animations are reversible.
* Direct chapter access works.

**Content**

* Existing verified information is preserved.
* No invented qualifications appear.
* Flagship projects have complete information.
* Secondary projects remain accessible.
* Professional details are consistent across views.

**Performance**

* Mobile receives no Three.js.
* Desktop uses adaptive rendering.
* Critical content loads promptly.
* Animations meet agreed performance thresholds.

**Accessibility**

* Reduced motion works.
* No-JavaScript content works.
* Screen-reader content remains available.
* Keyboard navigation is functional.
* The 3D experience is optional.

**Reliability**

* No serious console errors.
* No broken layouts.
* No scroll trapping.
* No critical route failures.
* Proper resource cleanup.
* All fallback modes work.

---

# 27. Out of Scope

The following are excluded from the initial production release:

* Sound effects.
* Background music.
* Photorealistic hardware simulation.
* WebGL on phones.
* A content management system.
* AI chatbots.
* Real-time multiplayer interaction.
* Unnecessary particle systems.
* Advanced physics simulation.
* Custom 3D model downloads.
* Complex user accounts.
* Features unrelated to the portfolio's purpose.

---

# 28. Final Product Definition

The completed portfolio must function on two levels.

## Level 1 — The Experience

An unforgettable cinematic journey through Michael's professional identity.

Visitors interact with a carefully constructed laptop whose components reveal real projects, capabilities, engineering approaches, and experience.

The experience demonstrates design sophistication and technical execution.

## Level 2 — The Professional Portfolio

A fast, accessible, credible portfolio that helps employers evaluate Michael.

Visitors can immediately:

* Understand his professional specialization.
* Explore flagship projects.
* Inspect technical capabilities.
* Review experience and education.
* Download his resume.
* Contact him.

Neither level may compromise the other.

## Final Guiding Principle

**Build a portfolio that demonstrates excellence rather than merely claiming it.**

The laptop is the storytelling medium.

The projects are the evidence.

The engineering is the credibility.

The accessibility is the professionalism.

The final experience should communicate all four.

**Design target: A premium, award-caliber interactive portfolio with the usability, credibility, and reliability expected of a production-grade professional website.**
