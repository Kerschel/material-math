// Sod Calculator
import {
  calculateSod,
  type SodResults,
} from "@/lib/calculator-engine";
import { nationalPrices, type CostEstimate } from "@/lib/pricing";

export interface SodCalcResults extends SodResults {
  costEstimate: CostEstimate;
}

export function calculateSodCost(
  length: number,
  width: number,
  lengthUnit: "ft" | "in" | "yd" | "m" | "cm" = "ft",
  widthUnit: "ft" | "in" | "yd" | "m" | "cm" = "ft",
  rollSizeSqft: number = 10,
  rollsPerPallet: number = 50
): SodCalcResults {
  const base = calculateSod(length, width, lengthUnit, widthUnit, rollSizeSqft, rollsPerPallet);

  const costLow = base.squareFeet * nationalPrices.sod_sqft.low;
  const costHigh = base.squareFeet * nationalPrices.sod_sqft.high;

  return {
    ...base,
    costEstimate: {
      totalLow: Math.round(costLow),
      totalHigh: Math.round(costHigh),
      unitLabel: "sq ft",
      breakdown: [],
    },
  };
}
