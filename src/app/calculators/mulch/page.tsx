import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo/metadata";
import { GenericCalculator } from "@/components/GenericCalculator";

export const metadata: Metadata = generateCalculatorMetadata("Mulch");

export default function MulchPage() {
  return <GenericCalculator slug="mulch" />;
}
