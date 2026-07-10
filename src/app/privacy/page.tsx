import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Material Math privacy policy — we do not collect personal data for calculations. Anonymous analytics only.",
  alternates: {
    canonical: "https://materialmath.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div>
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto prose-blueprint max-w-none">
          <p className="text-sm font-medium text-[var(--accent)] mb-3 tracking-wide uppercase">
            Legal
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--ink)] mb-8">
            Privacy Policy
          </h1>
          <p className="text-sm text-[var(--ink-muted)] mb-10">
            Last updated: January 2026
          </p>

          <div className="space-y-6 text-[var(--ink)] leading-relaxed">
            <h2 className="font-display text-xl font-semibold">1. What We Collect</h2>
            <p>
              Material Math does <strong>not</strong> require accounts or collect personal
              information. Calculator inputs (dimensions, material types, waste percentages) are
              processed entirely in your browser and are never sent to our servers.
            </p>
            <p>
              We use privacy-conscious, anonymized analytics to understand general usage patterns
              (which calculators are most popular, typical session duration). This data cannot be
              linked to individual users or projects.
            </p>

            <h2 className="font-display text-xl font-semibold">2. Cookies</h2>
            <p>
              We do not use tracking cookies, advertising cookies, or third-party cookies for basic
              site usage. If advertising is introduced in the future, we will update this policy and
              provide clear opt-out options before any tracking begins.
            </p>

            <h2 className="font-display text-xl font-semibold">3. Third-Party Services</h2>
            <p>
              Our site is hosted on Railway and uses GitHub for source control. These platforms have
              their own privacy policies. We do not share any user data with third parties.
            </p>

            <h2 className="font-display text-xl font-semibold">4. Children&apos;s Privacy</h2>
            <p>
              Material Math is a general-audience site. We do not knowingly collect information from
              children under 13.
            </p>

            <h2 className="font-display text-xl font-semibold">5. Changes to This Policy</h2>
            <p>
              We will update this page if our data practices change. Significant changes will be
              noted with a prominent notice on the site.
            </p>

            <h2 className="font-display text-xl font-semibold">6. Contact</h2>
            <p>
              Questions about this policy? Email us at{" "}
              <a href="mailto:hello@materialmath.com" className="text-[var(--accent)] hover:underline">
                hello@materialmath.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
