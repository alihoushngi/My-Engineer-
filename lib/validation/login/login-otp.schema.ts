import * as yup from "yup";
import { LOGIN_OTP_LENGTH } from "@/lib/validation/login/login-otp-length";

export const loginOtpSchema = yup.object({
  code: yup
    .string()
    .required("کد تأیید الزامی است.")
    .matches(
      new RegExp(`^\\d{${LOGIN_OTP_LENGTH}}$`),
      `کد تأیید باید دقیقاً ${LOGIN_OTP_LENGTH} رقم باشد.`,
    ),
});

export type LoginOtpData = yup.InferType<typeof loginOtpSchema>;
