import { type ServiceSlug } from "@/config/services.config/services.config";
import { type ExpertCardData } from "@/types/store/expert.types";
import { type City } from "@/types/store/registration.types";
import { type RequestExpertOption } from "@/types/store/service-request.types";

export function toRequestExpertOption(
  expert: Pick<
    ExpertCardData,
    "id" | "name" | "href" | "city" | "serviceSlugs"
  >,
  cities: readonly City[],
): RequestExpertOption {
  return {
    id: expert.id,
    name: expert.name,
    href: expert.href,
    city: expert.city,
    cityId: cities.find((city) => city.name === expert.city)?.id,
    serviceSlugs: expert.serviceSlugs,
  };
}

export function toRequestExpertOptions(
  experts: readonly ExpertCardData[],
  cities: readonly City[],
): readonly RequestExpertOption[] {
  return experts.map((expert) => toRequestExpertOption(expert, cities));
}

export function expertRequestDefaults(
  expert: RequestExpertOption | undefined,
  lockedServiceSlug?: ServiceSlug,
): { cityId?: string; serviceSlug?: ServiceSlug } {
  return {
    cityId: expert?.cityId,
    serviceSlug: lockedServiceSlug ? undefined : expert?.serviceSlugs?.[0],
  };
}
