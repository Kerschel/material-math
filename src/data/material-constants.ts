// Material constants: densities, bag sizes, coverage rates, default depths

export interface MaterialSubtype {
  name: string;
  densityTonsPerCy?: number; // tons per cubic yard
  priceLow?: number;
  priceHigh?: number;
  priceUnit?: string;
  bagSizeCuft?: number;
  coverageRate?: number; // sqft per unit
}

export interface MaterialConfig {
  slug: string;
  displayName: string;
  description: string;
  icon: string;
  category: "landscaping" | "hardscaping" | "construction";
  defaultDepthIn: number;
  unitLabel: string; // e.g. "cubic yard", "ton", "bag"
  subtypes: MaterialSubtype[];
  dimensionPresetGroup: "garden-bed" | "patio" | "driveway" | "general";
}

// Dimension presets for programmatic SEO pages
export const dimensionPresets = {
  "garden-bed": [
    { length: 4, width: 4, label: "4×4" },
    { length: 4, width: 8, label: "4×8" },
    { length: 4, width: 12, label: "4×12" },
    { length: 8, width: 8, label: "8×8" },
    { length: 8, width: 12, label: "8×12" },
    { length: 12, width: 12, label: "12×12" },
  ],
  patio: [
    { length: 10, width: 10, label: "10×10" },
    { length: 10, width: 12, label: "10×12" },
    { length: 12, width: 12, label: "12×12" },
    { length: 12, width: 16, label: "12×16" },
    { length: 16, width: 16, label: "16×16" },
    { length: 20, width: 20, label: "20×20" },
  ],
  driveway: [
    { length: 20, width: 10, label: "20×10" },
    { length: 24, width: 12, label: "24×12" },
    { length: 40, width: 20, label: "40×20" },
    { length: 60, width: 24, label: "60×24" },
  ],
  general: [
    { length: 10, width: 10, label: "10×10" },
    { length: 12, width: 12, label: "12×12" },
    { length: 20, width: 20, label: "20×20" },
    { length: 30, width: 30, label: "30×30" },
  ],
} as const;

export type PresetGroup = keyof typeof dimensionPresets;

// Full material catalog
export const materialConfigs: Record<string, MaterialConfig> = {
  mulch: {
    slug: "mulch",
    displayName: "Mulch",
    description: "Calculate how much mulch you need for your garden beds and landscaping.",
    icon: "🌿",
    category: "landscaping",
    defaultDepthIn: 3,
    unitLabel: "cubic yard",
    subtypes: [
      { name: "Shredded Hardwood", densityTonsPerCy: 0.45, priceLow: 30, priceHigh: 45, priceUnit: "cy", bagSizeCuft: 2 },
      { name: "Pine Bark", densityTonsPerCy: 0.4, priceLow: 28, priceHigh: 40, priceUnit: "cy", bagSizeCuft: 2 },
      { name: "Cedar", densityTonsPerCy: 0.35, priceLow: 35, priceHigh: 50, priceUnit: "cy", bagSizeCuft: 2 },
      { name: "Cypress", densityTonsPerCy: 0.4, priceLow: 30, priceHigh: 42, priceUnit: "cy", bagSizeCuft: 2 },
    ],
    dimensionPresetGroup: "garden-bed",
  },
  soil: {
    slug: "soil",
    displayName: "Soil / Topsoil",
    description: "Estimate topsoil needed for garden beds, lawns, and filling holes.",
    icon: "🪴",
    category: "landscaping",
    defaultDepthIn: 6,
    unitLabel: "cubic yard",
    subtypes: [
      { name: "Topsoil", densityTonsPerCy: 1.1, priceLow: 25, priceHigh: 50, priceUnit: "cy", bagSizeCuft: 0.75 },
      { name: "Garden Mix", densityTonsPerCy: 1.0, priceLow: 30, priceHigh: 55, priceUnit: "cy", bagSizeCuft: 0.75 },
      { name: "Compost", densityTonsPerCy: 0.8, priceLow: 35, priceHigh: 60, priceUnit: "cy", bagSizeCuft: 0.75 },
    ],
    dimensionPresetGroup: "garden-bed",
  },
  gravel: {
    slug: "gravel",
    displayName: "Gravel",
    description: "Calculate gravel for driveways, paths, and drainage areas.",
    icon: "🪨",
    category: "hardscaping",
    defaultDepthIn: 4,
    unitLabel: "ton",
    subtypes: [
      { name: "Pea Gravel", densityTonsPerCy: 1.35, priceLow: 35, priceHigh: 60, priceUnit: "ton" },
      { name: "Crushed Stone", densityTonsPerCy: 1.45, priceLow: 30, priceHigh: 50, priceUnit: "ton" },
      { name: "River Rock", densityTonsPerCy: 1.55, priceLow: 50, priceHigh: 70, priceUnit: "ton" },
    ],
    dimensionPresetGroup: "driveway",
  },
  concrete: {
    slug: "concrete",
    displayName: "Concrete",
    description: "Calculate concrete for slabs, footings, and columns.",
    icon: "🏗️",
    category: "construction",
    defaultDepthIn: 4,
    unitLabel: "cubic yard",
    subtypes: [
      { name: "Ready-Mix (Slab)", priceLow: 140, priceHigh: 170, priceUnit: "cy" },
      { name: "80 lb Bags", priceLow: 5, priceHigh: 8, priceUnit: "bag" },
      { name: "60 lb Bags", priceLow: 4, priceHigh: 7, priceUnit: "bag" },
    ],
    dimensionPresetGroup: "patio",
  },
  pavers: {
    slug: "pavers",
    displayName: "Pavers",
    description: "Calculate paver quantities for patios, walkways, and driveways.",
    icon: "🧱",
    category: "hardscaping",
    defaultDepthIn: 2.375, // typical paver thickness
    unitLabel: "sq ft",
    subtypes: [
      { name: "4\"×8\"", coverageRate: 0.222 },
      { name: "6\"×6\"", coverageRate: 0.25 },
      { name: "6\"×9\"", coverageRate: 0.375 },
      { name: "12\"×12\"", coverageRate: 1 },
      { name: "16\"×16\"", coverageRate: 1.778 },
    ],
    dimensionPresetGroup: "patio",
  },
  sand: {
    slug: "sand",
    displayName: "Sand",
    description: "Calculate sand for leveling, paver bases, and play areas.",
    icon: "🏖️",
    category: "hardscaping",
    defaultDepthIn: 2,
    unitLabel: "ton",
    subtypes: [
      { name: "Play Sand", densityTonsPerCy: 1.3, priceLow: 25, priceHigh: 40, priceUnit: "ton" },
      { name: "Masonry Sand", densityTonsPerCy: 1.35, priceLow: 30, priceHigh: 50, priceUnit: "ton" },
      { name: "Concrete Sand", densityTonsPerCy: 1.4, priceLow: 28, priceHigh: 45, priceUnit: "ton" },
    ],
    dimensionPresetGroup: "general",
  },
  rock: {
    slug: "rock",
    displayName: "Decorative Stone",
    description: "Calculate decorative stone and rock for landscaping features.",
    icon: "⛰️",
    category: "landscaping",
    defaultDepthIn: 3,
    unitLabel: "ton",
    subtypes: [
      { name: "Lava Rock", densityTonsPerCy: 0.65, priceLow: 80, priceHigh: 150, priceUnit: "ton" },
      { name: "River Rock", densityTonsPerCy: 1.55, priceLow: 60, priceHigh: 120, priceUnit: "ton" },
      { name: "Crushed Granite", densityTonsPerCy: 1.45, priceLow: 50, priceHigh: 100, priceUnit: "ton" },
      { name: "Pea Gravel", densityTonsPerCy: 1.35, priceLow: 60, priceHigh: 90, priceUnit: "ton" },
      { name: "Limestone Gravel", densityTonsPerCy: 1.4, priceLow: 40, priceHigh: 80, priceUnit: "ton" },
    ],
    dimensionPresetGroup: "garden-bed",
  },
  sod: {
    slug: "sod",
    displayName: "Sod",
    description: "Calculate how many rolls or pallets of sod you need.",
    icon: "🟩",
    category: "landscaping",
    defaultDepthIn: 1, // not really used, for consistency
    unitLabel: "roll",
    subtypes: [
      { name: "Standard Rolls (10 sq ft)", coverageRate: 10, priceLow: 4, priceHigh: 8, priceUnit: "roll" },
      { name: "Big Rolls (15 sq ft)", coverageRate: 15, priceLow: 6, priceHigh: 12, priceUnit: "roll" },
    ],
    dimensionPresetGroup: "general",
  },
  "grass-seed": {
    slug: "grass-seed",
    displayName: "Grass Seed",
    description: "Calculate grass seed for new lawns and overseeding.",
    icon: "🌱",
    category: "landscaping",
    defaultDepthIn: 0, // not applicable
    unitLabel: "lb",
    subtypes: [
      { name: "Kentucky Bluegrass", priceLow: 5, priceHigh: 8, priceUnit: "lb" },
      { name: "Fescue", priceLow: 4, priceHigh: 7, priceUnit: "lb" },
      { name: "Bermuda", priceLow: 4, priceHigh: 6, priceUnit: "lb" },
      { name: "Sun/Shade Mix", priceLow: 4, priceHigh: 8, priceUnit: "lb" },
    ],
    dimensionPresetGroup: "general",
  },
  fertilizer: {
    slug: "fertilizer",
    displayName: "Fertilizer",
    description: "Calculate how much fertilizer your lawn needs.",
    icon: "🧪",
    category: "landscaping",
    defaultDepthIn: 0,
    unitLabel: "lb",
    subtypes: [
      { name: "10-10-10", priceLow: 15, priceHigh: 30, priceUnit: "bag" },
      { name: "29-0-4", priceLow: 25, priceHigh: 40, priceUnit: "bag" },
      { name: "16-4-8", priceLow: 20, priceHigh: 35, priceUnit: "bag" },
      { name: "32-0-4", priceLow: 25, priceHigh: 40, priceUnit: "bag" },
    ],
    dimensionPresetGroup: "general",
  },
  limestone: {
    slug: "limestone",
    displayName: "Limestone / Crushed Stone",
    description: "Calculate crushed limestone for driveways, paths, and bases.",
    icon: "🪨",
    category: "hardscaping",
    defaultDepthIn: 4,
    unitLabel: "ton",
    subtypes: [
      { name: "Crushed Limestone (3/4\")", densityTonsPerCy: 1.45, priceLow: 30, priceHigh: 50, priceUnit: "ton" },
      { name: "Limestone Screenings", densityTonsPerCy: 1.5, priceLow: 25, priceHigh: 40, priceUnit: "ton" },
      { name: "Road Base", densityTonsPerCy: 1.5, priceLow: 20, priceHigh: 35, priceUnit: "ton" },
    ],
    dimensionPresetGroup: "driveway",
  },
  asphalt: {
    slug: "asphalt",
    displayName: "Asphalt",
    description: "Calculate asphalt tonnage for driveways and parking areas.",
    icon: "🛣️",
    category: "construction",
    defaultDepthIn: 2,
    unitLabel: "ton",
    subtypes: [
      { name: "Hot Mix (Overlay)", priceLow: 100, priceHigh: 150, priceUnit: "ton" },
      { name: "Hot Mix (New)", priceLow: 120, priceHigh: 200, priceUnit: "ton" },
    ],
    dimensionPresetGroup: "driveway",
  },
  decking: {
    slug: "decking",
    displayName: "Decking",
    description: "Estimate decking materials including boards, joists, beams, and hardware.",
    icon: "🪵",
    category: "construction",
    defaultDepthIn: 0,
    unitLabel: "sq ft",
    subtypes: [
      { name: "Pressure-Treated", priceLow: 3, priceHigh: 5, priceUnit: "sqft" },
      { name: "Cedar", priceLow: 6, priceHigh: 10, priceUnit: "sqft" },
      { name: "Composite", priceLow: 5, priceHigh: 8, priceUnit: "sqft" },
    ],
    dimensionPresetGroup: "general",
  },
  fencing: {
    slug: "fencing",
    displayName: "Fencing",
    description: "Calculate fencing materials including posts, rails, and pickets.",
    icon: "🏡",
    category: "construction",
    defaultDepthIn: 0,
    unitLabel: "linear ft",
    subtypes: [
      { name: "Wood Picket (4 ft)", priceLow: 2, priceHigh: 5, priceUnit: "lnft" },
      { name: "Wood Picket (6 ft)", priceLow: 3, priceHigh: 6, priceUnit: "lnft" },
      { name: "Vinyl (6 ft)", priceLow: 20, priceHigh: 40, priceUnit: "lnft" },
      { name: "Chain Link (4 ft)", priceLow: 10, priceHigh: 20, priceUnit: "lnft" },
    ],
    dimensionPresetGroup: "general",
  },
  "retaining-wall": {
    slug: "retaining-wall",
    displayName: "Retaining Wall",
    description: "Calculate blocks, gravel, and drainage for retaining wall projects.",
    icon: "🧱",
    category: "hardscaping",
    defaultDepthIn: 0,
    unitLabel: "block",
    subtypes: [
      { name: "Standard Block (12\"×4\")", priceLow: 2, priceHigh: 5, priceUnit: "block" },
      { name: "Large Block (18\"×6\")", priceLow: 4, priceHigh: 8, priceUnit: "block" },
    ],
    dimensionPresetGroup: "general",
  },
};

export type MaterialSlug = keyof typeof materialConfigs;
