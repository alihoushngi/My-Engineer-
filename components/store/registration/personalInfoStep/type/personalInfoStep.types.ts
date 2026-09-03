import { z } from "zod/v4";

export const personalInfoStepSchema = z.object({
  firstName: z.string().min(1, "نام الزامی است."),
  lastName: z.string().min(1, "نام خانوادگی الزامی است."),
});

export type PersonalInfoStepData = z.infer<typeof personalInfoStepSchema>;
