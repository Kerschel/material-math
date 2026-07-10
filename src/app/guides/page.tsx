import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Construction Material Guides",
  description:
    "Practical guides for estimating and buying construction materials — concrete, mulch, gravel, paint, drywall, and more.",
  alternates: {
    canonical: "https://materialmath.com/guides",
  },
};

const guides = [
  {
    title: "How to Estimate Concrete for a Slab",
    slug: "concrete",
    description:
      "Learn how to measure, calculate volume, account for waste, and convert to bags or ready-mix orders.",
  },
  {
    title: "Understanding Mulch Coverage and Depth",
    slug: "mulch",
    description:
      "How much mulch do you really need? A practical guide to depth, coverage rates, and bag vs. bulk.",
  },
  {
    title: "Calculating Paint for a Room",
    slug: "paint",
    description:
      "Measure walls and ceilings, subtract windows and doors, and account for multiple coats.",
  },
  {
    title: "Gravel Driveway: Materials and Quantities",
    slug: "gravel",
    description:
      "From sub-base to surface layer — how to calculate gravel needs for a new or refreshed driveway.",
  },
  {
    title: "Paver Installation: Base, Sand, and Pavers",
    slug: "pavers",
    description:
      "Everything you need to calculate for a paver patio or walkway, from excavation to finishing.",
  },
  {
    title: "Drywall: Sheets, Screws, Tape, and Mud",
    slug: "drywall",
    description:
      "Calculate drywall sheets, joint compound, screws, and tape for any room size.",
  },
];

export default function GuidesPage() {
  return (
    <div>
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-medium text-[var(--accent)] mb-3 tracking-wide uppercase">
            Resources
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--ink)] mb-4">
            Construction Material Guides
          </h1>
          <p className="text-lg text-[var(--ink-muted)] mb-12 max-w-2xl leading-relaxed">
            Practical, no-nonsense guides to help you estimate, buy, and use construction materials
            with confidence.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/calculators/${guide.slug}`}
                className="block p-6 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)] hover:border-[var(--accent)]/30 hover:shadow-md transition-all duration-200"
              >
                <h2 className="font-display font-semibold text-base text-[var(--ink)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                  {guide.title}
                </h2>
                <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                  {guide.description}
                </p>
                <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-[var(--accent)]">
                  Read Guide
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-10 text-sm text-[var(--ink-muted)] bg-[var(--bg-muted)] rounded-lg p-4">
            More detailed guides with step-by-step instructions and diagrams are in development.
            For now, each calculator page includes a &ldquo;How to Calculate&rdquo; section with
            formulas, worked examples, and FAQs specific to that material.
          </p>
        </div>
      </section>
    </div>
  );
}
