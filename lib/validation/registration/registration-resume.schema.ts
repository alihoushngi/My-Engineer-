import * as yup from "yup";

export const resumeStepSchema = yup.object({
  experienceYears: yup
    .number()
    .typeError("سابقه کار باید عدد صفر یا بزرگ‌تر باشد.")
    .min(0, "سابقه کار باید عدد صفر یا بزرگ‌تر باشد.")
    .required("سابقه کار الزامی است."),
  resumeText: yup
    .string()
    .trim()
    .required("شرح سوابق باید حداقل ۱۰ نویسه باشد.")
    .min(10, "شرح سوابق باید حداقل ۱۰ نویسه باشد."),
});

export type ResumeStepData = yup.InferType<typeof resumeStepSchema>;
