import { z } from "zod";

import { CarbonValueSchema } from "./common.schema";

export const LifecycleStageSchema = z.object({

    stage:z.string(),

    indicator:z.string(),

    impact:CarbonValueSchema

});

export const EnvironmentalImpactSchema = z.array(
  LifecycleStageSchema
);