import { type ServiceSlug } from "@/config/services.config/services.config";
import { type ServiceRequest } from "@/types/store/service-request.types";

const REQUEST_STATUSES = new Set(["sent", "in_review", "closed"]);

export function parseCreatedRequestsCookie(
  raw: string | undefined,
): readonly ServiceRequest[] {
  if (!raw) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(raw));

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.flatMap((item) => {
      const request = readRequest(item);
      return request ? [request] : [];
    });
  } catch {
    return [];
  }
}

export function serializeCreatedRequestsCookie(
  requests: readonly ServiceRequest[],
): string {
  return encodeURIComponent(JSON.stringify(requests));
}

function readRequest(value: unknown): ServiceRequest | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = readString(value.id);
  const title = readString(value.title);
  const serviceLabel = readString(value.serviceLabel);
  const createdAtLabel = readString(value.createdAtLabel);
  const summary = readString(value.summary);
  const status = readString(value.status);
  const expertId = readString(value.expertId);
  const expertName = readString(value.expertName);
  const expertHref = readString(value.expertHref);
  const customerId = readString(value.customerId);
  const customerDisplayName = readString(value.customerDisplayName);

  if (
    !id ||
    !title ||
    !serviceLabel ||
    !createdAtLabel ||
    !summary ||
    !status ||
    !REQUEST_STATUSES.has(status) ||
    !expertId ||
    !expertName ||
    !isExpertHref(expertHref) ||
    !customerId ||
    !customerDisplayName
  ) {
    return null;
  }

  const serviceSlug = readString(value.serviceSlug);

  return {
    id,
    title,
    serviceSlug: isServiceSlug(serviceSlug) ? serviceSlug : undefined,
    serviceLabel,
    city: readString(value.city),
    cityId: readString(value.cityId),
    createdAtLabel,
    summary,
    description: readString(value.description),
    status: status as ServiceRequest["status"],
    expertId,
    expertName,
    expertHref,
    customerId,
    customerDisplayName,
    conversationId: readString(value.conversationId),
  };
}

function isExpertHref(
  value: string | undefined,
): value is `/experts/${string}` {
  return Boolean(value && value.startsWith("/experts/") && value.length > 9);
}

function isServiceSlug(value: string | undefined): value is ServiceSlug {
  return (
    value === "land-surveying" ||
    value === "construction-workers" ||
    value === "drawing" ||
    value === "interior-design" ||
    value === "building-permit" ||
    value === "administrative-services"
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() !== ""
    ? value.trim()
    : undefined;
}
