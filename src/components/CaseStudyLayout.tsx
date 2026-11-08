import Link from "next/link";
import type { CaseStudy } from "@/content/projects";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { ExternalLink, Tags } from "./Section";
import { Frame, hostOf } from "./ShotFrame";

export function CaseStudyLayout({ study, next }: { study: CaseStudy; next: CaseStudy }) {
  const [hero, ...rest] = study.shots;

  return (
    <article className="pb-10">
      <header className="wrap pt-32 md:pt-40">
        <Link href="/#work" className="link-underline text-[14px] text-ink-muted">← All work</Link>
        <p className="eyebrow mt-8">{study.kind}</p>
        <h1 className="mt-3 max-w-3xl font-display text-[38px] font-semibold leading-[1.05] tracking-tight text-ink text-balance md:text-[58px]">
          {study.title}
        </h1>
        <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-ink-soft text-pretty">{study.tagline}</p>

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[15px] border border-line bg-line md:grid-cols-4">
          {[
            ["Role", study.role],
            ["Timeframe", study.timeframe],
            ["Status", study.status],
            ["Type", study.kind],
          ].map(([k, v]) => (
            <div key={k} className="bg-surface p-4 md:p-5">
              <dt className="eyebrow mb-1.5">{k}</dt>
              <dd className="m-0 text-[14.5px] leading-snug text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        {(study.links.live || study.links.demo || study.links.code) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {study.links.live && <ExternalLink href={study.links.live} className="btn btn-primary no-underline">{study.links.liveLabel ?? "Visit live site"}</ExternalLink>}
            {study.links.demo && <ExternalLink href={study.links.demo} className="btn btn-ghost no-underline">Try the demo</ExternalLink>}
            {study.links.code && <ExternalLink href={study.links.code} className="btn btn-ghost no-underline">View source on GitHub</ExternalLink>}
          </div>
        )}
        {study.links.demoNote && <p className="mt-3 font-mono text-[12.5px] text-ink-muted">{study.links.demoNote}</p>}
      </header>

      <div className="wrap mt-12">
        {hero ? (
          <div className="visual-hero">
            <Frame shot={hero} label={hostOf(study.links.live ?? study.links.demo) ?? study.title} priority sizes="(min-width: 1180px) 1116px, 100vw" />
          </div>
        ) : (
          <div className="shot shot-diagram"><ArchitectureDiagram nodes={study.architecture.nodes} label={study.title} /></div>
        )}
      </div>

      <div className="wrap mt-16 grid gap-14 md:mt-24 md:grid-cols-[220px_1fr] md:gap-x-16">
        <Block title="The problem">
          <p className="text-[17px] leading-relaxed text-ink-soft text-pretty">{study.problem}</p>
        </Block>

        <Block title="What I built">
          <List items={study.built} />
        </Block>

        <Block title="Architecture">
          {hero && <div className="mb-6"><div className="shot shot-diagram"><ArchitectureDiagram nodes={study.architecture.nodes} label={study.title} withheld={false} /></div></div>}
          <List items={study.architecture.bullets} />
        </Block>

        <Block title="Key decisions">
          <div className="grid gap-4">
            {study.decisions.map((d) => (
              <div key={d.title} className="card p-5 md:p-6">
                <h3 className="font-display text-lg font-semibold text-ink">{d.title}</h3>
                <p className="mt-2 text-[15.5px] leading-relaxed text-ink-soft">{d.body}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Outcomes">
          <List items={study.outcomes} />
        </Block>

        <Block title="Stack">
          <Tags items={study.stack} />
        </Block>
      </div>

      {rest.length > 0 && (
        <div className="wrap mt-20 grid gap-6 md:grid-cols-2" data-gallery>
          {rest.map((s) => (
            <Frame key={s.src} shot={s} fill className="aspect-[16/10]" sizes="(min-width: 768px) 560px, 100vw" />
          ))}
        </div>
      )}

      <nav className="wrap mt-24" aria-label="Next case study">
        <Link href={`/work/${next.slug}`} className="card group flex flex-col gap-2 p-6 no-underline md:flex-row md:items-center md:justify-between md:p-8">
          <span>
            <span className="eyebrow">Next case study</span>
            <span className="mt-2 block font-display text-2xl font-semibold text-ink">{next.title}</span>
          </span>
          <span aria-hidden className="text-2xl text-accent transition-transform group-hover:translate-x-1 motion-reduce:transition-none">→</span>
        </Link>
      </nav>
    </article>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <h2 className="eyebrow pt-1 md:sticky md:top-28 md:self-start">{title}</h2>
      <div className="-mt-10 md:mt-0">{children}</div>
    </>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-[16px] leading-relaxed text-ink-soft">
          <span aria-hidden className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-[15px] bg-accent" />
          <span className="text-pretty">{t}</span>
        </li>
      ))}
    </ul>
  );
}
