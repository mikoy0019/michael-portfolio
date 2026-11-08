import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { FlagshipCard } from "@/components/FlagshipCard";
import { ProjectCard } from "@/components/ProjectCard";
import { ClientSitesList, EducationList, ExperienceTimeline, MiniBuildGrid, SystemMap } from "@/components/HomeLists";
import { ContactSection } from "@/components/ContactSection";
import { flagships, secondary } from "@/content/projects";
import { WhatICanDo } from "@/components/WhatICanDo";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section
        id="skills"
        eyebrow="What I can do"
        title="Roles I can fill, and the tools I bring."
        intro="Hiring for one of these? Each one comes with real work you can check further down the page."
      >
        <WhatICanDo />
      </Section>

      <Section
        id="work"
        eyebrow="Selected work"
        title="Products I've designed, built and shipped."
        intro="Four systems I built end to end, from the database schema to the deploy pipeline. Screens show demo data; one client build stays anonymised."
      >
        <div className="grid gap-6">
          {flagships.map((s, i) => (
            <FlagshipCard key={s.slug} study={s} index={i} total={flagships.length} />
          ))}
        </div>
      </Section>

      <Section id="more" eyebrow="More projects" title="Smaller systems, the same standards.">
        <div className="grid gap-6 md:grid-cols-2">
          {secondary.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </Section>

      <Section
        id="automation"
        eyebrow="AI & automation"
        title="Workflows that take the busywork off a team."
        intro="Production n8n and Zapier pipelines I've built for operations, sales and content teams. Each one replaces a manual routine with a trigger, a few dependable steps and a human checkpoint where it matters."
      >
        <SystemMap />
      </Section>

      <Section id="builds" eyebrow="Smaller builds" title="Demos and experiments.">
        <MiniBuildGrid />
      </Section>

      <Section
        id="sites"
        eyebrow="Client websites"
        title="14 business websites."
        intro="WordPress and custom builds for US service businesses, with on-page SEO, performance work and lead capture."
      >
        <ClientSitesList />
      </Section>

      <Section id="experience" eyebrow="Experience" title="Where I've worked.">
        <ExperienceTimeline />
      </Section>

      <Section id="education" eyebrow="Education" title="Where I studied.">
        <EducationList />
      </Section>

      <ContactSection />
    </>
  );
}
