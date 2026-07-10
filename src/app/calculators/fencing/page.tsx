import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo/metadata";
import { GenericCalculator } from "@/components/GenericCalculator";

export const metadata: Metadata = generateCalculatorMetadata("Fencing");

export default function FencingPage() {
  return <GenericCalculator slug="fencing" />;
}
