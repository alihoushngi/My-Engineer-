import * as yup from "yup";

export const personalInfoStepSchema = yup.object({
  firstName: yup.string().trim().required("نام الزامی است."),
  lastName: yup.string().trim().required("نام خانوادگی الزامی است."),
});

export type PersonalInfoStepData = yup.InferType<typeof personalInfoStepSchema>;
