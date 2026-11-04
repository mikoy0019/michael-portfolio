"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const EXPERIENCE = [
  {
    role: "Web Developer",
    company: "Freelance",
    period: "2023 — 2025",
    tag: "Web",
    desc: "Designed, developed, and maintained WordPress-based websites for various clients. Collaborated with marketing teams to implement SEO strategies, optimize site performance, and enhance user engagement. Ensured cross-platform compatibility and adherence to modern web standards.",
  },
  {
    role: "Senior Sales Associate",
    company: "D-Best Value Product Distribution Corp.",
    period: "2022 — 2023",
    tag: "Sales",
    desc: "Led sales initiatives, developed client relationships, and executed promotional campaigns. Consistently exceeded monthly sales goals through effective negotiation and customer service. Provided technical assistance for product demonstrations and client inquiries.",
  },
  {
    role: "Technical Staff — Consumer Protection",
    company: "Department of Trade and Industries",
    period: "2020 — 2021",
    tag: "Tech",
    desc: "Provided technical support in document management, system maintenance, and data processing. Assisted in preparing digital materials and reports to enhance internal operations. Contributed to IT troubleshooting and process improvement efforts within the division.",
  },
];

const STATS = [
  { value: 5, suffix: "+", label: "Years\nExperience" },
  { value: 20, suffix: "+", label: "Sites\nShipped" },
  { value: 5, suffix: "+", label: "Services\nOffered" },
  { value: 25, suffix: "", label: "Years\nOld" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* ═══════════════ PAGE HEADER ═══════════════ */}
      <div className="page-header max-w-[1280px] mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="section-label mb-8">About</div>
          <h1 className="display-page text-5xl md:text-7xl lg:text-8xl mb-6">
            The story behind
            <br />
            <span className="gradient-text">the work.</span>
          </h1>
          <p className="soft text-xl max-w-2xl leading-relaxed">
            A web developer and virtual assistant who combines technical
            execution with real marketing insight.
          </p>
        </ScrollReveal>
      </div>

      {/* ═══════════════ BIO + PHOTO ═══════════════ */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-28">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          {/* Photo */}
          <ScrollReveal className="md:col-span-5">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-8 rounded-[32px] bg-gradient-to-br from-[#8b7cff]/20 via-transparent to-[#5eead4]/15 blur-2xl"
              />
              <div className="relative rounded-[24px] overflow-hidden border border-white/10 aspect-[3/4]">
                <Image
                  src="/michael.jpg"
                  alt="Michael Tejada"
                  fill
                  sizes="(min-width: 768px) 480px, 100vw"
                  className="object-cover"
                  priority
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[#08090d]/70 via-transparent to-transparent"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Bio text */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <ScrollReveal>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 leading-tight">
                I am Michael Tejada, a web developer and virtual assistant
                based in{" "}
                <span className="gradient-text-violet">Butuan City, Philippines.</span>
              </h2>
            </ScrollReveal>

            <div className="space-y-5 soft text-lg leading-[1.8]">
              <ScrollReveal delay={0.1}>
                <p>
                  I&apos;m a dedicated, results-driven Web Developer with a strong
                  background in WordPress and modern web development. My
                  professional experience spans{" "}
                  <span className="text-white">marketing, sales, and technical
                  roles</span> — giving me a rare mix of creativity, business
                  strategy, and technical execution.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
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
              <ScrollReveal delay={0.2}>
                <p>
                  Today I work as both a Web Developer and a Virtual Assistant,
                  leveraging AI tooling to deliver at the speed of a small team.
                  One operator. Two roles. Zero excuses.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-16">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="card p-8 text-center">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  duration={2}
                  className="font-display text-5xl md:text-6xl font-bold text-white block mb-3"
                />
                <div className="font-mono text-[10px] muted tracking-widest uppercase whitespace-pre-line">
                  {stat.label}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ═══════════════ EXPERIENCE TIMELINE ═══════════════ */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-28">
        <ScrollReveal>
          <div className="section-label mb-8">Experience</div>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.92] mb-16">
            A track record of
            <br />
            <span className="gradient-text">showing up.</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-8">
          {EXPERIENCE.map((job, i) => (
            <ScrollReveal key={job.role + job.company} delay={i * 0.08}>
              <article className="timeline-item card card-interactive p-8 md:p-10">
                <span className="timeline-node" />
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="tag">{job.tag}</span>
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-semibold text-white">
                      {job.role}
                    </h3>
                    <div className="soft italic mt-1">{job.company}</div>
                  </div>
                  <div className="font-mono text-sm muted tracking-wider whitespace-nowrap">
                    {job.period}
                  </div>
                </div>
                <p className="soft leading-relaxed max-w-4xl">{job.desc}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══════════════ EDUCATION ═══════════════ */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-28">
        <ScrollReveal>
          <div className="section-label mb-8">Education</div>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-[0.92] mb-14">
            Foundations in
            <br />
            <span className="gradient-text">business & tech.</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          <ScrollReveal delay={0.1}>
            <div className="card card-interactive p-10">
              <div className="flex items-center justify-between mb-6">
                <span className="tag">Degree</span>
                <span className="font-mono text-xs muted tracking-widest">2018 — 2022</span>
              </div>
              <h3 className="font-display text-2xl font-semibold text-white mb-2">
                Bachelor of Marketing Management
              </h3>
              <div className="soft italic mb-5">Father Saturnino Urios University</div>
              <p className="soft leading-relaxed">
                Built a solid foundation in business strategy, digital marketing,
                and consumer behavior. Hands-on experience running marketing
                campaigns and analyzing market trends to support business growth.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="card card-interactive p-10">
              <div className="flex items-center justify-between mb-6">
                <span className="tag">Technical</span>
                <span className="font-mono text-xs muted tracking-widest">2016 — 2018</span>
              </div>
              <h3 className="font-display text-2xl font-semibold text-white mb-2">
                Computer System Servicing
              </h3>
              <div className="soft italic mb-5">AMA Computer Learning Center</div>
              <p className="soft leading-relaxed">
                Practical skills in hardware maintenance, software installation,
                and networking. The technical backbone behind my web development
                and IT troubleshooting work.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════ RESUME CTA ═══════════════ */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-28">
        <ScrollReveal>
          <div className="card relative overflow-hidden p-12 md:p-16 text-center">
            <div
              aria-hidden
              className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-[#8b7cff]/12 blur-3xl"
            />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
                Want the <span className="gradient-text">full picture?</span>
              </h2>
              <p className="soft text-lg max-w-xl mx-auto mb-8">
                Get in touch to learn more about my experience, skills,
                and how I can help your business grow.
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
