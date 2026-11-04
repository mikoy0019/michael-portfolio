import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Michael Tejada — Web Developer & Virtual Assistant",
  description:
    "Web Developer and Virtual Assistant building AI-augmented WordPress, Next.js, and operations workflows for founders, agencies, and small teams. Based in Butuan City, Philippines.",
  openGraph: {
    title: "Michael Tejada — Web Developer & Virtual Assistant",
    description:
      "AI-augmented web development and virtual assistance. WordPress, Next.js, on-page SEO, automation, and ops — delivered with speed and precision.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
