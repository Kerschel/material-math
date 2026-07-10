"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/units";

interface ResultItem {
  label: string;
  value: number | string;
  unit?: string;
  highlight?: boolean;
}

interface ResultsPanelProps {
  title?: string;
  items: ResultItem[];
  className?: string;
}

function ResultCard({ item }: { item: ResultItem }) {
  return (
    <Card className={item.highlight ? "border-green-500 bg-green-50" : ""}>
      <CardContent className="p-4 text-center">
        <p className="text-2xl font-bold text-gray-900">
          {typeof item.value === "number" ? formatNumber(item.value, 1) : item.value}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {item.unit ? `${item.unit}` : ""}
        </p>
        <p className="text-xs font-medium text-gray-600 mt-0.5">{item.label}</p>
      </CardContent>
    </Card>
  );
}

export function ResultsPanel({ title, items, className = "" }: ResultsPanelProps) {
  if (items.length === 0) return null;

  return (
    <div className={`space-y-4 ${className}`}>
      {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {items.map((item, i) => (
          <ResultCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
}
