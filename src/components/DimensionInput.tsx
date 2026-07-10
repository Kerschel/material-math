"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { LengthUnit, DepthUnit } from "@/lib/units";

interface DimensionInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  unit: LengthUnit | DepthUnit;
  onUnitChange: (unit: LengthUnit | DepthUnit) => void;
  unitOptions: { value: string; label: string }[];
  placeholder?: string;
  min?: number;
  step?: number;
  className?: string;
}

export function DimensionInput({
  label,
  value,
  onChange,
  unit,
  onUnitChange,
  unitOptions,
  placeholder = "0",
  min = 0,
  step = 1,
  className = "",
}: DimensionInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseFloat(e.target.value);
    onChange(isNaN(parsed) ? 0 : parsed);
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex gap-2">
        <Input
          type="number"
          value={value || ""}
          onChange={handleChange}
          placeholder={placeholder}
          min={min}
          step={step}
          className="flex-1"
        />
        <Select value={unit} onValueChange={(v) => v && onUnitChange(v)}>
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {unitOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

// Pre-built length unit options
export const LENGTH_UNITS = [
  { value: "ft", label: "ft" },
  { value: "in", label: "in" },
  { value: "yd", label: "yd" },
  { value: "m", label: "m" },
  { value: "cm", label: "cm" },
];

export const DEPTH_UNITS = [
  { value: "in", label: "in" },
  { value: "ft", label: "ft" },
  { value: "cm", label: "cm" },
];
