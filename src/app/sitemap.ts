import type { MetadataRoute } from "next";
import { getAllProgrammaticPages } from "@/lib/seo/programmatic-pages";
import { materialConfigs } from "@/data/material-constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://materialmath.com";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  // Calculator pages
  const calculatorPages: MetadataRoute.Sitemap = Object.keys(materialConfigs).map((slug) => ({
    url: `${baseUrl}/calculators/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // Programmatic SEO pages
  const programmaticPages = getAllProgrammaticPages();
  const seoPages: MetadataRoute.Sitemap = programmaticPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...calculatorPages, ...seoPages];
}
