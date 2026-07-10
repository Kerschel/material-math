import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo/metadata";
import { GenericCalculator } from "@/components/GenericCalculator";

export const metadata: Metadata = generateCalculatorMetadata("Decorative Stone");

export default function RockPage() {
  return <GenericCalculator slug="rock" />;
}
