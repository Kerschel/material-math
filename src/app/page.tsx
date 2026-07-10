import type { Metadata } from "next";
import Link from "next/link";
import { generateHomepageMetadata } from "@/lib/seo/metadata";
import { CalculatorCard } from "@/components/CalculatorCard";
import { materialConfigs } from "@/data/material-constants";

export const metadata: Metadata = generateHomepageMetadata();

export default function HomePage() {
  const calculators = Object.entries(materialConfigs).map(([, config]) => config);

  const landscapingCalcs = calculators.filter((c) => c.category === "landscaping");
  const hardscapingCalcs = calculators.filter((c) => c.category === "hardscaping");
  const constructionCalcs = calculators.filter((c) => c.category === "construction");

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-green-50 via-green-50/50 to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
            Calculate Exactly
            <br />
            <span className="text-green-600">What You Need</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Free calculators for mulch, soil, gravel, concrete, pavers, and more.
            Enter your project dimensions and instantly know how much material to buy
            — no guesswork, no waste.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="#calculators"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg text-lg transition-colors shadow-md"
            >
              Browse All Calculators
            </Link>
            <Link
              href="#how-it-works"
              className="inline-block bg-white hover:bg-gray-50 text-green-700 font-semibold px-8 py-3 rounded-lg text-lg transition-colors border border-green-300 shadow-sm"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Calculator Grid */}
      <section id="calculators" className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Choose a Calculator</h2>

        {/* Landscaping */}
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          🌿 Landscaping
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
          {landscapingCalcs.map((calc) => (
            <CalculatorCard
              key={calc.slug}
              title={`${calc.displayName} Calculator`}
              description={calc.description}
              icon={calc.icon}
              href={`/calculators/${calc.slug}`}
            />
          ))}
        </div>

        {/* Hardscaping */}
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          🧱 Hardscaping
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
          {hardscapingCalcs.map((calc) => (
            <CalculatorCard
              key={calc.slug}
              title={`${calc.displayName} Calculator`}
              description={calc.description}
              icon={calc.icon}
              href={`/calculators/${calc.slug}`}
            />
          ))}
        </div>

        {/* Construction */}
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          🏗️ Construction
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {constructionCalcs.map((calc) => (
            <CalculatorCard
              key={calc.slug}
              title={`${calc.displayName} Calculator`}
              description={calc.description}
              icon={calc.icon}
              href={`/calculators/${calc.slug}`}
            />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">📏</span>
              </div>
              <h3 className="font-semibold text-gray-800">1. Enter Dimensions</h3>
              <p className="text-sm text-gray-600">
                Measure your project area and enter the length, width, and desired depth into the calculator.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-gray-800">2. Get Results</h3>
              <p className="text-sm text-gray-600">
                Get instant results in cubic yards, tons, bags, or count — plus estimated costs for your project.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🛒</span>
              </div>
              <h3 className="font-semibold text-gray-800">3. Buy the Right Amount</h3>
              <p className="text-sm text-gray-600">
                Order exactly what you need — no more guessing, no expensive over-ordering, and no last-minute trips to the store.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <article className="prose prose-green max-w-none">
          <h2>Free Online Material Calculators for Every Project</h2>
          <p>
            Whether you&apos;re spreading mulch in garden beds, laying a new gravel driveway,
            pouring a concrete patio, or building a brick wall, knowing exactly how much material you need
            saves time, money, and frustration. Our 15 specialized calculators use proven formulas and
            national average pricing data to give you accurate, actionable estimates.
          </p>
          <p>
            Each calculator handles unit conversions automatically — enter dimensions in feet,
            inches, yards, or meters, and get results in the units your supplier actually uses.
            Every tool also includes a detailed cost estimate based on current national average prices.
          </p>

          <h3>Why Use Material Math?</h3>
          <ul>
            <li>
              <strong>15 specialized calculators</strong> covering landscaping, hardscaping, and
              construction projects.
            </li>
            <li>
              <strong>Instant results</strong> — no loading spinners, no page refreshes, no sign-up required.
            </li>
            <li>
              <strong>Cost estimates included</strong> — see estimated price ranges before you buy.
            </li>
            <li>
              <strong>Mobile-friendly</strong> — use at the hardware store or in your yard.
            </li>
            <li>
              <strong>Pre-calculated project sizes</strong> — quick estimates for common dimensions
              like 4&prime;×8&prime; garden beds and 12&prime;×12&prime; patios.
            </li>
          </ul>
        </article>
      </section>
    </div>
  );
}
