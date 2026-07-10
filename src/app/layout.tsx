import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Material Math — Free Material Calculators for Home Projects",
    template: "%s | Material Math",
  },
  description:
    "Instant material calculators for mulch, soil, gravel, concrete, pavers, and more. Enter dimensions, get exactly how much material you need plus cost estimates.",
  metadataBase: new URL("https://materialmath.com"),
  openGraph: {
    type: "website",
    siteName: "Material Math",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        {/* Navigation */}
        <header className="bg-white border-b border-green-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-green-700">
              <span className="text-2xl">📐</span>
              Material Math
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/" className="text-gray-600 hover:text-green-700 transition-colors">
                Home
              </Link>
              <Link
                href="/calculators/mulch"
                className="text-gray-600 hover:text-green-700 transition-colors"
              >
                Calculators
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 mt-16">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-green-400 text-lg mb-3">Material Math</h3>
                <p className="text-sm text-gray-400">
                  Free, accurate material calculators for home improvement and landscaping
                  projects. No sign-up required.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">Landscaping</h4>
                <ul className="space-y-1.5 text-sm">
                  <li><Link href="/calculators/mulch" className="text-gray-400 hover:text-green-400">Mulch Calculator</Link></li>
                  <li><Link href="/calculators/soil" className="text-gray-400 hover:text-green-400">Soil Calculator</Link></li>
                  <li><Link href="/calculators/gravel" className="text-gray-400 hover:text-green-400">Gravel Calculator</Link></li>
                  <li><Link href="/calculators/sand" className="text-gray-400 hover:text-green-400">Sand Calculator</Link></li>
                  <li><Link href="/calculators/topsoil" className="text-gray-400 hover:text-green-400">Topsoil Calculator</Link></li>
                  <li><Link href="/calculators/stone" className="text-gray-400 hover:text-green-400">Stone Calculator</Link></li>
                  <li><Link href="/calculators/river-rock" className="text-gray-400 hover:text-green-400">River Rock Calculator</Link></li>
                  <li><Link href="/calculators/pea-gravel" className="text-gray-400 hover:text-green-400">Pea Gravel Calculator</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">Hardscaping &amp; Construction</h4>
                <ul className="space-y-1.5 text-sm">
                  <li><Link href="/calculators/concrete" className="text-gray-400 hover:text-green-400">Concrete Calculator</Link></li>
                  <li><Link href="/calculators/pavers" className="text-gray-400 hover:text-green-400">Paver Calculator</Link></li>
                  <li><Link href="/calculators/crushed-stone" className="text-gray-400 hover:text-green-400">Crushed Stone Calculator</Link></li>
                  <li><Link href="/calculators/limestone" className="text-gray-400 hover:text-green-400">Limestone Calculator</Link></li>
                  <li><Link href="/calculators/asphalt" className="text-gray-400 hover:text-green-400">Asphalt Calculator</Link></li>
                  <li><Link href="/calculators/brick" className="text-gray-400 hover:text-green-400">Brick Calculator</Link></li>
                  <li><Link href="/calculators/fill-dirt" className="text-gray-400 hover:text-green-400">Fill Dirt Calculator</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">Resources</h4>
                <ul className="space-y-1.5 text-sm">
                  <li><Link href="/calculators/mulch" className="text-gray-400 hover:text-green-400">How to Mulch</Link></li>
                  <li><Link href="/calculators/concrete" className="text-gray-400 hover:text-green-400">Concrete Guide</Link></li>
                  <li><Link href="/calculators/pavers" className="text-gray-400 hover:text-green-400">Paver Installation</Link></li>
                  <li><Link href="/calculators/gravel" className="text-gray-400 hover:text-green-400">Gravel Driveway Tips</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Material Math. All calculators provide estimates based on
              national average data. Actual material needs may vary.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
