import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo/metadata";
import { GenericCalculator } from "@/components/GenericCalculator";

export const metadata: Metadata = generateCalculatorMetadata("Soil / Topsoil");

export default function SoilPage() {
  return <GenericCalculator slug="soil" />;
}
