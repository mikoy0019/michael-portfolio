import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/content/projects";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { ExternalLink, Tags } from "./Section";

const pad = (n: number) => String(n).padStart(2, "0");

export function FlagshipCard({ study, index, total }: { study: CaseStudy; index: number; total: number }) {
  const shot = study.shots[0];
  const reversed = index % 2 === 1;

  return (
    <article className="card overflow-hidden">
      <div className="grid md:grid-cols-[1.35fr_1fr]">
        <div className={`p-3 md:p-4 ${reversed ? "md:order-2" : ""}`}>
          {shot ? (
            <div className="shot aspect-[16/10]">
              <Image src={shot.src} alt={shot.alt} width={1600} height={1000} sizes="(min-width: 768px) 640px, 100vw" className="h-full w-full object-cover object-top" />
            </div>
          ) : (
            <div className="shot h-full lg:aspect-[16/10] lg:h-auto">
              <ArchitectureDiagram nodes={study.architecture.nodes} label={study.title} />
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center gap-3 p-6 md:p-8">
          <p className="eyebrow">PROJECT {pad(index + 1)} / {pad(total)}</p>
          <h3 className="font-display text-2xl font-semibold leading-tight text-ink md:text-[28px]">{study.title}</h3>
          <p className="text-[13px] text-ink-muted">{study.kind} · {study.status}</p>
          <p className="text-[15.5px] leading-relaxed text-ink-soft text-pretty">{study.tagline}</p>
          <Tags items={study.stack} max={5} />
          <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-[15px] font-semibold text-accent">
            <Link href={`/work/${study.slug}`} className="inline-flex min-h-[28px] items-center gap-2 no-underline">
              Read the case study <span aria-hidden>→</span>
            </Link>
            {study.links.live && <ExternalLink href={study.links.live}>{study.links.liveLabel ?? "Visit live site"}</ExternalLink>}
            {study.links.demo && <ExternalLink href={study.links.demo}>Try the demo</ExternalLink>}
            {study.links.code && <ExternalLink href={study.links.code}>Source code</ExternalLink>}
          </div>
          {study.links.demoNote && <p className="font-mono text-[12.5px] text-ink-muted">{study.links.demoNote}</p>}
        </div>
      </div>
    </article>
  );
}
