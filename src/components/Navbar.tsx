"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-blur">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 text-decoration-none">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#a995ff] via-[#8b7cff] to-[#5eead4] flex items-center justify-center font-display font-bold text-[#08090d] text-lg">
            M
            <div className="absolute inset-0 rounded-xl border border-white/30" />
          </div>
          <div className="leading-tight">
            <div className="font-display font-semibold text-[15px] text-white">
              Michael Tejada
            </div>
            <div className="font-mono text-[9px] tracking-[0.2em] uppercase muted">
              Web Dev & Virtual Assistant
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors duration-200 ${
                pathname === link.href
                  ? "text-white"
                  : "text-[var(--ink-soft)] hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/contact"
          className="btn btn-primary hidden md:inline-flex !py-2.5 !px-5 !text-[13px]"
        >
          Let&apos;s talk
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-[5px] p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-[2px] bg-white transition-transform duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-opacity duration-200 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-transform duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--line)] bg-[rgba(8,9,13,0.95)] backdrop-blur-xl">
          <div className="px-6 py-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-lg font-display font-semibold transition-colors ${
                  pathname === link.href ? "text-white" : "text-[var(--ink-soft)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="btn btn-primary mt-2 justify-center"
            >
              Let&apos;s talk
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
