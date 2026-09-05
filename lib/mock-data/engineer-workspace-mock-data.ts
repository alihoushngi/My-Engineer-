import { engineerPanelPaths } from "@/config/engineer-panel.config/engineer-panel.config";
import { toEngineerRequest } from "@/lib/marketplace/request-projections/request-projections";
import { mockServiceRequests } from "@/lib/mock-data/service-request-mock-data";
import {
  type EngineerConversation,
  type EngineerCredential,
  type EngineerMessage,
  type EngineerNotification,
} from "@/types/store/engineer.types";

/** Public expert id used to assemble the engineer workspace display fixture. */
export const mockEngineerPublicExpertId = "amirhossein-rostami";

export const mockEngineerRequests = mockServiceRequests
  .filter((request) => request.expertId === mockEngineerPublicExpertId)
  .map(toEngineerRequest);

export const mockEngineerConversations: readonly EngineerConversation[] = [
  {
    id: "conv-utm-niavaran",
    participantName: "سارا مشتری",
    lastMessagePreview: "مدارک مالکیت را فردا می‌فرستم.",
    lastMessageAtLabel: "۱ ساعت پیش",
    unreadCount: 1,
    relatedRequestId: "req-utm-niavaran",
    relatedServiceLabel: "نقشه برداری",
  },
  {
    id: "conv-asbuilt",
    participantName: "کاربر متقاضی",
    lastMessagePreview: "زمان بازدید چهارشنبه مناسب است؟",
    lastMessageAtLabel: "دیروز",
    unreadCount: 0,
    relatedRequestId: "req-asbuilt-saadatabad",
    relatedServiceLabel: "نقشه برداری",
  },
  ...Array.from({ length: 9 }, (_, index) => ({
    id: `conv-extra-${index + 1}`,
    participantName: "کاربر متقاضی",
    lastMessagePreview: "برای هماهنگی بازدید پیام می‌دهم.",
    lastMessageAtLabel: `${index + 2} روز پیش`,
    unreadCount: index % 4 === 0 ? 1 : 0,
    relatedRequestId: `req-extra-${index + 1}`,
    relatedServiceLabel: "نقشه برداری",
  })),
];

export const mockEngineerMessagesByConversation: Readonly<
  Record<string, readonly EngineerMessage[]>
> = {
  "conv-utm-niavaran": [
    {
      id: "msg-1",
      conversationId: "conv-utm-niavaran",
      body: "سلام، برای پلاک ثبتی نیاوران به نقشه UTM نیاز دارم.",
      sentAtLabel: "۳ ساعت پیش",
      fromEngineer: false,
    },
    {
      id: "msg-2",
      conversationId: "conv-utm-niavaran",
      body: "سلام، مدارک مالکیت را بفرستید تا مسیر کار را دقیق‌تر بگویم.",
      sentAtLabel: "۲ ساعت پیش",
      fromEngineer: true,
    },
    {
      id: "msg-3",
      conversationId: "conv-utm-niavaran",
      body: "مدارک مالکیت را فردا می‌فرستم.",
      sentAtLabel: "۱ ساعت پیش",
      fromEngineer: false,
    },
  ],
  "conv-asbuilt": [
    {
      id: "msg-4",
      conversationId: "conv-asbuilt",
      body: "برای برداشت ازبیلت چه زمانی می‌توانید تشریف بیاورید؟",
      sentAtLabel: "۲ روز پیش",
      fromEngineer: false,
    },
    {
      id: "msg-5",
      conversationId: "conv-asbuilt",
      body: "چهارشنبه بعدازظهر مناسب است.",
      sentAtLabel: "دیروز",
      fromEngineer: true,
    },
  ],
  ...Object.fromEntries(
    Array.from({ length: 9 }, (_, index) => {
      const conversationId = `conv-extra-${index + 1}`;

      return [
        conversationId,
        [
          {
            id: `msg-extra-${index + 1}`,
            conversationId,
            body: "سلام، برای هماهنگی بازدید پیام می‌دهم.",
            sentAtLabel: `${index + 2} روز پیش`,
            fromEngineer: false,
          },
        ],
      ];
    }),
  ),
};

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
