// Pricing utilities for material cost estimates
import { getRegionalMultiplier } from "@/data/regional-pricing";
import type { MaterialSubtype } from "@/data/material-constants";

export interface CostRange {
  low: number;
  high: number;
  unit: string;
}

export interface CostEstimate {
  totalLow: number;
  totalHigh: number;
  unitLabel: string;
  breakdown: CostBreakdownItem[];
}

export interface CostBreakdownItem {
  label: string;
  quantity: number;
  unit: string;
  priceRangeLow: number;
  priceRangeHigh: number;
  totalLow: number;
  totalHigh: number;
}

/**
 * Build a cost estimate for a material based on quantity and subtype.
 * Applies regional pricing multipliers.
 */
export function estimateCost(
  quantity: number,
  subtype: MaterialSubtype,
  regionState?: string
): CostEstimate {
  const regionalMultiplier = getRegionalMultiplier(regionState);

  const baseLow = subtype.priceLow ?? 0;
  const baseHigh = subtype.priceHigh ?? 0;
  const priceUnit = subtype.priceUnit ?? "unit";

  const totalLow = Math.round(quantity * baseLow * regionalMultiplier);
  const totalHigh = Math.round(quantity * baseHigh * regionalMultiplier);

  return {
    totalLow,
    totalHigh,
    unitLabel: priceUnit,
    breakdown: [],
  };
}

/**
 * Build a detailed cost estimate with line-item breakdown.
 */
export function estimateCostDetailed(
  items: Array<{
    label: string;
    quantity: number;
    unit: string;
    unitPriceLow: number;
    unitPriceHigh: number;
  }>,
  regionState?: string
): CostEstimate {
  const regionalMultiplier = getRegionalMultiplier(regionState);

  let totalLow = 0;
  let totalHigh = 0;

  const breakdown: CostBreakdownItem[] = items.map((item) => {
    const itemLow = Math.round(item.quantity * item.unitPriceLow * regionalMultiplier);
    const itemHigh = Math.round(item.quantity * item.unitPriceHigh * regionalMultiplier);
    totalLow += itemLow;
    totalHigh += itemHigh;
    return {
      label: item.label,
      quantity: item.quantity,
      unit: item.unit,
      priceRangeLow: Math.round(item.unitPriceLow * regionalMultiplier),
      priceRangeHigh: Math.round(item.unitPriceHigh * regionalMultiplier),
      totalLow: itemLow,
      totalHigh: itemHigh,
    };
  });

  return {
    totalLow,
    totalHigh,
    unitLabel: "total",
    breakdown,
  };
}

/**
 * Format a cost range as a string.
 */
export function formatCostRange(low: number, high: number): string {
  if (low === high) return `$${low.toLocaleString()}`;
  return `$${low.toLocaleString()} – $${high.toLocaleString()}`;
}

/**
 * National-average unit prices for common materials.
 * Used as defaults in material calculators.
 */
export const nationalPrices: Record<string, { low: number; high: number; unit: string }> = {
  mulch_cy: { low: 30, high: 45, unit: "cy" },
  mulch_bag_2cuft: { low: 3, high: 6, unit: "bag" },
  mulch_bag_3cuft: { low: 4, high: 8, unit: "bag" },
  topsoil_cy: { low: 25, high: 50, unit: "cy" },
  topsoil_bag: { low: 3, high: 8, unit: "bag" },
  gravel_ton: { low: 35, high: 70, unit: "ton" },
  concrete_cy: { low: 140, high: 170, unit: "cy" },
  concrete_80lb: { low: 5, high: 8, unit: "bag" },
  concrete_60lb: { low: 4, high: 7, unit: "bag" },
  concrete_40lb: { low: 3, high: 5, unit: "bag" },
  pavers_sqft: { low: 3, high: 15, unit: "sqft" },
  sand_ton: { low: 25, high: 50, unit: "ton" },
  sand_bag: { low: 5, high: 8, unit: "bag" },
  rock_ton: { low: 60, high: 150, unit: "ton" },
  sod_sqft: { low: 0.4, high: 0.8, unit: "sqft" },
  grass_seed_lb: { low: 4, high: 8, unit: "lb" },
  fertilizer_bag: { low: 15, high: 40, unit: "bag" },
  limestone_ton: { low: 30, high: 50, unit: "ton" },
  asphalt_ton: { low: 100, high: 200, unit: "ton" },
  decking_sqft_composite: { low: 5, high: 8, unit: "sqft" },
  decking_sqft_pt: { low: 3, high: 5, unit: "sqft" },
  decking_sqft_cedar: { low: 6, high: 10, unit: "sqft" },
  fence_wood_lnft: { low: 2, high: 5, unit: "lnft" },
  fence_vinyl_lnft: { low: 20, high: 40, unit: "lnft" },
  fence_chainlink_lnft: { low: 10, high: 20, unit: "lnft" },
  retaining_wall_block: { low: 2, high: 8, unit: "block" },
} as const;
