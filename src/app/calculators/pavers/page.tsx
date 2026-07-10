import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo/metadata";
import { GenericCalculator } from "@/components/GenericCalculator";

export const metadata: Metadata = generateCalculatorMetadata("Pavers");

export default function PaversPage() {
  return <GenericCalculator slug="pavers" />;
}
