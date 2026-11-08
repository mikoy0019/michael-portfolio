/* All portfolio content. Pages render from here; no copy lives in JSX.
   Client work stays anonymised unless Michael has asked for its live link to be shown. */

export type Shot = { src: string; alt: string };
export type Links = { live?: string; liveLabel?: string; code?: string; demo?: string; demoNote?: string };

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  kind: string;
  role: string;
  timeframe: string;
  status: string;
  problem: string;
  built: string[];
  architecture: { nodes: string[]; bullets: string[] };
  decisions: { title: string; body: string }[];
  stack: string[];
  outcomes: string[];
  shots: Shot[];
  links: Links;
};

export const flagships: CaseStudy[] = [
  {
    slug: "deskdev-studio",
    title: "DeskDev Studio",
    tagline: "A client-operations workspace my studio runs on, delivered as web, mobile and Windows apps from one codebase.",
    kind: "Own product",
    role: "Lead developer: product, design, backend, infra",
    timeframe: "2025 to present",
    status: "In production",
    problem:
      "A small web studio was juggling projects, leads, meetings, end-of-day reports and client credentials across a dozen SaaS tools. Nothing talked to anything, and every new client meant more copy-paste.",
    built: [
      "One Next.js app that serves both the public studio site and the private workspace, split by hostname",
      "Workspace modules: projects and tasks with subtasks, clients and CRM, calendar and meetings, EOD reports, growth leads, courses, chat and channels, notifications",
      "An encrypted vault for client credentials, backed by Supabase Vault",
      "n8n automations for inbound leads, lead nudges, daily activity digests and error handling, versioned as JSON in git",
      "Expo mobile app and a Windows desktop shell (WebView2) sharing the same data layer",
      "A Remotion-rendered product video for the homepage",
    ],
    architecture: {
      nodes: ["Next.js on Cloudflare Workers", "Supabase Postgres + RLS", "Edge Functions", "n8n on Render", "Expo / Windows clients"],
      bullets: [
        "The site and workspace build to a single Cloudflare Worker through the OpenNext adapter",
        "Row-level security on every table; the service-role key never ships to a client",
        "A cron Worker keeps n8n warm and probes the whole stack",
        "Encrypted database backups run on a scheduled GitHub Action",
      ],
    },
    decisions: [
      {
        title: "One app, two hostnames",
        body: "The marketing site and the workspace share auth, components and deploys, but each gets its own hostname. That's one pipeline to maintain instead of two, with no duplicated design system.",
      },
      {
        title: "Migrations as a ledger",
        body: "A CI script enforces ordering and naming rules on SQL migrations, so the schema history stays linear and replayable.",
      },
      {
        title: "Automations live in git",
        body: "n8n workflows are exported as JSON, checked offline in CI and pushed by script, so automation changes get reviewed like code.",
      },
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Cloudflare Workers", "Supabase", "PostgreSQL", "n8n", "Expo", ".NET WebView2", "Vitest", "Playwright", "Remotion"],
    outcomes: [
      "150+ commits from first line to production",
      "60+ database migrations under CI-enforced ordering rules",
      "Unit tests (Vitest), end-to-end tests (Playwright) and a pre-deploy gate report",
      "Runbooks for operations, backup and restore, auth and DNS cutover",
    ],
    shots: [
      { src: "/work/deskdev-studio/workspace.png", alt: "DeskDev workspace home: open tasks, meetings, due tasks and recent activity (demo data)" },
      { src: "/work/deskdev-studio/home.png", alt: "NixGen Solutions studio site, served by the same DeskDev app" },
    ],
    links: { live: "https://nixgensolutions.com", demo: "https://deskdev-demo.vercel.app", demoNote: "Demo sign-in: admin@deskdev.local / admin", code: "https://github.com/mikoy0019/deskdev" },
  },
  {
    slug: "creator-ops-platform",
    title: "Creator Operations Platform",
    tagline: "Creator discovery, AI-assisted vetting, campaigns and commission payouts for a consumer brand, all in one system.",
    kind: "Client work",
    role: "Lead developer",
    timeframe: "2026",
    status: "In production",
    problem:
      "The brand's creator programme ran on spreadsheets, DMs and memory: who had been vetted, who had signed, whose sample shipped, who was owed commission. Every step relied on manual reconciliation.",
    built: [
      "A photo-led creator 'yearbook' with filters, lists and approval stages",
      "AI fit scoring with a rules-based baseline that works offline, plus an LLM score when a key is configured",
      "A campaign pipeline covering application, agreement, kit fulfilment, content QC, attribution and commission",
      "A mobile-first creator portal for applying, signing, submitting content and tracking earnings",
      "A weekly report computed live from the same data, plus a finance view on its own origin",
      "Idempotent CSV import with a dry-run preview",
    ],
    architecture: {
      nodes: ["Next.js app", "Supabase Postgres + RLS", "Cloudflare Workers", "n8n + Apps Script", "LLM scoring"],
      bullets: [
        "Finance sessions are confined to a separate origin",
        "A unique creator-and-campaign constraint makes duplicate sample shipments structurally impossible",
        "An RLS isolation check runs against real fixtures; contract scripts verify integrations",
        "No scraping behind logins: the app never signs in to social accounts or sends messages",
      ],
    },
    decisions: [
      {
        title: "Facts vs estimates",
        body: "Every AI-inferred field (age, location, category) carries a visible confidence chip, so reviewers never confuse a model's guess with collected data.",
      },
      {
        title: "Guardrails in the database",
        body: "Business rules such as one sample per creator per campaign, and a content deadline clock that starts on delivery, are enforced by constraints and triggers rather than UI checks.",
      },
      {
        title: "Ethical data collection",
        body: "Discovery uses public data only. That was a deliberate trade-off against scraping, which keeps the brand compliant through platform app review.",
      },
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "PostgreSQL", "zod", "Cloudflare Workers", "n8n", "Google Apps Script", "LLM APIs"],
    outcomes: [
      "470+ commits over an active production engagement",
      "110+ database migrations",
      "The full creator lifecycle, from discovery to payout, in one system",
    ],
    shots: [],
    links: { live: "https://creators.alpineprovisionsco.com", liveLabel: "Live app (sign-in required)" },
  },
  {
    slug: "clinic-booking-platform",
    title: "Clinic Booking Platform",
    tagline: "Doctor discovery, appointment booking and live patient queues, with separate roles for patients, clinic staff and platform admins.",
    kind: "Product build · anonymised",
    role: "Full-stack developer",
    timeframe: "2026",
    status: "Working prototype on synthetic data",
    problem:
      "Patients book clinic appointments by phone and wait without knowing their place in the queue. Clinics track walk-ins on paper. A healthcare product has to get roles, auditability and data isolation right from the first commit.",
    built: [
      "Public doctor search with specialty, location and live availability",
      "Patient flows: booking with idempotent retries, cancellation bound to clinic policy, atomic rescheduling, queue position",
      "Clinic flows: calendar, check-in, walk-ins, queue reordering, slot management and a team view",
      "Platform admin: verification, pharmacy catalogue import (CSV/XLSX) with quarantine, operational metrics and audit trail",
      "Sign-up, sign-in and MFA, with browser credentials held in memory only",
    ],
    architecture: {
      nodes: ["React web app", "Hono API (Cloudflare Worker)", "PostgreSQL + RLS", "Supabase Auth", "Embedded Postgres for local dev"],
      bullets: [
        "One identity with separately scoped roles; RLS policies enforce isolation in the database itself",
        "Local development needs no credentials or Docker: the API boots embedded Postgres and seeds synthetic data",
        "Generated PDFs carry baked-in watermarks; there is deliberately no signing endpoint",
        "Booking mutations stay behind a release flag until compliance gates are met",
      ],
    },
    decisions: [
      {
        title: "Idempotent booking",
        body: "Booking requests carry idempotency keys, so a flaky mobile connection that retries never double-books a slot.",
      },
      {
        title: "Security in the database, not the UI",
        body: "Access rules live in Postgres RLS and are tested directly, so a bug in the frontend can't leak another patient's data.",
      },
      {
        title: "Zero-setup local environment",
        body: "Embedded Postgres plus synthetic fixtures mean any reviewer can run the whole system with two commands, without access to real data.",
      },
    ],
    stack: ["React", "TypeScript", "Hono", "PostgreSQL", "Supabase Auth", "Cloudflare Workers", "pnpm monorepo", "Playwright", "axe-core"],
    outcomes: [
      "Three role-separated products on one shared identity",
      "Browser tests with Playwright and accessibility checks with axe",
      "A secrets check in CI and documented architecture decisions",
    ],
    shots: [
      { src: "/work/clinic-booking-platform/search.png", alt: "Patient-facing doctor search with specialty and location filters (synthetic data)" },
    ],
    links: {},
  },
  {
    slug: "dinkup",
    title: "DinkUp",
    tagline: "Pickleball court booking and skill-based open-play matchmaking, on web and mobile with one shared backend.",
    kind: "Own product",
    role: "Sole developer",
    timeframe: "2026",
    status: "Working v1",
    problem:
      "Court time is booked through Facebook messages and spreadsheets. Double-bookings happen, and players have no easy way to find a game at their level.",
    built: [
      "Browse venues and courts, choose a date and slot, book, view and cancel bookings",
      "Customer, venue-owner and admin roles; owners manage their own courts and slots and see revenue",
      "Open-play sessions with DUPR-style skill bands",
      "Realtime in-app notifications, plus email confirmations and reminders",
      "An Expo mobile app that books into the same database as the web app",
    ],
    architecture: {
      nodes: ["Next.js web (Vercel)", "Expo mobile", "Supabase Postgres", "Edge Functions", "n8n"],
      bullets: [
        "Both clients read and write one Supabase project, so a booking made on web appears on mobile instantly",
        "Payments are pay-at-venue in v1, with a Stripe-ready payment_status column",
      ],
    },
    decisions: [
      {
        title: "Race-safe booking in the database",
        body: "A tstzrange EXCLUDE constraint rejects overlapping confirmed bookings on the same court. Two people clicking the same slot at the same moment can't both win, and create_booking() returns a friendly 'slot was just booked' error.",
      },
      {
        title: "Ship v1 without payments",
        body: "Pay-at-venue let v1 launch without payment compliance work; the schema already anticipates Stripe.",
      },
    ],
    stack: ["Next.js 16", "React 19", "Tailwind 4", "shadcn/ui", "Expo", "zustand", "Supabase", "PostgreSQL", "n8n"],
    outcomes: [
      "Web and iOS/Android clients on one backend",
      "Double-booking prevented by a database constraint, not application code",
    ],
    shots: [
      { src: "/work/dinkup/court-booking.png", alt: "DinkUp court booking screen with an hourly slot grid (demo data)" },
      { src: "/work/dinkup/open-play.png", alt: "DinkUp open play sessions with live queue counts (demo data)" },
    ],
    links: { live: "https://dinkup-demo.vercel.app", liveLabel: "Try the live demo", code: "https://github.com/mikoy0019/dinkup-app" },
  },
];

export type SecondaryProject = { name: string; kind: string; blurb: string; stack: string[]; links: Links; shot?: Shot; nodes?: string[] };

export const secondary: SecondaryProject[] = [
  {
    name: "Language School Directory",
    kind: "Client work · anonymised",
    blurb:
      "A public directory of language schools, a provider/admin portal and a mobile app, all sharing one database. Shipped with health endpoints, Sentry error tracking and a written rollback runbook.",
    stack: ["Next.js ×2", "Expo", "Supabase", "MapLibre", "Sentry", "Vercel"],
    links: {},
    nodes: ["Directory (Next.js)", "Provider portal (Next.js)", "Mobile (Expo)", "Supabase"],
  },
  {
    name: "DeliverEase",
    kind: "Own product",
    blurb:
      "Delivery logistics: a map-first dispatch console, live public order tracking and an Expo rider app with background location and proof-of-delivery. Comes with its own design system.",
    stack: ["React", "Leaflet", "Express", "Prisma", "Expo", "Supabase", "n8n"],
    links: { code: "https://github.com/mikoy0019/deliverease" },
    nodes: ["Dispatch console", "Express API", "Supabase", "Rider app (Expo)", "n8n"],
  },
  {
    name: "Headless Storefront",
    kind: "Client work · anonymised",
    blurb:
      "A fast Next.js storefront that reads a live WooCommerce/Dokan catalogue. The cart is proxied server-side and checkout is handed back to WooCommerce, so payments and orders stay where the merchant already manages them.",
    stack: ["Next.js 16", "WooCommerce Store API", "WP REST", "pnpm"],
    links: {},
    nodes: ["Next.js storefront", "Server-side cart proxy", "WooCommerce Store API", "Native checkout"],
  },
  {
    name: "Laptop Checker",
    kind: "Own product",
    blurb:
      "A Windows app for checking a used laptop before you buy it. It verifies the hardware is genuine, estimates age and wear, runs CPU/GPU/memory/disk benchmarks and a stress test, then gives one clear verdict.",
    stack: ["Electron", "PowerShell", "electron-builder"],
    links: { code: "https://github.com/mikoy0019/laptop-checker" },
    shot: { src: "/work/laptop-checker/overview.png", alt: "Laptop Checker overview screen with verdict" },
  },
];

export type MiniBuild = { name: string; desc: string; url?: string; code?: string; image: string; stack: string[] };

/** No `url` means the demo is offline: the card links to source, or nowhere, and says so. */
export const miniBuilds: MiniBuild[] = [
  { name: "Command Desk", desc: "Collaborative task and project management with real-time updates.", url: "https://command-desk-one.vercel.app", image: "/nixgen/command-desk.png", stack: ["React", "Vite", "Supabase"] },
  { name: "ChaseFlow", desc: "Invoice reminders, expense tracking and weekly cash-flow reports.", image: "/nixgen/invoice-chase.png", stack: ["Next.js", "Tailwind"] },
  { name: "InboxAI", desc: "AI email triage and drafted replies.", image: "/nixgen/inbox-ai.png", stack: ["Next.js", "Supabase", "OpenAI"] },
  { name: "StockSense", desc: "Inventory tracking with alerts and analytics.", image: "/nixgen/stock-sense.png", stack: ["React", "Supabase"] },
  { name: "Supernova Dashboard", desc: "Multi-tenant agency command centre: CRM, projects, approvals, KPIs.", url: "https://supernova-dashboard.vercel.app", image: "/nixgen/supernova-dashboard.png", stack: ["React", "Prisma"] },
  { name: "POS System", desc: "Point-of-sale with checkout, products and orders.", code: "https://github.com/mikoy0019/pos-app", image: "/nixgen/pos-app.png", stack: ["Next.js", "Supabase"] },
];

export const pipelines = [
  { name: "Inbox triage & auto-reply", trigger: "New email", steps: ["Gmail", "LLM classify", "Switch", "Notion", "Gmail send"], outcome: "Classifies priority, leads, support and spam; drafts replies or queues them for review" },
  { name: "Lead enrichment → CRM", trigger: "Form submission", steps: ["Webhook", "Apollo", "LLM ICP score", "HubSpot", "Slack"], outcome: "Qualified leads reach the CRM with a score in under 30 seconds" },
  { name: "SEO content pipeline", trigger: "Daily 6am", steps: ["Cron", "Google Trends", "LLM draft", "WordPress", "Airtable"], outcome: "Keyword research to reviewed WordPress drafts, every morning" },
  { name: "Order → ops", trigger: "New order", steps: ["Webhook", "PDF slip", "Slack", "Sheets", "Email"], outcome: "Packing slip, warehouse ping, inventory update and branded confirmation" },
  { name: "Social scheduler", trigger: "New calendar row", steps: ["Airtable", "LLM adapt", "Canva", "Buffer", "Slack"], outcome: "One brief becomes platform-specific posts for 4 networks" },
  { name: "Invoice chase", trigger: "Daily 9am", steps: ["Cron", "Xero", "Switch", "Gmail", "Slack"], outcome: "Escalating reminders by invoice age; the owner is alerted at 30 days" },
];

export const clientSites: { name: string; url?: string; category: string }[] = [
  { name: "RemoteCruit", url: "https://remotecruit.com/", category: "Staffing platform" },
  { name: "Shira Salon", url: "https://shirasalon.com/", category: "Beauty & wellness" },
  { name: "Upscale Rails & Stairs", url: "https://upscalerails.com/", category: "Fabrication" },
  { name: "Four States Concrete Repair", category: "Construction" },
  { name: "TopCore IT", url: "https://topcoreit.com/", category: "Technology" },
  { name: "Elite Management NY", url: "https://elitemanagementny.com/", category: "Management" },
  { name: "HydroTech Plumbing Pros", url: "https://hydrotechplumbingpros.com/", category: "Plumbing" },
  { name: "The Ark Hauling", url: "https://thearkhauling.com/", category: "Hauling" },
  { name: "The Greatest Insulation", url: "https://www.thegreatestinsulation.com/", category: "Insulation" },
  { name: "GoGetters Insulation", url: "https://gogettersinsulation.com/", category: "Insulation" },
  { name: "Milo Insulation East TX", url: "https://miloinsulationeasttx.com/", category: "Insulation" },
  { name: "AT-Foam", url: "https://www.at-foam.com/", category: "Insulation" },
  { name: "Wombles Glass & Mirror", category: "Glass & mirror" },
  { name: "Foamain Insulation", url: "https://foamainsulation.com/", category: "Insulation" },
];

export const jobs = [
  { title: "Full-Stack Developer", desc: "End-to-end web products: database, API, frontend and deployment.", proof: "DeskDev Studio, DinkUp" },
  { title: "AI Automation Engineer", desc: "n8n and Zapier workflows with LLM steps that replace manual routines.", proof: "6 automation pipelines below" },
  { title: "Mobile App Developer", desc: "Cross-platform iOS and Android apps with Expo and React Native.", proof: "DinkUp, DeliverEase rider app" },
  { title: "Frontend Developer", desc: "Responsive React and Next.js interfaces, built on design systems.", proof: "DeliverEase design system, this site" },
  { title: "WordPress Developer", desc: "Business websites with on-page SEO, performance work and lead capture.", proof: "14 business websites" },
  { title: "Technical Virtual Assistant", desc: "AI-assisted operations: inbox, calendar, reports, CRM and support.", proof: "Inbox triage and CRM pipelines" },
];

export const education = [
  { school: "Father Saturnino Urios University", course: "Business Marketing Management", period: "2018 to 2022" },
  { school: "AMA Computer Learning Center", course: "Computer System and Network", period: "2016 to 2018" },
];

export const skills = [
  "Database design",
  "Row-level security",
  "REST APIs and webhooks",
  "Authentication and roles",
  "Realtime features",
  "LLM integration",
  "Workflow automation",
  "Design systems",
  "Responsive UI",
  "CI and deployment",
  "End-to-end testing",
  "UI/UX design",
  "Technical SEO",
  "Performance tuning",
  "Project and client management",
];

export const stackGroups = [
  { label: "Frontend", items: ["TypeScript", "React 19", "Next.js (App Router)", "Tailwind CSS", "shadcn/ui", "Framer Motion", "Leaflet / MapLibre"] },
  { label: "Backend & data", items: ["PostgreSQL", "Supabase (Auth, RLS, Realtime, Edge Functions)", "Hono", "Express", "Prisma", "zod"] },
  { label: "Mobile & desktop", items: ["Expo / React Native", "Electron", ".NET WebView2"] },
  { label: "Infra & quality", items: ["Vercel", "Cloudflare Workers", "Render", "GitHub Actions", "Playwright", "Vitest", "Sentry"] },
  { label: "AI & automation", items: ["n8n", "Zapier", "LLM APIs (Claude, OpenAI)", "Google Apps Script", "Local models (PyTorch)", "Agentic coding workflows"] },
  { label: "Also", items: ["WordPress", "WooCommerce", "On-page SEO", "Client ops & support"] },
];

export const experience = [
  {
    role: "Developer & Co-Founder",
    company: "NixGen Solutions",
    period: "2025 to present",
    body: "I co-run a small web and automation studio and build its products and client systems end to end: full-stack web apps, mobile and desktop clients, Supabase backends and n8n automations. Recent work includes a creator-operations platform for a consumer brand and a multi-app directory platform.",
  },
  {
    role: "Web Designer & Developer",
    company: "Freelance",
    period: "July 2021 to October 2026",
    body: "Designed and developed full-stack web applications, custom software and responsive interfaces, covering front end, back end, API integrations, databases and AI automation.",
  },
  {
    role: "WordPress Developer",
    company: "Freelance",
    period: "June 2019 to February 2021",
    body: "Built and customised WordPress websites with Elementor, Divi and other page builders, with a focus on responsive design, optimisation, troubleshooting and ongoing maintenance.",
  },
  {
    role: "Web Design Intern",
    company: "ACLC",
    period: "February 2017 to November 2018",
    body: "Helped with website design, development and maintenance, and gained practical experience in HTML, CSS, WordPress and troubleshooting.",
  },
];
