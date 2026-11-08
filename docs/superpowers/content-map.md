# Content Map: Inside the Machine

Audited 2026-11-04 against `src/content/*` and the old site at commit `7fa6e86`. Status values: `kept`, `restore`, `excluded by Michael`, `dropped`, `needs input`. Both the cinematic and Simple View experiences read from `src/content/`.

## Current content

| Item | Source | Destination | Status |
|---|---|---|---|
| Name, role, location, timezone, availability | `profile.ts` | Ch.01 The Builder | kept |
| Email | `profile.ts` | Ch.06, footer | kept |
| GitHub (mikoy0019) | `profile.ts` | Hero, Ch.06, footer | kept |
| LinkedIn | `profile.ts` (empty) | Hero, Ch.06 | needs input |
| Resume PDF | `profile.ts` (empty) | Hero, nav, Ch.06 | needs input |
| Portrait | `public/michael.jpg` | Ch.01 laptop screen; HTML for fallbacks | kept |
| 4 flagship case studies | `projects.ts` | Ch.02 The Screen; `/work/*` | kept |
| Key decisions from case studies | `projects.ts` | Ch.04 Processor subscene | kept |
| Architecture nodes and bullets | `projects.ts` | Ch.04 The Motherboard | kept |
| Stack groups | `projects.ts` | Ch.03 The Keyboard | kept |
| 6 automation pipelines | `projects.ts` | Ch.04, compact section | kept |
| 4 secondary projects | `projects.ts` | After Ch.04, compact section | kept |
| Smaller builds | `projects.ts` | After Ch.04, compact section | kept, see link audit |
| 14 client websites | `projects.ts` | After Ch.04, compact section | kept, see link audit |
| NixGen, Freelance roles | `projects.ts` | Ch.05 The Battery | kept |
| Contact form (FormSubmit) | `ContactSection.tsx` | Ch.06 | kept; server-side validation needs an email service (needs input) |

## Old-site content not on the current site

| Item | Decision | Why |
|---|---|---|
| Senior Sales Associate, D-Best Value | excluded by Michael | Removed 2026-11-04 |
| Technical Staff, DTI | excluded by Michael | Removed 2026-11-04 |
| Education (BS Marketing Management; Computer System Servicing) | excluded by Michael | Removed 2026-11-04 |
| Command Desk (live demo) | restore | Link works; add to smaller builds with a new screenshot |
| Services page and process steps | dropped | Michael chose to remove Services |
| "5+ years", "Why me" cards | dropped | Marketing claims, replaced by project evidence |
| Stat counters, including age | dropped | Removed in the employer redesign |
| Skill list items for VA, sales and support | dropped | Employer positioning; ops noted under Stack "Also" |
| Featured client descriptions (RemoteCruit, Shira Salon, Upscale Rails) | dropped | Condensed to the client website list |

## Link audit

Checked with GET, redirects followed, browser user agent.

| Link | Result | Action |
|---|---|---|
| POS System demo | 500 | Remove link, label demo offline |
| ChaseFlow demo | 404, no Vercel project | Remove link, label demo offline |
| InboxAI demo | 404, no Vercel project | Remove link, label demo offline |
| StockSense demo | 404, no Vercel project | Remove link, label demo offline |
| DeliverEase demo | 200, but sign-in fails | Remove the "Live demo" link until the backend works; keep source link |
| Four States Concrete Repair | No response | Remove link, keep name |
| Wombles Glass & Mirror | 404 | Remove link, keep name |
| The Greatest Insulation | 308 to `www` | Update URL |
| All other links | 200 | None |

## Dependencies

| Package | Status |
|---|---|
| next, react, react-dom, tailwindcss | In use |
| framer-motion | Unused (0 imports); remove |
| gsap, three, @types/three | To add |
| @playwright/test | To add (dev) |

## Open inputs from Michael

1. LinkedIn URL.
2. Resume PDF.
3. Email service account for server-side contact form validation.
4. Whether to redeploy the offline demos, and whether DeliverEase's backend should be restored.
5. Whether Four States and Wombles are still client sites worth listing.
