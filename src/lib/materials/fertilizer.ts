// Fertilizer Calculator
import {
  calculateFertilizer,
  type FertilizerInput,
  type FertilizerResults,
} from "@/lib/calculator-engine";
import { nationalPrices, type CostEstimate } from "@/lib/pricing";

export interface FertilizerCalcResults extends FertilizerResults {
  costEstimate: CostEstimate;
  bagsNeeded: number;
}

const npkMap: Record<string, number> = {
  "10-10-10": 10,
  "29-0-4": 29,
  "16-4-8": 16,
  "32-0-4": 32,
};

export function calculateFertilizerCost(
  input: Omit<FertilizerInput, "nPercentage"> & { npk: string }
): FertilizerCalcResults {
  const nPercentage = npkMap[input.npk] ?? 10;

  const base = calculateFertilizer({ ...input, nPercentage });

  const bagsNeeded = Math.ceil(base.lbsNeeded / 50); // standard 50 lb bag
  const costLow = bagsNeeded * nationalPrices.fertilizer_bag.low;
  const costHigh = bagsNeeded * nationalPrices.fertilizer_bag.high;

  return {
    ...base,
    bagsNeeded,
    costEstimate: {
      totalLow: Math.round(costLow),
      totalHigh: Math.round(costHigh),
      unitLabel: "bag",
      breakdown: [],
    },
  };
}
