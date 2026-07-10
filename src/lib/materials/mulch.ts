// Mulch Calculator
import {
  calculateBulkMaterial,
  type BasicInput,
  type BulkMaterialResults,
} from "@/lib/calculator-engine";
import { nationalPrices, formatCostRange, type CostEstimate } from "@/lib/pricing";

export interface MulchResults extends BulkMaterialResults {
  bags2cuft: number;
  bags3cuft: number;
  costEstimate: CostEstimate;
}

export function calculateMulch(input: BasicInput): MulchResults {
  const base = calculateBulkMaterial(input, {
    densityTonsPerCy: 0.45,
    bagSizeCuft: 2,
  });

  const bags2cuft = Math.ceil(base.cubicFeet / 2);
  const bags3cuft = Math.ceil(base.cubicFeet / 3);

  const costLow = base.cubicYards * nationalPrices.mulch_cy.low;
  const costHigh = base.cubicYards * nationalPrices.mulch_cy.high;

  return {
    ...base,
    bags2cuft,
    bags3cuft,
    costEstimate: {
      totalLow: Math.round(costLow),
      totalHigh: Math.round(costHigh),
      unitLabel: "bulk (cy)",
      breakdown: [],
    },
  };
}
