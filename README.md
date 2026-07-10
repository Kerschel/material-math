# Material Math

**Free online material calculators for home improvement and landscaping projects.**

Enter your project dimensions and instantly get how much mulch, soil, gravel, concrete, pavers, or other material you need — with cost estimates.

## Calculators Included (15 Total)

### Landscaping
- **Mulch** — Shredded hardwood, pine bark, cedar, cypress
- **Soil / Topsoil** — Topsoil, garden mix, compost
- **Decorative Stone** — Lava rock, river rock, crushed granite, pea gravel, limestone gravel
- **Sod** — Standard and big rolls, pallet estimates
- **Grass Seed** — New lawn and overseeding rates
- **Fertilizer** — NPK-based application rates

### Hardscaping
- **Gravel** — Pea gravel, crushed stone, river rock (with compaction factor)
- **Sand** — Play sand, masonry sand, concrete sand
- **Pavers** — 5 common sizes with sand/gravel base calculations
- **Limestone / Crushed Stone** — Driveway base material
- **Retaining Wall** — Blocks, caps, gravel base, backfill, drainage

### Construction
- **Concrete** — Slabs, footings, columns — bags and ready-mix
- **Asphalt** — Overlay and new driveway calculations
- **Decking** — Boards, joists, beams, posts, concrete footings, screws
- **Fencing** — Posts, rails, pickets, concrete, gate hardware

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS** v4
- **shadcn/ui** components
- Pure React hooks — no external state library

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Global layout (nav, footer)
│   ├── page.tsx            # Homepage
│   ├── sitemap.ts          # Auto-generated sitemap
│   ├── calculators/        # 15 calculator pages
│   └── blog/               # Blog placeholder
├── components/             # Shared React components
│   ├── ui/                 # shadcn/ui base components
│   ├── CalculatorLayout.tsx
│   ├── DimensionInput.tsx
│   ├── ResultsPanel.tsx
│   ├── CostBreakdown.tsx
│   ├── MaterialSelector.tsx
│   ├── HowToGuide.tsx
│   ├── CalculatorCard.tsx
│   ├── SEOContent.tsx
│   └── GenericCalculator.tsx
├── lib/
│   ├── calculator-engine.ts # Shared math engine
│   ├── materials/           # 15 material-specific calculators
│   ├── seo/                 # Programmatic SEO generators
│   ├── units.ts             # Unit conversion utilities
│   └── pricing.ts           # Cost estimation
└── data/
    ├── material-constants.ts # Material configs, densities, presets
    └── regional-pricing.ts   # US regional price multipliers
```

## Architecture

All calculators share a single math engine (`lib/calculator-engine.ts`). Each material file in `lib/materials/` is a thin wrapper that calls the engine with material-specific parameters (density, bag sizes, waste factors). This ensures zero duplicated math across 15 tools.

Programmatic SEO pages are generated from dimension presets (`lib/seo/programmatic-pages.ts`) and included in the sitemap.

## License

MIT
