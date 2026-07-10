// Soil / Topsoil Calculator
import {
  calculateBulkMaterial,
  type BasicInput,
  type BulkMaterialResults,
} from "@/lib/calculator-engine";
import { nationalPrices, type CostEstimate } from "@/lib/pricing";

export interface SoilResults extends BulkMaterialResults {
  costEstimate: CostEstimate;
}

export function calculateSoil(input: BasicInput): SoilResults {
  const base = calculateBulkMaterial(input, {
    densityTonsPerCy: 1.1,
    bagSizeCuft: 0.75,
  });

  const costLow = base.cubicYards * nationalPrices.topsoil_cy.low;
  const costHigh = base.cubicYards * nationalPrices.topsoil_cy.high;

  return {
    ...base,
    costEstimate: {
      totalLow: Math.round(costLow),
      totalHigh: Math.round(costHigh),
      unitLabel: "bulk (cy)",
      breakdown: [],
    },
  };
}
