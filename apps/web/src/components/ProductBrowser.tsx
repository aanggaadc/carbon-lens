"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/types/product";
import { EMPTY_FILTERS, filterProducts, uniqueLocations, uniqueManufacturers, type ProductFilters } from "@/lib/filter";
import { SearchBar } from "./SearchBar";
import { FilterPanel } from "./FilterPanel";
import { ProductCard } from "./ProductCard";

interface ProductBrowserProps {
  products: Product[];
}

export function ProductBrowser({ products }: ProductBrowserProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<ProductFilters>(EMPTY_FILTERS);
  const [selected, setSelected] = useState<string[]>([]);

  const manufacturers = useMemo(() => uniqueManufacturers(products), [products]);
  const locations = useMemo(() => uniqueLocations(products), [products]);

  const gwpValues = products.map((p) => p.productionGWP).filter((v): v is number => v !== null);
  const gwpBounds = {
    min: Math.floor(Math.min(...gwpValues, 0)),
    max: Math.ceil(Math.max(...gwpValues, 1)),
  };

  const strengthValues = products.map((p) => p.compressiveStrength).filter((v): v is number => v !== null);
  const strengthBounds = {
    min: strengthValues.length ? Math.floor(Math.min(...strengthValues)) : 0,
    max: strengthValues.length ? Math.ceil(Math.max(...strengthValues)) : 0,
  };

  const filtered = useMemo(() => filterProducts(products, filters), [products, filters]);

  function toggleSelect(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
      <aside className="space-y-6">
        <FilterPanel
          manufacturers={manufacturers}
          locations={locations}
          filters={filters}
          onChange={setFilters}
          gwpBounds={gwpBounds}
          strengthBounds={strengthBounds}
        />
      </aside>

      <div>
        <div className="mb-5">
          <SearchBar value={filters.query} onChange={(query) => setFilters({ ...filters, query })} />
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted">
            {filtered.length} of {products.length} products
          </p>
          {selected.length > 0 && (
            <button
              type="button"
              onClick={() => router.push(`/compare?ids=${selected.join(",")}`)}
              className="rounded-full bg-teal px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-white hover:bg-teal/90 transition-colors cursor-pointer"
            >
              Compare {selected.length} selected →
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-ink-muted border border-dashed border-rule rounded-lg p-8 text-center">
            No products match these filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                selected={selected.includes(product.id)}
                onToggleSelect={toggleSelect}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
