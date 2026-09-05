import { toEngineerRequest } from "@/lib/marketplace/request-projections/request-projections";
import { engineerMessagingViews } from "@/lib/messaging/messaging-projections/messaging-projections";
import { mockMessagingSeed } from "@/lib/mock-data/messaging-mock-data";
import { mockAppNotifications } from "@/lib/mock-data/notification-mock-data";
import { mockServiceRequests } from "@/lib/mock-data/service-request-mock-data";
import { engineerNotificationViews } from "@/lib/notifications/notification-projections/notification-projections";
import { notificationsForRecipient } from "@/lib/notifications/notification-store/notification-store";
import { type EngineerCredential } from "@/types/store/engineer.types";

/** Public expert id used to assemble the engineer workspace display fixture. */
export const mockEngineerPublicExpertId = "amirhossein-rostami";

export const mockEngineerRequests = mockServiceRequests
  .filter((request) => request.expertId === mockEngineerPublicExpertId)
  .map(toEngineerRequest);

const engineerMessaging = engineerMessagingViews(
  mockMessagingSeed,
  mockEngineerPublicExpertId,
);

export const mockEngineerConversations = engineerMessaging.conversations;
export const mockEngineerMessagesByConversation =
  engineerMessaging.messagesByConversationId;

export const mockEngineerCredentials: readonly EngineerCredential[] = [
  {
    id: "cred-education",
    kind: "education",
    title: "کارشناسی ارشد مهندسی نقشه‌برداری",
    description: "مقطع تحصیلی ثبت‌شده در پروفایل",
    status: "verified",
    hasDocument: false,
  },
  {
    id: "cred-organization",
    kind: "organization",
    title: "عضویت سازمان نظام مهندسی",
    status: "verified",
    hasDocument: false,
  },
  {
    id: "cred-license",
    kind: "license",
    title: "پروانه اشتغال",
    description: "طراحی و نظارت",
    status: "pending_review",
    hasDocument: true,
  },
];

export const mockEngineerNotifications = engineerNotificationViews(
  notificationsForRecipient(
    mockAppNotifications,
    "engineer",
    mockEngineerPublicExpertId,
  ),
);
