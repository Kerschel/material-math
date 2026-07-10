// Programmatic SEO: dimension presets for each material type
// Used to generate pre-calculated SEO landing pages like /calculators/mulch/4x8-garden-bed-3-inches

import { dimensionPresets, materialConfigs, type MaterialSlug } from "@/data/material-constants";

export interface DimensionPreset {
  length: number;
  width: number;
  depth: number;
  depthUnit: string;
  label: string;
  slug: string;
  context: string;
}

export interface ProgrammaticPage {
  materialSlug: MaterialSlug;
  path: string;
  title: string;
  description: string;
  h1: string;
  preset: DimensionPreset;
}

/**
 * Generate all programmatic SEO pages for a given material.
 */
export function generateProgrammaticPages(materialSlug: MaterialSlug): ProgrammaticPage[] {
  const config = materialConfigs[materialSlug];
  if (!config) return [];

  const presets = dimensionPresets[config.dimensionPresetGroup] ?? dimensionPresets.general;
  const pages: ProgrammaticPage[] = [];

  // Depths to generate for each material
  const depths = getDepthsForMaterial(materialSlug);

  for (const preset of presets) {
    for (const depthOpt of depths) {
      const depthUnit = depthOpt.unit;
      const depth = depthOpt.value;
      const context = getContextLabel(config.dimensionPresetGroup);

      const slug = `${preset.length}x${preset.width}-${context.toLowerCase().replace(/\s+/g, "-")}-${depth}-${depthUnit}`;
      const path = `/calculators/${materialSlug}/${slug}`;
      const h1 = `How Much ${config.displayName} for a ${preset.length}×${preset.width} ${context}? (${depth} ${depthUnit} Deep)`;
      const title = h1;
      const description = `Calculate exactly how much ${config.displayName.toLowerCase()} you need for a ${preset.length}×${preset.width} foot ${context.toLowerCase()} at ${depth} ${depthUnit} deep. Free calculator with cost estimates.`;

      pages.push({
        materialSlug,
        path,
        title,
        description,
        h1,
        preset: {
          length: preset.length,
          width: preset.width,
          depth,
          depthUnit,
          label: preset.label,
          slug,
          context,
        },
      });
    }
  }

  return pages;
}

/**
 * Get all programmatic pages across all materials.
 */
export function getAllProgrammaticPages(): ProgrammaticPage[] {
  const slugs = Object.keys(materialConfigs) as MaterialSlug[];
  return slugs.flatMap((slug) => generateProgrammaticPages(slug));
}

/**
 * Get depth variations based on material type.
 */
function getDepthsForMaterial(slug: MaterialSlug): { value: number; unit: string }[] {
  switch (slug) {
    case "mulch":
      return [
        { value: 2, unit: "inches" },
        { value: 3, unit: "inches" },
        { value: 4, unit: "inches" },
      ];
    case "soil":
      return [
        { value: 4, unit: "inches" },
        { value: 6, unit: "inches" },
        { value: 8, unit: "inches" },
      ];
    case "gravel":
      return [
        { value: 2, unit: "inches" },
        { value: 4, unit: "inches" },
        { value: 6, unit: "inches" },
      ];
    case "concrete":
      return [
        { value: 4, unit: "inches" },
        { value: 6, unit: "inches" },
      ];
    case "pavers":
      return [
        { value: 2, unit: "inches" },
        { value: 3, unit: "inches" },
      ];
    case "sand":
      return [
        { value: 1, unit: "inch" },
        { value: 2, unit: "inches" },
        { value: 4, unit: "inches" },
      ];
    case "topsoil":
      return [
        { value: 2, unit: "inches" },
        { value: 4, unit: "inches" },
        { value: 6, unit: "inches" },
      ];
    case "stone":
      return [
        { value: 2, unit: "inches" },
        { value: 3, unit: "inches" },
        { value: 4, unit: "inches" },
      ];
    case "fill-dirt":
      return [
        { value: 6, unit: "inches" },
        { value: 12, unit: "inches" },
        { value: 24, unit: "inches" },
      ];
    case "limestone":
      return [
        { value: 4, unit: "inches" },
        { value: 6, unit: "inches" },
      ];
    case "river-rock":
      return [
        { value: 2, unit: "inches" },
        { value: 3, unit: "inches" },
      ];
    case "pea-gravel":
      return [
        { value: 2, unit: "inches" },
        { value: 3, unit: "inches" },
      ];
    case "crushed-stone":
      return [
        { value: 4, unit: "inches" },
        { value: 6, unit: "inches" },
      ];
    case "asphalt":
      return [
        { value: 2, unit: "inches" },
        { value: 4, unit: "inches" },
      ];
    case "brick":
      return []; // Brick doesn't use depth
    default: {
      const fallback = (materialConfigs as Record<string, { defaultDepthIn: number } | undefined>)[slug]?.defaultDepthIn ?? 3;
      return [{ value: fallback, unit: "inches" }];
    }
  }
}

/**
 * Get a human-readable context label for a preset group.
 */
function getContextLabel(group: string): string {
  switch (group) {
    case "garden-bed":
      return "Garden Bed";
    case "patio":
      return "Patio";
    case "driveway":
      return "Driveway";
    case "walkway":
      return "Walkway";
    case "wall":
      return "Wall";
    default:
      return "Project";
  }
}

/**
 * Get preset cards for the "Common Project Sizes" section of a calculator page.
 */
export function getPresetCards(materialSlug: MaterialSlug): DimensionPreset[] {
  const config = materialConfigs[materialSlug];
  if (!config) return [];

  const presets = dimensionPresets[config.dimensionPresetGroup] ?? dimensionPresets.general;
  const depth = config.defaultDepthIn;

  return presets.map((p) => ({
    length: p.length,
    width: p.width,
    depth,
    depthUnit: "inches",
    label: p.label,
    slug: `${p.length}x${p.width}-${getContextLabel(config.dimensionPresetGroup).toLowerCase().replace(/\s+/g, "-")}-${depth}-inches`,
    context: getContextLabel(config.dimensionPresetGroup),
  }));
}
