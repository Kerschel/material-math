// Decking Calculator
import {
  calculateDecking,
  type DeckingInput,
  type DeckingResults,
} from "@/lib/calculator-engine";
import { nationalPrices, estimateCostDetailed, type CostEstimate } from "@/lib/pricing";
import type { MaterialSubtype } from "@/data/material-constants";

export interface DeckingCalcResults extends DeckingResults {
  costEstimate: CostEstimate;
}

export function calculateDeckingCost(
  input: DeckingInput,
  subtype?: MaterialSubtype
): DeckingCalcResults {
  const base = calculateDecking(input);

  const materialName = subtype?.name ?? "Pressure-Treated";
  let deckingPriceLow: number;
  let deckingPriceHigh: number;

  if (materialName.includes("Composite")) {
    deckingPriceLow = nationalPrices.decking_sqft_composite.low;
    deckingPriceHigh = nationalPrices.decking_sqft_composite.high;
  } else if (materialName.includes("Cedar")) {
    deckingPriceLow = nationalPrices.decking_sqft_cedar.low;
    deckingPriceHigh = nationalPrices.decking_sqft_cedar.high;
  } else {
    deckingPriceLow = nationalPrices.decking_sqft_pt.low;
    deckingPriceHigh = nationalPrices.decking_sqft_pt.high;
  }

  const costEstimate = estimateCostDetailed([
    {
      label: "Deck Boards",
      quantity: base.deckBoards,
      unit: "boards",
      unitPriceLow: deckingPriceLow * (base.squareFeet / base.deckBoards),
      unitPriceHigh: deckingPriceHigh * (base.squareFeet / base.deckBoards),
    },
    {
      label: "Joists (2×6×12)",
      quantity: base.joists,
      unit: "joists",
      unitPriceLow: 12,
      unitPriceHigh: 20,
    },
    {
      label: "Concrete Footings",
      quantity: base.concreteBags,
      unit: "bags",
      unitPriceLow: nationalPrices.concrete_80lb.low,
      unitPriceHigh: nationalPrices.concrete_80lb.high,
    },
    {
      label: "Screws",
      quantity: Math.ceil(base.screws / 100),
      unit: "boxes",
      unitPriceLow: 8,
      unitPriceHigh: 15,
    },
  ]);

  return { ...base, costEstimate };
}
