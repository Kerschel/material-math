import type { Metadata } from "next";
import { Crimson_Pro, Source_Sans_3, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const crimsonPro = Crimson_Pro({
  variable: "--font-display-cp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sourceSans3 = Source_Sans_3({
  variable: "--font-sans-ss3",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Material Math — Free Construction Material Calculators",
    template: "%s | Material Math",
  },
  description:
    "Free, trustworthy construction material calculators. Enter your measurements, know what to buy. No sign-up required.",
  metadataBase: new URL("https://materialmath.com"),
  openGraph: {
    type: "website",
    siteName: "Material Math",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/calculators", label: "Calculators" },
  { href: "/conversions", label: "Conversions" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
];

const footerCalculators = [
  { href: "/calculators/concrete", label: "Concrete" },
  { href: "/calculators/mulch", label: "Mulch" },
  { href: "/calculators/gravel", label: "Gravel" },
  { href: "/calculators/pavers", label: "Pavers" },
  { href: "/calculators/sand", label: "Sand" },
  { href: "/calculators/soil", label: "Soil" },
  { href: "/calculators/brick", label: "Brick" },
  { href: "/calculators/asphalt", label: "Asphalt" },
  { href: "/calculators/stone", label: "Stone" },
  { href: "/calculators/topsoil", label: "Topsoil" },
  { href: "/calculators/crushed-stone", label: "Crushed Stone" },
  { href: "/calculators/limestone", label: "Limestone" },
  { href: "/calculators/river-rock", label: "River Rock" },
  { href: "/calculators/pea-gravel", label: "Pea Gravel" },
  { href: "/calculators/fill-dirt", label: "Fill Dirt" },
];

const footerResources = [
  { href: "/conversions", label: "Unit Conversions" },
  { href: "/guides", label: "Project Guides" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const footerLegal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${crimsonPro.variable} ${sourceSans3.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--ink)] font-sans">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Material Math",
            description:
              "Free, trustworthy construction material calculators. Enter your measurements, know what to buy.",
            url: "https://materialmath.com",
          }}
        />
        {/* Skip link */}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>

        {/* Header */}
        <header className="sticky top-0 z-50 bg-[var(--bg)]/90 backdrop-blur-sm border-b border-[var(--border)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 font-display font-semibold text-xl text-[var(--ink)] no-underline"
            >
              {/* MM grid icon */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                aria-hidden="true"
                className="shrink-0"
              >
                <rect x="2" y="2" width="10" height="10" rx="2" fill="var(--accent)" fillOpacity="0.15" />
                <rect x="16" y="2" width="10" height="10" rx="2" fill="var(--accent)" fillOpacity="0.08" />
                <rect x="2" y="16" width="10" height="10" rx="2" fill="var(--accent)" fillOpacity="0.08" />
                <rect x="16" y="16" width="10" height="10" rx="2" fill="var(--accent)" fillOpacity="0.15" />
                <line x1="7" y1="2" x2="7" y2="26" stroke="var(--accent)" strokeWidth="0.8" opacity="0.3" />
                <line x1="21" y1="2" x2="21" y2="26" stroke="var(--accent)" strokeWidth="0.8" opacity="0.3" />
                <line x1="2" y1="7" x2="26" y2="7" stroke="var(--accent)" strokeWidth="0.8" opacity="0.3" />
                <line x1="2" y1="21" x2="26" y2="21" stroke="var(--accent)" strokeWidth="0.8" opacity="0.3" />
              </svg>
              Material Math
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 text-sm font-medium rounded-md text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--bg-muted)] transition-colors duration-150"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/calculators"
                className="ml-2 inline-flex items-center px-4 py-1.5 text-sm font-semibold rounded-md bg-[var(--accent)] text-[var(--accent-ink)] hover:opacity-90 transition-opacity duration-150"
              >
                Start Calculating
              </Link>
            </nav>

            {/* Mobile hamburger — simplified for now */}
            <button
              className="md:hidden p-2 rounded-md text-[var(--ink-muted)] hover:bg-[var(--bg-muted)]"
              aria-label="Open menu"
              aria-expanded="false"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </header>

        {/* Main */}
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-[var(--border)] bg-[var(--bg-raised)] mt-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {/* Brand */}
              <div>
                <Link href="/" className="font-display font-semibold text-lg text-[var(--ink)] no-underline">
                  Material Math
                </Link>
                <p className="mt-3 text-sm text-[var(--ink-muted)] leading-relaxed max-w-xs">
                  Free, trustworthy construction material calculators. Enter your measurements, know what to buy.
                </p>
              </div>

              {/* Calculators */}
              <div>
                <h4 className="font-display font-semibold text-sm text-[var(--ink)] mb-3 tracking-wide uppercase opacity-60">
                  Calculators
                </h4>
                <ul className="space-y-1.5">
                  {footerCalculators.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--ink-muted)] hover:text-[var(--accent)] transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="font-display font-semibold text-sm text-[var(--ink)] mb-3 tracking-wide uppercase opacity-60">
                  Resources
                </h4>
                <ul className="space-y-1.5">
                  {footerResources.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--ink-muted)] hover:text-[var(--accent)] transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="font-display font-semibold text-sm text-[var(--ink)] mb-3 tracking-wide uppercase opacity-60">
                  Legal
                </h4>
                <ul className="space-y-1.5">
                  {footerLegal.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--ink-muted)] hover:text-[var(--accent)] transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-[var(--border)] mt-12 pt-6 text-center text-xs text-[var(--ink-muted)]">
              &copy; {new Date().getFullYear()} Material Math. Estimates only &mdash; always verify before purchasing.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
