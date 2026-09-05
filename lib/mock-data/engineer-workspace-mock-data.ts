import { engineerPanelPaths } from "@/config/engineer-panel.config/engineer-panel.config";
import {
  type EngineerConversation,
  type EngineerCredential,
  type EngineerMessage,
  type EngineerNotification,
  type EngineerRequest,
} from "@/types/store/engineer.types";

/** Public expert id used to assemble the engineer workspace display fixture. */
export const mockEngineerPublicExpertId = "amirhossein-rostami";

export const mockEngineerRequests: readonly EngineerRequest[] = [
  {
    id: "req-utm-niavaran",
    title: "نقشه UTM برای پلاک ثبتی",
    serviceLabel: "نقشه برداری",
    city: "تهران",
    createdAtLabel: "۲ ساعت پیش",
    summary: "نیاز به نقشه UTM و جانمایی پلاک برای پرونده شهرداری.",
    description:
      "برای تشکیل پرونده پروانه، نقشه UTM و جانمایی پلاک ثبتی یک زمین مسکونی در نیاوران لازم است. مدارک مالکیت آماده است.",
    status: "new",
    isNew: true,
    customerDisplayName: "کاربر متقاضی",
    conversationId: "conv-utm-niavaran",
  },
  {
    id: "req-asbuilt-saadatabad",
    title: "نقشه ازبیلت واحد مسکونی",
    serviceLabel: "نقشه برداری",
    city: "تهران",
    createdAtLabel: "دیروز",
    summary: "برداشت وضع موجود یک واحد برای تغییرات داخلی.",
    description:
      "واحد ۱۵۰ متری است. کارفرما زمان بازدید را در روزهای میانی هفته اعلام کرده است.",
    status: "in_review",
    customerDisplayName: "کاربر متقاضی",
    conversationId: "conv-asbuilt",
  },
  {
    id: "req-closed-karaj",
    title: "برداشت محدوده باغ",
    serviceLabel: "نقشه برداری",
    city: "کرج",
    createdAtLabel: "۱۲ روز پیش",
    summary: "درخواست قبلی که در فهرست به‌صورت بسته‌شده نمایش داده می‌شود.",
    status: "closed",
  },
  ...Array.from({ length: 8 }, (_, index) => {
    const statuses = ["new", "in_review", "closed"] as const;
    const status = statuses[index % 3] ?? "in_review";

    return {
      id: `req-extra-${index + 1}`,
      title: `بررسی محدوده و خروجی نقشه‌برداری ${index + 4}`,
      serviceLabel: "نقشه برداری",
      city: index % 2 === 0 ? "تهران" : "کرج",
      createdAtLabel: `${index + 3} روز پیش`,
      summary: "درخواست نمایشی برای بررسی صفحه‌بندی فهرست درخواست‌ها.",
      description: "این مورد فقط برای نمایش فهرست بلند در فضای کاری متخصص است.",
      status,
      isNew: status === "new",
      customerDisplayName: "کاربر متقاضی",
      conversationId: `conv-extra-${index + 1}`,
    };
  }),
];

export const mockEngineerConversations: readonly EngineerConversation[] = [
  {
    id: "conv-utm-niavaran",
    participantName: "کاربر متقاضی",
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
