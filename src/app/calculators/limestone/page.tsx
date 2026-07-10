import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo/metadata";
import { GenericCalculator } from "@/components/GenericCalculator";

export const metadata: Metadata = generateCalculatorMetadata("Limestone / Crushed Stone");

export default function LimestonePage() {
  return <GenericCalculator slug="limestone" />;
}
