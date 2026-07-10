// SEO metadata utilities: generate page titles, descriptions, and structured data
import type { Metadata } from "next";

export function generateCalculatorMetadata(
  materialName: string,
  description?: string
): Metadata {
  const title = `${materialName} Calculator - Free Online Material Estimator`;
  const desc =
    description ??
    `Use our free ${materialName.toLowerCase()} calculator to estimate how much ${materialName.toLowerCase()} you need for your project. Get instant results in cubic yards, tons, and bags.`;

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      type: "website",
      siteName: "Material Math",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
    },
    alternates: {
      canonical: `https://materialmath.com/calculators/${materialName.toLowerCase().replace(/\s+/g, "-")}`,
    },
    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: `${materialName} Calculator`,
        description: desc,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      }),
    },
  };
}

export function generateProgrammaticMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      siteName: "Material Math",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://materialmath.com${path}`,
    },
    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        about: {
          "@type": "Thing",
          name: title,
        },
      }),
    },
  };
}

export function generateHomepageMetadata(): Metadata {
  const title = "Material Math — Free Online Material Calculators for Home Projects";
  const description =
    "Instant material calculators for mulch, soil, gravel, concrete, pavers, and more. Enter dimensions, get exactly how much material you need plus cost estimates. Free and easy to use.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Material Math",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Material Math",
        description,
        url: "https://materialmath.com",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://materialmath.com/?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      }),
    },
  };
}
