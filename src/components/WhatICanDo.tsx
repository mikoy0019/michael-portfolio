import { jobs, skills, stackGroups } from "@/content/projects";

export function WhatICanDo() {
  return (
    <div className="grid gap-6">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <li key={job.title} data-job className="card flex flex-col gap-2.5 p-6">
            <h3 className="font-display text-lg font-semibold leading-snug text-ink">{job.title}</h3>
            <p className="text-[15px] leading-relaxed text-ink-soft text-pretty">{job.desc}</p>
            <p className="mt-auto pt-2 font-mono text-[11.5px] leading-relaxed text-ink-muted">Proof: {job.proof}</p>
          </li>
        ))}
      </ul>

      <div className="grid gap-4 lg:grid-cols-[0.72fr_1.5fr]">
        <div className="card p-6">
          <h3 className="eyebrow mb-4">Skills</h3>
          <ul className="flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <li key={s} data-skill className="tag">{s}</li>
            ))}
          </ul>
        </div>

        <div className="card p-6">
          <h3 className="eyebrow mb-4">Tools</h3>
          <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {stackGroups.map((g) => (
              <div key={g.label}>
                <dt className="mb-1 text-[13px] font-medium text-ink">{g.label}</dt>
                <dd className="m-0 text-[14px] leading-relaxed text-ink-soft">{g.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
