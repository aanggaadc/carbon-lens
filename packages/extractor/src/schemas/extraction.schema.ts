import { z } from "zod";

export const ExtractionSchema = z.object({
  model: z.string(),

  timestamp: z.string(),

  warnings: z.array(z.string()),
});