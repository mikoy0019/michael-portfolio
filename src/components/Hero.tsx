import Image from "next/image";
import Link from "next/link";
import { profile } from "@/content/profile";
import { clientSites, flagships, pipelines } from "@/content/projects";
import { ExternalLink } from "./Section";

const STATS = [
  { value: flagships.length, label: "flagship systems" },
  { value: clientSites.length, label: "business websites" },
  { value: pipelines.length, label: "automation pipelines" },
  { value: 3, label: "platforms: web, mobile, desktop" },
];

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div aria-hidden className="hero-glow">
        <span />
        <span />
      </div>

      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <p className="inline-flex items-center gap-2 rounded-[15px] border border-line bg-surface px-3 py-1.5 text-[13px] text-ink-soft">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-[15px] bg-ok opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-[15px] bg-ok" />
              </span>
              {profile.availability}
            </p>
            <p className="eyebrow">{profile.heroLabel}</p>
          </div>

          <h1 id="hero-title" className="hero-title font-display font-semibold tracking-tight text-ink text-balance">
            {profile.heroHeadline}
          </h1>

          <p className="mt-6 max-w-[620px] text-[18px] leading-relaxed text-ink-soft text-pretty">
            Hi, I&apos;m Michael, a web designer, developer and AI automation specialist from the Philippines. I build
            web, mobile and desktop products, and the automations that keep them running.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/#work" className="btn btn-primary">Explore My Work</Link>
            <Link href="/#contact" className="btn btn-ghost">Let&apos;s Connect</Link>
            {profile.resumeUrl && (
              <a href={profile.resumeUrl} className="btn btn-ghost" target="_blank" rel="noopener">View resume</a>
            )}
            {profile.github && (
              <ExternalLink href={profile.github} className="btn btn-ghost no-underline">GitHub</ExternalLink>
            )}
            {profile.linkedin && (
              <ExternalLink href={profile.linkedin} className="btn btn-ghost no-underline">LinkedIn</ExternalLink>
            )}
          </div>

          <dl className="hero-stats">
            {STATS.map((s) => (
              <div key={s.label} data-stat>
                <dt className="text-[12.5px] leading-snug text-ink-muted">{s.label}</dt>
                <dd className="m-0 font-display text-2xl font-semibold text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div data-portrait className="portrait">
          <Image src={profile.portrait} alt={`Portrait of ${profile.name}`} width={736} height={737} priority sizes="(min-width: 768px) 520px, 124vw" className="portrait-photo" />
          <p className="portrait-card">
            <span className="block font-display text-[16px] font-semibold text-ink">{profile.name}</span>
            <span className="block text-[13px] text-ink-soft">{profile.location} · UTC+8</span>
          </p>
        </div>
      </div>
    </section>
  );
}
