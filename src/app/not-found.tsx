import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[80vh] flex-col items-start justify-center pt-24">
      <p className="eyebrow mb-4">404</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-6xl">This page is not here.</h1>
      <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft">
        The link may be old or mistyped. My work, skills and contact details are all on the homepage.
      </p>
      <Link href="/" className="btn btn-primary mt-8">Back to home</Link>
    </section>
  );
}
