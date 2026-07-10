// Fill Dirt Calculator
import {
  calculateBulkMaterial,
  type BasicInput,
  type BulkMaterialResults,
} from "@/lib/calculator-engine";
import { nationalPrices, type CostEstimate } from "@/lib/pricing";
import type { MaterialSubtype } from "@/data/material-constants";
import { round } from "@/lib/units";

export interface FillDirtResults extends BulkMaterialResults {
  dumpTruckLoads: number;
  costEstimate: CostEstimate;
}

export function calculateFillDirt(
  input: BasicInput,
  subtype?: MaterialSubtype
): FillDirtResults {
  const density = subtype?.densityTonsPerCy ?? 1.2;

  const base = calculateBulkMaterial(input, {
    densityTonsPerCy: density,
    bagSizeCuft: 0.75,
    compactionFactor: 1.15, // 15% for compaction/settling
  });

  const dumpTruckLoads = round(base.cubicYards / 12, 1); // ~12 cy per truck

  const priceLow = subtype?.priceLow ?? nationalPrices.topsoil_cy.low;
  const priceHigh = subtype?.priceHigh ?? nationalPrices.topsoil_cy.high;
  const costLow = base.cubicYards * priceLow;
  const costHigh = base.cubicYards * priceHigh;

  return {
    ...base,
    dumpTruckLoads,
    costEstimate: {
      totalLow: Math.round(costLow),
      totalHigh: Math.round(costHigh),
      unitLabel: "cy",
      breakdown: [],
    },
  };
}
