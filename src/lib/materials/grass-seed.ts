// Grass Seed Calculator
import {
  calculateGrassSeed,
  type GrassSeedResults,
} from "@/lib/calculator-engine";
import { nationalPrices, type CostEstimate } from "@/lib/pricing";

export interface GrassSeedCalcResults extends GrassSeedResults {
  costEstimate: CostEstimate;
}

export function calculateGrassSeedCost(
  length: number,
  width: number,
  lengthUnit: "ft" | "in" | "yd" | "m" | "cm" = "ft",
  widthUnit: "ft" | "in" | "yd" | "m" | "cm" = "ft",
  isNewLawn: boolean = true
): GrassSeedCalcResults {
  const base = calculateGrassSeed(length, width, lengthUnit, widthUnit);

  const lbs = isNewLawn ? base.newLawnLbs : base.overseedLbs;
  const costLow = lbs * nationalPrices.grass_seed_lb.low;
  const costHigh = lbs * nationalPrices.grass_seed_lb.high;

  return {
    ...base,
    costEstimate: {
      totalLow: Math.round(costLow),
      totalHigh: Math.round(costHigh),
      unitLabel: "lb",
      breakdown: [],
    },
  };
}
