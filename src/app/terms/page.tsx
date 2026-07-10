import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Material Math terms of service. Our calculators provide estimates — always verify before purchasing.",
  alternates: {
    canonical: "https://materialmath.com/terms",
  },
};

export default function TermsPage() {
  return (
    <div>
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto prose-blueprint max-w-none">
          <p className="text-sm font-medium text-[var(--accent)] mb-3 tracking-wide uppercase">
            Legal
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--ink)] mb-8">
            Terms of Service
          </h1>
          <p className="text-sm text-[var(--ink-muted)] mb-10">
            Last updated: January 2026
          </p>

          <div className="space-y-6 text-[var(--ink)] leading-relaxed">
            <h2 className="font-display text-xl font-semibold">1. Acceptance of Terms</h2>
            <p>
              By using Material Math, you agree to these terms. If you do not agree, please do not
              use the site.
            </p>

            <h2 className="font-display text-xl font-semibold">2. Service Description</h2>
            <p>
              Material Math provides free online calculators for estimating construction and
              landscaping material quantities. All tools are provided &ldquo;as is&rdquo; without
              warranty of any kind.
            </p>

            <h2 className="font-display text-xl font-semibold">3. Estimates, Not Guarantees</h2>
            <p>
              <strong>All calculator results are estimates.</strong> Actual material requirements
              depend on site-specific conditions, product variations, installation technique, and
              local building requirements. You are responsible for:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Verifying results against manufacturer specifications</li>
              <li>Checking local building codes and regulations</li>
              <li>Consulting with qualified professionals for complex or large-scale projects</li>
              <li>Confirming quantities with your supplier before purchasing</li>
            </ul>

            <h2 className="font-display text-xl font-semibold">4. Limitation of Liability</h2>
            <p>
              Material Math and its operators shall not be liable for any direct, indirect,
              incidental, or consequential damages resulting from the use of or inability to use
              the calculators, including but not limited to material shortages, overages, project
              delays, or financial losses.
            </p>

            <h2 className="font-display text-xl font-semibold">5. Intellectual Property</h2>
            <p>
              The Material Math name, branding, calculator designs, and original content are
              protected. The underlying formulas and conversion factors are industry-standard and
              freely available.
            </p>

            <h2 className="font-display text-xl font-semibold">6. Changes to Terms</h2>
            <p>
              We may update these terms at any time. Continued use after changes constitutes
              acceptance.
            </p>

            <h2 className="font-display text-xl font-semibold">7. Contact</h2>
            <p>
              Questions?{" "}
              <a href="mailto:hello@materialmath.com" className="text-[var(--accent)] hover:underline">
                hello@materialmath.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
