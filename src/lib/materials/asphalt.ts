// Asphalt Calculator
import {
  calculateAsphalt,
  type BasicInput,
  type BulkMaterialResults,
} from "@/lib/calculator-engine";
import { nationalPrices, type CostEstimate } from "@/lib/pricing";

export interface AsphaltResults extends BulkMaterialResults {
  asphaltTons: number;
  costEstimate: CostEstimate;
}

export function calculateAsphaltCost(input: BasicInput): AsphaltResults {
  const base = calculateAsphalt(input);

  const costLow = base.asphaltTons * nationalPrices.asphalt_ton.low;
  const costHigh = base.asphaltTons * nationalPrices.asphalt_ton.high;

  return {
    ...base,
    asphaltTons: base.asphaltTons,
    costEstimate: {
      totalLow: Math.round(costLow),
      totalHigh: Math.round(costHigh),
      unitLabel: "ton",
      breakdown: [],
    },
  };
}
