import type { Product } from "@/types/product";

export interface ProductFilters {
  query: string;
  manufacturers: string[];
  locations: string[];
  maxProductionGWP: number | null;
  minCompressiveStrength: number | null;
  maxCompressiveStrength: number | null;
}

export const EMPTY_FILTERS: ProductFilters = {
  query: "",
  manufacturers: [],
  locations: [],
  maxProductionGWP: null,
  minCompressiveStrength: null,
  maxCompressiveStrength: null,
};

export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  const query = filters.query.trim().toLowerCase();

  return products.filter((p) => {
    if (query) {
      const haystack = `${p.name} ${p.manufacturer} ${p.manufacturingLocation} ${p.declarationNumber}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    if (filters.manufacturers.length > 0 && !filters.manufacturers.includes(p.manufacturer)) {
      return false;
    }

    if (filters.locations.length > 0 && !filters.locations.includes(p.manufacturingLocation)) {
      return false;
    }

    if (filters.maxProductionGWP !== null && p.productionGWP !== null && p.productionGWP > filters.maxProductionGWP) {
      return false;
    }

    // Compressive strength: a product with no reported strength is kept
    // out of a narrowed range rather than silently passing through as
    // if it matched — missing data shouldn't masquerade as a match.
    if (filters.minCompressiveStrength !== null || filters.maxCompressiveStrength !== null) {
      if (p.compressiveStrength === null) return false;
      if (filters.minCompressiveStrength !== null && p.compressiveStrength < filters.minCompressiveStrength) {
        return false;
      }
      if (filters.maxCompressiveStrength !== null && p.compressiveStrength > filters.maxCompressiveStrength) {
        return false;
      }
    }

    return true;
  });
}

export function uniqueManufacturers(products: Product[]): string[] {
  return Array.from(new Set(products.map((p) => p.manufacturer))).sort();
}

export function uniqueLocations(products: Product[]): string[] {
  return Array.from(new Set(products.map((p) => p.manufacturingLocation))).sort();
}
