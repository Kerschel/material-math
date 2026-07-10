// Decorative Stone Calculator
import {
  calculateBulkMaterial,
  type BasicInput,
  type BulkMaterialResults,
} from "@/lib/calculator-engine";
import { nationalPrices, type CostEstimate } from "@/lib/pricing";
import type { MaterialSubtype } from "@/data/material-constants";

export interface StoneResults extends BulkMaterialResults {
  costEstimate: CostEstimate;
}

export function calculateStone(
  input: BasicInput,
  subtype?: MaterialSubtype
): StoneResults {
  const density = subtype?.densityTonsPerCy ?? 1.4;

  const base = calculateBulkMaterial(input, {
    densityTonsPerCy: density,
    bagSizeCuft: 0.5,
  });

  const priceLow = subtype?.priceLow ?? nationalPrices.rock_ton.low;
  const priceHigh = subtype?.priceHigh ?? nationalPrices.rock_ton.high;
  const costLow = base.tons * priceLow;
  const costHigh = base.tons * priceHigh;

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
