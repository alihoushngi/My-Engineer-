import { engineerPanelPaths } from "@/config/engineer-panel.config/engineer-panel.config";
import { toEngineerRequest } from "@/lib/marketplace/request-projections/request-projections";
import { engineerMessagingViews } from "@/lib/messaging/messaging-projections/messaging-projections";
import { mockMessagingSeed } from "@/lib/mock-data/messaging-mock-data";
import { mockServiceRequests } from "@/lib/mock-data/service-request-mock-data";
import {
  type EngineerCredential,
  type EngineerNotification,
} from "@/types/store/engineer.types";

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

export const mockEngineerNotifications: readonly EngineerNotification[] = [
  {
    id: "ntf-1",
    kind: "request",
    title: "درخواست جدید",
    body: "یک درخواست نقشه UTM برای پلاک ثبتی ثبت شده است.",
    createdAtLabel: "۲ ساعت پیش",
    isRead: false,
    href: `${engineerPanelPaths.requests}/req-utm-niavaran`,
  },
  {
    id: "ntf-2",
    kind: "message",
    title: "پیام جدید",
    body: "پاسخ تازه‌ای در گفت‌وگوی درخواست نیاوران دارید.",
    createdAtLabel: "۱ ساعت پیش",
    isRead: false,
    href: `${engineerPanelPaths.messages}/conv-utm-niavaran`,
  },
  {
    id: "ntf-3",
    kind: "review",
    title: "نظر جدید",
    body: "یک نظر نمایشی روی پروفایل عمومی شما ثبت شده است.",
    createdAtLabel: "۳ روز پیش",
    isRead: true,
    href: engineerPanelPaths.reviews,
  },
  {
    id: "ntf-4",
    kind: "verification",
    title: "وضعیت تأیید پروفایل",
    body: "وضعیت نمایشی پروفایل تأیید شده است.",
    createdAtLabel: "هفته گذشته",
    isRead: true,
    href: engineerPanelPaths.profile,
  },
  {
    id: "ntf-5",
    kind: "credential",
    title: "بررسی مدرک",
    body: "پروانه اشتغال در وضعیت انتظار بررسی نمایش داده می‌شود.",
    createdAtLabel: "هفته گذشته",
    isRead: true,
    href: engineerPanelPaths.credentials,
  },
  ...Array.from({ length: 6 }, (_, index) => ({
    id: `ntf-extra-${index + 1}`,
    kind: "request" as const,
    title: `اعلان نمایشی ${index + 6}`,
    body: "این اعلان برای بررسی صفحه‌بندی فهرست اعلان‌ها اضافه شده است.",
    createdAtLabel: `${index + 4} روز پیش`,
    isRead: true,
    href: engineerPanelPaths.requests,
  })),
];
