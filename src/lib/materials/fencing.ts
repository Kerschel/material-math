// Fencing Calculator
import {
  calculateFencing,
  type FencingInput,
  type FencingResults,
} from "@/lib/calculator-engine";
import { nationalPrices, estimateCostDetailed, type CostEstimate } from "@/lib/pricing";
import type { MaterialSubtype } from "@/data/material-constants";

export interface FencingCalcResults extends FencingResults {
  costEstimate: CostEstimate;
}

export function calculateFencingCost(
  input: FencingInput,
  subtype?: MaterialSubtype
): FencingCalcResults {
  const base = calculateFencing(input);

  const materialName = subtype?.name ?? "Wood Picket (6 ft)";
  let fencePriceLow: number;
  let fencePriceHigh: number;

  if (materialName.includes("Vinyl")) {
    fencePriceLow = nationalPrices.fence_vinyl_lnft.low;
    fencePriceHigh = nationalPrices.fence_vinyl_lnft.high;
  } else if (materialName.includes("Chain Link")) {
    fencePriceLow = nationalPrices.fence_chainlink_lnft.low;
    fencePriceHigh = nationalPrices.fence_chainlink_lnft.high;
  } else {
    fencePriceLow = nationalPrices.fence_wood_lnft.low;
    fencePriceHigh = nationalPrices.fence_wood_lnft.high;
  }

  const costEstimate = estimateCostDetailed([
    {
      label: "Fencing Material",
      quantity: base.linearFeet,
      unit: "linear ft",
      unitPriceLow: fencePriceLow,
      unitPriceHigh: fencePriceHigh,
    },
    {
      label: "Posts (4×4×8)",
      quantity: base.posts,
      unit: "posts",
      unitPriceLow: 8,
      unitPriceHigh: 15,
    },
    {
      label: "Concrete (80lb bags)",
      quantity: base.concreteBags,
      unit: "bags",
      unitPriceLow: nationalPrices.concrete_80lb.low,
      unitPriceHigh: nationalPrices.concrete_80lb.high,
    },
    ...(base.gates > 0
      ? [
          {
            label: "Gate Hardware",
            quantity: base.gates,
            unit: "kits",
            unitPriceLow: 50,
            unitPriceHigh: 150,
          } as const,
        ]
      : []),
  ]);

  return { ...base, costEstimate };
}
