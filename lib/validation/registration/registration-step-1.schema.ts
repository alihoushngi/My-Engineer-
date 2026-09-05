import * as yup from "yup";
import {
  validateIranianMobile,
  validateIranianNationalId,
} from "@/lib/validation/iranian-identity/iranian-identity";

export const identityStepSchema = yup.object({
  phone: yup
    .string()
    .required("شماره موبایل را وارد کنید.")
    .test("iranian-mobile", "شماره موبایل معتبر نیست.", (value) =>
      Boolean(value && validateIranianMobile(value)),
    ),
  nationalId: yup
    .string()
    .required("کد ملی را وارد کنید.")
    .test("iranian-national-id", "کد ملی وارد‌شده معتبر نیست.", (value) =>
      Boolean(value && validateIranianNationalId(value)),
    ),
  termsAccepted: yup
    .mixed<true>()
    .oneOf([true], "پذیرش شرایط استفاده الزامی است.")
    .required("پذیرش شرایط استفاده الزامی است."),
});

export type IdentityStepData = yup.InferType<typeof identityStepSchema>;
