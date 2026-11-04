"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const FEATURED = [
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

const CLIENT_SITES = [
  { name: "Four States Concrete Repair", url: "https://fourstatesconcreterepair.com/", category: "Construction" },
  { name: "TopCore IT", url: "https://topcoreit.com/", category: "Technology" },
  { name: "Elite Management NY", url: "https://elitemanagementny.com/", category: "Management" },
  { name: "HydroTech Plumbing Pros", url: "https://hydrotechplumbingpros.com/", category: "Plumbing" },
  { name: "The Ark Hauling", url: "https://thearkhauling.com/", category: "Hauling" },
  { name: "The Greatest Insulation", url: "https://thegreatestinsulation.com/", category: "Insulation" },
  { name: "GoGetters Insulation", url: "https://gogettersinsulation.com/", category: "Insulation" },
  { name: "Milo Insulation East TX", url: "https://miloinsulationeasttx.com/", category: "Insulation" },
  { name: "AT-Foam", url: "https://www.at-foam.com/", category: "Insulation" },
  { name: "Wombles Glass & Mirror", url: "https://www.womblesglassandmirror.com/", category: "Glass & Mirror" },
  { name: "Foamain Insulation", url: "https://foamainsulation.com/", category: "Insulation" },
];

const NIXGEN_APPS = [
  {
    name: "POS System",
    desc: "Full point-of-sale web app for retailers. Product catalog, cart, checkout, inventory tracking, and daily close-out reports.",
    url: "https://pos-app-rho-neon.vercel.app",
    image: "/nixgen/pos-app.png",
    stack: ["React", "Express", "Supabase"],
    status: "Live",
  },
  {
    name: "DeliverEase",
    desc: "Delivery management system. Admin dashboard for dispatching, rider app for route tracking, and live order status with real-time sync.",
    url: "https://delivery-app-kappa-ashen.vercel.app",
    image: "/nixgen/delivery-app.png",
    stack: ["React", "Express", "Supabase"],
    status: "Live",
  },
  {
    name: "Supernova Dashboard",
    desc: "Multi-tenant command center for creative agencies. Client CRM, project tracking, meetings, files, reports, approvals, and KPI dashboard.",
    url: "https://supernova-dashboard.vercel.app",
    image: "/nixgen/supernova-dashboard.png",
    stack: ["React", "TypeScript", "Prisma", "Supabase"],
    status: "Live",
  },
  {
    name: "ChaseFlow (Invoice Chase)",
    desc: "SaaS landing + app for small firms. Automates polite payment reminders, tracks expenses, and delivers weekly cash-flow reports.",
    url: "https://invoice-chase-brown.vercel.app",
    image: "/nixgen/invoice-chase.png",
    stack: ["Next.js", "Tailwind", "Vercel"],
    status: "Live",
  },
  {
    name: "InboxAI",
    desc: "AI-powered inbox application for intelligent email management, triage, and automated responses using GPT.",
    url: "https://inbox-ai-ten.vercel.app",
    image: "/nixgen/inbox-ai.png",
    stack: ["Next.js", "Supabase", "OpenAI"],
    status: "Live",
  },
  {
    name: "StockSense",
    desc: "Stock tracking and inventory management application with real-time data, alerts, and portfolio analytics.",
    url: "https://stock-sense-delta.vercel.app",
    image: "/nixgen/stock-sense.png",
    stack: ["React", "Supabase", "APIs"],
    status: "Live",
  },
  {
    name: "Command Desk",
    desc: "Collaborative task and project management interface with real-time updates, team coordination, and activity tracking.",
    url: "https://command-desk-one.vercel.app",
    image: "/nixgen/command-desk.png",
    stack: ["React", "Vite", "Supabase"],
    status: "Live",
  },
];

const WORKFLOWS = [
  {
    number: "W01",
    name: "Inbox Triage & Auto-Reply",
    category: "Email Ops",
    desc: "Reads every incoming email, classifies it with AI (priority / lead / support / spam), drafts replies from templates, and either auto-sends or queues for human review.",
    impact: "2 hrs/day saved",
  },
  {
    number: "W02",
    name: "Lead Enrichment → CRM",
    category: "Sales",
    desc: "Captures form submissions, enriches leads with company data, scores against ICP rubric, and pushes qualified leads into CRM with a Slack ping.",
    impact: "Qualified leads in <30s",
  },
  {
    number: "W03",
    name: "SEO Content Pipeline",
    category: "Content",
    desc: "Pulls trending keywords, drafts blog outlines with AI, writes SEO-optimized copy, and queues WordPress drafts for review — all automated daily.",
    impact: "5 blog drafts/week",
  },
  {
    number: "W04",
    name: "Social Media Scheduler",
    category: "Marketing",
    desc: "Reads content calendar, adapts each post for IG, LinkedIn, X, and Facebook with AI-generated captions and hashtags, then schedules natively.",
    impact: "1 brief → 4 platforms",
  },
];

const OMEGA_CAPABILITIES = [
  {
    title: "AI Voice Agents",
    desc: "Conversational AI agents that handle outbound calls, appointment booking, qualification, and follow-ups — 24/7 in multiple languages.",
    tag: "Voice AI",
  },
  {
    title: "Campaign Automation",
    desc: "End-to-end outreach campaigns: email sequences, LinkedIn automation, lead enrichment, and CRM sync — running continuously without manual effort.",
    tag: "Outreach",
  },
  {
    title: "Predictive Intelligence",
    desc: "90-day business forecasting: churn prediction, opportunity scanning, market trend analysis, and proactive client health monitoring.",
    tag: "Analytics",
  },
  {
    title: "Full Workflow Systems",
    desc: "Complex multi-step business automation: order processing, invoice chasing, customer onboarding, and cross-platform data sync.",
    tag: "Automation",
  },
  {
    title: "AI Avatar Presence",
    desc: "Photorealistic AI video avatars for sales presentations, client onboarding, multilingual support, and 24/7 customer engagement.",
    tag: "AI Avatar",
  },
  {
    title: "Custom SaaS Platforms",
    desc: "Full-stack web applications: dashboards, CRMs, booking systems, marketplaces — designed, built, and deployed production-ready.",
    tag: "Development",
  },
];

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function PortfolioPage() {
  return (
    <main className="min-h-screen">
      {/* ═══════════════ PAGE HEADER ═══════════════ */}
      <div className="page-header max-w-[1280px] mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="section-label mb-8">Portfolio</div>
          <h1 className="display-page text-5xl md:text-7xl lg:text-8xl mb-6">
            Real apps.
            <br />
            <span className="gradient-text">Real results.</span>
          </h1>
          <p className="soft text-xl max-w-2xl leading-relaxed">
            A showcase of websites, web applications, automation workflows,
            and digital systems — all built to perform for real businesses.
          </p>
        </ScrollReveal>
      </div>

      {/* ═══════════════ FEATURED PROJECTS ═══════════════ */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-28">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[11px] tracking-widest uppercase muted">
              Top Projects
            </span>
            <span className="flex h-px w-12 bg-[var(--line-strong)]" />
            <span className="font-mono text-[10px] tracking-widest text-[var(--violet-bright)] uppercase">
              Featured
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.92] mb-16">
            Flagship <span className="gradient-text">work.</span>
          </h2>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {FEATURED.map((project) => (
            <StaggerItem key={project.name}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card card card-interactive flex flex-col overflow-hidden group h-full"
              >
                <div
                  aria-hidden
                  className="h-[3px] w-full"
                  style={{ background: `linear-gradient(90deg, ${project.accent}, transparent 80%)` }}
                />
                <div className="browser-image">
                  <Image
                    src={project.image}
                    alt={`${project.name} website`}
                    fill
                    sizes="(min-width: 768px) 420px, 100vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div aria-hidden className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 group-hover:text-white group-hover:bg-[#8b7cff]/80 transition-all">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M6 2H14V10M14 2L6 10M6 14H3a1 1 0 01-1-1V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="font-mono text-[10px] muted tracking-widest uppercase mb-2">{project.category}</div>
                  <h3 className="font-display text-2xl font-semibold text-white mb-2">{project.name}</h3>
                  <p className="soft text-sm leading-relaxed mb-4 flex-1">{project.desc}</p>
                  <span className="font-mono text-[10px] muted tracking-widest uppercase group-hover:text-[var(--violet-bright)] transition-colors">Visit site →</span>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ═══════════════ CLIENT WEBSITES ═══════════════ */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-28">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[11px] tracking-widest uppercase muted">Client Sites</span>
            <span className="flex h-px w-12 bg-[var(--line-strong)]" />
            <span className="font-mono text-[10px] tracking-widest text-[var(--cyan)] uppercase">via NixGen</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.92] mb-6">
            Websites shipped for
            <br />
            <span className="gradient-text">real businesses.</span>
          </h2>
          <p className="soft text-lg max-w-2xl mb-16">
            A selection of websites built for service businesses, tourism operators,
            and local brands — all focused on performance, clarity, and conversion.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CLIENT_SITES.map((site) => (
            <StaggerItem key={site.name}>
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-interactive p-6 flex items-center justify-between gap-4 group"
              >
                <div>
                  <div className="font-mono text-[9px] muted tracking-widest uppercase mb-1">{site.category}</div>
                  <h3 className="font-display text-lg font-semibold text-white group-hover:text-[var(--violet-bright)] transition-colors">{site.name}</h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-[var(--bg-1)] border border-[var(--line-strong)] flex items-center justify-center text-[var(--ink-muted)] group-hover:text-[var(--violet-bright)] group-hover:border-[rgba(139,124,255,0.4)] transition-all flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M6 2H14V10M14 2L6 10M6 14H3a1 1 0 01-1-1V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ═══════════════ NIXGEN WEB APPS ═══════════════ */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-28">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[11px] tracking-widest uppercase muted">Web Applications</span>
            <span className="flex h-px w-12 bg-[var(--line-strong)]" />
            <span className="font-mono text-[10px] tracking-widest text-[var(--violet-bright)] uppercase">NixGen Collab</span>
          </div>
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

        <StaggerContainer className="grid md:grid-cols-2 gap-5">
          {NIXGEN_APPS.map((app) => (
            <StaggerItem key={app.name}>
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card card card-interactive h-full flex flex-col overflow-hidden group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-1)]">
                  <Image
                    src={app.image}
                    alt={`${app.name} screenshot`}
                    fill
                    sizes="(min-width: 768px) 640px, 100vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div aria-hidden className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                    <span className={`w-1.5 h-1.5 rounded-full ${app.status === "Live" ? "bg-[var(--cyan)] pulse-soft" : "bg-[var(--amber)]"}`} />
                    <span className="font-mono text-[10px] tracking-widest uppercase text-white">{app.status}</span>
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 group-hover:text-white group-hover:bg-[#8b7cff]/80 transition-all">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path d="M6 2H14V10M14 2L6 10M6 14H3a1 1 0 01-1-1V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-xl font-semibold text-white mb-2">{app.name}</h3>
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
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[11px] tracking-widest uppercase muted">Automation</span>
            <span className="flex h-px w-12 bg-[var(--line-strong)]" />
            <span className="font-mono text-[10px] tracking-widest text-[var(--cyan)] uppercase">n8n</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.92] mb-6">
            The quiet army
            <br />
            <span className="gradient-text">in the background.</span>
          </h2>
          <p className="soft text-lg max-w-2xl mb-16">
            Automation workflows that replace hours of manual work per week.
            Each one is a small piece of software that makes a business bigger than it is.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-2 gap-5">
          {WORKFLOWS.map((wf) => (
            <StaggerItem key={wf.number}>
              <div className="card card-interactive p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl border border-[rgba(139,124,255,0.35)] bg-[rgba(139,124,255,0.08)] flex flex-col items-center justify-center">
                    <span className="font-mono text-[8px] tracking-widest muted">n8n</span>
                    <span className="font-display font-bold text-[var(--violet-bright)] text-[13px] leading-none mt-0.5">{wf.number}</span>
                  </div>
                  <div>
                    <div className="tag mb-1">{wf.category}</div>
                    <h3 className="font-display text-lg font-semibold text-white">{wf.name}</h3>
                  </div>
                </div>
                <p className="soft text-sm leading-relaxed mb-4">{wf.desc}</p>
                <div className="flex items-center gap-2">
                  <span className="dot" />
                  <span className="text-[12px] text-white font-medium">Impact: {wf.impact}</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ═══════════════ OMEGA FUTURE CAPABILITIES ═══════════════ */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-28">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[11px] tracking-widest uppercase muted">Coming Soon</span>
            <span className="flex h-px w-12 bg-[var(--line-strong)]" />
            <span className="font-mono text-[10px] tracking-widest text-[var(--amber)] uppercase">Omega</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.92] mb-6">
            What we&apos;re building
            <br />
            <span className="gradient-text-gold">next.</span>
          </h2>
          <p className="soft text-lg max-w-2xl mb-16">
            Powered by NixGen&apos;s Antigravity Omega intelligence system — these are
            the capabilities we&apos;re actively developing and deploying for clients.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {OMEGA_CAPABILITIES.map((cap) => (
            <StaggerItem key={cap.title}>
              <div className="capability-card h-full flex flex-col">
                <div className="capability-badge mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--amber)]" />
                  {cap.tag}
                </div>
                <h3 className="font-display text-xl font-semibold text-white mb-3">{cap.title}</h3>
                <p className="soft text-sm leading-relaxed flex-1">{cap.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-28">
        <ScrollReveal>
          <div className="card relative overflow-hidden p-12 md:p-16 text-center">
            <div aria-hidden className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-[#8b7cff]/12 blur-3xl" />
            <div aria-hidden className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#5eead4]/10 blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
                Ready to <span className="gradient-text">start your project?</span>
              </h2>
              <p className="soft text-lg max-w-xl mx-auto mb-8">
                Let&apos;s create something that drives real results for your business.
              </p>
              <Link href="/contact" className="btn btn-primary">
                Contact Me <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
