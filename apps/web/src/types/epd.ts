/**
 * Types matching the raw JSON schema produced by the extraction engine
 * (packages/extractor). This schema is considered stable and must not
 * be changed from the application side. See /data/*.json for examples.
 */

export type ImpactStatus = "DECLARED" | "NOT_DECLARED";

export interface EPDProvenance {
  page: number | null;
  section: string | null;
  table: string | null;
  rawText: string | null;
}

export interface EPDImpact {
  value: number | null;
  unit: string;
  status: ImpactStatus;
  provenance: EPDProvenance;
}

export interface EPDEnvironmentalImpactEntry {
  stage: string;
  indicator: string;
  impact: EPDImpact;
}

export interface EPDSource {
  fileName: string;
  documentTitle: string;
  version: string | null;
}

export interface EPDMetadata {
  programOperator: string;
  declarationNumber: string;
  issueDate: string;
  validUntil: string;
}

export interface EPDProduct {
  name: string;
  manufacturer: string;
  description: string;
  category: string;
  compressiveStrength: number | null;
  compressiveStrengthUnit: string | null;
  declaredUnit: string;
  manufacturingLocation: string;
  standard: string;
}

export interface EPDExtraction {
  model: string;
  timestamp: string;
  warnings: string[];
}

/** One EPD document, exactly as written to /data/*.json */
export interface EPDRecord {
  id: string;
  source: EPDSource;
  metadata: EPDMetadata;
  product: EPDProduct;
  environmentalImpact: EPDEnvironmentalImpactEntry[];
  extraction: EPDExtraction;
}
