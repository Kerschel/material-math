// Rock / Decorative Stone Calculator
import {
  calculateBulkMaterial,
  type BasicInput,
  type BulkMaterialResults,
} from "@/lib/calculator-engine";
import { nationalPrices, type CostEstimate } from "@/lib/pricing";
import type { MaterialSubtype } from "@/data/material-constants";

export interface RockResults extends BulkMaterialResults {
  costEstimate: CostEstimate;
}

const densityMap: Record<string, number> = {
  "Lava Rock": 0.65,
  "River Rock": 1.55,
  "Crushed Granite": 1.45,
  "Pea Gravel": 1.35,
  "Limestone Gravel": 1.4,
};

export function calculateRock(input: BasicInput, subtype?: MaterialSubtype): RockResults {
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
