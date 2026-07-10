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
  dimensionPresetGroup: "garden-bed" | "patio" | "driveway" | "general" | "walkway" | "wall";
}

export type MaterialSlug = keyof typeof materialConfigs;

// Dimension presets for programmatic SEO pages
export const dimensionPresets = {
  "garden-bed": [
    { length: 4, width: 4, label: "4×4" },
    { length: 4, width: 8, label: "4×8" },
    { length: 4, width: 12, label: "4×12" },
    { length: 8, width: 8, label: "8×8" },
    { length: 8, width: 12, label: "8×12" },
    { length: 12, width: 12, label: "12×12" },
    { length: 10, width: 10, label: "10×10" },
    { length: 10, width: 20, label: "10×20" },
    { length: 6, width: 8, label: "6×8" },
  ],
  "patio": [
    { length: 8, width: 8, label: "8×8" },
    { length: 10, width: 10, label: "10×10" },
    { length: 12, width: 12, label: "12×12" },
    { length: 12, width: 16, label: "12×16" },
    { length: 16, width: 16, label: "16×16" },
    { length: 20, width: 20, label: "20×20" },
    { length: 10, width: 20, label: "10×20" },
    { length: 14, width: 14, label: "14×14" },
    { length: 12, width: 14, label: "12×14" },
  ],
  "driveway": [
    { length: 20, width: 10, label: "20×10" },
    { length: 20, width: 12, label: "20×12" },
    { length: 30, width: 12, label: "30×12" },
    { length: 40, width: 12, label: "40×12" },
    { length: 20, width: 20, label: "20×20" },
    { length: 24, width: 12, label: "24×12" },
    { length: 30, width: 20, label: "30×20" },
    { length: 16, width: 20, label: "16×20" },
  ],
  "walkway": [
    { length: 20, width: 3, label: "20×3" },
    { length: 30, width: 3, label: "30×3" },
    { length: 40, width: 3, label: "40×3" },
    { length: 20, width: 4, label: "20×4" },
    { length: 30, width: 4, label: "30×4" },
    { length: 10, width: 3, label: "10×3" },
    { length: 10, width: 4, label: "10×4" },
  ],
  "general": [
    { length: 10, width: 10, label: "10×10" },
    { length: 20, width: 20, label: "20×20" },
    { length: 10, width: 20, label: "10×20" },
    { length: 12, width: 12, label: "12×12" },
    { length: 8, width: 10, label: "8×10" },
  ],
  "wall": [
    { length: 10, width: 8, label: "10×8" },
    { length: 20, width: 8, label: "20×8" },
    { length: 30, width: 8, label: "30×8" },
    { length: 10, width: 4, label: "10×4" },
    { length: 20, width: 4, label: "20×4" },
    { length: 15, width: 8, label: "15×8" },
  ],
};

// ─── 15 Calculators ───────────────────────────────────────────────

export const materialConfigs = {
  // 1. Mulch
  mulch: {
    slug: "mulch",
    displayName: "Mulch",
    description:
      "Calculate how much mulch you need for garden beds and landscaping. Supports bark, wood chips, and rubber mulch.",
    icon: "🌿",
    category: "landscaping",
    defaultDepthIn: 3,
    unitLabel: "cubic yard",
    dimensionPresetGroup: "garden-bed",
    subtypes: [
      { name: "Bark Mulch", densityTonsPerCy: 0.5, priceLow: 30, priceHigh: 45, priceUnit: "cy", bagSizeCuft: 2 },
      { name: "Wood Chips", densityTonsPerCy: 0.4, priceLow: 25, priceHigh: 40, priceUnit: "cy", bagSizeCuft: 2 },
      { name: "Rubber Mulch", densityTonsPerCy: 0.8, priceLow: 80, priceHigh: 120, priceUnit: "cy", bagSizeCuft: 0.8 },
    ],
  },

  // 2. Soil
  soil: {
    slug: "soil",
    displayName: "Soil",
    description:
      "Calculate garden soil, potting mix, or raised bed soil. Supports raised bed mode for multiple beds.",
    icon: "🪴",
    category: "landscaping",
    defaultDepthIn: 6,
    unitLabel: "cubic yard",
    dimensionPresetGroup: "garden-bed",
    subtypes: [
      { name: "Garden Soil", densityTonsPerCy: 1.1, priceLow: 25, priceHigh: 50, priceUnit: "cy", bagSizeCuft: 0.75 },
      { name: "Potting Mix", densityTonsPerCy: 0.7, priceLow: 8, priceHigh: 15, priceUnit: "bag", bagSizeCuft: 1 },
      { name: "Raised Bed Mix", densityTonsPerCy: 1.0, priceLow: 30, priceHigh: 55, priceUnit: "cy", bagSizeCuft: 0.75 },
    ],
  },

  // 3. Gravel
  gravel: {
    slug: "gravel",
    displayName: "Gravel",
    description:
      "Estimate gravel for driveways, paths, and landscaping. Choose from pea gravel, crushed stone, or river rock.",
    icon: "🪨",
    category: "landscaping",
    defaultDepthIn: 4,
    unitLabel: "ton",
    dimensionPresetGroup: "driveway",
    subtypes: [
      { name: "Pea Gravel", densityTonsPerCy: 1.3, priceLow: 35, priceHigh: 70, priceUnit: "ton" },
      { name: "Crushed Stone", densityTonsPerCy: 1.4, priceLow: 30, priceHigh: 60, priceUnit: "ton" },
      { name: "River Rock", densityTonsPerCy: 1.5, priceLow: 50, priceHigh: 100, priceUnit: "ton" },
    ],
  },

  // 4. Concrete
  concrete: {
    slug: "concrete",
    displayName: "Concrete",
    description:
      "Calculate concrete for slabs, footings, and patios. Get bag counts for 60lb and 80lb bags plus ready-mix yards.",
    icon: "🏗️",
    category: "construction",
    defaultDepthIn: 4,
    unitLabel: "cubic yard",
    dimensionPresetGroup: "patio",
    subtypes: [
      { name: "Ready Mix (per cy)", densityTonsPerCy: 2.0, priceLow: 140, priceHigh: 170, priceUnit: "cy" },
      { name: "80 lb Bags", priceLow: 5, priceHigh: 8, priceUnit: "bag", bagSizeCuft: 0.6 },
      { name: "60 lb Bags", priceLow: 4, priceHigh: 7, priceUnit: "bag", bagSizeCuft: 0.45 },
    ],
  },

  // 5. Pavers
  pavers: {
    slug: "pavers",
    displayName: "Paver",
    description:
      "Calculate how many pavers you need for a patio or walkway. Includes waste factor and cost per paver.",
    icon: "🧱",
    category: "hardscaping",
    defaultDepthIn: 2,
    unitLabel: "paver",
    dimensionPresetGroup: "patio",
    subtypes: [
      { name: "Standard Brick (4×8 in)", priceLow: 0.5, priceHigh: 2, priceUnit: "paver", coverageRate: 0.222 },
      { name: "Large Format (12×12 in)", priceLow: 2, priceHigh: 8, priceUnit: "paver", coverageRate: 1 },
      { name: "Cobblestone (4×4 in)", priceLow: 1, priceHigh: 3, priceUnit: "paver", coverageRate: 0.111 },
    ],
  },

  // 6. Sand
  sand: {
    slug: "sand",
    displayName: "Sand",
    description:
      "Calculate sand for paver bases, playgrounds, and general fill. Choose from different sand types.",
    icon: "🏖️",
    category: "landscaping",
    defaultDepthIn: 2,
    unitLabel: "ton",
    dimensionPresetGroup: "general",
    subtypes: [
      { name: "Paver Sand", densityTonsPerCy: 1.3, priceLow: 25, priceHigh: 50, priceUnit: "ton", bagSizeCuft: 0.5 },
      { name: "Play Sand", densityTonsPerCy: 1.3, priceLow: 5, priceHigh: 8, priceUnit: "bag", bagSizeCuft: 0.5 },
      { name: "Masonry Sand", densityTonsPerCy: 1.35, priceLow: 30, priceHigh: 55, priceUnit: "ton" },
    ],
  },

  // 7. Topsoil
  topsoil: {
    slug: "topsoil",
    displayName: "Topsoil",
    description:
      "Calculate topsoil for lawn installation, grading, and garden beds. Standard 2-inch depth for overseeding.",
    icon: "🌱",
    category: "landscaping",
    defaultDepthIn: 2,
    unitLabel: "cubic yard",
    dimensionPresetGroup: "garden-bed",
    subtypes: [
      { name: "Screened Topsoil", densityTonsPerCy: 1.1, priceLow: 25, priceHigh: 45, priceUnit: "cy", bagSizeCuft: 0.75 },
      { name: "Premium Blend", densityTonsPerCy: 1.0, priceLow: 30, priceHigh: 55, priceUnit: "cy", bagSizeCuft: 0.75 },
    ],
  },

  // 8. Stone
  stone: {
    slug: "stone",
    displayName: "Stone",
    description:
      "Calculate decorative stone and landscaping rock. Ideal for garden accents, dry creek beds, and borders.",
    icon: "⛰️",
    category: "landscaping",
    defaultDepthIn: 3,
    unitLabel: "ton",
    dimensionPresetGroup: "garden-bed",
    subtypes: [
      { name: "Decorative Stone", densityTonsPerCy: 1.4, priceLow: 60, priceHigh: 150, priceUnit: "ton" },
      { name: "Lava Rock", densityTonsPerCy: 0.8, priceLow: 80, priceHigh: 160, priceUnit: "ton" },
      { name: "Marble Chips", densityTonsPerCy: 1.5, priceLow: 100, priceHigh: 200, priceUnit: "ton" },
    ],
  },

  // 9. Fill Dirt
  "fill-dirt": {
    slug: "fill-dirt",
    displayName: "Fill Dirt",
    description:
      "Calculate fill dirt for leveling, backfilling, and large excavation projects. Includes dump truck load estimates.",
    icon: "🚛",
    category: "construction",
    defaultDepthIn: 6,
    unitLabel: "cubic yard",
    dimensionPresetGroup: "general",
    subtypes: [
      { name: "Clean Fill", densityTonsPerCy: 1.2, priceLow: 15, priceHigh: 35, priceUnit: "cy" },
      { name: "Screened Fill", densityTonsPerCy: 1.2, priceLow: 20, priceHigh: 40, priceUnit: "cy" },
    ],
  },

  // 10. Limestone
  limestone: {
    slug: "limestone",
    displayName: "Limestone",
    description:
      "Calculate limestone gravel for driveways, base material, and drainage projects at 1.5 tons per cubic yard.",
    icon: "🪨",
    category: "hardscaping",
    defaultDepthIn: 4,
    unitLabel: "ton",
    dimensionPresetGroup: "driveway",
    subtypes: [
      { name: "Crushed Limestone (#57)", densityTonsPerCy: 1.5, priceLow: 30, priceHigh: 50, priceUnit: "ton" },
      { name: "Limestone Screenings", densityTonsPerCy: 1.45, priceLow: 25, priceHigh: 45, priceUnit: "ton" },
    ],
  },

  // 11. River Rock
  "river-rock": {
    slug: "river-rock",
    displayName: "River Rock",
    description:
      "Calculate river rock for landscaping, dry creek beds, and drainage areas. 1.4 tons per cubic yard density.",
    icon: "🪨",
    category: "landscaping",
    defaultDepthIn: 2,
    unitLabel: "ton",
    dimensionPresetGroup: "garden-bed",
    subtypes: [
      { name: "Small River Rock (1-2 in)", densityTonsPerCy: 1.4, priceLow: 50, priceHigh: 100, priceUnit: "ton" },
      { name: "Medium River Rock (2-4 in)", densityTonsPerCy: 1.45, priceLow: 60, priceHigh: 110, priceUnit: "ton" },
    ],
  },

  // 12. Pea Gravel
  "pea-gravel": {
    slug: "pea-gravel",
    displayName: "Pea Gravel",
    description:
      "Calculate pea gravel for paths, patios, and playground surfaces. Smooth, rounded stones at 1.3 tons/cy.",
    icon: "🟤",
    category: "landscaping",
    defaultDepthIn: 2,
    unitLabel: "ton",
    dimensionPresetGroup: "walkway",
    subtypes: [
      { name: "Standard Pea Gravel", densityTonsPerCy: 1.3, priceLow: 35, priceHigh: 70, priceUnit: "ton" },
      { name: "Colored Pea Gravel", densityTonsPerCy: 1.3, priceLow: 50, priceHigh: 90, priceUnit: "ton" },
    ],
  },

  // 13. Crushed Stone
  "crushed-stone": {
    slug: "crushed-stone",
    displayName: "Crushed Stone",
    description:
      "Calculate crushed stone for driveways, base layers, and drainage. Angular stone at 1.4 tons/cy.",
    icon: "🔨",
    category: "hardscaping",
    defaultDepthIn: 4,
    unitLabel: "ton",
    dimensionPresetGroup: "driveway",
    subtypes: [
      { name: "Crushed Stone (#57)", densityTonsPerCy: 1.4, priceLow: 30, priceHigh: 60, priceUnit: "ton" },
      { name: "Crusher Run", densityTonsPerCy: 1.5, priceLow: 25, priceHigh: 50, priceUnit: "ton" },
    ],
  },

  // 14. Asphalt
  asphalt: {
    slug: "asphalt",
    displayName: "Asphalt",
    description:
      "Calculate asphalt tonnage for driveways, parking lots, and paving projects. 2.0 tons per cubic yard.",
    icon: "🛣️",
    category: "construction",
    defaultDepthIn: 4,
    unitLabel: "ton",
    dimensionPresetGroup: "driveway",
    subtypes: [
      { name: "Hot Mix Asphalt", densityTonsPerCy: 2.0, priceLow: 100, priceHigh: 200, priceUnit: "ton" },
      { name: "Cold Patch", priceLow: 10, priceHigh: 20, priceUnit: "bag", bagSizeCuft: 0.5 },
    ],
  },

  // 15. Brick
  brick: {
    slug: "brick",
    displayName: "Brick",
    description:
      "Calculate bricks for walls, planters, and paving. Includes mortar gap and standard brick dimensions.",
    icon: "🧱",
    category: "hardscaping",
    defaultDepthIn: 0,
    unitLabel: "brick",
    dimensionPresetGroup: "wall",
    subtypes: [
      { name: "Standard Modular (7.625×3.625 in)", priceLow: 0.5, priceHigh: 1.5, priceUnit: "brick", coverageRate: 0.192 },
      { name: "Queen (7.625×2.75 in)", priceLow: 0.6, priceHigh: 1.5, priceUnit: "brick", coverageRate: 0.146 },
      { name: "Engineer (7.625×3.625 in)", priceLow: 0.8, priceHigh: 2, priceUnit: "brick", coverageRate: 0.192 },
    ],
  },
} as const;

// SEO content for each calculator - used in the calculator page and dimension pages
export interface CalculatorSEOContent {
  intro: string;
  howToCalculate: string;
  tips: string[];
  faqs: { q: string; a: string }[];
}

export const calculatorSEOContent: Record<string, CalculatorSEOContent> = {
  mulch: {
    intro:
      "Mulch is an essential material for any garden or landscape project. It helps retain soil moisture, suppress weeds, and give your beds a clean, finished look. Use our mulch calculator to determine exactly how much you need — so you don't overbuy or run short.",
    howToCalculate:
      "To calculate mulch volume, multiply the length × width of your area in feet, then multiply by the depth in inches and divide by 324 to get cubic yards. For bags, divide cubic feet by 2 (standard bag size). A depth of 2–4 inches is recommended, with 3 inches being the sweet spot for most applications.",
    tips: [
      "Apply mulch 2–4 inches deep — thinner than 2 inches won't suppress weeds, thicker than 4 inches can suffocate plants.",
      "Keep mulch a few inches away from tree trunks and plant stems to prevent rot.",
      "One cubic yard of mulch covers about 108 sq ft at 3 inches deep.",
      "Refresh mulch annually; most organic mulches break down over 12–18 months.",
    ],
    faqs: [
      { q: "How many bags of mulch equal 1 cubic yard?", a: "There are 13.5 bags of 2-cubic-foot mulch in one cubic yard (27 ÷ 2 = 13.5)." },
      { q: "How deep should mulch be?", a: "3 inches is ideal for most applications. Flower beds and around trees do well at 3 inches; playgrounds may need 4–6 inches." },
      { q: "What type of mulch lasts longest?", a: "Cedar and cypress mulch last 2–3 years. Hardwood bark lasts 1–2 years. Rubber mulch can last 10+ years but doesn't enrich the soil." },
    ],
  },
  soil: {
    intro:
      "Whether you're filling raised beds, amending garden soil, or starting a new lawn, getting the right amount of soil is critical. Our soil calculator handles both single areas and multiple raised beds, giving you results in cubic yards and 40lb bags.",
    howToCalculate:
      "Multiply length × width in feet, then depth in inches, and divide by 324 for cubic yards. For raised beds, multiply by the number of beds. A 40lb bag of soil covers about 0.75 cubic feet.",
    tips: [
      "Raised beds need 6–12 inches of soil for vegetables; 4–6 inches for flowers.",
      "Mix compost with garden soil (1:3 ratio) for best results.",
      "Soil settles over time — add 10–15% extra to account for compaction.",
      "Test your existing soil pH before amending; most plants prefer 6.0–7.0.",
    ],
    faqs: [
      { q: "How much soil for a 4×8 raised bed?", a: "A 4×8 raised bed at 6 inches deep needs about 0.59 cubic yards (16 bags of 40lb soil). At 12 inches deep, you'll need 1.19 cubic yards." },
      { q: "What's the difference between garden soil and topsoil?", a: "Garden soil is enriched with compost and nutrients for planting. Topsoil is the upper layer of soil and is better for filling and grading." },
    ],
  },
  gravel: {
    intro:
      "Gravel is versatile: driveways, paths, drainage, and decorative landscaping. Our gravel calculator handles different gravel types with their specific densities, so your estimate is as accurate as possible.",
    howToCalculate:
      "Calculate cubic yards: (length × width × depth in inches) / 324. Then convert to tons by multiplying by the gravel type's density. Pea gravel is about 1.3 tons/cy, crushed stone 1.4 tons/cy, and river rock 1.5 tons/cy.",
    tips: [
      "For driveways, 4–6 inches of gravel is standard; for paths, 2–3 inches.",
      "Always use a weed barrier fabric under gravel to prevent weed growth.",
      "Order 5–10% extra to account for compaction and uneven surfaces.",
      "Angular gravel (crushed stone) locks together better than rounded gravel for driveways.",
    ],
    faqs: [
      { q: "How many tons of gravel for a 20×20 driveway?", a: "A 20×20 driveway at 4 inches deep needs about 4.94 cubic yards, or 6.9 tons of crushed stone." },
      { q: "What size gravel is best for a driveway?", a: "#57 crushed stone (about ¾–1 inch) is the most common driveway gravel. It compacts well and drains properly." },
    ],
  },
  concrete: {
    intro:
      "Pouring a concrete slab? Our concrete calculator tells you exactly how many cubic yards or bags you need — whether you're using ready-mix delivery or mixing 60lb or 80lb bags yourself.",
    howToCalculate:
      "The standard formula is (length × width × depth in inches) / 324 to get cubic yards. An 80lb bag yields 0.6 cubic feet, and a 60lb bag yields 0.45 cubic feet. Standard slab depth is 4 inches for patios and walkways.",
    tips: [
      "Always order 10% extra concrete to account for spillage, uneven ground, and form variations.",
      "For slabs, use 4 inches minimum; driveways should be 5–6 inches.",
      "Reinforce slabs with wire mesh or rebar to prevent cracking.",
      "Cure concrete for at least 7 days, keeping it moist for maximum strength.",
    ],
    faqs: [
      { q: "How many 80lb bags per cubic yard?", a: "There are 45 bags of 80lb concrete in one cubic yard (27 cu ft ÷ 0.6 cu ft per bag = 45)." },
      { q: "How thick should a concrete patio be?", a: "4 inches is standard for patios and walkways. If you'll park a vehicle on it, go with 5–6 inches." },
    ],
  },
  pavers: {
    intro:
      "Planning a paver patio or walkway? Our paver calculator accounts for paver size, project area, and waste factor so you buy the right number of pavers — no frustrating shortages or expensive overages.",
    howToCalculate:
      "Convert project area to square inches (sq ft × 144), then divide by the area of one paver (length × width in inches). Add a waste factor (5% standard) for cuts and breakage. Round up to the nearest whole paver.",
    tips: [
      "Always add at least 5% waste factor for cuts, breakage, and future repairs.",
      "For complex patterns like herringbone, add 10–15% waste.",
      "Buy all pavers from the same lot to ensure color consistency.",
      "Install a proper sand or gravel base — at least 4–6 inches compacted.",
    ],
    faqs: [
      { q: "How many pavers per square foot?", a: "A standard 4×8 inch brick paver covers 0.222 sq ft each, so you need about 4.5 pavers per square foot." },
      { q: "What's a good waste factor for pavers?", a: "5% for simple rectangular layouts, 10% for diagonal patterns, and 15% for complex designs like herringbone." },
    ],
  },
  sand: {
    intro:
      "Sand is the foundation of many hardscape projects. Use our sand calculator for paver bases, playground sand, or masonry work. Choose from different sand types for accurate tonnage and bag estimates.",
    howToCalculate:
      "Volume: (length × width × depth in inches) / 324 = cubic yards. For sand weight, multiply cubic yards by 1.3 (tons per cubic yard). A standard 50lb bag of sand covers about 0.5 cubic feet.",
    tips: [
      "Paver base sand should be 1 inch thick after compaction.",
      "Playground sand should be at least 12 inches deep under play equipment.",
      "Use coarse, angular sand for paver bases — not fine play sand.",
      "Compact sand in 2-inch lifts for best results.",
    ],
    faqs: [
      { q: "How much sand for a 12×12 paver patio base?", a: "A 12×12 area at 1 inch deep needs about 0.44 cubic yards or 0.58 tons of sand." },
      { q: "How many bags of sand per cubic yard?", a: "With 50lb bags at 0.5 cu ft each, you need 54 bags per cubic yard." },
    ],
  },
  topsoil: {
    intro:
      "Topsoil is the nutrient-rich upper layer essential for growing healthy grass and plants. Use our calculator to determine how much topsoil you need for lawn installation, overseeding, or garden bed preparation.",
    howToCalculate:
      "Multiply length × width (ft) × depth (inches) / 324 to get cubic yards. A 40lb bag of topsoil covers about 0.75 cubic feet. For lawns, 2 inches is the standard depth for top-dressing and overseeding.",
    tips: [
      "For new lawns, apply 4–6 inches of topsoil before seeding or laying sod.",
      "For overseeding existing lawns, 1–2 inches of top-dressing is sufficient.",
      "Screen your topsoil to remove rocks, roots, and debris before spreading.",
      "Grade topsoil with a slight slope away from buildings for proper drainage.",
    ],
    faqs: [
      { q: "How much topsoil for 1,000 sq ft of lawn?", a: "At 2 inches deep, you'll need about 6.2 cubic yards of topsoil for 1,000 sq ft. At 4 inches, you'll need 12.3 cubic yards." },
      { q: "Topsoil vs garden soil: what's the difference?", a: "Topsoil is the natural upper layer of earth, good for grading and filling. Garden soil is amended with compost and nutrients for planting." },
    ],
  },
  stone: {
    intro:
      "Decorative stone adds character and low-maintenance beauty to any landscape. From river-washed pebbles to angular crushed stone, our calculator helps you order the right amount for garden accents and landscape features.",
    howToCalculate:
      "Calculate volume: (length × width × depth in inches) / 324 = cubic yards. Convert to tons by multiplying by the stone density (1.3–1.5 tons/cy depending on type). Deeper coverage (3–4 inches) recommended for weed suppression.",
    tips: [
      "Larger stone sizes (2–4 inch) give better coverage per ton than smaller stones.",
      "Use a weed barrier beneath decorative stone to minimize maintenance.",
      "Edging helps keep decorative stone contained and looking neat.",
      "Order all stone from the same quarry batch for consistent color.",
    ],
    faqs: [
      { q: "How many tons of decorative stone for a 10×10 area?", a: "At 3 inches deep, a 10×10 area needs about 0.93 cubic yards or 1.3 tons (at 1.4 tons/cy)." },
      { q: "How deep should decorative stone be?", a: "3–4 inches is recommended. At 2 inches, you may see soil through the gaps." },
    ],
  },
  "fill-dirt": {
    intro:
      "Fill dirt is the workhorse of construction and landscaping — used for leveling yards, backfilling foundations, and raising low areas. Our calculator gives you cubic yards, tons, and dump truck loads.",
    howToCalculate:
      "Cubic yards = (length × width × depth in inches) / 324. Fill dirt weighs about 1.2 tons per cubic yard (2,400 lbs). A standard dump truck holds 10–14 cubic yards.",
    tips: [
      "Clean fill is free of organic matter and debris — ideal for structural fill.",
      "Fill dirt settles 10–20% over time — order extra accordingly.",
      "Compact fill in 6–8 inch lifts for structural applications.",
      "Always call 811 before digging or filling to check for underground utilities.",
    ],
    faqs: [
      { q: "How many dump truck loads for 50 cubic yards of fill dirt?", a: "A standard dump truck holds 10–14 cubic yards, so expect 4–5 truckloads for 50 cubic yards." },
      { q: "What does fill dirt cost per cubic yard?", a: "Clean fill typically costs $15–$35 per cubic yard delivered, depending on your location and quantity." },
    ],
  },
  limestone: {
    intro:
      "Limestone is a popular choice for driveways, base material, and drainage projects. Its angular shape locks together for a stable surface. Use our calculator for accurate tonnage and cost estimates.",
    howToCalculate:
      "Cubic yards = (length × width × depth in inches) / 324. Limestone weighs approximately 1.5 tons per cubic yard. For driveway base, 4–6 inches is standard.",
    tips: [
      "#57 limestone (¾–1 inch) is the most common driveway stone size.",
      "Limestone screenings work well as a leveling layer beneath pavers.",
      "Limestone can raise soil pH over time — avoid using near acid-loving plants.",
      "Compact limestone in layers for maximum stability.",
    ],
    faqs: [
      { q: "How much limestone for a 20×30 driveway?", a: "A 20×30 driveway at 4 inches deep needs about 7.4 cubic yards or 11.1 tons of limestone." },
      { q: "What's the difference between limestone and gravel?", a: "Limestone is a specific type of sedimentary rock with higher calcium content. It tends to be lighter in color and packs tighter than general gravel." },
    ],
  },
  "river-rock": {
    intro:
      "River rock's smooth, rounded surfaces make it a beautiful choice for landscaping, dry creek beds, and drainage areas. At 1.4 tons per cubic yard, our calculator gives you an accurate estimate.",
    howToCalculate:
      "Cubic yards = (length × width × depth in inches) / 324. River rock weighs about 1.4 tons per cubic yard. For ground cover, 2–3 inches is recommended.",
    tips: [
      "River rock works great for drainage because water flows freely between the smooth stones.",
      "Use larger river rock (3–5 inches) for dry creek beds, smaller (1–2 inches) for ground cover.",
      "River rock retains less heat than crushed stone — better for areas near plants.",
      "Install edging to keep river rock from migrating into lawn areas.",
    ],
    faqs: [
      { q: "How many tons of river rock per cubic yard?", a: "River rock weighs approximately 1.4–1.5 tons per cubic yard, depending on stone size." },
      { q: "Is river rock good for drainage?", a: "Yes, the smooth, rounded shape allows excellent water flow, making it ideal for French drains and dry creek beds." },
    ],
  },
  "pea-gravel": {
    intro:
      "Pea gravel's small, smooth, rounded stones create a comfortable walking surface perfect for paths, patios, and playgrounds. At 1.3 tons per cubic yard, it's lighter than most crushed stone.",
    howToCalculate:
      "Cubic yards = (length × width × depth in inches) / 324. Pea gravel is about 1.3 tons per cubic yard. A 2-inch depth is standard for paths and patios.",
    tips: [
      "Pea gravel is comfortable underfoot — great for barefoot areas and playgrounds.",
      "It doesn't lock together like angular stone, so use edging to contain it.",
      "Rake pea gravel periodically to maintain an even surface.",
      "At 2 inches deep, one ton covers about 100 sq ft.",
    ],
    faqs: [
      { q: "How much pea gravel for a 20×3 walkway?", a: "A 20×3 walkway at 2 inches deep needs about 0.37 cubic yards or 0.48 tons of pea gravel." },
      { q: "Does pea gravel compact?", a: "Pea gravel does not compact well due to its rounded shape. It's best for decorative surfaces rather than structural bases." },
    ],
  },
  "crushed-stone": {
    intro:
      "Crushed stone's angular edges lock together tightly, making it the best choice for driveways, road base, and structural fill. At 1.4 tons per cubic yard, our calculator gives you an accurate estimate.",
    howToCalculate:
      "Cubic yards = (length × width × depth in inches) / 324. Crushed stone weighs about 1.4 tons per cubic yard. For driveways, use 4–6 inches of depth.",
    tips: [
      "Angular crushed stone compacts better than rounded gravel for driveways.",
      "Use a layer of larger stone (2–3 inch) as a base, topped with smaller stone (¾ inch) for the surface.",
      "Crusher run includes stone dust and fines — it packs extremely tight.",
      "Always grade your driveway with a slight crown for water runoff.",
    ],
    faqs: [
      { q: "How much crushed stone for a 30×12 driveway?", a: "A 30×12 driveway at 4 inches deep needs about 4.44 cubic yards or 6.2 tons of crushed stone." },
      { q: "What is crusher run?", a: "Crusher run (or crush-and-run) is a mix of crushed stone and stone dust. It compacts tightly and is excellent for driveway bases." },
    ],
  },
  asphalt: {
    intro:
      "Asphalt is the go-to material for smooth, durable driveways and parking areas. Our asphalt calculator converts your project dimensions into tonnage — the standard unit for ordering hot mix asphalt.",
    howToCalculate:
      "Cubic yards = (length × width × depth in inches) / 324. Asphalt weighs approximately 2.0 tons per cubic yard. Standard depth is 4 inches for residential driveways.",
    tips: [
      "Hot mix asphalt must be installed while hot — schedule delivery carefully.",
      "A properly installed asphalt driveway can last 15–20 years with maintenance.",
      "Sealcoat your asphalt every 2–3 years to extend its life.",
      "The base layer beneath asphalt is just as important — use 6–8 inches of compacted gravel.",
    ],
    faqs: [
      { q: "How many tons of asphalt for a 20×20 driveway?", a: "A 20×20 driveway at 4 inches deep needs about 4.94 cubic yards or 9.9 tons of asphalt." },
      { q: "How much does asphalt cost per ton?", a: "Hot mix asphalt typically costs $100–$200 per ton installed, depending on your location and project size." },
    ],
  },
  brick: {
    intro:
      "Bricks are timeless for walls, patios, and walkways. Our brick calculator accounts for mortar gaps and waste factor, giving you an accurate brick count for your project.",
    howToCalculate:
      "Bricks per square foot = 144 / ((brick_length + mortar_gap) × (brick_width + mortar_gap)). Standard brick is 7.625 × 3.625 inches with a ⅜ inch mortar gap, yielding about 5.3 bricks per sq ft.",
    tips: [
      "Standard mortar gap is ⅜ inch (0.375 inches).",
      "Order 5–10% extra bricks for cuts, breakage, and future repairs.",
      "For walls over 3 feet tall, consult a structural engineer.",
      "Match your mortar color to your brick for a seamless look, or contrast for definition.",
    ],
    faqs: [
      { q: "How many bricks per square foot with mortar?", a: "With standard 7.625×3.625 inch bricks and a ⅜ inch mortar gap, you get about 5.3 bricks per square foot." },
      { q: "How many bricks for a 20×8 wall?", a: "A 20×8 foot wall (160 sq ft) needs approximately 850 bricks with standard dimensions and mortar gaps." },
    ],
  },
};
