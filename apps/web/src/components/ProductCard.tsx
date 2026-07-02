import Link from "next/link";
import type { Product } from "@/types/product";
import { formatGWP } from "@/lib/format";

interface ProductCardProps {
  product: Product;
  selected: boolean;
  onToggleSelect: (id: string) => void;
}

export function ProductCard({ product, selected, onToggleSelect }: ProductCardProps) {
  return (
    <div
      className={`group relative rounded-lg border bg-surface transition-colors ${
        selected ? "border-teal ring-1 ring-teal" : "border-rule hover:border-ink/30"
      }`}
    >
      <label className="absolute top-3 right-3 flex items-center gap-1.5 cursor-pointer select-none z-10">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggleSelect(product.id)}
          className="h-3.5 w-3.5 accent-[var(--teal)] cursor-pointer"
          aria-label={`Select ${product.name} for comparison`}
        />
      </label>

      <Link href={`/products/${product.id}`} className="block p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted mb-2">
          {product.declarationNumber} · {product.manufacturer}
        </p>
        <h3 className="font-display text-lg leading-snug text-ink pr-6 group-hover:text-teal transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-ink-muted">{product.manufacturingLocation}</p>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-muted">A1-A3 · GWPt</p>
            <p className="font-mono text-2xl text-ink tabular-nums">
              {formatGWP(product.productionGWP)}
              <span className="text-xs text-ink-muted ml-1">kg CO2e</span>
            </p>
          </div>
          {product.compressiveStrength !== null && (
            <span className="font-mono text-[11px] text-ink-muted whitespace-nowrap">
              {product.compressiveStrength} {product.compressiveStrengthUnit}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}
