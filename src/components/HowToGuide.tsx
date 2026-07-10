import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface HowToGuideProps {
  materialName: string;
  steps: string[];
  tips?: string[];
}

export function HowToGuide({ materialName, steps, tips }: HowToGuideProps) {
  return (
    <div className="space-y-6 mt-12">
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How to Calculate {materialName}: Step-by-Step Guide
        </h2>
        <ol className="space-y-4">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-gray-700 pt-0.5">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      {tips && tips.length > 0 && (
        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
          <h3 className="font-semibold text-amber-900 mb-2">Pro Tips</h3>
          <ul className="space-y-1.5">
            {tips.map((tip, i) => (
              <li key={i} className="text-sm text-amber-800 flex gap-2">
                <span>💡</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="text-center pt-4">
        <Link
          href="/"
          className="text-sm text-green-700 hover:text-green-800 underline"
        >
          ← Explore All Calculators
        </Link>
      </div>
    </div>
  );
}
