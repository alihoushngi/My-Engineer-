import * as yup from "yup";

export const USER_PASSWORD_MIN_LENGTH = 8;

export const userRegisterProfileSchema = yup.object({
  displayName: yup
    .string()
    .trim()
    .required("نام را وارد کنید.")
    .min(2, "نام باید حداقل ۲ نویسه باشد."),
  password: yup
    .string()
    .required("رمز عبور را وارد کنید.")
    .min(
      USER_PASSWORD_MIN_LENGTH,
      `رمز عبور باید حداقل ${USER_PASSWORD_MIN_LENGTH} نویسه باشد.`,
    ),
});

export type UserRegisterProfileData = yup.InferType<
  typeof userRegisterProfileSchema
>;
