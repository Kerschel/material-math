import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo/metadata";
import { GenericCalculator } from "@/components/GenericCalculator";

export const metadata: Metadata = generateCalculatorMetadata("Asphalt");

export default function AsphaltPage() {
  return <GenericCalculator slug="asphalt" />;
}
