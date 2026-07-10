import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo/metadata";
import { GenericCalculator } from "@/components/GenericCalculator";

export const metadata: Metadata = generateCalculatorMetadata("Fertilizer");

export default function FertilizerPage() {
  return <GenericCalculator slug="fertilizer" />;
}
