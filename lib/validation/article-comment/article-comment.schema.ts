import * as yup from "yup";
import { validateIranianMobile } from "@/lib/validation/iranian-identity/iranian-identity";

export const articleCommentSchema = yup.object({
  authorName: yup
    .string()
    .trim()
    .required("نام را وارد کنید.")
    .min(2, "نام باید دست‌کم دو نویسه باشد."),
  phone: yup
    .string()
    .required("شماره موبایل را وارد کنید.")
    .test("iranian-mobile", "شماره موبایل معتبر نیست.", (value) =>
      Boolean(value && validateIranianMobile(value)),
    ),
  body: yup
    .string()
    .trim()
    .required("متن نظر را وارد کنید.")
    .min(10, "نظر باید دست‌کم ده نویسه باشد."),
});

export type ArticleCommentFormValues = yup.InferType<
  typeof articleCommentSchema
>;
