// Concrete Calculator
import {
  calculateConcrete,
  type ConcreteInput,
  type ConcreteResults,
} from "@/lib/calculator-engine";
import { nationalPrices, type CostEstimate } from "@/lib/pricing";

export interface ConcreteCalcResults extends ConcreteResults {
  costEstimate: CostEstimate;
}

export function calculateConcreteCost(
  input: ConcreteInput,
  bagType: "ready-mix" | "80lb" | "60lb" | "40lb" = "ready-mix"
): ConcreteCalcResults {
  const base = calculateConcrete(input);

  let costLow = 0;
  let costHigh = 0;
  let unitLabel = "";

  switch (bagType) {
    case "ready-mix":
      costLow = base.cubicYards * nationalPrices.concrete_cy.low;
      costHigh = base.cubicYards * nationalPrices.concrete_cy.high;
      unitLabel = "ready-mix (cy)";
      break;
    case "80lb":
      costLow = base.bags80lb * nationalPrices.concrete_80lb.low;
      costHigh = base.bags80lb * nationalPrices.concrete_80lb.high;
      unitLabel = "80 lb bags";
      break;
    case "60lb":
      costLow = base.bags60lb * nationalPrices.concrete_60lb.low;
      costHigh = base.bags60lb * nationalPrices.concrete_60lb.high;
      unitLabel = "60 lb bags";
      break;
    case "40lb":
      costLow = base.bags40lb * nationalPrices.concrete_40lb.low;
      costHigh = base.bags40lb * nationalPrices.concrete_40lb.high;
      unitLabel = "40 lb bags";
      break;
  }

  return {
    ...base,
    costEstimate: {
      totalLow: Math.round(costLow),
      totalHigh: Math.round(costHigh),
      unitLabel,
      breakdown: [],
    },
  };
}
