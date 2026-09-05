import { mockExpertCards } from "@/lib/mock-data/mock-data";
import { toUserRequest } from "@/lib/marketplace/request-projections/request-projections";
import { userMessagingViews } from "@/lib/messaging/messaging-projections/messaging-projections";
import { mockMessagingSeed } from "@/lib/mock-data/messaging-mock-data";
import {
  MOCK_MARKETPLACE_CUSTOMER_ID,
  mockServiceRequests,
} from "@/lib/mock-data/service-request-mock-data";
import { userAccountPaths } from "@/config/user-account.config/user-account.config";
import { type ExpertCardData } from "@/types/store/expert.types";
import {
  type UserAccount,
  type UserNotification,
  type UserReviewItem,
} from "@/types/store/user-account.types";

export const DEFAULT_SAVED_EXPERT_IDS = [
  "amirhossein-rostami",
  "nazanin-farhadi",
] as const;

export const mockCurrentUser: UserAccount = {
  id: MOCK_MARKETPLACE_CUSTOMER_ID,
  displayName: "سارا مشتری",
  mobileDisplay: "۰۹۱۲***۲۲۳۳",
  city: "تهران",
  cityId: "tehran",
};

export const mockUserRequests = mockServiceRequests
  .filter((request) => request.customerId === mockCurrentUser.id)
  .map(toUserRequest);

const userMessaging = userMessagingViews(mockMessagingSeed, mockCurrentUser.id);

export const mockUserConversations = userMessaging.conversations;
export const mockUserMessagesByConversation =
  userMessaging.messagesByConversationId;

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
    href: `${userAccountPaths.messages}/conv-utm-niavaran`,
  },
  {
    id: "user-ntf-2",
    kind: "request",
    title: "وضعیت درخواست به‌روز شد",
    body: "درخواست نقشه UTM در حال بررسی است.",
    createdAtLabel: "۲ ساعت پیش",
    isRead: false,
    href: `${userAccountPaths.requests}/req-utm-niavaran`,
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

export function getMockSavedExperts(
  ids: readonly string[] = DEFAULT_SAVED_EXPERT_IDS,
): readonly ExpertCardData[] {
  return ids.flatMap((id) => {
    const card = mockExpertCards.find((expert) => expert.id === id);
    return card ? [card] : [];
  });
}

export const currentUser = mockCurrentUser;
export const userRequests = mockUserRequests;
export const userReviews = mockUserReviews;
export const userNotifications = mockUserNotifications;
export const userSavedExperts = getMockSavedExperts;
