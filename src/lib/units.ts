// Unit conversion utilities for all calculators

export type LengthUnit = "ft" | "in" | "yd" | "m" | "cm";
export type DepthUnit = "in" | "ft" | "cm";
export type AreaUnit = "sqft" | "sqyd" | "sqm";
export type VolumeUnit = "cuft" | "cuyd" | "cum";
export type WeightUnit = "lb" | "ton";

export interface ConvertedDimensions {
  lengthFt: number;
  widthFt: number;
  depthIn: number;
  areaSqft: number;
}

/**
 * Convert any length unit to feet.
 */
export function toFeet(value: number, unit: LengthUnit): number {
  switch (unit) {
    case "ft":
      return value;
    case "in":
      return value / 12;
    case "yd":
      return value * 3;
    case "m":
      return value * 3.28084;
    case "cm":
      return value / 30.48;
  }
}

/**
 * Convert any depth unit to inches.
 */
export function toInches(value: number, unit: DepthUnit): number {
  switch (unit) {
    case "in":
      return value;
    case "ft":
      return value * 12;
    case "cm":
      return value / 2.54;
  }
}

/**
 * Convert feet to the target unit.
 */
export function fromFeet(value: number, target: LengthUnit): number {
  switch (target) {
    case "ft":
      return value;
    case "in":
      return value * 12;
    case "yd":
      return value / 3;
    case "m":
      return value / 3.28084;
    case "cm":
      return value * 30.48;
  }
}

/**
 * Convert inches to the target unit.
 */
export function fromInches(value: number, target: DepthUnit): number {
  switch (target) {
    case "in":
      return value;
    case "ft":
      return value / 12;
    case "cm":
      return value * 2.54;
  }
}

/**
 * Normalize user inputs into a standard set of dimensions (feet, inches, sqft).
 */
export function normalizeDimensions(
  length: number,
  lengthUnit: LengthUnit,
  width: number,
  widthUnit: LengthUnit,
  depth: number,
  depthUnit: DepthUnit
): ConvertedDimensions {
  const lengthFt = toFeet(length, lengthUnit);
  const widthFt = toFeet(width, widthUnit);
  const depthIn = toInches(depth, depthUnit);
  const areaSqft = lengthFt * widthFt;
  return { lengthFt, widthFt, depthIn, areaSqft };
}

/**
 * Cubic feet from area (sqft) × depth (in).
 */
export function cubicFeet(areaSqft: number, depthIn: number): number {
  return areaSqft * (depthIn / 12);
}

/**
 * Cubic yards from cubic feet.
 */
export function cubicYardsFromCuft(cuft: number): number {
  return cuft / 27;
}

/**
 * Cubic yards from area and depth directly.
 */
export function cubicYardsFromArea(areaSqft: number, depthIn: number): number {
  return cubicYardsFromCuft(cubicFeet(areaSqft, depthIn));
}

/**
 * Round to a given number of decimal places.
 */
export function round(value: number, places: number = 2): number {
  const factor = Math.pow(10, places);
  return Math.round(value * factor) / factor;
}

/**
 * Format a number with locale string and optional unit suffix.
 */
export function formatNumber(value: number, decimals: number = 1): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format currency in USD.
 */
export function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
