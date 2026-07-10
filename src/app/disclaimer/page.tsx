import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Material Math calculators provide estimates only. Always verify with manufacturer specs and local building codes before purchasing.",
  alternates: {
    canonical: "https://materialmath.com/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <div>
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto prose-blueprint max-w-none">
          <p className="text-sm font-medium text-[var(--accent)] mb-3 tracking-wide uppercase">
            Legal
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--ink)] mb-8">
            Disclaimer
          </h1>

          <div className="space-y-6 text-[var(--ink)] leading-relaxed">
            <div className="p-6 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)] border-l-4 border-l-[var(--accent)]">
              <p className="font-display font-semibold text-lg mb-2">
                All results are estimates — not guarantees.
              </p>
              <p>
                The calculators on Material Math are designed as estimation tools for planning
                purposes. They use standard industry formulas and average material properties, but
                cannot account for every real-world variable.
              </p>
            </div>

            <h2 className="font-display text-xl font-semibold mt-8">What You Must Verify</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Manufacturer specifications</strong> — Product coverage rates, bag weights,
                and densities vary by brand and region. Always check the actual product label.
              </li>
              <li>
                <strong>Local building codes</strong> — Your municipality may require specific
                materials, depths, or installation methods that affect quantities.
              </li>
              <li>
                <strong>Site conditions</strong> — Uneven ground, compaction, drainage requirements,
                and access constraints can change how much material you actually need.
              </li>
              <li>
                <strong>Supplier recommendations</strong> — Many suppliers offer free quantity
                verification when you provide your project measurements.
              </li>
            </ul>

            <h2 className="font-display text-xl font-semibold mt-8">
              Assumptions We Make (and You Can Change)
            </h2>
            <p>
              Every calculator displays its default assumptions — waste percentage, material density,
              coverage rate, and standard unit sizes. You can adjust any of these values to match
              your specific situation. We encourage you to review and modify them.
            </p>

            <h2 className="font-display text-xl font-semibold mt-8">No Professional Advice</h2>
            <p>
              Material Math is not a substitute for professional engineering, architectural, or
              contracting advice. For structural, load-bearing, or large-scale projects, consult
              with a licensed professional.
            </p>

            <h2 className="font-display text-xl font-semibold mt-8">Last Reviewed</h2>
            <p>
              The formulas, default values, and assumptions used in our calculators were last
              reviewed in January 2026. We periodically update them as industry standards and
              material specifications evolve.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
