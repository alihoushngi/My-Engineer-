import { type DegreeKey } from "@/types/store/registration.types";

export {
  educationStepSchema,
  type EducationStepFormData,
} from "@/lib/validation/registration/registration-education.schema";

export const ABOVE_DIPLOMA_DEGREES: readonly {
  key: DegreeKey;
  label: string;
}[] = [
  { key: "associate", label: "کاردانی" },
  { key: "bachelor", label: "کارشناسی" },
  { key: "master", label: "کارشناسی ارشد" },
  { key: "doctorate", label: "دکتری" },
];
