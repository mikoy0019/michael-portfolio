"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { profile } from "@/content/profile";

const LINKS = [
  { href: "/#skills", label: "Skills" },
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 nav-blur">
      <nav className="wrap flex h-[68px] items-center justify-between gap-4" aria-label="Main">
        <Link href="/" className="flex items-center gap-3 no-underline" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-[15px] bg-accent font-display text-[15px] font-bold text-accent-ink">MT</span>
          <span className="font-display text-[15px] font-semibold text-ink">{profile.name}</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-[15px] px-3 py-2 text-[14.5px] text-ink-soft no-underline hover:text-ink">
              {l.label}
            </Link>
          ))}
          <span className="mx-2 h-5 w-px bg-line" aria-hidden />
          <ThemeToggle />
          {profile.resumeUrl ? (
            <a href={profile.resumeUrl} className="btn btn-primary ml-2" target="_blank" rel="noopener">Resume</a>
          ) : (
            <Link href="/#contact" className="btn btn-primary ml-2">Hire me</Link>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            ref={menuButton}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[15px] border border-line text-ink"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-bg md:hidden">
          <div className="wrap flex flex-col py-3">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-[15px] px-2 py-3 text-base text-ink no-underline">
                {l.label}
              </Link>
            ))}
            {profile.resumeUrl && (
              <a href={profile.resumeUrl} className="btn btn-primary mt-2" target="_blank" rel="noopener">Resume</a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
