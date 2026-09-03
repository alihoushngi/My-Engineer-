import { z } from "zod/v4";

export const portfolioStepSchema = z.object({
  acceptRules: z.literal(true, {
    error: "پذیرش قوانین الزامی است.",
  }),
});

export type PortfolioStepData = z.infer<typeof portfolioStepSchema>;
