// Crushed Stone Calculator
import {
  calculateBulkMaterial,
  type BasicInput,
  type BulkMaterialResults,
} from "@/lib/calculator-engine";
import { nationalPrices, type CostEstimate } from "@/lib/pricing";
import type { MaterialSubtype } from "@/data/material-constants";

export interface CrushedStoneResults extends BulkMaterialResults {
  costEstimate: CostEstimate;
}

export function calculateCrushedStone(
  input: BasicInput,
  subtype?: MaterialSubtype
): CrushedStoneResults {
  const density = subtype?.densityTonsPerCy ?? 1.4;

  const base = calculateBulkMaterial(input, {
    densityTonsPerCy: density,
    bagSizeCuft: 0.5,
    compactionFactor: 1.1,
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
