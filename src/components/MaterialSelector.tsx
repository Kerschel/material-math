"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { MaterialSubtype } from "@/data/material-constants";

interface MaterialSelectorProps {
  subtypes: MaterialSubtype[];
  selected: string;
  onSelect: (subtypeName: string) => void;
  label?: string;
}

export function MaterialSelector({
  subtypes,
  selected,
  onSelect,
  label = "Material Type",
}: MaterialSelectorProps) {
  if (!subtypes || subtypes.length <= 1) return null;

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Select value={selected} onValueChange={(v) => v && onSelect(v)}>
        <SelectTrigger className="w-full max-w-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {subtypes.map((sub) => (
            <SelectItem key={sub.name} value={sub.name}>
              {sub.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
