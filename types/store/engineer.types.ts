import { type ServiceSlug } from "@/config/services.config/services.config";
import {
  type ExpertEducation,
  type ExpertLicense,
  type ExpertOrganizationMembership,
  type ExpertPortfolioItem,
} from "@/types/store/expert.types";
import { type ExpertReview } from "@/types/store/review.types";

/**
 * Private engineer-workspace contracts.
 * Public profile fields reuse `types/store/expert.types.ts`.
 * Status values marked integration-ready are not a backend lifecycle.
 */

export type EngineerAccountAccessStatus =
  "registration_in_progress" | "pending_review" | "active";

/**
 * Integration-ready verification display states.
 * API CONTRACT REQUIRED for the real review process.
 */
export type EngineerVerificationStatus =
  "incomplete" | "pending_review" | "verified" | "needs_correction";

/**
 * Temporary request scanning statuses for list UI.
 * Final business lifecycle is API CONTRACT REQUIRED.
 */
export type EngineerRequestStatus = "new" | "in_review" | "closed";

export type EngineerNotificationKind =
  "request" | "message" | "review" | "verification" | "credential";

export type EngineerCredentialKind =
  "education" | "organization" | "license" | "certificate";

/**
 * Integration-ready document display states.
 * API CONTRACT REQUIRED for verification logic.
 */
export type EngineerCredentialStatus =
  "submitted" | "pending_review" | "verified" | "needs_correction";

export type EngineerAccount = {
  id: string;
  publicExpertId: string;
  displayName: string;
  profession: string;
  avatarSrc?: string;
  /** Already-masked display value. Never a full mobile number. */
  mobileDisplay?: string;
  accessStatus: EngineerAccountAccessStatus;
  verificationStatus: EngineerVerificationStatus;
};

export type EngineerProfile = {
  publicExpertId: string;
  firstName: string;
  lastName: string;
  profession: string;
  about?: string;
  avatarSrc?: string;
  specialties: readonly string[];
  software: readonly string[];
  history?: string;
  experienceYears?: number;
  education: readonly ExpertEducation[];
  organizationMembership?: ExpertOrganizationMembership;
  license?: ExpertLicense;
  qualifications?: readonly string[];
  serviceCities: readonly string[];
};

export type EngineerService = {
  slug: ServiceSlug;
  label: string;
  specialties: readonly string[];
  isListedOnProfile: boolean;
};

export type EngineerNearbyCity = {
  id: string;
  name: string;
};

export type EngineerServiceArea = {
  provinceId: string;
  provinceName: string;
  cityId: string;
  cityName: string;
  nearbyCities: readonly EngineerNearbyCity[];
};

export type EngineerRequest = {
  id: string;
  title: string;
  serviceLabel: string;
  city?: string;
  createdAtLabel: string;
  summary: string;
  description?: string;
  status: EngineerRequestStatus;
  isNew?: boolean;
  customerDisplayName?: string;
  conversationId?: string;
};

export type EngineerConversation = {
  id: string;
  participantName: string;
  lastMessagePreview: string;
  lastMessageAtLabel: string;
  unreadCount: number;
  relatedRequestId?: string;
  relatedServiceLabel?: string;
};

export type EngineerMessage = {
  id: string;
  conversationId: string;
  body: string;
  sentAtLabel: string;
  fromEngineer: boolean;
};

export type EngineerNotification = {
  id: string;
  kind: EngineerNotificationKind;
  title: string;
  body: string;
  createdAtLabel: string;
  isRead: boolean;
  href: string;
};

export type EngineerCredential = {
  id: string;
  kind: EngineerCredentialKind;
  title: string;
  description?: string;
  status: EngineerCredentialStatus;
  hasDocument: boolean;
};

export type EngineerPortfolioItem = ExpertPortfolioItem;

export type EngineerReview = ExpertReview;

export type ProfileCompletionItemId =
  | "avatar"
  | "personalInfo"
  | "specialties"
  | "resume"
  | "education"
  | "organization"
  | "serviceAreas"
  | "portfolio"
  | "credentials";

export type ProfileCompletionItem = {
  id: ProfileCompletionItemId;
  label: string;
  complete: boolean;
  href: string;
};

export type ProfileCompletion = {
  completedCount: number;
  totalCount: number;
  percent: number;
  items: readonly ProfileCompletionItem[];
};

export type EngineerWorkspace = {
  account: EngineerAccount;
  profile: EngineerProfile;
  services: readonly EngineerService[];
  serviceArea: EngineerServiceArea;
  requests: readonly EngineerRequest[];
  conversations: readonly EngineerConversation[];
  messagesByConversationId: Readonly<
    Record<string, readonly EngineerMessage[]>
  >;
  portfolio: readonly EngineerPortfolioItem[];
  credentials: readonly EngineerCredential[];
  reviews: readonly EngineerReview[];
  notifications: readonly EngineerNotification[];
};

export type EngineerAccessKind =
  | "visual_review"
  | "unavailable"
  | "unauthenticated"
  | "forbidden"
  | "registration_in_progress"
  | "pending_review"
  | "active";

export type EngineerAccessDenied = {
  kind: "unavailable" | "unauthenticated" | "forbidden";
};

export type EngineerAccessGranted = {
  kind:
    "visual_review" | "registration_in_progress" | "pending_review" | "active";
  workspace: EngineerWorkspace;
  continueRegistrationPath?: string;
};

export type EngineerAccessResult = EngineerAccessDenied | EngineerAccessGranted;

export type EngineerShellData = {
  accessKind: EngineerAccessGranted["kind"];
  displayName: string;
  profession: string;
  avatarSrc?: string;
  publicProfileHref?: `/experts/${string}`;
  unreadNotificationCount: number;
  unreadMessageCount: number;
  newRequestCount: number;
  verificationStatus: EngineerVerificationStatus;
  accessStatus: EngineerAccountAccessStatus;
  continueRegistrationPath?: string;
};
