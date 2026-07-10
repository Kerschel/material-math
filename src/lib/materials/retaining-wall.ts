// Retaining Wall Calculator
import {
  calculateRetainingWall,
  type RetainingWallInput,
  type RetainingWallResults,
} from "@/lib/calculator-engine";
import { nationalPrices, estimateCostDetailed, type CostEstimate } from "@/lib/pricing";
import type { MaterialSubtype } from "@/data/material-constants";

export interface RetainingWallCalcResults extends RetainingWallResults {
  costEstimate: CostEstimate;
}

export function calculateRetainingWallCost(
  input: RetainingWallInput,
  subtype?: MaterialSubtype
): RetainingWallCalcResults {
  const base = calculateRetainingWall(input);

  const blockPriceLow = subtype?.priceLow ?? nationalPrices.retaining_wall_block.low;
  const blockPriceHigh = subtype?.priceHigh ?? nationalPrices.retaining_wall_block.high;

  const costEstimate = estimateCostDetailed([
    {
      label: "Wall Blocks",
      quantity: base.totalBlocks,
      unit: "blocks",
      unitPriceLow: blockPriceLow,
      unitPriceHigh: blockPriceHigh,
    },
    {
      label: "Cap Blocks",
      quantity: base.capBlocks,
      unit: "caps",
      unitPriceLow: blockPriceLow * 1.5,
      unitPriceHigh: blockPriceHigh * 1.5,
    },
    {
      label: "Base Gravel",
      quantity: base.baseGravelCuyd,
      unit: "cu yd",
      unitPriceLow: nationalPrices.gravel_ton.low * 1.4,
      unitPriceHigh: nationalPrices.gravel_ton.high * 1.4,
    },
    {
      label: "Backfill Gravel",
      quantity: base.backfillGravelCuyd,
      unit: "cu yd",
      unitPriceLow: nationalPrices.gravel_ton.low * 1.4,
      unitPriceHigh: nationalPrices.gravel_ton.high * 1.4,
    },
    {
      label: "Drainage Pipe",
      quantity: Math.ceil(base.drainagePipeFt / 10),
      unit: "10 ft sections",
      unitPriceLow: 8,
      unitPriceHigh: 15,
    },
  ]);

  return { ...base, costEstimate };
}
