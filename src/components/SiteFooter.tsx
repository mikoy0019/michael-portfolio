import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-col gap-4 py-10 text-sm text-ink-muted md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {profile.name} · {profile.location}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li><a className="link-underline" href={`mailto:${profile.email}`}>Email</a></li>
          {profile.github && <li><a className="link-underline" href={profile.github} target="_blank" rel="noopener">GitHub</a></li>}
          {profile.linkedin && <li><a className="link-underline" href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>}
          {profile.resumeUrl && <li><a className="link-underline" href={profile.resumeUrl} target="_blank" rel="noopener">Resume</a></li>}
        </ul>
      </div>
    </footer>
  );
}
