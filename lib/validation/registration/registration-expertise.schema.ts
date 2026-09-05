import * as yup from "yup";

export const expertiseStepSchema = yup.object({
  expertiseIds: yup.array(yup.string().required()).default([]),
  softwareIds: yup.array(yup.string().required()).default([]),
});

export type ExpertiseStepData = yup.InferType<typeof expertiseStepSchema>;
