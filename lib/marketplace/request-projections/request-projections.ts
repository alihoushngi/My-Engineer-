import { type EngineerRequest } from "@/types/store/engineer.types";
import { type UserRequest } from "@/types/store/user-account.types";
import { type ServiceRequest } from "@/types/store/service-request.types";

export function toUserRequest(request: ServiceRequest): UserRequest {
  return {
    id: request.id,
    title: request.title,
    serviceLabel: request.serviceLabel,
    expertId: request.expertId,
    expertName: request.expertName,
    expertHref: request.expertHref,
    city: request.city,
    createdAtLabel: request.createdAtLabel,
    summary: request.summary,
    description: request.description,
    status: request.status,
    conversationId: request.conversationId,
  };
}

export function toEngineerRequest(request: ServiceRequest): EngineerRequest {
  return {
    id: request.id,
    title: request.title,
    serviceLabel: request.serviceLabel,
    city: request.city,
    createdAtLabel: request.createdAtLabel,
    summary: request.summary,
    description: request.description,
    status: request.status === "sent" ? "new" : request.status,
    isNew: request.status === "sent",
    customerDisplayName: request.customerDisplayName,
    conversationId: request.conversationId,
  };
}
