import * as yup from "yup";
import { validateIranianMobile } from "@/lib/validation/iranian-identity/iranian-identity";

export const loginPasswordSchema = yup.object({
  phone: yup
    .string()
    .required("شماره موبایل را وارد کنید.")
    .test("iranian-mobile", "شماره موبایل معتبر نیست.", (value) =>
      Boolean(value && validateIranianMobile(value)),
    ),
  password: yup.string().required("رمز عبور را وارد کنید."),
});

export type LoginPasswordData = yup.InferType<typeof loginPasswordSchema>;
