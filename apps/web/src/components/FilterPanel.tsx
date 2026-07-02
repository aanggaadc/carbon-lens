"use client";

import type { ProductFilters } from "@/lib/filter";

interface FilterPanelProps {
  manufacturers: string[];
  locations: string[];
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
  gwpBounds: { min: number; max: number };
  strengthBounds: { min: number; max: number };
}

function CheckList({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  if (options.length <= 1) return null;
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted mb-2">{title}</p>
      <div className="space-y-1.5">
        {options.map((name) => (
          <label key={name} className="flex items-center gap-2 text-sm text-ink cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes(name)}
              onChange={() => onToggle(name)}
              className="h-3.5 w-3.5 accent-[var(--teal)] cursor-pointer"
            />
            {name}
          </label>
        ))}
      </div>
    </div>
  );
}

export function FilterPanel({
  manufacturers,
  locations,
  filters,
  onChange,
  gwpBounds,
  strengthBounds,
}: FilterPanelProps) {
  function toggle(key: "manufacturers" | "locations", value: string) {
    const list = filters[key];
    const isActive = list.includes(value);
    onChange({
      ...filters,
      [key]: isActive ? list.filter((v) => v !== value) : [...list, value],
    });
  }

  const gwpValue = filters.maxProductionGWP ?? gwpBounds.max;
  const minStrengthValue = filters.minCompressiveStrength ?? strengthBounds.min;
  const maxStrengthValue = filters.maxCompressiveStrength ?? strengthBounds.max;
  const hasActiveFilters =
    filters.manufacturers.length > 0 ||
    filters.locations.length > 0 ||
    filters.maxProductionGWP !== null ||
    filters.minCompressiveStrength !== null ||
    filters.maxCompressiveStrength !== null ||
    filters.query;

  return (
    <div className="space-y-6">
      <CheckList
        title="Manufacturer"
        options={manufacturers}
        selected={filters.manufacturers}
        onToggle={(v) => toggle("manufacturers", v)}
      />

      <CheckList
        title="Manufacturing location"
        options={locations}
        selected={filters.locations}
        onToggle={(v) => toggle("locations", v)}
      />

      {strengthBounds.max > 0 && (
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted mb-2">
            Compressive strength (MPa)
          </p>
          <div className="flex items-center gap-2 text-xs text-ink-muted mb-1.5">
            <span className="font-mono text-ink w-8">{minStrengthValue}</span>
            <input
              type="range"
              min={strengthBounds.min}
              max={strengthBounds.max}
              value={minStrengthValue}
              onChange={(e) => {
                const next = Math.min(Number(e.target.value), maxStrengthValue);
                onChange({ ...filters, minCompressiveStrength: next });
              }}
              className="w-full accent-[var(--teal)] cursor-pointer"
              aria-label="Minimum compressive strength"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-ink-muted">
            <span className="font-mono text-ink w-8">{maxStrengthValue}</span>
            <input
              type="range"
              min={strengthBounds.min}
              max={strengthBounds.max}
              value={maxStrengthValue}
              onChange={(e) => {
                const next = Math.max(Number(e.target.value), minStrengthValue);
                onChange({ ...filters, maxCompressiveStrength: next });
              }}
              className="w-full accent-[var(--teal)] cursor-pointer"
              aria-label="Maximum compressive strength"
            />
          </div>
          <p className="mt-1 text-[10px] text-ink-muted">
            Products without a reported strength are excluded once this range is narrowed.
          </p>
        </div>
      )}

      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted mb-2">
          Max A1-A3 GWPt: <span className="text-ink">{gwpValue.toFixed(0)} kg CO2e</span>
        </p>
        <input
          type="range"
          min={gwpBounds.min}
          max={gwpBounds.max}
          value={gwpValue}
          onChange={(e) => onChange({ ...filters, maxProductionGWP: Number(e.target.value) })}
          className="w-full accent-[var(--teal)] cursor-pointer"
        />
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={() =>
            onChange({
              query: "",
              manufacturers: [],
              locations: [],
              maxProductionGWP: null,
              minCompressiveStrength: null,
              maxCompressiveStrength: null,
            })
          }
          className="font-mono text-[11px] uppercase tracking-[0.08em] text-teal hover:underline cursor-pointer"
        >
          Reset filters
        </button>
      )}
    </div>
  );
}
