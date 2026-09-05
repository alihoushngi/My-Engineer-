import * as yup from "yup";

export const educationStepSchema = yup.object({
  level: yup
    .mixed<"diplomaOrLower" | "aboveDiploma">()
    .oneOf(["diplomaOrLower", "aboveDiploma"])
    .required(),
  degrees: yup
    .array(yup.string().required())
    .default([])
    .when("level", {
      is: "aboveDiploma",
      then: (schema) =>
        schema.min(
          1,
          "برای سطح بالاتر از دیپلم، حداقل یک مقطع تحصیلی انتخاب کنید.",
        ),
      otherwise: (schema) => schema,
    }),
});

export type EducationStepFormData = yup.InferType<typeof educationStepSchema>;
