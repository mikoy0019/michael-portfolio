"use client";

import Link from "next/link";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

const SERVICES = [
  {
    icon: "🌐",
    title: "Web Design",
    desc: "Beautiful, responsive websites that represent your brand and convert visitors into customers. Clean layouts, modern aesthetics, mobile-first approach.",
    colorClass: "service-icon-violet",
  },
  {
    icon: "💻",
    title: "Web Development",
    desc: "Custom-built websites using WordPress and Next.js. Fast loading, SEO-optimized, and built to scale with your business.",
    colorClass: "service-icon-violet",
  },
  {
    icon: "🎯",
    title: "Landing Page Design",
    desc: "High-converting landing pages with tested CTAs, persuasive copy, and clean conversion funnels. Built to capture leads and drive action.",
    colorClass: "service-icon-violet",
  },
  {
    icon: "📋",
    title: "Virtual Assistant",
    desc: "AI-augmented back-office ops for busy founders. Inbox management, calendar coordination, data entry, CRM, customer support, and social scheduling.",
    colorClass: "service-icon-cyan",
  },
  {
    icon: "🤖",
    title: "AI Integration",
    desc: "Integrate AI tools into your business workflows. Chatbots, content generation, data analysis, and intelligent automation systems.",
    colorClass: "service-icon-cyan",
  },
  {
    icon: "🔄",
    title: "Workflow Automation",
    desc: "Eliminate repetitive manual work with custom automation. Email sequences, data processing, CRM updates, and multi-platform integrations.",
    colorClass: "service-icon-cyan",
  },
  {
    icon: "🛠️",
    title: "System Development",
    desc: "Custom business systems — CRM pipelines, inventory management, dashboards, booking systems, and operational tools tailored to your needs.",
    colorClass: "service-icon-amber",
  },
  {
    icon: "📈",
    title: "On-Page SEO",
    desc: "Titles, meta descriptions, headings, alt text, internal links — every page optimized for search visibility and organic traffic growth.",
    colorClass: "service-icon-amber",
  },
  {
    icon: "📊",
    title: "Digital Marketing Support",
    desc: "Strategy-driven digital marketing combining SEO, content marketing, social media, and paid advertising to grow your online presence.",
    colorClass: "service-icon-amber",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Discovery",
    desc: "We start with understanding your business, goals, target audience, and what success looks like. This shapes every decision that follows.",
  },
  {
    step: "02",
    title: "Strategy",
    desc: "Based on discovery, I create a strategic plan — site architecture, content strategy, marketing approach, and technical requirements.",
  },
  {
    step: "03",
    title: "Design & Build",
    desc: "I design and develop the solution — websites, systems, automations — with regular check-ins so you see progress and can give feedback.",
  },
  {
    step: "04",
    title: "Launch & Optimize",
    desc: "Once live, I monitor performance, optimize for conversions, and ensure everything runs smoothly. Continuous improvement, not just delivery.",
  },
];

const HELP_WITH = [
  "Build professional and high-converting websites",
  "Run AI-augmented back-office operations",
  "Create automated workflows to save time",
  "Develop systems that improve business processes",
  "Optimize pages for search visibility and SEO",
  "Combine web development and VA support in one hire",
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      {/* ═══════════════ PAGE HEADER ═══════════════ */}
      <div className="page-header max-w-[1280px] mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="section-label mb-8">Services</div>
          <h1 className="display-page text-5xl md:text-7xl lg:text-8xl mb-6">
            What I can
            <br />
            <span className="gradient-text">build for you.</span>
          </h1>
          <p className="soft text-xl max-w-2xl leading-relaxed">
            From websites to AI-powered automation and virtual assistance.
            Every service is designed to help your business grow.
          </p>
        </ScrollReveal>
      </div>

      {/* ═══════════════ SERVICES GRID ═══════════════ */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-28">
        <StaggerContainer className="grid md:grid-cols-3 gap-5">
          {SERVICES.map((service) => (
            <StaggerItem key={service.title}>
              <div className="card card-interactive p-8 min-h-[280px] flex flex-col h-full">
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
      </section>

      {/* ═══════════════ PROCESS ═══════════════ */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-28">
        <ScrollReveal>
          <div className="section-label mb-8">Process</div>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.92] mb-16 max-w-3xl">
            How I <span className="gradient-text">work.</span>
          </h2>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-2 gap-6">
          {PROCESS.map((p) => (
            <StaggerItem key={p.step}>
              <div className="process-step h-full">
                <span className="process-step-number">{p.step}</span>
                <div className="tag mb-4">Step {p.step}</div>
                <h3 className="font-display text-2xl font-semibold text-white mb-3">
                  {p.title}
                </h3>
                <p className="soft leading-relaxed pr-16">{p.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ═══════════════ WHAT I CAN HELP WITH ═══════════════ */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-28">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <ScrollReveal className="md:col-span-5">
            <div className="section-label mb-8">Impact</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-[0.92]">
              What I can help
              <br />
              <span className="gradient-text">businesses with.</span>
            </h2>
          </ScrollReveal>

          <div className="md:col-span-7">
            <StaggerContainer className="space-y-4">
              {HELP_WITH.map((item, i) => (
                <StaggerItem key={i}>
                  <div className="flex items-start gap-4 p-5 rounded-2xl border border-[var(--line)] bg-[var(--bg-1)]/50 hover:border-[rgba(139,124,255,0.3)] transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-[rgba(139,124,255,0.12)] border border-[rgba(139,124,255,0.3)] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M3 8L7 12L13 4"
                          stroke="#8b7cff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-white text-[15px] leading-relaxed">{item}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ═══════════════ VALUE STATEMENT ═══════════════ */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-28">
        <ScrollReveal>
          <div className="card p-12 md:p-16 text-center relative overflow-hidden">
            <div
              aria-hidden
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#5eead4]/10 blur-3xl"
            />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 max-w-3xl mx-auto leading-tight">
                I don&apos;t just build websites.
                <br />
                <span className="gradient-text">
                  I create digital solutions.
                </span>
              </h2>
              <p className="soft text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                My approach combines strategy, design, automation, and operations
                to deliver results that matter. Every project is designed to help
                businesses attract attention, improve operations, and increase
                conversions.
              </p>
              <Link href="/contact" className="btn btn-primary">
                Start a Project <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
