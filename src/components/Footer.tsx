import Link from "next/link";

export function Footer() {
  return (
    <footer className="max-w-[1280px] mx-auto px-6 md:px-12 py-12">
      <div className="hr-soft mb-8" />

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#a995ff] to-[#5eead4] flex items-center justify-center font-display font-bold text-[#08090d] text-base">
              M
            </div>
            <div className="font-display font-semibold text-[15px]">Michael Tejada</div>
          </div>
          <p className="soft text-sm leading-relaxed max-w-xs">
            Web Developer & Virtual Assistant helping founders and small teams
            build fast, SEO-ready sites and run AI-augmented back-office ops.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase muted mb-4">
            Navigation
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/services", label: "Services" },
              { href: "/portfolio", label: "Portfolio" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="soft hover:text-white transition-colors py-1"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact info */}
        <div>
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase muted mb-4">
            Get in touch
          </div>
          <div className="space-y-2 text-sm">
            <a
              href="mailto:mic.tejada02@gmail.com"
              className="soft hover:text-white transition-colors block"
            >
              mic.tejada02@gmail.com
            </a>
            <a
              href="tel:+639271881724"
              className="soft hover:text-white transition-colors block"
            >
              +63 927 188 1724
            </a>
            <div className="soft">Butuan City, Philippines</div>
          </div>
        </div>
      </div>

      <div className="hr-soft mb-6" />
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono muted tracking-widest uppercase">
        <div>&copy; {new Date().getFullYear()} Michael Tejada. All rights reserved</div>
        <div className="flex items-center gap-2">
          <span className="dot" />
          Built with Next.js &middot; Deployed on Vercel
        </div>
      </div>
    </footer>
  );
}
