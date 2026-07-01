import { z } from "zod";

export const ProvenanceSchema = z.object({
  page: z.number().int().positive(),

  section: z.string().nullable(),

  table: z.string().nullable(),

  rawText: z.string(),
});

export const ValueStatusSchema = z.enum([
  "DECLARED",
  "NOT_DECLARED",
  "NOT_APPLICABLE",
  "UNKNOWN",
]);

export const CarbonValueSchema = z.object({
  value: z.number().nullable(),

  unit: z.string().nullable(),

  status: ValueStatusSchema,

  provenance: ProvenanceSchema,
});