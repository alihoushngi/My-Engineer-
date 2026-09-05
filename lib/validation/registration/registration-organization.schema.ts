import * as yup from "yup";
import {
  QUALIFICATIONS_BY_DISCIPLINE,
  type ENGINEERING_DISCIPLINES,
} from "@/config/registration.config/registration.config";

type DisciplineId = (typeof ENGINEERING_DISCIPLINES)[number]["id"];

export const organizationStepSchema = yup.object({
  isMember: yup.mixed<"yes" | "no">().oneOf(["yes", "no"]).required(),
  membershipNumber: yup.string().when("isMember", {
    is: "yes",
    then: (schema) => schema.trim().required("شماره عضویت الزامی است."),
    otherwise: (schema) => schema,
  }),
  hasLicense: yup.mixed<"yes" | "no">().oneOf(["yes", "no"]).required(),
  licenseNumber: yup.string().when(["isMember", "hasLicense"], {
    is: (isMember: string, hasLicense: string) =>
      isMember === "yes" && hasLicense === "yes",
    then: (schema) => schema.trim().required("شماره پروانه الزامی است."),
    otherwise: (schema) => schema,
  }),
  discipline: yup.string().when(["isMember", "hasLicense"], {
    is: (isMember: string, hasLicense: string) =>
      isMember === "yes" && hasLicense === "yes",
    then: (schema) => schema.required("انتخاب رشته الزامی است."),
    otherwise: (schema) => schema,
  }),
  qualifications: yup
    .array(yup.string().required())
    .default([])
    .when(["isMember", "hasLicense", "discipline"], {
      is: (isMember: string, hasLicense: string, discipline: string) => {
        if (isMember !== "yes" || hasLicense !== "yes") {
          return false;
        }

        const options =
          QUALIFICATIONS_BY_DISCIPLINE[discipline as DisciplineId];

        return Boolean(options && options.length > 0);
      },
      then: (schema) => schema.min(1, "حداقل یک صلاحیت انتخاب کنید."),
      otherwise: (schema) => schema,
    }),
});

export type OrganizationStepData = yup.InferType<typeof organizationStepSchema>;
