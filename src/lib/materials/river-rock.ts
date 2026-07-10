// River Rock Calculator
import {
  calculateBulkMaterial,
  type BasicInput,
  type BulkMaterialResults,
} from "@/lib/calculator-engine";
import { nationalPrices, type CostEstimate } from "@/lib/pricing";
import type { MaterialSubtype } from "@/data/material-constants";

export interface RiverRockResults extends BulkMaterialResults {
  costEstimate: CostEstimate;
}

export function calculateRiverRock(
  input: BasicInput,
  subtype?: MaterialSubtype
): RiverRockResults {
  const density = subtype?.densityTonsPerCy ?? 1.4;

  const base = calculateBulkMaterial(input, {
    densityTonsPerCy: density,
    bagSizeCuft: 0.5,
  });

  const costLow = base.tons * nationalPrices.rock_ton.low;
  const costHigh = base.tons * nationalPrices.rock_ton.high;

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
