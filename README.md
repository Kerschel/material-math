# Material Math

**Free online material calculators for home improvement and landscaping projects.** Enter your project dimensions and instantly get how much mulch, soil, gravel, concrete, pavers, or any material you need — plus cost estimates.

## Live Site

[https://materialmath.com](https://materialmath.com)

## 15 Calculators

| Category | Calculator | Slug |
|----------|-----------|------|
| 🌿 Landscaping | Mulch Calculator | `mulch` |
| 🌿 Landscaping | Soil Calculator | `soil` |
| 🌿 Landscaping | Gravel Calculator | `gravel` |
| 🌿 Landscaping | Sand Calculator | `sand` |
| 🌿 Landscaping | Topsoil Calculator | `topsoil` |
| 🌿 Landscaping | Stone Calculator | `stone` |
| 🌿 Landscaping | River Rock Calculator | `river-rock` |
| 🌿 Landscaping | Pea Gravel Calculator | `pea-gravel` |
| 🧱 Hardscaping | Paver Calculator | `pavers` |
| 🧱 Hardscaping | Crushed Stone Calculator | `crushed-stone` |
| 🧱 Hardscaping | Limestone Calculator | `limestone` |
| 🧱 Hardscaping | Brick Calculator | `brick` |
| 🏗️ Construction | Concrete Calculator | `concrete` |
| 🏗️ Construction | Fill Dirt Calculator | `fill-dirt` |
| 🏗️ Construction | Asphalt Calculator | `asphalt` |

## Programmatic SEO Pages

Pre-calculated dimension landing pages for the top 5 calculators. Example URLs:
- `/calculators/mulch/4x8-garden-bed-3-inches`
- `/calculators/concrete/12x12-patio-4-inches`
- `/calculators/gravel/20x12-driveway-4-inches`

## Tech Stack

- **Next.js 16** (App Router) with Turbopack
- **TypeScript** (strict)
- **Tailwind CSS v4**
- All interactive components use `"use client"` directive
- Static generation via `generateStaticParams` for SEO pages

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                          # Global layout (nav, footer, SEO metadata)
│   ├── page.tsx                            # Homepage (hero, calculator grid, how-it-works)
│   ├── sitemap.ts                          # Auto-generated sitemap
│   └── calculators/
│       ├── layout.tsx                      # Calculator layout wrapper
│       └── [slug]/
│           ├── page.tsx                    # Dynamic calculator tool page
│           └── [dimensions]/
│               └── page.tsx                # Programmatic SEO landing page
├── components/
│   ├── GenericCalculator.tsx               # Universal calculator engine (all 15 types)
│   ├── CalculatorCard.tsx                  # Homepage calculator cards
│   ├── CalculatorLayout.tsx                # Calculator page layout wrapper
│   ├── DimensionInput.tsx                  # Number input + unit selector
│   ├── MaterialSelector.tsx                # Material subtype dropdown
│   ├── ResultsPanel.tsx                    # Results display card
│   ├── CostBreakdown.tsx                   # Cost estimate display
│   ├── HowToGuide.tsx                      # Step-by-step guide
│   ├── SEOContent.tsx                      # Long-form SEO content
│   └── ui/                                # shadcn/ui components
├── lib/
│   ├── calculator-engine.ts                # Shared math engine (bulk, concrete, paver, brick)
│   ├── units.ts                            # Unit conversions
│   ├── pricing.ts                          # Cost estimation
│   ├── utils.ts                            # Tailwind class merging
│   ├── seo/
│   │   ├── metadata.ts                     # SEO metadata generation (JSON-LD, OG, etc.)
│   │   └── programmatic-pages.ts           # SEO page generator
│   └── materials/
│       ├── mulch.ts, soil.ts, gravel.ts, ... # Per-material calculator implementations
│       └── brick.ts                        # Brick calculator (custom formula)
└── data/
    ├── material-constants.ts               # All 15 calculator definitions + SEO content
    └── regional-pricing.ts                 # Regional pricing multipliers
```

## License

MIT
