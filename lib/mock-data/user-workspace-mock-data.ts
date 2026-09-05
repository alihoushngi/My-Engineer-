import { mockExpertCards } from "@/lib/mock-data/mock-data";
import { userAccountPaths } from "@/config/user-account.config/user-account.config";
import { type ExpertCardData } from "@/types/store/expert.types";
import {
  type UserAccount,
  type UserConversation,
  type UserMessage,
  type UserNotification,
  type UserRequest,
  type UserReviewItem,
} from "@/types/store/user-account.types";

const SAVED_EXPERT_IDS = ["amirhossein-rostami", "nazanin-farhadi"] as const;

export const mockCurrentUser: UserAccount = {
  id: "user-sara",
  displayName: "سارا مشتری",
  mobileDisplay: "۰۹۱۲***۲۲۳۳",
  city: "تهران",
  cityId: "tehran",
};

export const mockUserRequests: readonly UserRequest[] = [
  {
    id: "user-req-utm",
    title: "نقشه UTM برای پلاک ثبتی",
    serviceLabel: "نقشه برداری",
    expertId: "amirhossein-rostami",
    expertName: "امیرحسین رستمی",
    expertHref: "/experts/amirhossein-rostami",
    city: "تهران",
    createdAtLabel: "۲ ساعت پیش",
    summary: "نیاز به نقشه UTM و جانمایی پلاک برای پرونده شهرداری.",
    description:
      "برای تشکیل پرونده پروانه، نقشه UTM و جانمایی پلاک ثبتی یک زمین مسکونی لازم است. مدارک مالکیت آماده است.",
    status: "in_review",
    conversationId: "user-conv-utm",
  },
  {
    id: "user-req-interior",
    title: "طراحی داخلی واحد مسکونی",
    serviceLabel: "طراحی نما و داخلی",
    expertId: "nazanin-farhadi",
    expertName: "نازنین فرهادی",
    expertHref: "/experts/nazanin-farhadi",
    city: "کرج",
    createdAtLabel: "دیروز",
    summary: "هماهنگی برای بازدید و طرح اولیه فضای نشیمن.",
    description:
      "واحد ۱۲۰ متری است. ترجیح با طرح روشن و استفاده از نور طبیعی است.",
    status: "sent",
    conversationId: "user-conv-interior",
  },
  {
    id: "user-req-closed",
    title: "برداشت محدوده باغ",
    serviceLabel: "نقشه برداری",
    expertId: "amirhossein-rostami",
    expertName: "امیرحسین رستمی",
    expertHref: "/experts/amirhossein-rostami",
    city: "کرج",
    createdAtLabel: "۱۸ روز پیش",
    summary: "درخواست قبلی که بسته شده است.",
    status: "closed",
  },
];

export const mockUserConversations: readonly UserConversation[] = [
  {
    id: "user-conv-utm",
    participantName: "امیرحسین رستمی",
    lastMessagePreview: "مدارک را دیدم؛ فردا زمان بازدید را هماهنگ می‌کنیم.",
    lastMessageAtLabel: "۱ ساعت پیش",
    unreadCount: 1,
    relatedRequestId: "user-req-utm",
  },
  {
    id: "user-conv-interior",
    participantName: "نازنین فرهادی",
    lastMessagePreview: "طرح اولیه را تا پایان هفته می‌فرستم.",
    lastMessageAtLabel: "دیروز",
    unreadCount: 0,
    relatedRequestId: "user-req-interior",
  },
];

export const mockUserMessagesByConversation: Readonly<
  Record<string, readonly UserMessage[]>
> = {
  "user-conv-utm": [
    {
      id: "user-msg-1",
      conversationId: "user-conv-utm",
      body: "سلام، برای پلاک ثبتی به نقشه UTM نیاز دارم.",
      sentAtLabel: "۳ ساعت پیش",
      fromUser: true,
    },
    {
      id: "user-msg-2",
      conversationId: "user-conv-utm",
      body: "سلام، مدارک مالکیت را بفرستید تا مسیر کار را دقیق‌تر بگویم.",
      sentAtLabel: "۲ ساعت پیش",
      fromUser: false,
    },
    {
      id: "user-msg-3",
      conversationId: "user-conv-utm",
      body: "مدارک را دیدم؛ فردا زمان بازدید را هماهنگ می‌کنیم.",
      sentAtLabel: "۱ ساعت پیش",
      fromUser: false,
    },
  ],
  "user-conv-interior": [
    {
      id: "user-msg-4",
      conversationId: "user-conv-interior",
      body: "برای طراحی نشیمن می‌خواهم از پروفایل شما شروع کنیم.",
      sentAtLabel: "۲ روز پیش",
      fromUser: true,
    },
    {
      id: "user-msg-5",
      conversationId: "user-conv-interior",
      body: "طرح اولیه را تا پایان هفته می‌فرستم.",
      sentAtLabel: "دیروز",
      fromUser: false,
    },
  ],
};

export const mockUserReviews: readonly UserReviewItem[] = [
  {
    id: "user-rev-1",
    expertId: "amirhossein-rostami",
    expertName: "امیرحسین رستمی",
    expertHref: "/experts/amirhossein-rostami",
    text: "خروجی نقشه دقیق بود و هماهنگی بازدید به‌موقع انجام شد.",
    rating: 5,
    dateLabel: "ماه گذشته",
  },
];

export const mockUserNotifications: readonly UserNotification[] = [
  {
    id: "user-ntf-1",
    kind: "message",
    title: "پیام جدید از متخصص",
    body: "امیرحسین رستمی برای بازدید نقشه UTM پیام داده است.",
    createdAtLabel: "۱ ساعت پیش",
    isRead: false,
    href: `${userAccountPaths.messages}/user-conv-utm`,
  },
  {
    id: "user-ntf-2",
    kind: "request",
    title: "وضعیت درخواست به‌روز شد",
    body: "درخواست نقشه UTM در حال بررسی است.",
    createdAtLabel: "۲ ساعت پیش",
    isRead: false,
    href: `${userAccountPaths.requests}/user-req-utm`,
  },
  {
    id: "user-ntf-3",
    kind: "review",
    title: "نظر شما نمایش داده می‌شود",
    body: "نظر ثبت‌شده برای پروفایل متخصص در فهرست عمومی آمده است.",
    createdAtLabel: "ماه گذشته",
    isRead: true,
    href: userAccountPaths.reviews,
  },
];

export function getMockSavedExperts(): readonly ExpertCardData[] {
  return SAVED_EXPERT_IDS.flatMap((id) => {
    const card = mockExpertCards.find((expert) => expert.id === id);
    return card ? [card] : [];
  });
}

export const currentUser = mockCurrentUser;
export const userRequests = mockUserRequests;
export const userReviews = mockUserReviews;
export const userNotifications = mockUserNotifications;
export const userSavedExperts = getMockSavedExperts;
