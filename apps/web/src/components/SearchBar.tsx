"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by product, manufacturer or location…"
        className="w-full rounded-md border border-rule bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-1 focus:ring-teal focus:border-teal"
        aria-label="Search products"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink text-xs cursor-pointer"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
