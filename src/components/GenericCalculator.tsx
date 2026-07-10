"use client";

import { useState, useCallback } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { DimensionInput, LENGTH_UNITS, DEPTH_UNITS } from "@/components/DimensionInput";
import { ResultsPanel } from "@/components/ResultsPanel";
import { CostBreakdown } from "@/components/CostBreakdown";
import { MaterialSelector } from "@/components/MaterialSelector";
import { HowToGuide } from "@/components/HowToGuide";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { materialConfigs, type MaterialSlug, type MaterialSubtype } from "@/data/material-constants";
import { getPresetCards, type DimensionPreset } from "@/lib/seo/programmatic-pages";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { round, formatNumber } from "@/lib/units";

import type { LengthUnit, DepthUnit } from "@/lib/units";

// ─── Calculator imports ──────────────────────────────────────────
import { calculateMulch, type MulchResults } from "@/lib/materials/mulch";
import { calculateSoil, type SoilResults } from "@/lib/materials/soil";
import { calculateGravel, type GravelResults } from "@/lib/materials/gravel";
import { calculateConcreteCost, type ConcreteCalcResults } from "@/lib/materials/concrete";
import { calculatePaverProject, type PaverCalcResults } from "@/lib/materials/pavers";
import { calculateSand, type SandResults } from "@/lib/materials/sand";
import { calculateRock, type RockResults } from "@/lib/materials/rock";
import { calculateSodCost, type SodCalcResults } from "@/lib/materials/sod";
import { calculateGrassSeedCost, type GrassSeedCalcResults } from "@/lib/materials/grass-seed";
import { calculateFertilizerCost, type FertilizerCalcResults } from "@/lib/materials/fertilizer";
import { calculateLimestone, type LimestoneResults } from "@/lib/materials/limestone";
import { calculateAsphaltCost, type AsphaltResults } from "@/lib/materials/asphalt";
import { calculateDeckingCost, type DeckingCalcResults } from "@/lib/materials/decking";
import { calculateFencingCost, type FencingCalcResults } from "@/lib/materials/fencing";
import { calculateRetainingWallCost, type RetainingWallCalcResults } from "@/lib/materials/retaining-wall";

type CalculatorResult =
  | MulchResults
  | SoilResults
  | GravelResults
  | ConcreteCalcResults
  | PaverCalcResults
  | SandResults
  | RockResults
  | SodCalcResults
  | GrassSeedCalcResults
  | FertilizerCalcResults
  | LimestoneResults
  | AsphaltResults
  | DeckingCalcResults
  | FencingCalcResults
  | RetainingWallCalcResults
  | null;

interface GenericCalculatorProps {
  slug: MaterialSlug;
}

export function GenericCalculator({ slug }: GenericCalculatorProps) {
  const config = materialConfigs[slug];
  if (!config) return <div>Calculator not found.</div>;

  const subtypes = config.subtypes;
  const [subtypeName, setSubtypeName] = useState<string>(subtypes[0]?.name ?? "");
  const selectedSubtype = subtypes.find((s) => s.name === subtypeName) ?? subtypes[0];

  // Input state
  const [length, setLength] = useState(10);
  const [width, setWidth] = useState(10);
  const [depth, setDepth] = useState(config.defaultDepthIn);
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>("ft");
  const [widthUnit, setWidthUnit] = useState<LengthUnit>("ft");
  const [depthUnit, setDepthUnit] = useState<DepthUnit>("in");

  // Extra state for special calculators
  const [fenceHeight, setFenceHeight] = useState(6);
  const [fenceGates, setFenceGates] = useState(0);
  const [paverSize, setPaverSize] = useState("4\"×8\"");
  const [baseDepthIn, setBaseDepthIn] = useState(6);
  const [grassType, setGrassType] = useState<"new" | "overseed">("new");
  const [npk, setNpk] = useState("10-10-10");
  const [concreteType, setConcreteType] = useState<"slab" | "footing" | "column">("slab");

  const [result, setResult] = useState<CalculatorResult>(null);

  const calculate = useCallback(() => {
    let r: CalculatorResult = null;

    switch (slug) {
      case "mulch":
        r = calculateMulch({ length, width, depth, lengthUnit, widthUnit, depthUnit });
        break;
      case "soil":
        r = calculateSoil({ length, width, depth, lengthUnit, widthUnit, depthUnit });
        break;
      case "gravel":
        r = calculateGravel({ length, width, depth, lengthUnit, widthUnit, depthUnit }, selectedSubtype);
        break;
      case "concrete":
        r = calculateConcreteCost(
          { length, width, depth, lengthUnit, widthUnit, depthUnit, type: concreteType },
          "ready-mix"
        );
        break;
      case "sand":
        r = calculateSand({ length, width, depth, lengthUnit, widthUnit, depthUnit });
        break;
      case "rock":
        r = calculateRock({ length, width, depth, lengthUnit, widthUnit, depthUnit }, selectedSubtype);
        break;
      case "limestone":
        r = calculateLimestone({ length, width, depth, lengthUnit, widthUnit, depthUnit });
        break;
      case "asphalt":
        r = calculateAsphaltCost({ length, width, depth, lengthUnit, widthUnit, depthUnit });
        break;
      case "pavers":
        r = calculatePaverProject({ length, width, lengthUnit, widthUnit, paverSize, baseDepthIn });
        break;
      case "sod":
        r = calculateSodCost(length, width, lengthUnit, widthUnit);
        break;
      case "grass-seed":
        r = calculateGrassSeedCost(length, width, lengthUnit, widthUnit, grassType === "new");
        break;
      case "fertilizer":
        r = calculateFertilizerCost({
          length,
          width,
          lengthUnit,
          widthUnit,
          desiredNRate: 1,
          npk,
        });
        break;
      case "decking":
        r = calculateDeckingCost({ length, width, lengthUnit, widthUnit }, selectedSubtype);
        break;
      case "fencing":
        r = calculateFencingCost(
          { length, lengthUnit, heightFt: fenceHeight, gates: fenceGates },
          selectedSubtype
        );
        break;
      case "retaining-wall": {
        const isLargeBlock = subtypeName.includes("18\"");
        r = calculateRetainingWallCost(
          {
            length,
            lengthUnit,
            height: fenceHeight, // reuse fence height input
            heightUnit: "ft",
            blockLengthIn: isLargeBlock ? 18 : 12,
            blockHeightIn: isLargeBlock ? 6 : 4,
            baseDepthIn: 6,
            baseWidthIn: 24,
            capLengthIn: isLargeBlock ? 18 : 12,
          },
          selectedSubtype
        );
        break;
      }
    }

    setResult(r);
  }, [
    slug, length, width, depth, lengthUnit, widthUnit, depthUnit,
    selectedSubtype, concreteType, paverSize, baseDepthIn, grassType,
    npk, fenceHeight, fenceGates, subtypeName,
  ]);

  // Build result items
  const buildResultItems = useCallback((): { label: string; value: number | string; unit?: string; highlight?: boolean }[] => {
    if (!result) return [];

    const items: { label: string; value: number | string; unit?: string; highlight?: boolean }[] = [];

    // Common items in all results
    if ("squareFeet" in result) {
      items.push({ label: "Area", value: result.squareFeet, unit: "sq ft" });
    }
    if ("cubicFeet" in result && result.cubicFeet > 0) {
      items.push({ label: "Volume", value: result.cubicFeet, unit: "cu ft", highlight: true });
    }
    if ("cubicYards" in result && result.cubicYards > 0) {
      items.push({ label: "Volume", value: result.cubicYards, unit: "cu yd", highlight: true });
    }
    if ("tons" in result && result.tons > 0) {
      items.push({ label: "Weight", value: result.tons, unit: "tons" });
    }
    if ("bags" in result && result.bags > 0) {
      items.push({ label: "Bags", value: result.bags, unit: `bags` });
    }
    if ("bags2cuft" in result) {
      const r = result as MulchResults;
      items.push({ label: "2 cu ft Bags", value: r.bags2cuft, unit: "bags" });
      items.push({ label: "3 cu ft Bags", value: r.bags3cuft, unit: "bags" });
    }
    if ("bags80lb" in result) {
      const r = result as ConcreteCalcResults;
      items.push({ label: "80 lb Bags", value: r.bags80lb, unit: "bags" });
      items.push({ label: "60 lb Bags", value: r.bags60lb, unit: "bags" });
      items.push({ label: "40 lb Bags", value: r.bags40lb, unit: "bags" });
    }
    if ("paversNeeded" in result) {
      const r = result as PaverCalcResults;
      items.push({ label: "Pavers Needed", value: r.paversNeeded, unit: "pavers", highlight: true });
      items.push({ label: "Sand Base", value: r.sandBaseTons, unit: "tons" });
      items.push({ label: "Gravel Base", value: r.gravelBaseTons, unit: "tons" });
    }
    if ("rolls" in result) {
      const r = result as SodCalcResults;
      items.push({ label: "Rolls", value: r.rolls, unit: "rolls", highlight: true });
      items.push({ label: "Pallets", value: r.pallets, unit: "pallets" });
    }
    if ("newLawnLbs" in result) {
      const r = result as GrassSeedCalcResults;
      items.push({ label: "New Lawn Seed", value: r.newLawnLbs, unit: "lbs", highlight: true });
      items.push({ label: "Overseed", value: r.overseedLbs, unit: "lbs" });
    }
    if ("lbsNeeded" in result && "bagsNeeded" in result) {
      const r = result as FertilizerCalcResults;
      items.push({ label: "Fertilizer", value: r.lbsNeeded, unit: "lbs", highlight: true });
      items.push({ label: "50 lb Bags", value: r.bagsNeeded, unit: "bags" });
    }
    if ("deckBoards" in result) {
      const r = result as DeckingCalcResults;
      items.push({ label: "Deck Boards", value: r.deckBoards, unit: "boards", highlight: true });
      items.push({ label: "Joists", value: r.joists, unit: "joists" });
      items.push({ label: "Beams", value: r.beams, unit: "beams" });
      items.push({ label: "Posts", value: r.posts, unit: "posts" });
      items.push({ label: "Concrete Bags", value: r.concreteBags, unit: "80lb bags" });
      items.push({ label: "Screws", value: r.screws, unit: "screws" });
    }
    if ("linearFeet" in result) {
      const r = result as FencingCalcResults;
      items.push({ label: "Fence Length", value: r.linearFeet, unit: "ft" });
      items.push({ label: "Posts", value: r.posts, unit: "posts", highlight: true });
      items.push({ label: "Rails", value: r.rails, unit: "rails" });
      items.push({ label: "Pickets", value: r.pickets, unit: "pickets" });
      items.push({ label: "Concrete", value: r.concreteBags, unit: "80lb bags" });
    }
    if ("totalBlocks" in result) {
      const r = result as RetainingWallCalcResults;
      items.push({ label: "Wall Blocks", value: r.totalBlocks, unit: "blocks", highlight: true });
      items.push({ label: "Courses", value: r.courses, unit: "courses" });
      items.push({ label: "Cap Blocks", value: r.capBlocks, unit: "caps" });
      items.push({ label: "Base Gravel", value: r.baseGravelCuyd, unit: "cu yd" });
      items.push({ label: "Backfill Gravel", value: r.backfillGravelCuyd, unit: "cu yd" });
      items.push({ label: "Drain Pipe", value: r.drainagePipeFt, unit: "ft" });
    }
    if ("asphaltTons" in result && !items.some((i) => i.label === "Weight")) {
      const r = result as AsphaltResults;
      items.push({ label: "Asphalt", value: r.asphaltTons, unit: "tons", highlight: true });
    }

    return items;
  }, [result]);

  // Build steps for HowToGuide
  const steps = getStepsForMaterial(slug, config.displayName);
  const tips = getTipsForMaterial(slug);

  // Preset cards
  const presetCards = getPresetCards(slug);

  return (
    <CalculatorLayout
      title={`${config.displayName} Calculator`}
      description={config.description}
      icon={config.icon}
    >
      {/* Input Section */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DimensionInput
            label="Length"
            value={length}
            onChange={setLength}
            unit={lengthUnit}
            onUnitChange={(u) => setLengthUnit(u as LengthUnit)}
            unitOptions={LENGTH_UNITS}
          />
          <DimensionInput
            label="Width"
            value={width}
            onChange={setWidth}
            unit={widthUnit}
            onUnitChange={(u) => setWidthUnit(u as LengthUnit)}
            unitOptions={LENGTH_UNITS}
          />

          {/* Depth (not for all calculators) */}
          {!["sod", "grass-seed", "decking", "fencing"].includes(slug) && (
            <DimensionInput
              label={slug === "pavers" ? "Base Depth" : "Depth"}
              value={depth}
              onChange={setDepth}
              unit={depthUnit}
              onUnitChange={(u) => setDepthUnit(u as DepthUnit)}
              unitOptions={DEPTH_UNITS}
            />
          )}
        </div>

        {/* Material subtype selector */}
        {subtypes.length > 1 && !["concrete", "pavers", "fertilizer"].includes(slug) && (
          <MaterialSelector
            subtypes={subtypes}
            selected={subtypeName}
            onSelect={setSubtypeName}
          />
        )}

        {/* Special inputs for specific calculators */}
        {slug === "concrete" && (
          <div className="flex gap-4 items-end">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Concrete Type</label>
              <Tabs value={concreteType} onValueChange={(v) => setConcreteType(v as "slab" | "footing" | "column")}>
                <TabsList>
                  <TabsTrigger value="slab">Slab</TabsTrigger>
                  <TabsTrigger value="footing">Footing</TabsTrigger>
                  <TabsTrigger value="column">Column</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        )}

        {slug === "pavers" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Paver Size</label>
              <select
                value={paverSize}
                onChange={(e) => setPaverSize(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              >
                <option value='4"×8"'>4&quot;×8&quot;</option>
                <option value='6"×6"'>6&quot;×6&quot;</option>
                <option value='6"×9"'>6&quot;×9&quot;</option>
                <option value='12"×12"'>12&quot;×12&quot;</option>
                <option value='16"×16"'>16&quot;×16&quot;</option>
              </select>
            </div>
            <DimensionInput
              label="Base Depth"
              value={baseDepthIn}
              onChange={setBaseDepthIn}
              unit={depthUnit}
              onUnitChange={(u) => setDepthUnit(u as DepthUnit)}
              unitOptions={DEPTH_UNITS}
            />
          </div>
        )}

        {slug === "grass-seed" && (
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Lawn Type</label>
            <Tabs value={grassType} onValueChange={(v) => setGrassType(v as "new" | "overseed")}>
              <TabsList>
                <TabsTrigger value="new">New Lawn</TabsTrigger>
                <TabsTrigger value="overseed">Overseeding</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}

        {slug === "fertilizer" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">NPK Ratio</label>
              <select
                value={npk}
                onChange={(e) => setNpk(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="10-10-10">10-10-10</option>
                <option value="29-0-4">29-0-4</option>
                <option value="16-4-8">16-4-8</option>
                <option value="32-0-4">32-0-4</option>
              </select>
            </div>
          </div>
        )}

        {slug === "fencing" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DimensionInput
              label="Fence Height"
              value={fenceHeight}
              onChange={setFenceHeight}
              unit={lengthUnit}
              onUnitChange={(u) => setLengthUnit(u as LengthUnit)}
              unitOptions={LENGTH_UNITS}
            />
            <DimensionInput
              label="Number of Gates"
              value={fenceGates}
              onChange={setFenceGates}
              unit="ft"
              onUnitChange={() => {}}
              unitOptions={[{ value: "ft", label: "" }]}
            />
          </div>
        )}

        {slug === "retaining-wall" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DimensionInput
              label="Wall Height"
              value={fenceHeight}
              onChange={setFenceHeight}
              unit={lengthUnit}
              onUnitChange={(u) => setLengthUnit(u as LengthUnit)}
              unitOptions={LENGTH_UNITS}
            />
          </div>
        )}

        {/* Calculate Button */}
        <Button
          onClick={calculate}
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-2.5 text-base"
        >
          Calculate {config.displayName}
        </Button>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-8 space-y-6">
          <ResultsPanel
            title="Your Material Estimate"
            items={buildResultItems()}
          />

          {"costEstimate" in result && (
            <CostBreakdown costEstimate={result.costEstimate} />
          )}
        </div>
      )}

      {/* Common Project Sizes */}
      {presetCards.length > 0 && (
        <div className="mt-12 border-t pt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Common {config.displayName} Project Sizes
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {presetCards.map((card) => (
              <Link
                key={card.slug}
                href={`/calculators/${slug}/${card.slug}`}
                className="block"
              >
                <Card className="h-full hover:border-green-400 hover:shadow-sm transition-all cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <p className="font-semibold text-gray-800">
                      {card.length}×{card.width} ft
                    </p>
                    <p className="text-xs text-gray-500">{card.context}</p>
                    <p className="text-xs text-gray-400">
                      {card.depth} {card.depthUnit} deep
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* How To Guide */}
      <HowToGuide
        materialName={config.displayName}
        steps={steps}
        tips={tips}
      />
    </CalculatorLayout>
  );
}

// ─── Helper functions for per-material guides ────────────────────

function getStepsForMaterial(slug: MaterialSlug, displayName: string): string[] {
  const base = [
    `Measure the length and width of your project area in feet. For irregular shapes, break the area into rectangles.`,
    `Determine the ${displayName.toLowerCase()} depth you need based on your project type.`,
    `Enter your dimensions into the calculator above and click "Calculate ${displayName}".`,
    `Review the results showing exactly how much ${displayName.toLowerCase()} you need in the right units.`,
    `Add 5-10% extra for waste, settling, and unexpected variations — the calculator may already include this where appropriate.`,
  ];

  // Customize step 2 per material
  const step2Custom: Record<string, string> = {
    mulch: "Determine the mulch depth: 2-3 inches for standard garden beds, 3-4 inches for weed suppression.",
    soil: "Determine the soil depth: 4-6 inches for garden beds, 6-8 inches for vegetable gardens.",
    gravel: "Determine gravel depth: 2 inches for paths, 4 inches for driveways with proper compaction.",
    concrete: "Choose slab thickness: 4 inches for patios and walkways, 6 inches for driveways.",
    pavers: "Select your paver size and base depth: typically 4-6 inches of gravel base under 1 inch of sand.",
    sand: "Choose sand depth: 1-2 inches for paver bedding, 4-6 inches for play areas.",
    rock: "For decorative rock, 2-3 inches depth is typical for ground cover and landscaping.",
    sod: "Measure your lawn area accurately. Sod rolls typically cover 10 sq ft each.",
    "grass-seed": "Decide between new lawn seeding (more seed) or overseeding an existing lawn (less seed).",
    fertilizer: "Choose your NPK ratio. Typical home lawns need 1 lb of nitrogen per 1,000 sq ft.",
    limestone: "For driveways, 4-6 inches of compacted limestone base is standard.",
    asphalt: "Asphalt overlay is typically 2 inches; new driveways need 4 inches.",
    decking: "Plan your deck dimensions and joist spacing (16 inches on center is standard).",
    fencing: "Determine fence height and number of gates. Posts are typically spaced 8 feet apart.",
    "retaining-wall": "Choose your block size. Standard blocks are 12\"×4\"; large blocks are 18\"×6\".",
  };

  return base.map((step, i) => {
    if (i === 1 && step2Custom[slug]) return step2Custom[slug];
    return step;
  });
}

function getTipsForMaterial(slug: MaterialSlug): string[] {
  const tipsMap: Record<string, string[]> = {
    mulch: [
      "Mulch naturally breaks down over time — plan to add 1 inch per year for replenishment.",
      "For weed prevention, use landscape fabric under your mulch layer.",
      "Cedar and cypress mulch naturally repel insects.",
    ],
    soil: [
      "Topsoil settles over time — order 10-15% more than your calculation shows.",
      "Mix compost into your topsoil at a 1:3 ratio for better plant growth.",
      "Test your existing soil pH before adding large amounts of new topsoil.",
    ],
    gravel: [
      "Always compact gravel in 2-3 inch lifts for the best results.",
      "Use landscape fabric under gravel to prevent it from mixing with soil below.",
      "Pea gravel is great for paths; crushed stone with sharp edges compacts better for driveways.",
    ],
    concrete: [
      "Order ready-mix concrete if your project needs more than 1 cubic yard.",
      "For small repairs, bagged concrete is more convenient.",
      "Always form and reinforce concrete slabs properly before pouring.",
    ],
    pavers: [
      "Rent a plate compactor for the gravel base — hand tamping rarely gives good results.",
      "Use polymeric sand for paver joints to prevent weed growth.",
      "Plan your paver pattern before ordering to minimize cuts.",
    ],
    sand: [
      "Masonry sand is finer and better for paver bedding; concrete sand is coarser.",
      "Keep sand covered when not in use to prevent contamination from debris.",
    ],
    rock: [
      "Decorative rock can be heavy — ensure your vehicle can handle the weight before pickup.",
      "Lava rock is much lighter than river rock, making it easier to spread.",
    ],
    sod: [
      "Install sod the same day it's delivered for best results.",
      "Water new sod daily for the first 2 weeks, then reduce to every other day.",
      "Stagger the seams when laying sod rolls for a more natural look.",
    ],
    "grass-seed": [
      "Water lightly 2-3 times per day when germinating new seed.",
      "Fall is the best time to seed cool-season grasses; spring for warm-season.",
      "Cover seed with a thin layer of straw to retain moisture and prevent birds from eating it.",
    ],
    fertilizer: [
      "Always follow the application rate on the fertilizer bag.",
      "Water your lawn after applying granular fertilizer.",
      "Too much nitrogen can burn your lawn — more is not better.",
    ],
    limestone: [
      "Limestone compacts well and creates an excellent base for pavers and asphalt.",
      "Use a plate compactor in 2-3 inch lifts for best compaction.",
    ],
    asphalt: [
      "Asphalt needs a proper base — don't pour directly on soil.",
      "Hot mix asphalt must be placed and compacted while hot for proper results.",
      "Plan for asphalt to be paved in above-50°F weather.",
    ],
    decking: [
      "Pressure-treated lumber can warp — buy it shortly before you plan to build.",
      "Use joist tape on top of joists to extend deck life.",
      "Check local building codes for footing depth requirements.",
    ],
    fencing: [
      "Call 811 before digging post holes to avoid hitting underground utilities.",
      "Set fence posts below the frost line in cold climates.",
      "Wood posts should be pressure-treated or cedar for ground contact.",
    ],
    "retaining-wall": [
      "Walls over 4 feet tall typically require engineering and permits.",
      "Proper drainage behind the wall is critical to prevent failure.",
      "Bury the first course at least partially underground for stability.",
    ],
  };

  return tipsMap[slug] ?? ["Always measure twice before ordering materials.", "Add 5-10% extra for waste and unexpected needs."];
}
