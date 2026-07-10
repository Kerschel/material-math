// Brick Calculator
import {
  type ConvertedDimensions,
  normalizeDimensions,
  round,
} from "@/lib/units";
import { type CostEstimate } from "@/lib/pricing";
import type { MaterialSubtype } from "@/data/material-constants";

export interface BrickResults {
  bricksNeeded: number;
  bricksPerSqft: number;
  squareFeet: number;
  mortarCubicFeet: number;
  costEstimate: CostEstimate;
}

export interface BrickInput {
  length: number;
  width: number;  // height of wall
  lengthUnit: "ft" | "in" | "yd" | "m" | "cm";
  widthUnit: "ft" | "in" | "yd" | "m" | "cm";
  brickLengthIn: number;
  brickWidthIn: number;
  mortarGapIn: number;
  wastePercent: number;
}

export function calculateBricks(
  input: BrickInput,
  subtype?: MaterialSubtype
): BrickResults {
  const dims = normalizeDimensions(
    input.length, input.lengthUnit,
    input.width, input.widthUnit,
    0, "in"
  );

  // Bricks per sq ft with mortar gap
  const brickWithMortarL = (input.brickLengthIn + input.mortarGapIn) / 12; // in feet
  const brickWithMortarW = (input.brickWidthIn + input.mortarGapIn) / 12;
  const brickAreaWithMortar = brickWithMortarL * brickWithMortarW; // sqft per brick unit

  const bricksPerSqft = round(1 / brickAreaWithMortar, 1);
  const wasteFactor = 1 + input.wastePercent / 100;
  const bricksNeeded = Math.ceil(dims.areaSqft * bricksPerSqft * wasteFactor);

  // Mortar estimate (approx 3.6 cu ft per 100 sq ft at 3/8" joints)
  const mortarCubicFeet = round(dims.areaSqft * 0.036, 2);

  const priceLow = subtype?.priceLow ?? 0.5;
  const priceHigh = subtype?.priceHigh ?? 1.5;
  const costLow = Math.round(bricksNeeded * priceLow);
  const costHigh = Math.round(bricksNeeded * priceHigh);

  return {
    bricksNeeded,
    bricksPerSqft,
    squareFeet: round(dims.areaSqft, 1),
    mortarCubicFeet,
    costEstimate: {
      totalLow: costLow,
      totalHigh: costHigh,
      unitLabel: "bricks",
      breakdown: [],
    },
  };
}
