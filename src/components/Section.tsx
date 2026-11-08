import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="wrap py-14 md:py-20">
      <header className="mb-8 max-w-2xl md:mb-10">
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h2 id={`${id}-title`} className="font-display text-3xl font-semibold leading-[1.08] tracking-tight text-ink text-balance md:text-[44px]">
          {title}
        </h2>
        {intro && <p className="mt-5 text-[17px] leading-relaxed text-ink-soft text-pretty">{intro}</p>}
      </header>
      {children}
    </section>
  );
}

export function Tags({ items, max }: { items: string[]; max?: number }) {
  const shown = max ? items.slice(0, max) : items;
  const rest = max ? items.length - shown.length : 0;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
      {shown.map((t) => (
        <li key={t} className="tag">{t}</li>
      ))}
      {rest > 0 && <li className="tag">+{rest}</li>}
    </ul>
  );
}

export function ExternalLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener" className={`inline-flex min-h-[28px] items-center gap-1.5 ${className}`}>
      {children}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
        <path d="M7 17 17 7M8 7h9v9" />
      </svg>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
