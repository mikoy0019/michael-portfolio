/**
 * A themed flow diagram used when a real screenshot can't be shown.
 * On desktop each arrow leads its node and the list sits one arrow-width past the
 * clipped left edge, so the arrow that starts a wrapped row is hidden, never left hanging.
 */
export function ArchitectureDiagram({ nodes, label, withheld = true }: { nodes: string[]; label: string; withheld?: boolean }) {
  return (
    <figure className="flex h-full flex-col justify-center gap-0 p-5" aria-label={`${label}: system diagram`}>
      <div className="overflow-hidden">
        <ol className="flex flex-col items-stretch gap-0 md:-ml-8 md:flex-row md:flex-wrap md:items-center md:gap-y-2.5">
          {nodes.map((n, i) => (
            <li key={n} className="flex min-w-0 flex-col items-center md:flex-row">
              <span
                data-arrow={i > 0 ? "" : undefined}
                aria-hidden
                className={`h-6 w-8 shrink-0 items-center justify-center text-accent md:rotate-[-90deg] ${i > 0 ? "flex" : "hidden md:invisible md:flex"}`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 5v14M6 13l6 6 6-6" />
                </svg>
              </span>
              <span data-node className="w-full rounded-[15px] border border-line-strong bg-surface px-3.5 py-2.5 text-center font-mono text-[12.5px] leading-snug text-ink md:w-auto">
                {n}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="mt-5 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
        {withheld ? "System overview · screenshots withheld for client confidentiality" : "System overview"}
      </figcaption>
    </figure>
  );
}
