import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Material Math",
  description:
    "Material Math helps homeowners, DIYers, and contractors calculate exactly how much material they need — free, no sign-up required.",
  alternates: {
    canonical: "https://materialmath.com/about",
  },
};

export default function AboutPage() {
  return (
    <div>
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-medium text-[var(--accent)] mb-3 tracking-wide uppercase">
            About
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--ink)] mb-8">
            About Material Math
          </h1>

          <div className="prose-blueprint max-w-none space-y-6 text-[var(--ink)] leading-relaxed">
            <p className="text-lg text-[var(--ink-muted)]">
              Material Math was built to solve one problem: nobody should have to guess how much
              material to buy for their project.
            </p>

            <h2 className="font-display text-xl font-semibold text-[var(--ink)] mt-10 mb-3">
              Why We Built This
            </h2>
            <p>
              Whether you&rsquo;re a homeowner spreading mulch, a contractor estimating concrete, or
              a DIYer laying pavers, getting the quantity wrong is expensive. Order too little and
              you&rsquo;re making extra trips to the store mid-project. Order too much and
              you&rsquo;re stuck with leftover material you paid for but can&rsquo;t use.
            </p>
            <p>
              Most online calculators are either too simple (ignoring waste and units) or buried
              behind sign-up walls and ads. We wanted something better: calculators that are
              transparent about their formulas, configurable to your situation, and instantly usable
              without an account.
            </p>

            <h2 className="font-display text-xl font-semibold text-[var(--ink)] mt-10 mb-3">
              How It Works
            </h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Pick a calculator for your material</li>
              <li>Enter your project dimensions (metric or imperial)</li>
              <li>Adjust the waste allowance and material options</li>
              <li>Get your result in purchase-ready units</li>
              <li>Expand &ldquo;Show the math&rdquo; to see exactly how it was calculated</li>
            </ol>

            <h2 className="font-display text-xl font-semibold text-[var(--ink)] mt-10 mb-3">
              Who It&rsquo;s For
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Homeowners and DIYers planning renovations</li>
              <li>Small contractors and tradespeople preparing estimates</li>
              <li>Construction students and junior estimators</li>
              <li>Hardware store customers checking quantities before purchasing</li>
            </ul>

            <h2 className="font-display text-xl font-semibold text-[var(--ink)] mt-10 mb-3">
              Our Principles
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Free forever.</strong> No accounts, no paywalls, no credit cards.</li>
              <li><strong>Transparent math.</strong> Every formula is visible and verifiable.</li>
              <li><strong>Estimates, not guarantees.</strong> We tell you what we assume and let you change it.</li>
              <li><strong>Privacy-first.</strong> We track anonymous usage to improve the site, never your project measurements.</li>
            </ul>

            <div className="mt-12 p-6 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)] text-center">
              <p className="text-[var(--ink)] font-display font-semibold text-lg mb-2">
                Ready to calculate?
              </p>
              <Link
                href="/calculators"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[var(--accent)] text-[var(--accent-ink)] font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Browse Calculators
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
