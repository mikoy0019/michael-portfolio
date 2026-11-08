import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Message sent", robots: { index: false } };

export default function ThanksPage() {
  return (
    <section className="wrap flex min-h-[80vh] flex-col items-start justify-center pt-24">
      <p className="eyebrow mb-4">Thank you</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-6xl">Message sent.</h1>
      <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft">
        I&apos;ll reply as soon as I can, usually within a day.
      </p>
      <Link href="/" className="btn btn-primary mt-8">Back to home</Link>
    </section>
  );
}
