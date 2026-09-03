import { z } from "zod/v4";
import {
  validateIranianMobile,
  validateIranianNationalId,
} from "@/lib/validation/iranian-identity/iranian-identity";

export const identityStepSchema = z.object({
  phone: z
    .string()
    .min(1, "شماره موبایل الزامی است.")
    .refine(validateIranianMobile, {
      message: "شماره موبایل باید با ۰۹ شروع و ۱۱ رقم باشد.",
    }),
  nationalId: z
    .string()
    .min(1, "کد ملی الزامی است.")
    .refine(validateIranianNationalId, {
      message: "کد ملی وارد‌شده معتبر نیست.",
    }),
  termsAccepted: z.literal(true, {
    error: "پذیرش شرایط استفاده الزامی است.",
  }),
});

export type IdentityStepData = z.infer<typeof identityStepSchema>;
