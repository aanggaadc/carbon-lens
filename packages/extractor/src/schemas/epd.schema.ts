import { z } from "zod";

import { ProductSchema } from "./product.schema";
import { EnvironmentalImpactSchema } from "./impact.schema";
import { ExtractionSchema } from "./extraction.schema";

export const ProductEPDSchema = z.object({
  id: z.string(),

  source: z.object({
    fileName: z.string(),

    documentTitle: z.string(),

    version: z.string().nullable(),
  }),

  metadata: z.object({
    programOperator: z.string().nullable(),

    declarationNumber: z.string().nullable(),

    issueDate: z.string().nullable(),

    validUntil: z.string().nullable(),
  }),

  product: ProductSchema,

  environmentalImpact: EnvironmentalImpactSchema,

  extraction: ExtractionSchema,
});

export type ProductEPD = z.infer<typeof ProductEPDSchema>;

export const ProductEPDJsonSchema =
    z.toJSONSchema(ProductEPDSchema);