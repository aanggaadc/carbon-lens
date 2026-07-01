import { z } from "zod";

export const ExtractionSchema = z.object({
  model: z.string(),

  timestamp: z.string(),

  confidence: z.number().min(0).max(1),

  warnings: z.array(z.string()),
});