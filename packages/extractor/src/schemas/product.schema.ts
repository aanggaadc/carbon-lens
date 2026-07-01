import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string(),

  manufacturer: z.string(),

  description: z.string().nullable(),

  category: z.string().nullable(),

  compressiveStrength: z.number().nullable(),

  compressiveStrengthUnit: z.string().nullable(),

  declaredUnit: z.string(),

  manufacturingLocation: z.string().nullable(),

  standard: z.string().nullable(),
});