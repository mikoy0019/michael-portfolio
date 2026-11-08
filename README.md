# Michael Tejada — portfolio

Personal portfolio of Michael Tejada, a full-stack developer and AI-automation
specialist in the Philippines. Live at
[michael-portfolio-gamma-red.vercel.app](https://michael-portfolio-gamma-red.vercel.app),
with a mirror on Cloudflare Workers.

## Stack

Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS 4 ·
Playwright. No CMS: every word on the site lives in
[`src/content/projects.ts`](src/content/projects.ts) and
[`src/content/profile.ts`](src/content/profile.ts).

## Run it

```bash
npm install --legacy-peer-deps
npm run dev          # http://localhost:3000
npm run lint && npm run typecheck
npm test             # Playwright: builds, serves the export, runs desktop + phone suites
```

## Deploy

- **Vercel** (primary): `vercel deploy --prod`. Headers and redirects are in `vercel.json`.
- **Cloudflare Workers** (mirror): `npm run deploy` builds the static export and runs
  `wrangler deploy`; headers and redirects live in `public/_headers` and `public/_redirects`.

Case-study screenshots show demo or synthetic data only. Client projects are shown with
permission or anonymised.
