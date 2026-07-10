// Shared calculator engine: core volume/area/cost computations used by all calculators.
// Every material calculator delegates to this engine — never duplicate math.

import {
  type ConvertedDimensions,
  type LengthUnit,
  type DepthUnit,
  normalizeDimensions,
  cubicFeet,
  cubicYardsFromCuft,
  round,
} from "./units";
import { estimateCostDetailed, type CostEstimate } from "./pricing";

// ─── Core Results ────────────────────────────────────────────────

export interface BaseResults {
  /** Total cubic feet of material */
  cubicFeet: number;
  /** Total cubic yards of material */
  cubicYards: number;
  /** Square footage of area */
  squareFeet: number;
}

export interface BulkMaterialResults extends BaseResults {
  /** Estimated tons */
  tons: number;
  /** Number of bags needed */
  bags: number;
  /** Bag size in cubic feet used for bag count */
  bagSizeCuft: number;
}

export interface ConcreteResults extends BaseResults {
  /** 80 lb bags needed */
  bags80lb: number;
  /** 60 lb bags needed */
  bags60lb: number;
  /** 40 lb bags needed */
  bags40lb: number;
}

export interface PaverResults extends BaseResults {
  /** Total pavers needed */
  paversNeeded: number;
  /** Paver area (sqft each) */
  paverAreaSqft: number;
  /** Sand base (cubic feet) */
  sandBaseCuft: number;
  /** Sand base (tons) */
  sandBaseTons: number;
  /** Gravel base (cubic feet) */
  gravelBaseCuft: number;
  /** Gravel base (tons) */
  gravelBaseTons: number;
}

export interface SodResults {
  /** Square footage of area (with waste) */
  squareFeet: number;
  /** Number of rolls */
  rolls: number;
  /** Number of pallets */
  pallets: number;
  /** Rolls per pallet */
  rollsPerPallet: number;
}

export interface GrassSeedResults {
  /** Square footage of area */
  squareFeet: number;
  /** Pounds for new lawn */
  newLawnLbs: number;
  /** Pounds for overseeding */
  overseedLbs: number;
}

export interface FertilizerResults {
  /** Square footage of area */
  squareFeet: number;
  /** Pounds of fertilizer needed */
  lbsNeeded: number;
  /** Nitrogen rate used (lbs N / 1000 sqft) */
  nRate: number;
  /** NPK ratio used */
  npk: string;
}

export interface DeckingResults {
  /** Deck area */
  squareFeet: number;
  /** Number of deck boards */
  deckBoards: number;
  /** Number of joists */
  joists: number;
  /** Number of beams */
  beams: number;
  /** Number of posts */
  posts: number;
  /** Number of 80lb concrete bags for footings */
  concreteBags: number;
  /** Approximate screw count */
  screws: number;
}

export interface FencingResults {
  /** Linear feet of fence */
  linearFeet: number;
  /** Number of posts */
  posts: number;
  /** Number of rails */
  rails: number;
  /** Number of pickets */
  pickets: number;
  /** Number of 80lb concrete bags */
  concreteBags: number;
  /** Number of gates */
  gates: number;
}

export interface RetainingWallResults {
  /** Total blocks */
  totalBlocks: number;
  /** Blocks per course */
  blocksPerCourse: number;
  /** Number of courses */
  courses: number;
  /** Cap blocks */
  capBlocks: number;
  /** Base gravel (cubic yards) */
  baseGravelCuyd: number;
  /** Backfill gravel (cubic yards) */
  backfillGravelCuyd: number;
  /** Drainage pipe (linear feet) */
  drainagePipeFt: number;
}

// ─── Input Types ─────────────────────────────────────────────────

export interface BasicInput {
  length: number;
  width: number;
  depth: number;
  lengthUnit: LengthUnit;
  widthUnit: LengthUnit;
  depthUnit: DepthUnit;
}

export interface ConcreteInput extends BasicInput {
  type: "slab" | "footing" | "column";
  /** For footings — width in inches */
  footingWidthIn?: number;
  /** For columns — diameter in inches */
  columnDiameterIn?: number;
  /** For columns — height in feet */
  columnHeightFt?: number;
}

export interface PaverInput extends BasicInput {
  paverLengthIn: number;
  paverWidthIn: number;
  baseDepthIn: number;
}

export interface DeckingInput {
  length: number;
  width: number;
  lengthUnit: LengthUnit;
  widthUnit: LengthUnit;
}

export interface FencingInput {
  length: number;
  lengthUnit: LengthUnit;
  heightFt: number;
  gates: number;
}

export interface RetainingWallInput {
  length: number;
  lengthUnit: LengthUnit;
  height: number;
  heightUnit: LengthUnit;
  blockLengthIn: number;
  blockHeightIn: number;
  baseDepthIn: number;
  baseWidthIn: number;
  capLengthIn: number;
}

export interface FertilizerInput {
  length: number;
  width: number;
  lengthUnit: LengthUnit;
  widthUnit: LengthUnit;
  desiredNRate: number;
  nPercentage: number;
}

// ─── Bulk Material Engine ────────────────────────────────────────

export interface BulkCalcOptions {
  densityTonsPerCy: number;
  bagSizeCuft: number;
  compactionFactor?: number; // e.g. 1.1 for 10% extra
}

/**
 * Core bulk material calculation (mulch, soil, gravel, sand, rock, limestone).
 * All these materials use the same volume-to-tons-to-bags pipeline.
 */
export function calculateBulkMaterial(
  input: BasicInput,
  options: BulkCalcOptions
): BulkMaterialResults {
  const dims = normalizeDimensions(
    input.length, input.lengthUnit,
    input.width, input.widthUnit,
    input.depth, input.depthUnit
  );

  const compactionFactor = options.compactionFactor ?? 1.0;
  const cuft = round(cubicFeet(dims.areaSqft, dims.depthIn) * compactionFactor, 2);
  const cuyd = round(cubicYardsFromCuft(cuft), 2);
  const tons = round(cuyd * options.densityTonsPerCy, 2);
  const bags = Math.ceil(cuft / options.bagSizeCuft);

  return {
    cubicFeet: cuft,
    cubicYards: cuyd,
    squareFeet: round(dims.areaSqft, 1),
    tons,
    bags,
    bagSizeCuft: options.bagSizeCuft,
  };
}

// ─── Asphalt Engine ──────────────────────────────────────────────

/**
 * Asphalt calculation (cubic feet → tons using asphalt density of 145 lbs/cuft).
 */
export function calculateAsphalt(input: BasicInput): BulkMaterialResults & { asphaltTons: number } {
  const dims = normalizeDimensions(
    input.length, input.lengthUnit,
    input.width, input.widthUnit,
    input.depth, input.depthUnit
  );

  const cuft = round(cubicFeet(dims.areaSqft, dims.depthIn), 2);
  const cuyd = round(cubicYardsFromCuft(cuft), 2);
  const asphaltTons = round((cuft * 145) / 2000, 2);

  return {
    cubicFeet: cuft,
    cubicYards: cuyd,
    squareFeet: round(dims.areaSqft, 1),
    tons: asphaltTons,
    bags: 0,
    bagSizeCuft: 0,
    asphaltTons,
  };
}

// ─── Concrete Engine ─────────────────────────────────────────────

/**
 * Concrete calculation for slabs, footings, and columns.
 */
export function calculateConcrete(input: ConcreteInput): ConcreteResults {
  let cuft = 0;

  if (input.type === "slab") {
    const dims = normalizeDimensions(
      input.length, input.lengthUnit,
      input.width, input.widthUnit,
      input.depth, input.depthUnit
    );
    cuft = cubicFeet(dims.areaSqft, dims.depthIn);
  } else if (input.type === "footing") {
    const dims = normalizeDimensions(
      input.length, input.lengthUnit,
      (input.footingWidthIn ?? 12) / 12, "ft",
      input.depth, input.depthUnit
    );
    cuft = cubicFeet(dims.areaSqft, dims.depthIn);
  } else if (input.type === "column") {
    const radiusFt = (input.columnDiameterIn ?? 12) / 24;
    const heightFt = input.columnHeightFt ?? input.depth;
    cuft = Math.PI * radiusFt * radiusFt * heightFt;
  }

  const cuyd = round(cubicYardsFromCuft(cuft), 3);

  return {
    cubicFeet: round(cuft, 2),
    cubicYards: cuyd,
    squareFeet: round(input.length * input.width, 1),
    bags80lb: Math.ceil(cuyd / 0.022),
    bags60lb: Math.ceil(cuyd / 0.017),
    bags40lb: Math.ceil(cuyd / 0.011),
  };
}

// ─── Paver Engine ────────────────────────────────────────────────

export function calculatePavers(input: PaverInput, existingArea?: ConvertedDimensions): PaverResults {
  const dims = existingArea ?? normalizeDimensions(
    input.length, input.lengthUnit,
    input.width, input.widthUnit,
    input.depth, input.depthUnit
  );

  const areaWithWaste = round(dims.areaSqft * 1.1, 1); // 10% waste
  const paverAreaSqft = round((input.paverLengthIn / 12) * (input.paverWidthIn / 12), 3);
  const paversNeeded = Math.ceil(areaWithWaste / paverAreaSqft);

  // Sand base (1 inch)
  const sandBaseCuft = round(areaWithWaste * (1 / 12), 2);
  const sandBaseTons = round((sandBaseCuft * 100) / 2000, 2);

  // Gravel base
  const gravelBaseCuft = round(areaWithWaste * (input.baseDepthIn / 12), 2);
  const gravelBaseTons = round((gravelBaseCuft * 135) / 2000, 2);

  return {
    cubicFeet: gravelBaseCuft + sandBaseCuft,
    cubicYards: round(cubicYardsFromCuft(gravelBaseCuft + sandBaseCuft), 2),
    squareFeet: areaWithWaste,
    paversNeeded,
    paverAreaSqft,
    sandBaseCuft,
    sandBaseTons,
    gravelBaseCuft,
    gravelBaseTons,
  };
}

// ─── Sod Engine ──────────────────────────────────────────────────

export function calculateSod(
  length: number, width: number,
  lengthUnit: LengthUnit, widthUnit: LengthUnit,
  rollSqft: number = 10,
  rollsPerPallet: number = 50
): SodResults {
  const dims = normalizeDimensions(length, lengthUnit, width, widthUnit, 0, "in");
  const areaWithWaste = round(dims.areaSqft * 1.05, 1);
  const rolls = Math.ceil(areaWithWaste / rollSqft);
  const pallets = Math.ceil(rolls / rollsPerPallet);

  return {
    squareFeet: areaWithWaste,
    rolls,
    pallets,
    rollsPerPallet,
  };
}

// ─── Grass Seed Engine ───────────────────────────────────────────

export function calculateGrassSeed(
  length: number, width: number,
  lengthUnit: LengthUnit, widthUnit: LengthUnit
): GrassSeedResults {
  const dims = normalizeDimensions(length, lengthUnit, width, widthUnit, 0, "in");
  const areaSqft = dims.areaSqft;

  return {
    squareFeet: round(areaSqft, 1),
    newLawnLbs: round((areaSqft / 1000) * 6, 2),
    overseedLbs: round((areaSqft / 1000) * 3, 2),
  };
}

// ─── Fertilizer Engine ───────────────────────────────────────────

export function calculateFertilizer(input: FertilizerInput): FertilizerResults {
  const dims = normalizeDimensions(
    input.length, input.lengthUnit,
    input.width, input.widthUnit,
    0, "in"
  );

  const lbsNeeded = round(
    (dims.areaSqft / 1000) * (input.desiredNRate / (input.nPercentage / 100)),
    2
  );

  return {
    squareFeet: round(dims.areaSqft, 1),
    lbsNeeded,
    nRate: input.desiredNRate,
    npk: `${input.nPercentage}-0-0`,
  };
}

// ─── Decking Engine ──────────────────────────────────────────────

export function calculateDecking(input: DeckingInput): DeckingResults {
  const dims = normalizeDimensions(
    input.length, input.lengthUnit,
    input.width, input.widthUnit,
    0, "in"
  );

  const area = dims.areaSqft;
  const boardCoverageSqft = (5.5 / 12) * dims.lengthFt;
  const deckBoards = Math.ceil((area / boardCoverageSqft) * 1.1);
  const joists = Math.ceil(dims.widthFt / (16 / 12)) + 1;
  const beams = dims.lengthFt > 12 ? 3 : 2;
  const posts = beams * Math.ceil(dims.lengthFt / 8);
  const concreteBags = posts * 2;
  const screws = deckBoards * 32;

  return {
    squareFeet: round(area, 1),
    deckBoards,
    joists,
    beams,
    posts,
    concreteBags,
    screws,
  };
}

// ─── Fencing Engine ──────────────────────────────────────────────

export function calculateFencing(input: FencingInput): FencingResults {
  const dims = normalizeDimensions(
    input.length, input.lengthUnit,
    0, "ft",
    0, "in"
  );

  const linearFeet = dims.lengthFt;
  const posts = Math.ceil(linearFeet / 8) + 1;
  const railCount = input.heightFt >= 6 ? 3 : 2;
  const rails = (posts - 1) * railCount;
  const pickets = Math.ceil((linearFeet / (5.5 / 12)) * 1.05);
  const concreteBags = Math.ceil(posts * 1.5);

  return {
    linearFeet: round(linearFeet, 1),
    posts,
    rails,
    pickets,
    concreteBags,
    gates: input.gates,
  };
}

// ─── Retaining Wall Engine ───────────────────────────────────────

export function calculateRetainingWall(input: RetainingWallInput): RetainingWallResults {
  const dims = normalizeDimensions(
    input.length, input.lengthUnit,
    input.height, input.heightUnit,
    0, "in"
  );

  const blockLengthFt = input.blockLengthIn / 12;
  const blockHeightFt = input.blockHeightIn / 12;

  const blocksPerCourse = Math.ceil(dims.lengthFt / blockLengthFt);
  const courses = Math.ceil(dims.widthFt / blockHeightFt);
  const totalBlocks = Math.ceil(blocksPerCourse * courses * 1.1);
  const capBlocks = Math.ceil(dims.lengthFt / (input.capLengthIn / 12));

  const baseGravelCuyd = round(
    dims.lengthFt * (input.baseDepthIn / 12) * (input.baseWidthIn / 12) / 27,
    2
  );
  const backfillGravelCuyd = round(dims.lengthFt * dims.widthFt * 1 / 27, 2);
  const drainagePipeFt = dims.lengthFt;

  return {
    totalBlocks,
    blocksPerCourse,
    courses,
    capBlocks,
    baseGravelCuyd,
    backfillGravelCuyd,
    drainagePipeFt,
  };
}
