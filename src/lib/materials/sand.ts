// Sand Calculator
import {
  calculateBulkMaterial,
  type BasicInput,
  type BulkMaterialResults,
} from "@/lib/calculator-engine";
import { nationalPrices, type CostEstimate } from "@/lib/pricing";

export interface SandResults extends BulkMaterialResults {
  costEstimate: CostEstimate;
}

export function calculateSand(input: BasicInput): SandResults {
  const base = calculateBulkMaterial(input, {
    densityTonsPerCy: 1.3,
    bagSizeCuft: 0.5,
  });

  const costLow = base.tons * nationalPrices.sand_ton.low;
  const costHigh = base.tons * nationalPrices.sand_ton.high;

  return {
    ...base,
    costEstimate: {
      totalLow: Math.round(costLow),
      totalHigh: Math.round(costHigh),
      unitLabel: "ton",
      breakdown: [],
    },
  };
}
