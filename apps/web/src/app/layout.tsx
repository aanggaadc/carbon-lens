import type { Metadata } from "next";
import Link from "next/link";
import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carbon Lens — Embodied Carbon Register",
  description:
    "Browse and compare Environmental Product Declarations for concrete products by embodied carbon (GWPt), with full provenance for every value.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col paper-texture">
        <header className="border-b border-rule bg-surface/70 backdrop-blur-sm sticky top-0 z-20">
          <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between gap-6">
            <Link href="/" className="flex items-baseline gap-2 group">
              <span className="font-display text-xl tracking-tight text-ink">
                Carbon Lens
              </span>
              <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                EPD register
              </span>
            </Link>
            <nav className="flex items-center gap-5 font-mono text-[12px] uppercase tracking-[0.1em] text-ink-muted">
              <Link href="/" className="hover:text-teal transition-colors">
                Register
              </Link>
              <Link href="/compare" className="hover:text-teal transition-colors">
                Compare
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-rule">
          <div className="mx-auto max-w-6xl px-6 py-6 font-mono text-[11px] text-ink-muted flex flex-col sm:flex-row gap-2 sm:gap-6 justify-between">
            <span>Data sourced entirely from /data — no live extraction calls.</span>
            <span>GWPt figures per EN 15804+A2, EF 3.1</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
