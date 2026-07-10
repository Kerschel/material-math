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
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
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
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-green-700 text-lg mb-3">Material Math</h3>
                <p className="text-sm text-gray-600">
                  Free, accurate material calculators for your next home improvement or landscaping
                  project. No sign-up required.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Calculators</h4>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  <li><Link href="/calculators/mulch" className="hover:text-green-700">Mulch Calculator</Link></li>
                  <li><Link href="/calculators/soil" className="hover:text-green-700">Soil Calculator</Link></li>
                  <li><Link href="/calculators/gravel" className="hover:text-green-700">Gravel Calculator</Link></li>
                  <li><Link href="/calculators/concrete" className="hover:text-green-700">Concrete Calculator</Link></li>
                  <li><Link href="/calculators/pavers" className="hover:text-green-700">Paver Calculator</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">More Tools</h4>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  <li><Link href="/calculators/sand" className="hover:text-green-700">Sand Calculator</Link></li>
                  <li><Link href="/calculators/sod" className="hover:text-green-700">Sod Calculator</Link></li>
                  <li><Link href="/calculators/decking" className="hover:text-green-700">Decking Calculator</Link></li>
                  <li><Link href="/calculators/fencing" className="hover:text-green-700">Fencing Calculator</Link></li>
                  <li><Link href="/calculators/retaining-wall" className="hover:text-green-700">Retaining Wall</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Resources</h4>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  <li><span className="text-gray-400">How-to Guides</span></li>
                  <li><span className="text-gray-400">Project Tips</span></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Material Math. All calculators provide estimates based on
              national average data. Actual material needs may vary.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
