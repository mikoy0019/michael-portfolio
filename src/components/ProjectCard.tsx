import type { SecondaryProject } from "@/content/projects";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { ExternalLink, Tags } from "./Section";
import { ShotStack, hostOf } from "./ShotFrame";

export function ProjectCard({ project }: { project: SecondaryProject }) {
  return (
    <article className="card card-lift flex flex-col overflow-hidden">
      <div className="p-4">
        {project.shot ? (
          <ShotStack lead={project.shot} label={hostOf(project.links.live) ?? project.name} sizes="(min-width: 768px) 540px, 100vw" />
        ) : (
          <div className="shot shot-diagram sm:aspect-[16/10]" data-visual>
            <ArchitectureDiagram nodes={project.nodes ?? []} label={project.name} withheld={project.kind.startsWith("Client")} />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6 pt-2">
        <p className="eyebrow">{project.kind}</p>
        <h3 className="font-display text-xl font-semibold text-ink">{project.name}</h3>
        <p className="text-[15.5px] leading-relaxed text-ink-soft text-pretty">{project.blurb}</p>
        <Tags items={project.stack} />
        {(project.links.live || project.links.code) && (
          <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-3 text-[14.5px] font-semibold text-accent">
            {project.links.live && <ExternalLink href={project.links.live}>{project.links.liveLabel ?? "Live demo"}</ExternalLink>}
            {project.links.code && <ExternalLink href={project.links.code}>Source code</ExternalLink>}
          </div>
        )}
      </div>
    </article>
  );
}
