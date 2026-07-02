/**
 * EN 15804 lifecycle modules, in cradle-to-grave order. Extraction
 * sometimes reports combined ranges (e.g. "C1-C4") instead of
 * individual modules, so both forms are included in the order map.
 */
export const STAGE_ORDER: string[] = [
  "A1-A3",
  "A4",
  "A5",
  "B1",
  "B2",
  "B3",
  "B4",
  "B5",
  "B6",
  "B7",
  "C1",
  "C2",
  "C3",
  "C4",
  "C1-C4",
  "D",
];

export const STAGE_GROUP: Record<string, "Product" | "Construction" | "Use" | "End of life" | "Beyond"> = {
  "A1-A3": "Product",
  A4: "Construction",
  A5: "Construction",
  B1: "Use",
  B2: "Use",
  B3: "Use",
  B4: "Use",
  B5: "Use",
  B6: "Use",
  B7: "Use",
  C1: "End of life",
  C2: "End of life",
  C3: "End of life",
  C4: "End of life",
  "C1-C4": "End of life",
  D: "Beyond",
};

export const STAGE_LABEL: Record<string, string> = {
  "A1-A3": "Raw material, transport & manufacturing",
  A4: "Transport to site",
  A5: "Installation",
  B1: "Use",
  B2: "Maintenance",
  B3: "Repair",
  B4: "Replacement",
  B5: "Refurbishment",
  B6: "Operational energy use",
  B7: "Operational water use",
  C1: "Deconstruction / demolition",
  C2: "Transport to waste processing",
  C3: "Waste processing",
  C4: "Disposal",
  "C1-C4": "End-of-life (combined)",
  D: "Reuse, recovery & recycling potential",
};

export function stageSortIndex(stage: string): number {
  const idx = STAGE_ORDER.indexOf(stage);
  return idx === -1 ? STAGE_ORDER.length : idx;
}

export function sortStages<T extends { stage: string }>(stages: T[]): T[] {
  return [...stages].sort((a, b) => stageSortIndex(a.stage) - stageSortIndex(b.stage));
}
