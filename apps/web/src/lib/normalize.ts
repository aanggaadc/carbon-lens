import type { EPDRecord } from "@/types/epd";
import type { Product, StageImpact } from "@/types/product";
import { sortStages } from "./stages";

/**
 * Converts one raw extracted EPD record into the normalized Product
 * shape the UI consumes. Pure function: no I/O, easy to reason about
 * and reuse (list view, detail view, comparison view all share it).
 */
export function normalizeEPD(record: EPDRecord): Product {
  const gwptEntries = record.environmentalImpact.filter((e) => e.indicator === "GWPt");

  const stages: StageImpact[] = sortStages(
    gwptEntries.map((entry) => ({
      stage: entry.stage,
      status: entry.impact.status,
      value: entry.impact.value,
      unit: entry.impact.unit,
      provenance: entry.impact.provenance,
    }))
  );

  const declared = stages.filter((s) => s.status === "DECLARED" && s.value !== null);

  const productionGWP = stages.find((s) => s.stage === "A1-A3")?.value ?? null;
  const moduleDGWP = stages.find((s) => s.stage === "D")?.value ?? null;

  const totalDeclaredGWP = declared.length > 0 ? declared.reduce((sum, s) => sum + (s.value ?? 0), 0) : null;

  return {
    id: record.id,
    declarationNumber: record.metadata.declarationNumber,
    programOperator: record.metadata.programOperator,
    name: record.product.name,
    manufacturer: record.product.manufacturer,
    description: record.product.description,
    category: record.product.category,
    compressiveStrength: record.product.compressiveStrength,
    compressiveStrengthUnit: record.product.compressiveStrengthUnit,
    declaredUnit: record.product.declaredUnit,
    manufacturingLocation: record.product.manufacturingLocation,
    standard: record.product.standard,
    issueDate: record.metadata.issueDate,
    validUntil: record.metadata.validUntil,
    sourceFileName: record.source.fileName,
    documentTitle: record.source.documentTitle,
    stages,
    productionGWP,
    moduleDGWP,
    totalDeclaredGWP,
    declaredCount: stages.filter((s) => s.status === "DECLARED").length,
    notDeclaredCount: stages.filter((s) => s.status === "NOT_DECLARED").length,
  };
}
