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
import { calculateLimestone, type LimestoneResults } from "@/lib/materials/limestone";
import { calculateAsphaltCost, type AsphaltResults } from "@/lib/materials/asphalt";
import { calculateTopsoil, type TopsoilResults } from "@/lib/materials/topsoil";
import { calculateFillDirt, type FillDirtResults } from "@/lib/materials/fill-dirt";
import { calculateRiverRock, type RiverRockResults } from "@/lib/materials/river-rock";
import { calculatePeaGravel, type PeaGravelResults } from "@/lib/materials/pea-gravel";
import { calculateCrushedStone, type CrushedStoneResults } from "@/lib/materials/crushed-stone";
import { calculateStone, type StoneResults } from "@/lib/materials/stone";
import { calculateBricks, type BrickResults } from "@/lib/materials/brick";

type CalculatorResult =
  | MulchResults
  | SoilResults
  | GravelResults
  | ConcreteCalcResults
  | PaverCalcResults
  | SandResults
  | LimestoneResults
  | AsphaltResults
  | TopsoilResults
  | FillDirtResults
  | RiverRockResults
  | PeaGravelResults
  | CrushedStoneResults
  | StoneResults
  | BrickResults
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
  const [depth, setDepth] = useState<number>(config.defaultDepthIn);
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>("ft");
  const [widthUnit, setWidthUnit] = useState<LengthUnit>("ft");
  const [depthUnit, setDepthUnit] = useState<DepthUnit>("in");

  // Extra state for special calculators
  const [concreteType, setConcreteType] = useState<"slab" | "footing" | "column">("slab");
  const [paverSize, setPaverSize] = useState("4\"×8\"");
  const [baseDepthIn, setBaseDepthIn] = useState(6);

  // Brick-specific state
  const [brickLengthIn, setBrickLengthIn] = useState(7.625);
  const [brickWidthIn, setBrickWidthIn] = useState(3.625);
  const [mortarGapIn, setMortarGapIn] = useState(0.375);
  const [wastePercent, setWastePercent] = useState(5);

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
      case "limestone":
        r = calculateLimestone({ length, width, depth, lengthUnit, widthUnit, depthUnit });
        break;
      case "asphalt":
        r = calculateAsphaltCost({ length, width, depth, lengthUnit, widthUnit, depthUnit });
        break;
      case "pavers":
        r = calculatePaverProject({ length, width, lengthUnit, widthUnit, paverSize, baseDepthIn });
        break;
      case "topsoil":
        r = calculateTopsoil({ length, width, depth, lengthUnit, widthUnit, depthUnit }, selectedSubtype);
        break;
      case "fill-dirt":
        r = calculateFillDirt({ length, width, depth, lengthUnit, widthUnit, depthUnit }, selectedSubtype);
        break;
      case "river-rock":
        r = calculateRiverRock({ length, width, depth, lengthUnit, widthUnit, depthUnit }, selectedSubtype);
        break;
      case "pea-gravel":
        r = calculatePeaGravel({ length, width, depth, lengthUnit, widthUnit, depthUnit }, selectedSubtype);
        break;
      case "crushed-stone":
        r = calculateCrushedStone({ length, width, depth, lengthUnit, widthUnit, depthUnit }, selectedSubtype);
        break;
      case "stone":
        r = calculateStone({ length, width, depth, lengthUnit, widthUnit, depthUnit }, selectedSubtype);
        break;
      case "brick":
        r = calculateBricks(
          {
            length,
            width,
            lengthUnit,
            widthUnit,
            brickLengthIn,
            brickWidthIn,
            mortarGapIn,
            wastePercent,
          },
          selectedSubtype
        );
        break;
    }

    setResult(r);
  }, [
    slug, length, width, depth, lengthUnit, widthUnit, depthUnit,
    selectedSubtype, concreteType, paverSize, baseDepthIn,
    brickLengthIn, brickWidthIn, mortarGapIn, wastePercent,
  ]);

  // Build result items
  const buildResultItems = useCallback((): { label: string; value: number | string; unit?: string; highlight?: boolean }[] => {
    if (!result) return [];

    const items: { label: string; value: number | string; unit?: string; highlight?: boolean }[] = [];

    // Common items
    if ("squareFeet" in result) {
      items.push({ label: "Area", value: result.squareFeet, unit: "sq ft" });
    }
    if ("cubicFeet" in result && result.cubicFeet > 0) {
      items.push({ label: "Volume", value: result.cubicFeet, unit: "cu ft" });
    }
    if ("cubicYards" in result && result.cubicYards > 0) {
      items.push({ label: "Volume", value: result.cubicYards, unit: "cu yd", highlight: true });
    }
    if ("tons" in result && result.tons > 0) {
      items.push({ label: "Weight", value: result.tons, unit: "tons", highlight: true });
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
      items.push({ label: "80 lb Bags", value: r.bags80lb, unit: "bags", highlight: true });
      items.push({ label: "60 lb Bags", value: r.bags60lb, unit: "bags" });
      items.push({ label: "40 lb Bags", value: r.bags40lb, unit: "bags" });
    }
    if ("paversNeeded" in result) {
      const r = result as PaverCalcResults;
      items.push({ label: "Pavers Needed", value: r.paversNeeded, unit: "pavers", highlight: true });
      items.push({ label: "Sand Base", value: r.sandBaseTons, unit: "tons" });
      items.push({ label: "Gravel Base", value: r.gravelBaseTons, unit: "tons" });
    }
    if ("asphaltTons" in result && !items.some((i) => i.label === "Weight")) {
      const r = result as AsphaltResults;
      items.push({ label: "Asphalt", value: r.asphaltTons, unit: "tons", highlight: true });
    }
    if ("dumpTruckLoads" in result) {
      const r = result as FillDirtResults;
      items.push({ label: "Dump Truck Loads", value: r.dumpTruckLoads, unit: "loads" });
    }
    if ("bricksNeeded" in result) {
      const r = result as BrickResults;
      items.push({ label: "Bricks Needed", value: r.bricksNeeded, unit: "bricks", highlight: true });
      items.push({ label: "Bricks per Sq Ft", value: r.bricksPerSqft, unit: "bricks/sqft" });
      items.push({ label: "Mortar", value: r.mortarCubicFeet, unit: "cu ft" });
    }

    return items;
  }, [result]);

  // Steps and tips
  const steps = getStepsForMaterial(slug, config.displayName);
  const tips = getTipsForMaterial(slug);

  // Preset cards
  const presetCards = getPresetCards(slug);

  // Depth-exempt slugs
  const hideDepth = ["brick"].includes(slug);

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
            label={slug === "brick" ? "Height" : "Width"}
            value={width}
            onChange={setWidth}
            unit={widthUnit}
            onUnitChange={(u) => setWidthUnit(u as LengthUnit)}
            unitOptions={LENGTH_UNITS}
          />

          {!hideDepth && (
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
        {subtypes.length > 1 && !["concrete"].includes(slug) && (
          <MaterialSelector
            subtypes={subtypes}
            selected={subtypeName}
            onSelect={setSubtypeName}
          />
        )}

        {/* Concrete type selector */}
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

        {/* Paver-specific */}
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

        {/* Brick-specific inputs */}
        {slug === "brick" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DimensionInput
              label="Brick Length"
              value={brickLengthIn}
              onChange={setBrickLengthIn}
              unit="in"
              onUnitChange={() => {}}
              unitOptions={[{ value: "in", label: "inches" }]}
            />
            <DimensionInput
              label="Brick Width"
              value={brickWidthIn}
              onChange={setBrickWidthIn}
              unit="in"
              onUnitChange={() => {}}
              unitOptions={[{ value: "in", label: "inches" }]}
            />
            <DimensionInput
              label="Mortar Gap"
              value={mortarGapIn}
              onChange={setMortarGapIn}
              unit="in"
              onUnitChange={() => {}}
              unitOptions={[{ value: "in", label: "inches" }]}
            />
            <DimensionInput
              label="Waste %"
              value={wastePercent}
              onChange={setWastePercent}
              unit="%"
              onUnitChange={() => {}}
              unitOptions={[{ value: "%", label: "%" }]}
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

// ─── Helper functions ────────────────────────────────────────────

function getStepsForMaterial(slug: MaterialSlug, displayName: string): string[] {
  const base = [
    `Measure the length and width of your project area in feet. For irregular shapes, break the area into rectangles.`,
    `Determine the ${displayName.toLowerCase()} depth you need based on your project type.`,
    `Enter your dimensions into the calculator above and click "Calculate ${displayName}".`,
    `Review the results showing exactly how much ${displayName.toLowerCase()} you need in the right units.`,
    `Add 5-10% extra for waste, settling, and unexpected variations.`,
  ];

  const step2: Record<string, string> = {
    mulch: "Determine the mulch depth: 2-3 inches for standard garden beds, 3-4 inches for weed suppression.",
    soil: "Determine the soil depth: 4-6 inches for garden beds, 6-8 inches for vegetable gardens.",
    gravel: "Determine gravel depth: 2 inches for paths, 4 inches for driveways with proper compaction.",
    concrete: "Choose slab thickness: 4 inches for patios and walkways, 6 inches for driveways.",
    pavers: "Select your paver size and base depth: typically 4-6 inches of gravel base under 1 inch of sand.",
    sand: "Choose sand depth: 1-2 inches for paver bedding, 4-6 inches for play areas.",
    limestone: "For driveways, 4-6 inches of compacted limestone base is standard.",
    asphalt: "Asphalt overlay is typically 2 inches; new driveways need 4 inches.",
    topsoil: "For lawns, 2 inches for overseeding, 4-6 inches for new lawn installation.",
    "fill-dirt": "Determine fill depth based on your leveling needs. Add 15-20% for compaction and settling.",
    "river-rock": "For ground cover, 2-3 inches is standard. For dry creek beds, use larger stones at 3-4 inches.",
    "pea-gravel": "For paths and patios, 2 inches depth is comfortable and effective.",
    "crushed-stone": "For driveways, 4-6 inches compacted. For base layers, use 2-4 inches.",
    stone: "For decorative stone, 2-3 inches depth is typical for ground cover and landscaping.",
    brick: "Standard bricks are 7.625×3.625 inches with a ⅜-inch mortar gap. Measure your wall area carefully.",
  };

  return base.map((step, i) => {
    if (i === 1 && step2[slug]) return step2[slug];
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
    limestone: [
      "Limestone compacts well and creates an excellent base for pavers and asphalt.",
      "Use a plate compactor in 2-3 inch lifts for best compaction.",
    ],
    asphalt: [
      "Asphalt needs a proper base — don't pour directly on soil.",
      "Hot mix asphalt must be placed and compacted while hot for proper results.",
      "Plan for asphalt to be paved in above-50°F weather.",
    ],
    topsoil: [
      "For new lawns, apply 4-6 inches of topsoil before seeding or laying sod.",
      "For overseeding, 1-2 inches of top-dressing is sufficient.",
      "Grade topsoil with a slight slope away from buildings for proper drainage.",
    ],
    "fill-dirt": [
      "Clean fill is free of organic matter and debris — ideal for structural fill.",
      "Fill dirt settles 10-20% over time — order extra accordingly.",
      "Always call 811 before digging or filling to check for underground utilities.",
    ],
    "river-rock": [
      "River rock works great for drainage because water flows freely between the smooth stones.",
      "Use larger river rock (3-5 inches) for dry creek beds, smaller (1-2 inches) for ground cover.",
      "Install edging to keep river rock from migrating into lawn areas.",
    ],
    "pea-gravel": [
      "Pea gravel is comfortable underfoot — great for barefoot areas and playgrounds.",
      "It doesn't lock together like angular stone, so use edging to contain it.",
      "Rake pea gravel periodically to maintain an even surface.",
    ],
    "crushed-stone": [
      "Angular crushed stone compacts better than rounded gravel for driveways.",
      "Use crusher run (stone + fines) for maximum compaction on driveways.",
      "Always grade your driveway with a slight crown for water runoff.",
    ],
    stone: [
      "Larger stone sizes (2-4 inch) give better coverage per ton than smaller stones.",
      "Use a weed barrier beneath decorative stone to minimize maintenance.",
      "Edging helps keep decorative stone contained and looking neat.",
    ],
    brick: [
      "Standard mortar gap is ⅜ inch — consistent gaps make a professional-looking wall.",
      "Order 5-10% extra bricks for cuts, breakage, and future repairs.",
      "For walls over 3 feet tall, consult a structural engineer.",
    ],
  };

  return tipsMap[slug] ?? ["Always measure twice before ordering materials.", "Add 5-10% extra for waste and unexpected needs."];
}
