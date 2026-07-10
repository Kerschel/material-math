import type { Metadata } from "next";
import Link from "next/link";
import { generateHomepageMetadata } from "@/lib/seo/metadata";
import { CalculatorCard } from "@/components/CalculatorCard";
import { materialConfigs } from "@/data/material-constants";
import { calculatorIcons } from "@/lib/icon-map";
import { Flower2, Mountain, HardHat } from "lucide-react";

export const metadata: Metadata = generateHomepageMetadata();

export default function HomePage() {
  const calculators = Object.entries(materialConfigs).map(([, config]) => config);

  const landscapingCalcs = calculators.filter((c) => c.category === "landscaping");
  const hardscapingCalcs = calculators.filter((c) => c.category === "hardscaping");
  const constructionCalcs = calculators.filter((c) => c.category === "construction");

  // Popular calculators: top picks across categories
  const popularSlugs = ["mulch", "concrete", "gravel", "pavers", "sand", "soil"];
  const popularCalcs = popularSlugs
    .map((slug) => calculators.find((c) => c.slug === slug))
    .filter(Boolean);

  return (
    <div>
      {/* Hero */}
      <section className="blueprint-grid py-24 sm:py-32 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-medium text-[var(--accent)] mb-4 tracking-wide uppercase">
            Material Math
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[var(--ink)] leading-tight tracking-tight">
            Know exactly
            <br />
            <span className="text-[var(--ink-muted)] font-normal">what to buy.</span>
          </h1>
          <p className="mt-6 text-lg text-[var(--ink-muted)] max-w-xl leading-relaxed">
            Free construction material calculators that convert real project dimensions
            into purchase quantities. No sign-up. No guesswork.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/calculators"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[var(--accent)] text-[var(--accent-ink)] font-semibold text-base hover:opacity-90 transition-opacity duration-150 shadow-sm"
            >
              Choose a Calculator
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-[var(--border)] text-[var(--ink)] font-medium text-base hover:bg-[var(--bg-muted)] transition-colors duration-150"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Calculators */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="font-display text-2xl font-semibold text-[var(--ink)] mb-2">
          Popular Calculators
        </h2>
        <p className="text-[var(--ink-muted)] mb-8">
          The calculators homeowners and contractors use most.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularCalcs.map((calc) => {
            if (!calc) return null;
            const Icon = calculatorIcons[calc.slug] || HardHat;
            return (
              <CalculatorCard
                key={calc.slug}
                title={`${calc.displayName} Calculator`}
                description={calc.description}
                icon={Icon}
                href={`/calculators/${calc.slug}`}
              />
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/calculators"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:underline"
          >
            View all 15 calculators
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-[var(--bg-raised)] border-y border-[var(--border)] py-16 sm:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)] text-center mb-12">
            How Material Math Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mx-auto mb-5">
                <span className="font-mono text-xl font-medium text-[var(--accent)]">1</span>
              </div>
              <h3 className="font-display font-semibold text-lg text-[var(--ink)] mb-2">
                Enter Your Dimensions
              </h3>
              <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                Measure your project area and enter the length, width, and depth.
                Switch between feet, inches, meters — we handle the conversion.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mx-auto mb-5">
                <span className="font-mono text-xl font-medium text-[var(--accent)]">2</span>
              </div>
              <h3 className="font-display font-semibold text-lg text-[var(--ink)] mb-2">
                See Your Results
              </h3>
              <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                Get instant results in the units your supplier uses — cubic yards,
                tons, bags, or individual pieces — with waste allowance included.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mx-auto mb-5">
                <span className="font-mono text-xl font-medium text-[var(--accent)]">3</span>
              </div>
              <h3 className="font-display font-semibold text-lg text-[var(--ink)] mb-2">
                Know What to Buy
              </h3>
              <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                Walk into the store with confidence. Order exactly what you need —
                no expensive over-ordering, no last-minute trips back.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="font-display text-2xl font-semibold text-[var(--ink)] text-center mb-4">
          Why These Estimates Are Trustworthy
        </h2>
        <p className="text-[var(--ink-muted)] text-center mb-10 max-w-xl mx-auto">
          Every calculator is transparent about how it works. You can see, verify, and adjust.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              title: "Formulas Are Visible",
              desc: "Every calculator shows the math — expand the working and see exactly how the result was calculated.",
            },
            {
              title: "Assumptions Are Editable",
              desc: "Default waste percentages, coverage rates, and densities are shown and can be changed to match your situation.",
            },
            {
              title: "Estimates, Not Guarantees",
              desc: "We clearly state that results are estimates. Always verify against manufacturer specs and local codes before purchasing.",
            },
            {
              title: "Last Reviewed Dates",
              desc: "Each calculator shows when its formulas and default values were last reviewed for accuracy.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)]"
            >
              <h3 className="font-display font-semibold text-base text-[var(--ink)] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--ink-muted)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Worked Example */}
      <section className="bg-[var(--bg-raised)] border-y border-[var(--border)] py-16 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)] text-center mb-2">
            See It In Action
          </h2>
          <p className="text-[var(--ink-muted)] text-center mb-10">
            A 10&prime; &times; 12&prime; concrete patio slab, 4 inches thick, with 10% waste.
          </p>

          <div className="blueprint-grid-light rounded-2xl border border-[var(--border)] p-6 sm:p-8 bg-[var(--bg)]">
            <div className="space-y-5">
              {[
                { label: "Area", formula: "10 ft × 12 ft", value: "120 sq ft" },
                { label: "Volume", formula: "120 sq ft × (4 in ÷ 12)", value: "40 cu ft" },
                { label: "Cubic Yards", formula: "40 cu ft ÷ 27", value: "1.48 cu yd" },
                { label: "With 10% Waste", formula: "1.48 × 1.10", value: "1.63 cu yd" },
                { label: "80 lb Bags", formula: "1.63 cu yd ÷ 0.022 cu yd/bag", value: "74 bags" },
              ].map((step, i) => (
                <div key={step.label} className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-[var(--accent)]/10 flex items-center justify-center shrink-0 font-mono text-xs font-medium text-[var(--accent)]">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-[var(--ink)]">{step.label}</span>
                    <span className="text-xs text-[var(--ink-muted)] block font-mono">
                      {step.formula}
                    </span>
                  </div>
                  <span className="font-mono font-medium text-[var(--ink)] text-right shrink-0">
                    {step.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--border)]">
              <p className="font-display font-semibold text-lg text-[var(--ink)]">
                You need approximately{" "}
                <span className="text-[var(--accent)] font-mono text-xl">1.6 cubic yards</span>{" "}
                or{" "}
                <span className="text-[var(--accent)] font-mono text-xl">74 eighty-pound bags</span>{" "}
                of concrete.
              </p>
              <p className="text-sm text-[var(--ink-muted)] mt-2">
                This is an estimate. Confirm with your concrete supplier before ordering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Categories */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="font-display text-2xl font-semibold text-[var(--ink)] mb-8">
          All Calculator Categories
        </h2>

        {[
          { name: "Landscaping", icon: Flower2, calcs: landscapingCalcs },
          { name: "Hardscaping", icon: Mountain, calcs: hardscapingCalcs },
          { name: "Construction", icon: HardHat, calcs: constructionCalcs },
        ].map(({ name, icon: CatIcon, calcs }) => (
          <div key={name} className="mb-10">
            <h3 className="font-display font-semibold text-lg text-[var(--ink)] mb-4 flex items-center gap-2">
              <CatIcon className="w-5 h-5 text-[var(--accent)]" strokeWidth={1.5} />
              {name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {calcs.map((calc) => {
                const Icon = calculatorIcons[calc.slug] || HardHat;
                return (
                  <CalculatorCard
                    key={calc.slug}
                    title={`${calc.displayName} Calculator`}
                    description={calc.description}
                    icon={Icon}
                    href={`/calculators/${calc.slug}`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg-raised)] border-t border-[var(--border)] py-16 sm:py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)] text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "How accurate are these calculators?",
                a: "Our calculators use standard industry formulas and current material density data. Results are estimates — we show the math so you can verify, and we recommend confirming with your supplier and local building codes before purchasing.",
              },
              {
                q: "Do I need an account to use the calculators?",
                a: "No. All calculators are free and work instantly in your browser. No sign-up, no email, no payment required.",
              },
              {
                q: "What units are supported?",
                a: "Every calculator supports both imperial (feet, inches, yards) and metric (meters, centimeters) units. Switch between them and the conversion is handled automatically.",
              },
              {
                q: "Should I add extra for waste?",
                a: "Yes. We include a default 10% waste allowance for most materials to account for cuts, spills, compaction, and irregular shapes. You can adjust this percentage on any calculator.",
              },
              {
                q: "Can I use these for commercial projects?",
                a: "These calculators are designed for estimating purposes. For large commercial projects, we recommend consulting with a professional estimator or engineer who can account for site-specific conditions.",
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-[var(--border)] bg-[var(--bg)] overflow-hidden"
              >
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-medium text-[var(--ink)] hover:text-[var(--accent)] transition-colors list-none">
                  {faq.q}
                  <svg
                    className="w-5 h-5 shrink-0 text-[var(--ink-muted)] group-open:rotate-180 transition-transform duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-sm text-[var(--ink-muted)] leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
        <h2 className="font-display text-2xl font-semibold text-[var(--ink)] mb-4">
          Ready to start your project?
        </h2>
        <p className="text-[var(--ink-muted)] mb-8">
          Pick a calculator, enter your measurements, and know exactly what to buy.
        </p>
        <Link
          href="/calculators"
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-[var(--accent)] text-[var(--accent-ink)] font-semibold text-lg hover:opacity-90 transition-opacity duration-150 shadow-sm"
        >
          Browse All Calculators
        </Link>
      </section>
    </div>
  );
}
