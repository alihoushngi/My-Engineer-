import { z } from "zod/v4";

export const expertiseStepSchema = z.object({
  expertiseIds: z.array(z.string()),
  softwareIds: z.array(z.string()),
});

export type ExpertiseStepData = {
  expertiseIds: string[];
  softwareIds: string[];
};
