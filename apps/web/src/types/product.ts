import type { EPDProvenance, ImpactStatus } from "./epd";

/** A single lifecycle-stage GWPt reading, normalized for display. */
export interface StageImpact {
  stage: string;
  status: ImpactStatus;
  value: number | null;
  unit: string;
  provenance: EPDProvenance;
}

/**
 * A concrete product, normalized from an EPDRecord into the shape the
 * UI actually consumes. All derived/computed fields (totals, sorted
 * stages) are calculated once here, not re-derived inside components.
 */
export interface Product {
  id: string;
  declarationNumber: string;
  programOperator: string;
  name: string;
  manufacturer: string;
  description: string;
  category: string;
  compressiveStrength: number | null;
  compressiveStrengthUnit: string | null;
  declaredUnit: string;
  manufacturingLocation: string;
  standard: string;
  issueDate: string;
  validUntil: string;
  sourceFileName: string;
  documentTitle: string;

  /** All GWPt stages, sorted into lifecycle order. */
  stages: StageImpact[];

  /** A1-A3 (product stage) GWPt value, the primary comparison figure. */
  productionGWP: number | null;

  /** Module D (benefits/loads beyond system boundary), if declared. */
  moduleDGWP: number | null;

  /** Sum of every DECLARED stage value, module D included. */
  totalDeclaredGWP: number | null;

  /** Count of stages present in the source data with each status. */
  declaredCount: number;
  notDeclaredCount: number;
}
