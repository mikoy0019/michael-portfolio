"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeroText, HeroSubtext, HeroFadeIn } from "@/components/HeroText";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const MARQUEE_ITEMS = [
  "WordPress",
  "Next.js",
  "On-Page SEO",
  "Virtual Assistant",
  "Inbox Zero",
  "Automation",
  "Web Design",
  "Butuan City, PH",
  "AI-Augmented",
  "Freelance",
];

const SERVICES = [
  {
    icon: "💻",
    title: "Web Design & Development",
    desc: "Professional websites built on WordPress and Next.js. Responsive, fast-loading, and SEO-ready — from concept to deploy.",
    colorClass: "service-icon-violet",
  },
  {
    icon: "📋",
    title: "Virtual Assistant",
    desc: "AI-augmented back-office ops: inbox management, calendar coordination, data entry, reports, CRM, and customer support.",
    colorClass: "service-icon-cyan",
  },
  {
    icon: "🤖",
    title: "AI Integration & Workflows",
    desc: "Custom automation systems using n8n, Zapier, and AI tools. Eliminate repetitive manual work and scale operations.",
    colorClass: "service-icon-violet",
  },
  {
    icon: "📈",
    title: "On-Page SEO",
    desc: "Titles, meta descriptions, headings, alt text, internal links — every page optimized for search visibility and conversions.",
    colorClass: "service-icon-cyan",
  },
  {
    icon: "⚡",
    title: "Landing Page Design",
    desc: "High-converting landing pages with tested CTAs, clean layouts, and persuasive copy built to capture leads.",
    colorClass: "service-icon-violet",
  },
  {
    icon: "🛠️",
    title: "System Development",
    desc: "Custom business systems — CRM pipelines, dashboards, inventory tracking, booking systems, and operational tools.",
    colorClass: "service-icon-cyan",
  },
];

const FEATURED_PROJECTS = [
  {
    name: "RemoteCruit",
    url: "https://remotecruit.com/",
    category: "SaaS · Staffing Platform",
    desc: "A full-featured offshore staffing platform connecting businesses with full-time remote employees. Clean design, lead capture funnels, and scalable architecture.",
    image: "/projects/remotecruit.png",
    accent: "#8b7cff",
  },
  {
    name: "Shira Salon",
    url: "https://shirasalon.com/",
    category: "Business · Beauty & Wellness",
    desc: "Premium salon website with elegant aesthetics, service showcases, booking integrations, and a brand presence that converts visitors into clients.",
    image: "/projects/shirasalon.png",
    accent: "#5eead4",
  },
  {
    name: "Upscale Rails & Stairs",
    url: "https://upscalerails.com/",
    category: "Service · Custom Fabrication",
    desc: "High-end custom railings and staircases since 2004. Portfolio-driven website with gallery showcases and lead generation forms.",
    image: "/projects/upscalerails.png",
    accent: "#a995ff",
  },
];

const SKILLS_DATA = [
  { name: "WordPress Development", group: "Web" },
  { name: "Next.js & React", group: "Web" },
  { name: "Web Design & UX", group: "Web" },
  { name: "Core Web Vitals", group: "Web" },
  { name: "On-Page SEO", group: "Growth" },
  { name: "Digital Marketing", group: "Growth" },
  { name: "Content & Social Ops", group: "Growth" },
  { name: "Inbox & Calendar", group: "VA" },
  { name: "Data Entry & Reports", group: "VA" },
  { name: "Customer Support", group: "VA" },
  { name: "Sales & CRM", group: "Business" },
  { name: "Management & Ops", group: "Business" },
  { name: "Technical Support", group: "Support" },
  { name: "Hardware & Networking", group: "Support" },
  { name: "AI Workflows", group: "AI" },
  { name: "Automation Pipelines", group: "AI" },
];

const NIXGEN_APPS = [
  {
    name: "POS System",
    desc: "Full point-of-sale web app. Product catalog, cart, checkout, inventory tracking, and daily reports.",
    url: "https://pos-app-rho-neon.vercel.app",
    image: "/nixgen/pos-app.png",
    stack: ["React", "Express", "Supabase"],
  },
  {
    name: "DeliverEase",
    desc: "Delivery management system. Admin dispatching, rider route tracking, and live order status with real-time sync.",
    url: "https://delivery-app-kappa-ashen.vercel.app",
    image: "/nixgen/delivery-app.png",
    stack: ["React", "Express", "Supabase"],
  },
  {
    name: "Supernova Dashboard",
    desc: "Multi-tenant command center. Client CRM, project tracking, meetings, files, reports, approvals, and KPI dashboard.",
    url: "https://supernova-dashboard.vercel.app",
    image: "/nixgen/supernova-dashboard.png",
    stack: ["React", "TypeScript", "Prisma"],
  },
  {
    name: "ChaseFlow",
    desc: "Invoice automation SaaS. Automates payment reminders, tracks expenses, and delivers weekly cash-flow reports.",
    url: "https://invoice-chase-brown.vercel.app",
    image: "/nixgen/invoice-chase.png",
    stack: ["Next.js", "Tailwind", "Vercel"],
  },
  {
    name: "InboxAI",
    desc: "AI-powered inbox app for intelligent email management, triage, and automated responses.",
    url: "https://inbox-ai-ten.vercel.app",
    image: "/nixgen/inbox-ai.png",
    stack: ["Next.js", "Supabase", "OpenAI"],
  },
  {
    name: "StockSense",
    desc: "Stock tracking and inventory management with real-time data, alerts, and portfolio analytics.",
    url: "https://stock-sense-delta.vercel.app",
    image: "/nixgen/stock-sense.png",
    stack: ["React", "Supabase", "APIs"],
  },
];

const WORKFLOWS = [
  {
    number: "W01",
    name: "Inbox Triage & Auto-Reply",
    trigger: "Gmail · New email",
    category: "Virtual Assistant",
    desc: "Reads every incoming email, classifies it with AI (priority / lead / support / spam), drafts a reply from templates, and either auto-sends or queues for human review.",
    nodes: ["Gmail Trigger", "OpenAI", "Switch", "Notion", "Gmail Send"],
    impact: "2 hrs/day saved",
  },
  {
    number: "W02",
    name: "Lead Enrichment → CRM",
    trigger: "Webform · New submission",
    category: "Growth",
    desc: "Captures a form submission, enriches the lead with company data, scores them against an ICP rubric, and pushes qualified leads into CRM with a Slack ping.",
    nodes: ["Webhook", "Apollo.io", "OpenAI Score", "HubSpot", "Slack"],
    impact: "Leads in <30s",
  },
  {
    number: "W03",
    name: "SEO Content Pipeline",
    trigger: "Schedule · Daily 6am",
    category: "Content Ops",
    desc: "Pulls trending keywords, drafts blog outlines with AI, writes SEO-optimized copy, and queues WordPress drafts for review — all before morning coffee.",
    nodes: ["Cron", "Google Trends", "OpenAI", "WordPress", "Airtable"],
    impact: "5 blogs/week automated",
  },
  {
    number: "W04",
    name: "Order → Ops Pipeline",
    trigger: "Webhook · New order",
    category: "E-commerce",
    desc: "On every new order: generates a packing slip PDF, notifies the warehouse on Slack, updates inventory, and sends a branded thank-you email with tracking.",
    nodes: ["Webhook", "PDF Generator", "Slack", "Sheets", "Email"],
    impact: "Fulfillment time halved",
  },
  {
    number: "W05",
    name: "Social Media Scheduler",
    trigger: "Airtable · New content row",
    category: "Marketing",
    desc: "Reads a content calendar, adapts each post for IG, LinkedIn, X, and Facebook with AI, generates captions + hashtags, and schedules natively.",
    nodes: ["Airtable", "OpenAI", "Buffer API", "Canva", "Slack"],
    impact: "1 brief → 4 platforms",
  },
  {
    number: "W06",
    name: "Invoice Chase & Follow-up",
    trigger: "Schedule · Daily 9am",
    category: "Finance Ops",
    desc: "Scans for overdue invoices, categorizes by age (7/14/30+ days), sends escalating polite reminders, and alerts the owner at the 30-day line.",
    nodes: ["Cron", "Xero", "Switch", "Gmail", "Slack"],
    impact: "60% faster payments",
  },
];

const WHY_ME = [
  {
    number: "01",
    title: "5+ Years of Real Experience",
    desc: "Not tutorials — real client work, real deadlines, real results across web development, sales, and technical roles.",
  },
  {
    number: "02",
    title: "Two Disciplines, One Operator",
    desc: "Web Developer and Virtual Assistant in one hire. I build the site AND run the back-office — no handoff needed.",
  },
  {
    number: "03",
    title: "Marketing + Tech Fusion",
    desc: "A Bachelor of Marketing Management plus Computer System Servicing training. I understand why sites exist, not just how to build them.",
  },
  {
    number: "04",
    title: "AI-Powered Efficiency",
    desc: "I leverage AI tools and automation to deliver at the speed of a small team — as one operator. Zero excuses.",
  },
  {
    number: "05",
    title: "Systems, Not Just Websites",
    desc: "I don't just build pages. I create automated workflows, business systems, and ops machines that run themselves.",
  },
  {
    number: "06",
    title: "Results Over Visuals",
    desc: "Every design decision is tied to a business outcome. Leads, conversions, efficiency — measurable impact.",
  },
];

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 pt-28 md:pt-40 pb-24">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* Left */}
          <div className="md:col-span-7">
            <HeroFadeIn delay={0}>
              <div className="chip mb-10">
                <span className="dot pulse-soft" />
                <span className="font-mono tracking-widest text-[11px]">
                  AVAILABLE FOR PROJECTS
                </span>
              </div>
            </HeroFadeIn>

            <h1 className="display-hero text-[11vw] md:text-[6.5rem] mb-8">
              <HeroText text="Websites that" />
              <br />
              <span className="gradient-text">
                <HeroText text="don't look" />
              </span>
              <br />
              <HeroText text="templated." />
            </h1>

            <HeroSubtext
              text="I'm Michael Tejada — a Web Developer and Virtual Assistant building fast, on-page SEO-ready sites and running AI-augmented back-office ops for founders and small teams. Based in Butuan City, Philippines. Working with clients everywhere."
              className="text-lg md:text-xl soft max-w-2xl leading-relaxed mb-10"
              delay={0.7}
            />

            <HeroFadeIn delay={0.9} className="flex flex-wrap gap-3 mb-16">
              <Link href="/portfolio" className="btn btn-primary">
                View My Work
                <span aria-hidden>→</span>
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Start a Project
              </Link>
            </HeroFadeIn>

            {/* Stat strip */}
            <HeroFadeIn delay={1.1}>
              <div className="grid grid-cols-3 gap-8 max-w-xl">
                <div className="stat">
                  <AnimatedCounter
                    target={5}
                    suffix="+"
                    className="font-display text-4xl md:text-5xl font-bold text-white"
                  />
                  <div className="text-xs mt-2 muted uppercase tracking-wider font-mono">
                    Years<br />Experience
                  </div>
                </div>
                <div className="stat">
                  <AnimatedCounter
                    target={20}
                    suffix="+"
                    className="font-display text-4xl md:text-5xl font-bold text-white"
                  />
                  <div className="text-xs mt-2 muted uppercase tracking-wider font-mono">
                    Sites<br />Shipped
                  </div>
                </div>
                <div className="stat">
                  <AnimatedCounter
                    target={5}
                    suffix="+"
                    className="font-display text-4xl md:text-5xl font-bold text-white"
                  />
                  <div className="text-xs mt-2 muted uppercase tracking-wider font-mono">
                    Things I Can<br />Do for You
                  </div>
                </div>
              </div>
            </HeroFadeIn>
          </div>

          {/* Right — portrait */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <HeroFadeIn delay={0.4}>
              <div className="relative float">
                {/* glow */}
                <div
                  aria-hidden
                  className="absolute -inset-12 rounded-[44px] bg-gradient-to-br from-[#8b7cff]/30 via-transparent to-[#5eead4]/20 blur-3xl"
                />
                {/* frame */}
                <div className="relative w-[280px] h-[360px] md:w-[380px] md:h-[480px] rounded-[28px] overflow-hidden border border-white/10 bg-[color:var(--bg-card)]">
                  <Image
                    src="/michael.jpg"
                    alt="Michael Tejada"
                    fill
                    sizes="(min-width: 768px) 380px, 280px"
                    className="object-cover"
                    priority
                  />
                  {/* overlay gradient */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-transparent to-transparent"
                  />
                  {/* corner ticks */}
                  <span className="absolute top-3 left-3 w-5 h-5 border-t border-l border-white/35" />
                  <span className="absolute top-3 right-3 w-5 h-5 border-t border-r border-white/35" />
                  <span className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-white/35" />
                  <span className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-white/35" />
                </div>

                {/* location pill */}
                <div className="card absolute -bottom-5 -left-6 px-4 py-3 flex items-center gap-3 text-sm backdrop-blur">
                  <span className="dot" />
                  <div className="leading-tight">
                    <div className="text-white text-[13px] font-medium">
                      Butuan City, PH
                    </div>
                    <div className="font-mono text-[10px] muted tracking-widest">
                      GMT+8 · REMOTE
                    </div>
                  </div>
                </div>

                {/* vertical caption */}
                <div className="hidden md:block absolute -right-16 top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] font-mono text-[10px] tracking-[0.4em] muted uppercase">
                  Web Developer · Virtual Assistant
                </div>
              </div>
            </HeroFadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════ MARQUEE ═══════════════ */}
      <section className="relative py-10 border-y border-[color:var(--line)] bg-[color:var(--bg-1)]/50 backdrop-blur">
        <div className="marquee">
          <div className="marquee-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="font-display text-3xl md:text-5xl font-semibold flex items-center gap-12 whitespace-nowrap"
              >
                {item}
                <span className="text-[#8b7cff] text-3xl leading-none">&#x2666;</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ ABOUT PREVIEW ═══════════════ */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-28">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <ScrollReveal className="md:col-span-5">
            <div className="section-label mb-8">01 / About</div>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.92] mb-6">
              A contractor who
              <br />
              <span className="gradient-text">actually ships.</span>
            </h2>
            <div className="hidden md:block font-mono text-xs muted tracking-widest uppercase mt-10">
              &#x2500;&#x2500; Butuan City, Philippines
            </div>
          </ScrollReveal>

          <div className="md:col-span-7 space-y-6 soft text-lg leading-[1.75]">
            <ScrollReveal delay={0.1}>
              <p>
                I&apos;m a dedicated, results-driven Web Developer with a strong
                background in WordPress and modern web development. My
                professional experience spans marketing, sales, and technical
                roles — giving me a rare mix of{" "}
                <span className="text-white">creativity, business strategy,
                and technical execution</span>.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p>
                I hold a Bachelor of Marketing Management from Father Saturnino
                Urios University and trained in Computer System Servicing at AMA
                Computer Learning Center. That combination is the whole point: I
                don&apos;t just build pages — I understand{" "}
                <span className="text-white">why</span> they exist and{" "}
                <span className="text-white">what</span> they need to do for the
                business.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[var(--violet-bright)] hover:text-white transition-colors font-medium"
              >
                Read full story <span aria-hidden>→</span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES BENTO ═══════════════ */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-28">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <ScrollReveal>
            <div className="section-label mb-8">02 / Services</div>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.92] max-w-3xl">
              Two disciplines.
              <br />
              <span className="gradient-text">One operator.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="soft max-w-sm text-[15px]">
              Hire me to build the website, run the back-office, or both.
              Everything ships on an AI-augmented workflow.
            </p>
          </ScrollReveal>
        </div>

        <StaggerContainer className="grid md:grid-cols-3 gap-5">
          {SERVICES.map((service) => (
            <StaggerItem key={service.title}>
              <div className="card card-interactive p-8 min-h-[260px] flex flex-col">
                <div className={`service-icon ${service.colorClass} mb-5`}>
                  <span>{service.icon}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-white mb-3">
                  {service.title}
                </h3>
                <p className="soft text-sm leading-relaxed flex-1">
                  {service.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal delay={0.2} className="mt-8 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[var(--violet-bright)] hover:text-white transition-colors font-medium text-sm"
          >
            View all services & process <span aria-hidden>→</span>
          </Link>
        </ScrollReveal>
      </section>

      {/* ═══════════════ FEATURED PROJECTS ═══════════════ */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-28">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 mb-16">
          <ScrollReveal className="md:col-span-5">
            <div className="section-label mb-8">03 / Featured Work</div>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.92]">
              Real apps,
              <br />
              <span className="gradient-text">live in production.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="md:col-span-7 md:pt-32">
            <p className="soft text-lg leading-relaxed">
              These are real web applications I&apos;ve built, deployed, and
              maintained — not mockups. Each one is live in production, handling
              real users and real workloads.
            </p>
          </ScrollReveal>
        </div>

        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {FEATURED_PROJECTS.map((project) => (
            <StaggerItem key={project.name}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card card card-interactive flex flex-col overflow-hidden group"
              >
                {/* Accent bar */}
                <div
                  aria-hidden
                  className="h-[3px] w-full"
                  style={{
                    background: `linear-gradient(90deg, ${project.accent}, transparent 80%)`,
                  }}
                />

                {/* Browser mockup */}
                <div className="browser-image">
                  <Image
                    src={project.image}
                    alt={`${project.name} screenshot`}
                    fill
                    sizes="(min-width: 768px) 420px, 100vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"
                  />
                  {/* External link */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 group-hover:text-white group-hover:bg-[#8b7cff]/80 group-hover:border-[#8b7cff] transition-all">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M6 2H14V10M14 2L6 10M6 14H3a1 1 0 01-1-1V3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="font-mono text-[10px] muted tracking-widest uppercase mb-2">
                    {project.category}
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-white mb-2">
                    {project.name}
                  </h3>
                  <p className="soft text-sm leading-relaxed mb-4 flex-1">
                    {project.desc}
                  </p>
                  <span className="font-mono text-[10px] muted tracking-widest uppercase group-hover:text-[var(--violet-bright)] transition-colors">
                    Visit site →
                  </span>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal delay={0.2} className="mt-10 text-center">
          <Link href="/portfolio" className="btn btn-ghost">
            View full portfolio <span aria-hidden>→</span>
          </Link>
        </ScrollReveal>
      </section>

      {/* ═══════════════ NIXGEN WEB APPS ═══════════════ */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-28">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[11px] tracking-widest uppercase muted">Web Applications</span>
            <span className="flex h-px w-12 bg-[var(--line-strong)]" />
            <span className="font-mono text-[10px] tracking-widest text-[var(--violet-bright)] uppercase">NixGen Collab</span>
          </div>
          <div className="section-label mb-8">04 / Web Apps</div>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.92] mb-6">
            Full-stack apps,
            <br />
            <span className="gradient-text">live in production.</span>
          </h2>
          <p className="soft text-lg max-w-2xl mb-16">
            Real web applications built collaboratively with NixGen Marketing Solutions —
            deployed, maintained, and serving real users.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-5">
          {NIXGEN_APPS.map((app) => (
            <StaggerItem key={app.name}>
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card card card-interactive flex flex-col overflow-hidden group h-full"
              >
                {/* Screenshot */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-1)]">
                  <Image
                    src={app.image}
                    alt={`${app.name} screenshot`}
                    fill
                    sizes="(min-width: 768px) 420px, 100vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div aria-hidden className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] pulse-soft" />
                    <span className="font-mono text-[10px] tracking-widest uppercase text-white">Live</span>
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 group-hover:text-white group-hover:bg-[#8b7cff]/80 transition-all">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path d="M6 2H14V10M14 2L6 10M6 14H3a1 1 0 01-1-1V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                {/* Body */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display text-lg font-semibold text-white mb-1.5">{app.name}</h3>
                  <p className="soft text-sm leading-relaxed mb-4 flex-1">{app.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {app.stack.map((tech) => (
                      <span key={tech} className="text-[10px] font-mono px-2 py-1 rounded-md border border-[var(--line-strong)] soft">{tech}</span>
                    ))}
                  </div>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ═══════════════ N8N WORKFLOWS ═══════════════ */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-28">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 mb-16">
          <ScrollReveal className="md:col-span-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[11px] tracking-widest uppercase muted">Automation</span>
              <span className="flex h-px w-12 bg-[var(--line-strong)]" />
              <span className="font-mono text-[10px] tracking-widest text-[var(--cyan)] uppercase">n8n</span>
            </div>
            <div className="section-label mb-8">05 / Workflows</div>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.92]">
              The quiet
              <br />
              <span className="gradient-text">army in the background.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="md:col-span-6 md:pt-36">
            <p className="soft text-lg leading-relaxed">
              These are the n8n workflows I build and run for clients — each one
              replaces hours of manual work per week. Small pieces of software
              that quietly make a business bigger than it is.
            </p>
          </ScrollReveal>
        </div>

        <StaggerContainer className="grid md:grid-cols-2 gap-5">
          {WORKFLOWS.map((wf) => (
            <StaggerItem key={wf.number}>
              <article className="card card-interactive p-8 relative overflow-hidden">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl border border-[rgba(139,124,255,0.35)] bg-[rgba(139,124,255,0.08)] flex flex-col items-center justify-center flex-shrink-0">
                      <span className="font-mono text-[9px] tracking-widest muted">n8n</span>
                      <span className="font-display font-bold text-[var(--violet-bright)] text-[13px] leading-none mt-0.5">{wf.number}</span>
                    </div>
                    <div>
                      <div className="tag mb-1">{wf.category}</div>
                      <h3 className="font-display text-xl font-semibold text-white leading-tight">{wf.name}</h3>
                    </div>
                  </div>
                </div>

                <div className="font-mono text-[11px] muted tracking-wider mb-4 flex items-center gap-2">
                  <span className="text-[var(--cyan)]">TRIGGER &#x25B8;</span> {wf.trigger}
                </div>

                <p className="soft text-sm leading-relaxed mb-5">{wf.desc}</p>

                <div className="hr-soft mb-4" />

                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="font-mono text-[9px] muted tracking-widest uppercase">Nodes</span>
                  {wf.nodes.map((node, idx) => (
                    <span key={node} className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-white px-2 py-1 rounded-md border border-[var(--line-strong)] bg-[var(--bg-1)]">{node}</span>
                      {idx < wf.nodes.length - 1 && <span className="text-[var(--ink-faint)] text-xs">→</span>}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <span className="dot" />
                  <span className="text-[12px] text-white font-medium">Impact: {wf.impact}</span>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ═══════════════ SKILLS ═══════════════ */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-28">
        <ScrollReveal>
          <div className="section-label mb-8">06 / Toolkit</div>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.92] mb-14 max-w-4xl">
            Skills & <span className="gradient-text">capabilities.</span>
          </h2>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SKILLS_DATA.map((skill, i) => (
            <StaggerItem key={skill.name}>
              <div className="skill-tile">
                <div className="flex items-start justify-between mb-2">
                  <span className="font-mono text-[10px] muted tracking-widest uppercase">
                    {skill.group}
                  </span>
                  <span className="font-mono text-[10px] muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="font-display font-semibold text-white text-[17px] leading-tight">
                  {skill.name}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ═══════════════ WHY WORK WITH ME ═══════════════ */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-28">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <ScrollReveal className="md:col-span-4">
            <div className="section-label mb-8">07 / Why Me</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-[0.92]">
              Why work
              <br />
              <span className="gradient-text">with me.</span>
            </h2>
          </ScrollReveal>

          <div className="md:col-span-8">
            {WHY_ME.map((item, i) => (
              <ScrollReveal key={item.number} delay={i * 0.08}>
                <div className="numbered-item">
                  <div className="number-badge">{item.number}</div>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="soft leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-28">
        <ScrollReveal>
          <div className="card relative overflow-hidden p-12 md:p-20 text-center">
            {/* Background glows */}
            <div
              aria-hidden
              className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#8b7cff]/15 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#5eead4]/12 blur-3xl"
            />

            <div className="relative">
              <motion.h2
                className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.92] mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Let&apos;s build something
                <br />
                <span className="gradient-text">that grows your business.</span>
              </motion.h2>
              <p className="soft text-lg max-w-2xl mx-auto mb-10">
                Whether you need a website, automation, VA support, or digital
                marketing — I create solutions that move your business forward.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="btn btn-primary">
                  Contact Me <span aria-hidden>→</span>
                </Link>
                <Link href="/portfolio" className="btn btn-ghost">
                  View Portfolio
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
