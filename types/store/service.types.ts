import { type ServiceSlug } from "@/config/services.config/services.config";
import { type ExpertCardData } from "@/types/store/expert.types";
import { type FaqItem } from "@/types/store/faq.types";

export type ServiceSpecialty = {
  id: string;
  title: string;
  description: string;
};

export type ServiceProcessStep = {
  id: string;
  title: string;
  description: string;
};

export type ServiceDetailData = {
  slug: ServiceSlug;
  title: string;
  eyebrow: string;
  description: string;
  longDescription: string;
  imageSrc: string;
  imageAlt: string;
  accent: "teal" | "blue" | "orange" | "green" | "violet" | "rose";
  specialties: readonly ServiceSpecialty[];
  process: readonly ServiceProcessStep[];
  faqs: readonly FaqItem[];
  experts: readonly ExpertCardData[];
  scopeItems?: readonly string[];
  showSuggestedExperts?: boolean;
};
