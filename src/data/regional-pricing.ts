// Regional pricing multipliers for materials across US regions
// These multipliers are applied to the base national prices from pricing.ts

export type Region =
  | "national"
  | "northeast"
  | "southeast"
  | "midwest"
  | "southwest"
  | "west";

export interface RegionalMultiplier {
  name: string;
  multiplier: number;
  states: string[];
}

export const regionalMultipliers: Record<Region, RegionalMultiplier> = {
  national: {
    name: "National Average",
    multiplier: 1.0,
    states: [],
  },
  northeast: {
    name: "Northeast",
    multiplier: 1.15,
    states: ["ME", "NH", "VT", "MA", "RI", "CT", "NY", "NJ", "PA"],
  },
  southeast: {
    name: "Southeast",
    multiplier: 0.92,
    states: [
      "FL", "GA", "AL", "MS", "SC", "NC", "TN", "AR", "LA",
      "VA", "WV", "KY",
    ],
  },
  midwest: {
    name: "Midwest",
    multiplier: 0.95,
    states: [
      "OH", "IN", "IL", "MI", "WI", "MN", "IA", "MO", "KS",
      "NE", "SD", "ND",
    ],
  },
  southwest: {
    name: "Southwest",
    multiplier: 1.05,
    states: ["TX", "OK", "NM", "AZ"],
  },
  west: {
    name: "West",
    multiplier: 1.2,
    states: ["CA", "OR", "WA", "NV", "CO", "UT", "ID", "MT", "WY", "AK", "HI"],
  },
};

/**
 * Get the regional multiplier for a given state abbreviation.
 */
export function getRegionalMultiplier(state?: string): number {
  if (!state) return 1.0;
  const upperState = state.toUpperCase();
  for (const [_, region] of Object.entries(regionalMultipliers)) {
    if (region.states.includes(upperState)) {
      return region.multiplier;
    }
  }
  return 1.0;
}

/**
 * Get the region name for a given state abbreviation.
 */
export function getRegionName(state?: string): string {
  if (!state) return "National Average";
  const upperState = state.toUpperCase();
  for (const [_, region] of Object.entries(regionalMultipliers)) {
    if (region.states.includes(upperState)) {
      return region.name;
    }
  }
  return "National Average";
}
