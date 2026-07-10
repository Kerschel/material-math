import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { materialConfigs, type MaterialSlug, calculatorSEOContent } from "@/data/material-constants";
import { generateProgrammaticPages, type ProgrammaticPage } from "@/lib/seo/programmatic-pages";
import { generateProgrammaticMetadata } from "@/lib/seo/metadata";
import { round } from "@/lib/units";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  params: Promise<{ slug: string; dimensions: string }>;
}

// Pre-render the top 5 calculators with their dimension combos
export async function generateStaticParams() {
  const topCalculators: MaterialSlug[] = ["mulch", "soil", "gravel", "concrete", "pavers"];
  const params: { slug: string; dimensions: string }[] = [];

  for (const slug of topCalculators) {
    const pages = generateProgrammaticPages(slug);
    for (const page of pages) {
      // Extract dimensions slug from path
      const dimensionsSlug = page.path.split("/").pop();
      if (dimensionsSlug) {
        params.push({ slug, dimensions: dimensionsSlug });
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, dimensions } = await params;
  const config = materialConfigs[slug as MaterialSlug];
  if (!config) return {};

  const pages = generateProgrammaticPages(slug as MaterialSlug);
  const match = pages.find((p) => p.path.endsWith(`/${dimensions}`));

  if (!match) return {};

  return generateProgrammaticMetadata(match.title, match.description, match.path);
}

export default async function DimensionsPage({ params }: Props) {
  const { slug, dimensions } = await params;
  const config = materialConfigs[slug as MaterialSlug];
  if (!config) notFound();

  const pages = generateProgrammaticPages(slug as MaterialSlug);
  const match = pages.find((p) => p.path.endsWith(`/${dimensions}`));
  if (!match) notFound();

  const seoContent = calculatorSEOContent[slug];
  const { preset } = match;

  // Pre-calculate results
  const length = preset.length;
  const width = preset.width;
  const depth = preset.depth;
  const area = length * width;
  const cubicFeet = area * (depth / 12);
  const cubicYards = round(cubicFeet / 27, 2);
  const firstSubtype = config.subtypes[0];
  const density = firstSubtype && "densityTonsPerCy" in firstSubtype
    ? firstSubtype.densityTonsPerCy
    : undefined;
  const tons = density != null ? round(cubicYards * density, 2) : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-700">Home</Link>
        {" / "}
        <Link href={`/calculators/${slug}`} className="hover:text-green-700">
          {config.displayName} Calculator
        </Link>
        {" / "}
        <span className="text-gray-800">
          {length}×{width} ft at {depth}″ deep
        </span>
      </nav>

      {/* H1 */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
        {match.h1}
      </h1>

      {/* Pre-calculated Result Card */}
      <Card className="mb-8 bg-green-50 border-green-200">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Pre-Calculated Estimate</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-700">{cubicYards}</p>
              <p className="text-sm text-gray-600">Cubic Yards</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-700">{round(cubicFeet, 1)}</p>
              <p className="text-sm text-gray-600">Cubic Feet</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-700">{area}</p>
              <p className="text-sm text-gray-600">Square Feet</p>
            </div>
            {tons !== null && (
              <div className="text-center">
                <p className="text-2xl font-bold text-green-700">{tons}</p>
                <p className="text-sm text-gray-600">Tons</p>
              </div>
            )}
          </div>
          <div className="mt-4 text-center">
            <Link
              href={`/calculators/${slug}`}
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
            >
              Calculate Custom Dimensions →
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Long-form content */}
      <div className="prose prose-green max-w-none">
        <h2>About This {length}×{width} Foot {preset.context} Project</h2>
        <p>
          A {length}×{width} foot {preset.context.toLowerCase()} covers {area} square feet. 
          At {depth} inches deep, you&apos;ll need approximately <strong>{cubicYards} cubic yards</strong> of {config.displayName.toLowerCase()}
          {tons !== null && <> (about <strong>{tons} tons</strong>)</>}.
          This is a {area < 100 ? "small" : area < 300 ? "medium" : "large"} project that{" "}
          {area < 100 ? "can typically be completed in a few hours with basic tools." :
           area < 300 ? "may take a full day and benefit from having help." :
           "may require multiple days and professional equipment."}
        </p>

        {seoContent && (
          <>
            <h2>How to Calculate {config.displayName} for a {length}×{width} Area</h2>
            <p>{seoContent.howToCalculate}</p>

            <h3>Tips for This Project Size</h3>
            <ul>
              {seoContent.tips.slice(0, 3).map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>

            <h3>Frequently Asked Questions</h3>
            {seoContent.faqs.slice(0, 3).map((faq, i) => (
              <div key={i} className="mb-4">
                <h4 className="font-semibold text-gray-800">{faq.q}</h4>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </>
        )}

        <h3>Related Project Sizes</h3>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 list-none pl-0">
          {pages
            .filter((p) => p.path !== match.path)
            .slice(0, 9)
            .map((p) => (
              <li key={p.path}>
                <Link
                  href={p.path}
                  className="text-green-700 hover:underline text-sm"
                >
                  {p.preset.length}×{p.preset.width} ft @ {p.preset.depth}″
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
