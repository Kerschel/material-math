import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorCard } from "@/components/CalculatorCard";
import { materialConfigs } from "@/data/material-constants";
import { calculatorIcons } from "@/lib/icon-map";
import { Flower2, Mountain, HardHat } from "lucide-react";

export const metadata: Metadata = {
  title: "All Construction Material Calculators",
  description:
    "Browse all 15 free material calculators — mulch, soil, gravel, concrete, pavers, sand, and more. Enter dimensions and know exactly what to buy.",
  openGraph: {
    title: "All Construction Material Calculators | Material Math",
    description:
      "Browse all 15 free material calculators — mulch, soil, gravel, concrete, pavers, sand, and more.",
    type: "website",
    siteName: "Material Math",
  },
  alternates: {
    canonical: "https://materialmath.com/calculators",
  },
};

export default function CalculatorsPage() {
  const calculators = Object.entries(materialConfigs).map(([, config]) => config);
  const landscapingCalcs = calculators.filter((c) => c.category === "landscaping");
  const hardscapingCalcs = calculators.filter((c) => c.category === "hardscaping");
  const constructionCalcs = calculators.filter((c) => c.category === "construction");

  return (
    <div>
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-medium text-[var(--accent)] mb-3 tracking-wide uppercase">
            Calculators
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--ink)] mb-4">
            All Construction Material Calculators
          </h1>
          <p className="text-lg text-[var(--ink-muted)] max-w-2xl mb-12">
            Choose a calculator below, enter your project dimensions, and get exactly how much
            material you need — no sign-up, no guesswork.
          </p>

          {[
            { name: "Landscaping", icon: Flower2, calcs: landscapingCalcs },
            { name: "Hardscaping", icon: Mountain, calcs: hardscapingCalcs },
            { name: "Construction", icon: HardHat, calcs: constructionCalcs },
          ].map(({ name, icon: CatIcon, calcs }) => (
            <div key={name} className="mb-10">
              <h2 className="font-display font-semibold text-xl text-[var(--ink)] mb-5 flex items-center gap-2">
                <CatIcon className="w-5 h-5 text-[var(--accent)]" strokeWidth={1.5} />
                {name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
        </div>
      </section>
    </div>
  );
}
