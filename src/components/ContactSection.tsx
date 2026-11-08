import { profile } from "@/content/profile";
import { ExternalLink } from "./Section";

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="wrap py-20 md:py-28">
      <div className="card grid gap-10 p-6 md:grid-cols-[1fr_1.1fr] md:gap-16 md:p-12">
        <div>
          <p className="eyebrow mb-4">Contact</p>
          <h2 id="contact-title" className="font-display text-3xl font-semibold leading-tight text-ink text-balance md:text-[40px]">
            Hiring for a remote role or a contract? Let&apos;s talk.
          </h2>
          <p className="mt-5 text-[16.5px] leading-relaxed text-ink-soft">
            I usually reply within a day. I&apos;m also available for freelance builds and automation projects.
          </p>
          <ul className="mt-8 space-y-3 text-[15.5px]">
            <li>
              <span className="mr-3 inline-block w-20 text-ink-muted">Email</span>
              <a className="link-underline text-ink" href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            {profile.github && (
              <li>
                <span className="mr-3 inline-block w-20 text-ink-muted">GitHub</span>
                <ExternalLink className="link-underline text-ink" href={profile.github}>{profile.github.replace("https://", "")}</ExternalLink>
              </li>
            )}
            {profile.linkedin && (
              <li>
                <span className="mr-3 inline-block w-20 text-ink-muted">LinkedIn</span>
                <ExternalLink className="link-underline text-ink" href={profile.linkedin}>LinkedIn profile</ExternalLink>
              </li>
            )}
            <li>
              <span className="mr-3 inline-block w-20 text-ink-muted">Based in</span>
              <span className="text-ink">{profile.location} (UTC+8)</span>
            </li>
          </ul>
        </div>

        <form action={`https://formsubmit.co/${profile.email}`} method="POST" className="grid gap-4">
          <input type="hidden" name="_subject" value="Portfolio enquiry" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value={`${profile.siteUrl}/thanks`} />
          <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
          <Field label="Your name" name="name" autoComplete="name" />
          <Field label="Email" name="email" type="email" autoComplete="email" />
          <Field label="Company / role (optional)" name="company" required={false} autoComplete="organization" />
          <label className="grid gap-1.5 text-[14px] font-medium text-ink">
            Message
            <textarea name="message" required rows={5} className="rounded-[15px] border border-line-strong bg-bg px-3.5 py-3 text-[16px] text-ink outline-none transition-colors focus:border-accent" />
          </label>
          <button type="submit" className="btn btn-primary mt-1 justify-self-start">Send message</button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required = true, autoComplete }: { label: string; name: string; type?: string; required?: boolean; autoComplete?: string }) {
  return (
    <label className="grid gap-1.5 text-[14px] font-medium text-ink">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="h-12 rounded-[15px] border border-line-strong bg-bg px-3.5 text-[16px] text-ink outline-none transition-colors focus:border-accent"
      />
    </label>
  );
}
