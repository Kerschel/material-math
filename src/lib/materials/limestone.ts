// Limestone / Crushed Stone Calculator
import {
  calculateBulkMaterial,
  type BasicInput,
  type BulkMaterialResults,
} from "@/lib/calculator-engine";
import { nationalPrices, type CostEstimate } from "@/lib/pricing";

export interface LimestoneResults extends BulkMaterialResults {
  costEstimate: CostEstimate;
}

export function calculateLimestone(input: BasicInput): LimestoneResults {
  const base = calculateBulkMaterial(input, {
    densityTonsPerCy: 1.45,
    bagSizeCuft: 0.5,
    compactionFactor: 1.1,
  });

  const costLow = base.tons * nationalPrices.limestone_ton.low;
  const costHigh = base.tons * nationalPrices.limestone_ton.high;

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
