// Topsoil Calculator
import {
  calculateBulkMaterial,
  type BasicInput,
  type BulkMaterialResults,
} from "@/lib/calculator-engine";
import { nationalPrices, type CostEstimate } from "@/lib/pricing";
import type { MaterialSubtype } from "@/data/material-constants";

export interface TopsoilResults extends BulkMaterialResults {
  costEstimate: CostEstimate;
}

export function calculateTopsoil(
  input: BasicInput,
  subtype?: MaterialSubtype
): TopsoilResults {
  const density = subtype?.densityTonsPerCy ?? 1.1;
  const bagSize = subtype?.bagSizeCuft ?? 0.75;

  const base = calculateBulkMaterial(input, {
    densityTonsPerCy: density,
    bagSizeCuft: bagSize,
  });

  const costLow = base.cubicYards * nationalPrices.topsoil_cy.low;
  const costHigh = base.cubicYards * nationalPrices.topsoil_cy.high;

  return {
    ...base,
    costEstimate: {
      totalLow: Math.round(costLow),
      totalHigh: Math.round(costHigh),
      unitLabel: "cy",
      breakdown: [],
    },
  };
}
