// Paver Calculator
import {
  calculatePavers,
  type PaverInput,
  type PaverResults,
} from "@/lib/calculator-engine";
import { nationalPrices, estimateCostDetailed, type CostEstimate } from "@/lib/pricing";

export interface PaverCalcResults extends PaverResults {
  costEstimate: CostEstimate;
}

const paverSizeMap: Record<string, { l: number; w: number }> = {
  "4\"×8\"": { l: 4, w: 8 },
  "6\"×6\"": { l: 6, w: 6 },
  "6\"×9\"": { l: 6, w: 9 },
  "12\"×12\"": { l: 12, w: 12 },
  "16\"×16\"": { l: 16, w: 16 },
};

export function calculatePaverProject(input: {
  length: number;
  width: number;
  lengthUnit: "ft" | "in" | "yd" | "m" | "cm";
  widthUnit: "ft" | "in" | "yd" | "m" | "cm";
  paverSize: string;
  baseDepthIn: number;
}): PaverCalcResults {
  const size = paverSizeMap[input.paverSize] ?? { l: 4, w: 8 };

  const paveInput: PaverInput = {
    length: input.length,
    width: input.width,
    depth: 0,
    lengthUnit: input.lengthUnit,
    widthUnit: input.widthUnit,
    depthUnit: "in",
    paverLengthIn: size.l,
    paverWidthIn: size.w,
    baseDepthIn: input.baseDepthIn,
  };

  const base = calculatePavers(paveInput);

  const costEstimate = estimateCostDetailed([
    {
      label: "Pavers",
      quantity: base.paversNeeded,
      unit: "pavers",
      unitPriceLow: 0.5,
      unitPriceHigh: 3,
    },
    {
      label: "Sand Base",
      quantity: base.sandBaseTons,
      unit: "tons",
      unitPriceLow: nationalPrices.sand_ton.low,
      unitPriceHigh: nationalPrices.sand_ton.high,
    },
    {
      label: "Gravel Base",
      quantity: base.gravelBaseTons,
      unit: "tons",
      unitPriceLow: nationalPrices.gravel_ton.low,
      unitPriceHigh: nationalPrices.gravel_ton.high,
    },
  ]);

  return { ...base, costEstimate };
}
