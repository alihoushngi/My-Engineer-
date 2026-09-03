import { z } from "zod/v4";

const _serviceAreaStepRaw = z.object({
  provinceId: z.string().min(1, "انتخاب استان الزامی است."),
  cityId: z.string().min(1, "انتخاب شهر الزامی است."),
  nearbyCityIds: z.array(z.string()),
});

export const serviceAreaStepSchema = _serviceAreaStepRaw;

export type ServiceAreaStepData = {
  provinceId: string;
  cityId: string;
  nearbyCityIds: string[];
};
