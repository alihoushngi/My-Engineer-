import { z } from "zod/v4";
import { OTP_LENGTH } from "@/config/registration.config/registration.config";

export const otpStepSchema = z.object({
  code: z
    .string()
    .min(1, "کد تأیید الزامی است.")
    .regex(/^\d{5}$/, `کد تأیید باید دقیقاً ${OTP_LENGTH} رقم باشد.`),
});

export type OtpStepData = z.infer<typeof otpStepSchema>;

export type OtpError = "invalid" | "expired" | "network" | null;
