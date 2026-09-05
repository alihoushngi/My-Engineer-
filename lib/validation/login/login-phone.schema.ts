import * as yup from "yup";
import { validateIranianMobile } from "@/lib/validation/iranian-identity/iranian-identity";

export const loginPhoneSchema = yup.object({
  phone: yup
    .string()
    .required("شماره موبایل را وارد کنید.")
    .test("iranian-mobile", "شماره موبایل معتبر نیست.", (value) =>
      Boolean(value && validateIranianMobile(value)),
    ),
});

export type LoginPhoneData = yup.InferType<typeof loginPhoneSchema>;
