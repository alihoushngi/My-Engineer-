import { type ExpertReview } from "@/types/store/review.types";
import { type ServiceSlug } from "@/config/services.config/services.config";

export type ExpertId = string;

export type ExpertEducation = {
  degree: string;
  field?: string;
  institution?: string;
  year?: string;
};

export type ExpertLicense = {
  title: string;
  competencies?: readonly string[];
};

export type ExpertOrganizationMembership = {
  label: string;
};

export type ExpertPortfolioItem = {
  id: string;
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
};

/**
 * Public contact channels for a profile.
 * Phone/SMS values must come from a real API contract — never placeholders.
 */
export type ExpertContact = {
  phone?: string;
  sms?: string;
};

/**
 * Summary fields for listing surfaces (service, search, related).
 * Optional trust fields render only when provided by data.
 */
export type ExpertCardData = {
  id: ExpertId;
  href: `/experts/${string}`;
  name: string;
  profession: string;
  avatarSrc?: string;
  primarySpecialty?: string;
  city?: string;
  experienceYears?: number;
  isVerified?: boolean;
  isActive?: boolean;
  rating?: number;
  reviewCount?: number;
  specialties?: readonly string[];
  serviceSlugs?: readonly ServiceSlug[];
  discipline?: string;
  degree?: "associate" | "bachelor" | "master" | "doctorate";
  hasLicense?: boolean;
  track?: "craftsman" | "contractor";
};

/**
 * Public expert profile. All optional fields are omitted when unknown.
 * API CONTRACT REQUIRED for live values; do not invent backend columns.
 */
export type ExpertProfile = {
  id: ExpertId;
  name: string;
  profession: string;
  avatarSrc?: string;
  shortIntroduction?: string;
  about?: string;
  primarySpecialty?: string;
  isVerified?: boolean;
  isActive?: boolean;
  viewCount?: number;
  experienceYears?: number;
  city?: string;
  discipline?: string;
  serviceCities?: readonly string[];
  specialties?: readonly string[];
  software?: readonly string[];
  education?: readonly ExpertEducation[];
  organizationMembership?: ExpertOrganizationMembership;
  license?: ExpertLicense;
  qualifications?: readonly string[];
  history?: string;
  portfolio?: readonly ExpertPortfolioItem[];
  rating?: number;
  reviewCount?: number;
  reviews?: readonly ExpertReview[];
  contact?: ExpertContact;
  relatedExperts?: readonly ExpertCardData[];
};
