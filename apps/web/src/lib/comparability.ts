import type { Product } from "@/types/product";

export interface ComparabilityResult {
  /** True if every product declares exactly the same set of stages. */
  fullyComparable: boolean;
  /** Stages declared by at least one product but not all of them. */
  unevenStages: string[];
}

/**
 * Two products can each have a "total declared GWPt" and still not be
 * directly comparable, if one of them simply reports fewer stages than
 * the other. This flags that situation so it can be surfaced in the UI
 * instead of silently implied by two numbers sitting side by side.
 */
export function analyzeComparability(products: Product[]): ComparabilityResult {
  if (products.length < 2) {
    return { fullyComparable: true, unevenStages: [] };
  }

  const declaredSets = products.map((p) => new Set(p.stages.filter((s) => s.status === "DECLARED").map((s) => s.stage)));

  const allStages = new Set(declaredSets.flatMap((set) => Array.from(set)));
  const unevenStages = Array.from(allStages).filter((stage) => !declaredSets.every((set) => set.has(stage)));

  return {
    fullyComparable: unevenStages.length === 0,
    unevenStages,
  };
}
