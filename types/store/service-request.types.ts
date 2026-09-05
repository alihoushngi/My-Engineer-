import { type ServiceSlug } from "@/config/services.config/services.config";

/**
 * Canonical marketplace request. Customer `/account/requests` and engineer
 * `/engineer/requests` are opposite views of this entity.
 *
 * Statuses are integration-ready scanning labels, not a backend lifecycle.
 * API CONTRACT REQUIRED / BUSINESS DECISION REQUIRED for accept, reject,
 * quote, and any richer state machine.
 */
export type ServiceRequestStatus = "sent" | "in_review" | "closed";

export type ServiceRequest = {
  id: string;
  title: string;
  serviceSlug?: ServiceSlug;
  serviceLabel: string;
  city?: string;
  cityId?: string;
  createdAtLabel: string;
  summary: string;
  description?: string;
  status: ServiceRequestStatus;
  expertId: string;
  expertName: string;
  expertHref: `/experts/${string}`;
  customerId: string;
  /** Engineer-safe display name. Never a mobile number. */
  customerDisplayName: string;
  conversationId?: string;
};

export type CreateServiceRequestInput = {
  expertId: string;
  serviceSlug: ServiceSlug;
  cityId: string;
  description: string;
};

export type RequestExpertOption = {
  id: string;
  name: string;
  href: `/experts/${string}`;
  city?: string;
  cityId?: string;
  serviceSlugs?: readonly ServiceSlug[];
};
