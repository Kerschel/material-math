import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { materialConfigs, type MaterialSlug } from "@/data/material-constants";
import { generateCalculatorMetadata } from "@/lib/seo/metadata";
import { GenericCalculator } from "@/components/GenericCalculator";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const config = materialConfigs[slug as MaterialSlug];
  if (!config) return {};
  return generateCalculatorMetadata(config.displayName);
}

export default async function CalculatorPage({ params }: Props) {
  const { slug } = await params;
  const config = materialConfigs[slug as MaterialSlug];
  if (!config) notFound();

  return <GenericCalculator slug={slug as MaterialSlug} />;
}
