import { z } from "zod/v4";

export const resumeStepSchema = z.object({
  experienceYears: z
    .number({ error: "سابقه کار باید عدد صفر یا بزرگ‌تر باشد." })
    .min(0, "سابقه کار باید عدد صفر یا بزرگ‌تر باشد."),
  resumeText: z.string().trim().min(10, "شرح سوابق باید حداقل ۱۰ نویسه باشد."),
});

export type ResumeStepData = {
  experienceYears: number;
  resumeText: string;
};
