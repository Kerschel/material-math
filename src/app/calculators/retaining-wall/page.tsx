import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo/metadata";
import { GenericCalculator } from "@/components/GenericCalculator";

export const metadata: Metadata = generateCalculatorMetadata("Retaining Wall");

export default function RetainingWallPage() {
  return <GenericCalculator slug="retaining-wall" />;
}
