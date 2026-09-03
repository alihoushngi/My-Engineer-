import { z } from "zod/v4";
import {
  QUALIFICATIONS_BY_DISCIPLINE,
  type ENGINEERING_DISCIPLINES,
} from "@/config/registration.config/registration.config";

type DisciplineId = (typeof ENGINEERING_DISCIPLINES)[number]["id"];

export const organizationStepSchema = z
  .object({
    isMember: z.enum(["yes", "no"]),
    membershipNumber: z.string(),
    hasLicense: z.enum(["yes", "no"]),
    licenseNumber: z.string(),
    discipline: z.string(),
    qualifications: z.array(z.string()),
  })
  .superRefine((data, ctx) => {
    if (data.isMember === "no") {
      return;
    }

    if (data.membershipNumber.trim() === "") {
      ctx.addIssue({
        code: "custom",
        path: ["membershipNumber"],
        message: "شماره عضویت الزامی است.",
      });
    }

    if (data.hasLicense === "no") {
      return;
    }

    if (data.licenseNumber.trim() === "") {
      ctx.addIssue({
        code: "custom",
        path: ["licenseNumber"],
        message: "شماره پروانه الزامی است.",
      });
    }

    if (data.discipline === "") {
      ctx.addIssue({
        code: "custom",
        path: ["discipline"],
        message: "انتخاب رشته الزامی است.",
      });
      return;
    }

    const options =
      QUALIFICATIONS_BY_DISCIPLINE[data.discipline as DisciplineId];

    if (options && options.length > 0 && data.qualifications.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["qualifications"],
        message: "حداقل یک صلاحیت انتخاب کنید.",
      });
    }
  });

export type OrganizationStepData = z.infer<typeof organizationStepSchema>;
