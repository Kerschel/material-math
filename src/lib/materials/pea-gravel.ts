// Pea Gravel Calculator
import {
  calculateBulkMaterial,
  type BasicInput,
  type BulkMaterialResults,
} from "@/lib/calculator-engine";
import { nationalPrices, type CostEstimate } from "@/lib/pricing";
import type { MaterialSubtype } from "@/data/material-constants";

export interface PeaGravelResults extends BulkMaterialResults {
  costEstimate: CostEstimate;
}

export function calculatePeaGravel(
  input: BasicInput,
  subtype?: MaterialSubtype
): PeaGravelResults {
  const density = subtype?.densityTonsPerCy ?? 1.3;

  const base = calculateBulkMaterial(input, {
    densityTonsPerCy: density,
    bagSizeCuft: 0.5,
  });

  const costLow = base.tons * nationalPrices.gravel_ton.low;
  const costHigh = base.tons * nationalPrices.gravel_ton.high;

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
