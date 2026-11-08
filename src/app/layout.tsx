import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { profile } from "@/content/profile";
import { skills } from "@/content/projects";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display-family",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans-family",
  subsets: ["latin"],
  display: "swap",
});

const title = `${profile.name} — Full-stack developer, AI & automation`;
const description =
  "Michael Tejada is a full-stack developer in the Philippines who builds web, mobile and desktop products on Next.js, Supabase and Cloudflare, and the AI automations that run them. Open to remote roles and contracts.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: title, template: `%s — ${profile.name}` },
  description,
  openGraph: { title, description, type: "website", url: "/", siteName: profile.name },
  twitter: { card: "summary_large_image", title, description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08080C" },
    { media: "(prefers-color-scheme: light)", color: "#F6F5F1" },
  ],
};

/* Runs before paint: sets the theme from storage or the OS. */
const themeScript = `(function(){var d=document.documentElement;var t;try{t=localStorage.getItem('theme')}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}d.setAttribute('data-theme',t)})();`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Web Designer & Developer, AI Automation Specialist",
  email: `mailto:${profile.email}`,
  url: profile.siteUrl,
  image: `${profile.siteUrl}${profile.portrait}`,
  knowsAbout: skills,
  address: { "@type": "PostalAddress", addressLocality: "Butuan City", addressCountry: "PH" },
  sameAs: [profile.github, profile.linkedin].filter(Boolean),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd data={personJsonLd} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] btn btn-primary">
          Skip to content
        </a>
        <SiteNav />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
