import * as yup from "yup";

export const serviceAreaStepSchema = yup.object({
  provinceId: yup.string().required("انتخاب استان الزامی است."),
  cityId: yup.string().required("انتخاب شهر الزامی است."),
  nearbyCityIds: yup.array(yup.string().required()).default([]),
});

export type ServiceAreaStepData = yup.InferType<typeof serviceAreaStepSchema>;
