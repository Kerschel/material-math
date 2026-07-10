// SEO metadata utilities
import type { Metadata } from "next";

export function generateCalculatorMetadata(
  materialName: string,
  description?: string
): Metadata {
  const title = `${materialName} Calculator - Free Online Material Estimator`;
  const desc =
    description ??
    `Use our free ${materialName.toLowerCase()} calculator to estimate how much ${materialName.toLowerCase()} you need. Get instant results in cubic yards, tons, and bags.`;

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
    alternates: {
      canonical: `https://materialmath.com${path}`,
    },
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
  };
}

export function generateHomepageMetadata(): Metadata {
  const title = "Material Math — Free Construction Calculators";
  const description =
    "Free construction material calculators. Enter your measurements, know what to buy. No sign-up, no guesswork. Concrete, mulch, gravel, pavers & more.";

  return {
    title,
    description,
    alternates: {
      canonical: "https://materialmath.com",
    },
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
      }),
    },
  };
}
