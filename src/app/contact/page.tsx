"use client";

import { ScrollReveal } from "@/components/ScrollReveal";

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* ═══════════════ PAGE HEADER ═══════════════ */}
      <div className="page-header max-w-[1280px] mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="section-label mb-8">Contact</div>
          <h1 className="display-page text-5xl md:text-7xl lg:text-8xl mb-6">
            Let&apos;s build
            <br />
            <span className="gradient-text">something real.</span>
          </h1>
          <p className="soft text-xl max-w-2xl leading-relaxed">
            Whether you need a website, VA support, automation, or digital
            marketing — I create solutions that move your business forward.
          </p>
        </ScrollReveal>
      </div>

      {/* ═══════════════ CONTACT SECTION ═══════════════ */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-28">
        <div className="card relative overflow-hidden p-8 md:p-16">
          <div
            aria-hidden
            className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-[#8b7cff]/15 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full bg-[#5eead4]/12 blur-3xl"
          />

          <div className="relative grid md:grid-cols-12 gap-10 md:gap-16">
            {/* Left: contact details */}
            <div className="md:col-span-5">
              <ScrollReveal>
                <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-6">
                  Tell me what <br />
                  <span className="gradient-text">you need.</span>
                </h2>
                <p className="text-base soft leading-relaxed mb-10 max-w-md">
                  New site, an existing one rescued, VA support, or an
                  automation to kill repetitive work — fill out the form and
                  I&apos;ll get back to you within a day.
                </p>

                <div className="space-y-5 mb-8">
                  <div>
                    <div className="font-mono text-[10px] uppercase muted tracking-widest mb-1.5">
                      Email
                    </div>
                    <a
                      href="mailto:mic.tejada02@gmail.com"
                      className="text-white hover:text-[var(--violet-bright)] transition text-[15px]"
                    >
                      mic.tejada02@gmail.com
                    </a>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase muted tracking-widest mb-1.5">
                      Phone
                    </div>
                    <a
                      href="tel:+639271881724"
                      className="text-white hover:text-[var(--violet-bright)] transition text-[15px]"
                    >
                      +63 927 188 1724
                    </a>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase muted tracking-widest mb-1.5">
                      Location
                    </div>
                    <div className="text-white text-[15px]">
                      Butuan City, PH 8600 · GMT+8
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-[11px] muted tracking-widest uppercase">
                  <span className="dot pulse-soft" />
                  Replying within 1 business day
                </div>
              </ScrollReveal>
            </div>

            {/* Right: form */}
            <ScrollReveal delay={0.2} className="md:col-span-7">
              <form
                action="https://formsubmit.co/mic.tejada02@gmail.com"
                method="POST"
                className="flex flex-col gap-5"
              >
                {/* FormSubmit config */}
                <input type="hidden" name="_subject" value="New lead from Michael Tejada Portfolio" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="true" />
                <input
                  type="hidden"
                  name="_next"
                  value="https://michael-portfolio-mu-eight.vercel.app/?sent=1"
                />
                <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-field">
                    <label htmlFor="name">Full name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Jane Dela Cruz"
                      autoComplete="name"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="jane@company.com"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-field">
                    <label htmlFor="company">Company / Project</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Artisan Tea Co."
                      autoComplete="organization"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="service">I need help with</label>
                    <select id="service" name="service" required defaultValue="">
                      <option value="" disabled>Pick a service...</option>
                      <option value="Web Development">Web Development</option>
                      <option value="WordPress site">WordPress site</option>
                      <option value="Next.js landing page">Next.js landing page</option>
                      <option value="Virtual Assistant">Virtual Assistant</option>
                      <option value="n8n Automation">n8n Automation</option>
                      <option value="On-Page SEO">On-Page SEO</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-field">
                    <label htmlFor="budget">Budget range</label>
                    <select id="budget" name="budget" defaultValue="">
                      <option value="" disabled>Pick a range...</option>
                      <option value="Under $500">Under $500</option>
                      <option value="$500 – $1,500">$500 – $1,500</option>
                      <option value="$1,500 – $5,000">$1,500 – $5,000</option>
                      <option value="$5,000+">$5,000+</option>
                      <option value="Monthly retainer">Monthly retainer</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label htmlFor="timeline">Timeline</label>
                    <select id="timeline" name="timeline" defaultValue="">
                      <option value="" disabled>Pick a timeline...</option>
                      <option value="ASAP">ASAP</option>
                      <option value="This month">This month</option>
                      <option value="Next 1–3 months">Next 1–3 months</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="message">Tell me about your project</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="What are you building? What's broken? What would success look like?"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <p className="font-mono text-[10px] muted tracking-widest uppercase">
                    Sent straight to my inbox · Never shared
                  </p>
                  <button type="submit" className="btn btn-primary">
                    Send message <span aria-hidden>→</span>
                  </button>
                </div>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
