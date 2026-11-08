import Image from "next/image";
import { clientSites, experience, miniBuilds, pipelines, education } from "@/content/projects";
import { ExternalLink } from "./Section";

export function SystemMap() {
  return (
    <ol className="card divide-y divide-line overflow-hidden">
      {pipelines.map((p, i) => (
        <li key={p.name} className="grid gap-4 p-5 md:p-7 lg:grid-cols-[250px_1fr] lg:gap-8">
          <div>
            <span className="font-mono text-[11px] text-ink-muted">{String(i + 1).padStart(2, "0")} · {p.trigger}</span>
            <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-ink">{p.name}</h3>
          </div>
          <div className="min-w-0">
            <div className="relative">
              <span aria-hidden className="absolute inset-x-0 top-1/2 hidden h-px bg-line-strong md:block" />
              <ol className="relative flex flex-wrap gap-2 font-mono text-[12px] text-ink md:flex-nowrap md:justify-between" aria-label="Steps">
                {p.steps.map((s) => (
                  <li key={s} className="rounded-[15px] border border-line-strong bg-surface-2 px-2.5 py-1.5 whitespace-nowrap">{s}</li>
                ))}
              </ol>
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{p.outcome}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function MiniBuildGrid() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {miniBuilds.map((b) => {
        const href = b.url ?? b.code;
        const body = (
          <>
            <div className="m-2.5 shot aspect-[16/10]">
              <Image src={b.image} alt={`${b.name} screenshot`} width={800} height={500} sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover object-top" />
            </div>
            <div className="px-5 pb-5 pt-2">
              <h3 className="flex items-center gap-1.5 font-display text-[17px] font-semibold text-ink">
                {b.name}
                {href && <span aria-hidden className="text-ink-muted">↗</span>}
                {href && <span className="sr-only">(opens in a new tab)</span>}
              </h3>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-soft">{b.desc}</p>
              <p className="mt-3 font-mono text-[11.5px] text-ink-muted">
                {b.stack.join(" · ")}
                {!b.url && <span> · Demo offline{b.code ? ", source on GitHub" : ""}</span>}
              </p>
            </div>
          </>
        );
        return (
          <li key={b.name} className="card overflow-hidden">
            {href ? (
              <a href={href} target="_blank" rel="noopener" className="group block no-underline">{body}</a>
            ) : (
              <div className="group">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function ClientSitesList() {
  return (
    <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
      {clientSites.map((s) => (
        <li key={s.name} className="flex min-h-[52px] items-center justify-between gap-4 border-b border-line">
          {s.url ? (
            <ExternalLink href={s.url} className="link-underline text-[15px] text-ink">{s.name}</ExternalLink>
          ) : (
            <span className="text-[15px] text-ink">{s.name}</span>
          )}
          <span className="shrink-0 text-[13px] text-ink-muted">{s.category}</span>
        </li>
      ))}
    </ul>
  );
}

export function ExperienceTimeline() {
  return (
    <ol className="grid gap-4 md:grid-cols-2">
      {experience.map((e) => (
        <li key={e.role + e.company} data-role className="card flex flex-col gap-2 p-6 md:p-7">
          <p className="font-mono text-[12.5px] text-ink-muted">{e.period}</p>
          <h3 className="font-display text-xl font-semibold leading-snug text-ink">{e.role}</h3>
          <p className="text-[15px] font-medium text-accent">{e.company}</p>
          <p className="mt-1 text-[15.5px] leading-relaxed text-ink-soft text-pretty">{e.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function EducationList() {
  return (
    <ol className="grid gap-4 md:grid-cols-2">
      {education.map((e) => (
        <li key={e.school} data-education className="card flex flex-col gap-2 p-6 md:p-7">
          <p className="font-mono text-[12.5px] text-ink-muted">{e.period}</p>
          <h3 className="font-display text-xl font-semibold leading-snug text-ink">{e.school}</h3>
          <p className="text-[15px] font-medium text-accent">{e.course}</p>
        </li>
      ))}
    </ol>
  );
}
