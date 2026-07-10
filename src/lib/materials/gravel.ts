// Gravel Calculator
import {
  calculateBulkMaterial,
  type BasicInput,
  type BulkMaterialResults,
} from "@/lib/calculator-engine";
import { nationalPrices, type CostEstimate } from "@/lib/pricing";
import type { MaterialSubtype } from "@/data/material-constants";

export interface GravelResults extends BulkMaterialResults {
  costEstimate: CostEstimate;
}

const densityMap: Record<string, number> = {
  "Pea Gravel": 1.35,
  "Crushed Stone": 1.45,
  "River Rock": 1.55,
};

export function calculateGravel(input: BasicInput, subtype?: MaterialSubtype): GravelResults {
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
