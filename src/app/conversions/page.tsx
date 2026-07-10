import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Construction Unit Converter",
  description:
    "Convert between common construction units: feet to meters, inches to centimeters, square feet to square meters, cubic yards to cubic meters, and more.",
  alternates: {
    canonical: "https://materialmath.com/conversions",
  },
};

export default function ConversionsPage() {
  return (
    <div>
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-medium text-[var(--accent)] mb-3 tracking-wide uppercase">
            Tools
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--ink)] mb-4">
            Construction Unit Converter
          </h1>
          <p className="text-lg text-[var(--ink-muted)] mb-12 leading-relaxed">
            Convert between the units used on construction sites and in hardware stores. Length,
            area, volume, and weight — switch between imperial and metric instantly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { category: "Length", conversions: ["Feet to Meters", "Inches to Centimeters", "Yards to Meters", "Meters to Feet"] },
              { category: "Area", conversions: ["Square Feet to Square Meters", "Square Yards to Square Meters", "Acres to Hectares"] },
              { category: "Volume", conversions: ["Cubic Feet to Cubic Meters", "Cubic Yards to Cubic Meters", "Gallons to Liters"] },
              { category: "Weight", conversions: ["Pounds to Kilograms", "Tons to Metric Tonnes", "Ounces to Grams"] },
            ].map((group) => (
              <div
                key={group.category}
                className="p-6 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)]"
              >
                <h2 className="font-display font-semibold text-lg text-[var(--ink)] mb-4">
                  {group.category}
                </h2>
                <ul className="space-y-2">
                  {group.conversions.map((conv) => (
                    <li key={conv} className="text-sm text-[var(--ink-muted)]">
                      {conv}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-[var(--ink-muted)] bg-[var(--bg-muted)] rounded-lg p-4">
            Full interactive unit converters are coming soon. In the meantime, every calculator on Material
            Math accepts both imperial and metric inputs and handles conversions automatically.
          </p>
        </div>
      </section>
    </div>
  );
}
