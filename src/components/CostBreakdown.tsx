"use client";

import type { CostEstimate } from "@/lib/pricing";
import { formatNumber, formatCurrency } from "@/lib/units";

interface CostBreakdownProps {
  costEstimate: CostEstimate;
  className?: string;
}

export function CostBreakdown({ costEstimate, className = "" }: CostBreakdownProps) {
  const { totalLow, totalHigh, breakdown } = costEstimate;

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="bg-blue-50 rounded-lg p-4">
        <p className="text-sm text-blue-700 font-medium">Estimated Total Cost</p>
        <p className="text-2xl font-bold text-blue-900">
          {totalLow === totalHigh
            ? formatCurrency(totalLow)
            : `${formatCurrency(totalLow)} – ${formatCurrency(totalHigh)}`}
        </p>
        <p className="text-xs text-blue-600 mt-0.5">
          Based on national average prices. Regional costs may vary.
        </p>
      </div>

      {breakdown.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-gray-600">Item</th>
                <th className="px-3 py-2 text-right font-medium text-gray-600">Qty</th>
                <th className="px-3 py-2 text-right font-medium text-gray-600">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {breakdown.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-gray-800">{item.label}</td>
                  <td className="px-3 py-2 text-right text-gray-600">
                    {formatNumber(item.quantity, 1)} {item.unit}
                  </td>
                  <td className="px-3 py-2 text-right text-gray-800 font-medium">
                    {item.totalLow === item.totalHigh
                      ? formatCurrency(item.totalLow)
                      : `${formatCurrency(item.totalLow)} – ${formatCurrency(item.totalHigh)}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
