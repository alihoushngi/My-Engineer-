import { z } from "zod/v4";
import {
  type DegreeKey,
  type EducationLevel,
} from "@/types/store/registration.types";

export const educationStepSchema = z
  .object({
    level: z.enum(["diplomaOrLower", "aboveDiploma"] as const),
    degrees: z.array(z.string()),
  })
  .refine(
    (data) => {
      if (data.level === "aboveDiploma") {
        return data.degrees.length > 0;
      }
      return true;
    },
    {
      message: "برای سطح بالاتر از دیپلم، حداقل یک مقطع تحصیلی انتخاب کنید.",
      path: ["degrees"],
    },
  );

export type EducationStepFormData = {
  level: EducationLevel;
  degrees: string[];
};

export const ABOVE_DIPLOMA_DEGREES: readonly {
  key: DegreeKey;
  label: string;
}[] = [
  { key: "associate", label: "کاردانی" },
  { key: "bachelor", label: "کارشناسی" },
  { key: "master", label: "کارشناسی ارشد" },
  { key: "doctorate", label: "دکتری" },
];
