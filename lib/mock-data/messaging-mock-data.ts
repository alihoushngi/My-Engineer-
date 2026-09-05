import {
  MOCK_MARKETPLACE_CUSTOMER_ID,
  MOCK_MARKETPLACE_OTHER_CUSTOMER_ID,
} from "@/lib/mock-data/service-request-mock-data";
import { type Conversation, type Message } from "@/types/store/messaging.types";

const BASE_MS = 1_700_000_000_000;

const sara = {
  role: "user" as const,
  id: MOCK_MARKETPLACE_CUSTOMER_ID,
  displayName: "سارا مشتری",
};

const otherCustomer = {
  role: "user" as const,
  id: MOCK_MARKETPLACE_OTHER_CUSTOMER_ID,
  displayName: "کاربر متقاضی",
};

const amir = {
  role: "engineer" as const,
  id: "amirhossein-rostami",
  displayName: "امیرحسین رستمی",
};

const nazanin = {
  role: "engineer" as const,
  id: "nazanin-farhadi",
  displayName: "نازنین فرهادی",
};

export const mockConversations: readonly Conversation[] = [
  {
    id: "conv-utm-niavaran",
    participants: [sara, amir],
    relatedRequestId: "req-utm-niavaran",
    relatedServiceLabel: "نقشه برداری",
    relatedEngineerId: amir.id,
    relatedCustomerId: sara.id,
    latestMessage: {
      id: "msg-utm-3",
      preview: "مدارک را دیدم؛ فردا زمان بازدید را هماهنگ می‌کنیم.",
      createdAtLabel: "۱ ساعت پیش",
      senderRole: "engineer",
    },
    unreadByRole: { user: 1, engineer: 0 },
    createdAtLabel: "۳ ساعت پیش",
    updatedAtLabel: "۱ ساعت پیش",
    updatedAtMs: BASE_MS + 30,
  },
  {
    id: "conv-interior",
    participants: [sara, nazanin],
    relatedRequestId: "req-interior",
    relatedServiceLabel: "طراحی نما و داخلی",
    relatedEngineerId: nazanin.id,
    relatedCustomerId: sara.id,
    latestMessage: {
      id: "msg-interior-2",
      preview: "طرح اولیه را تا پایان هفته می‌فرستم.",
      createdAtLabel: "دیروز",
      senderRole: "engineer",
    },
    unreadByRole: { user: 0, engineer: 0 },
    createdAtLabel: "۲ روز پیش",
    updatedAtLabel: "دیروز",
    updatedAtMs: BASE_MS + 20,
  },
  {
    id: "conv-asbuilt",
    participants: [otherCustomer, amir],
    relatedRequestId: "req-asbuilt-saadatabad",
    relatedServiceLabel: "نقشه برداری",
    relatedEngineerId: amir.id,
    relatedCustomerId: otherCustomer.id,
    latestMessage: {
      id: "msg-asbuilt-2",
      preview: "چهارشنبه بعدازظهر مناسب است.",
      createdAtLabel: "دیروز",
      senderRole: "engineer",
    },
    unreadByRole: { user: 0, engineer: 0 },
    createdAtLabel: "۲ روز پیش",
    updatedAtLabel: "دیروز",
    updatedAtMs: BASE_MS + 15,
  },
  ...Array.from({ length: 9 }, (_, index) => {
    const id = `conv-extra-${index + 1}`;
    return {
      id,
      participants: [otherCustomer, amir],
      relatedRequestId: `req-extra-${index + 1}`,
      relatedServiceLabel: "نقشه برداری",
      relatedEngineerId: amir.id,
      relatedCustomerId: otherCustomer.id,
      latestMessage: {
        id: `msg-extra-${index + 1}`,
        preview: "برای هماهنگی بازدید پیام می‌دهم.",
        createdAtLabel: `${index + 2} روز پیش`,
        senderRole: "user" as const,
      },
      unreadByRole: {
        user: 0,
        engineer: index % 4 === 0 ? 1 : 0,
      },
      createdAtLabel: `${index + 2} روز پیش`,
      updatedAtLabel: `${index + 2} روز پیش`,
      updatedAtMs: BASE_MS - (index + 1) * 1000,
    };
  }),
];

export const mockMessages: readonly Message[] = [
  {
    id: "msg-utm-1",
    conversationId: "conv-utm-niavaran",
    senderRole: "user",
    senderId: sara.id,
    content: "سلام، برای پلاک ثبتی به نقشه UTM نیاز دارم.",
    createdAtLabel: "۳ ساعت پیش",
    createdAtMs: BASE_MS + 10,
    status: "sent",
  },
  {
    id: "msg-utm-2",
    conversationId: "conv-utm-niavaran",
    senderRole: "engineer",
    senderId: amir.id,
    content: "سلام، مدارک مالکیت را بفرستید تا مسیر کار را دقیق‌تر بگویم.",
    createdAtLabel: "۲ ساعت پیش",
    createdAtMs: BASE_MS + 20,
    status: "sent",
  },
  {
    id: "msg-utm-3",
    conversationId: "conv-utm-niavaran",
    senderRole: "engineer",
    senderId: amir.id,
    content: "مدارک را دیدم؛ فردا زمان بازدید را هماهنگ می‌کنیم.",
    createdAtLabel: "۱ ساعت پیش",
    createdAtMs: BASE_MS + 30,
    status: "sent",
  },
  {
    id: "msg-interior-1",
    conversationId: "conv-interior",
    senderRole: "user",
    senderId: sara.id,
    content: "برای طراحی نشیمن می‌خواهم از پروفایل شما شروع کنیم.",
    createdAtLabel: "۲ روز پیش",
    createdAtMs: BASE_MS + 5,
    status: "sent",
  },
  {
    id: "msg-interior-2",
    conversationId: "conv-interior",
    senderRole: "engineer",
    senderId: nazanin.id,
    content: "طرح اولیه را تا پایان هفته می‌فرستم.",
    createdAtLabel: "دیروز",
    createdAtMs: BASE_MS + 20,
    status: "sent",
  },
  {
    id: "msg-asbuilt-1",
    conversationId: "conv-asbuilt",
    senderRole: "user",
    senderId: otherCustomer.id,
    content: "برای برداشت ازبیلت چه زمانی می‌توانید تشریف بیاورید؟",
    createdAtLabel: "۲ روز پیش",
    createdAtMs: BASE_MS + 4,
    status: "sent",
  },
  {
    id: "msg-asbuilt-2",
    conversationId: "conv-asbuilt",
    senderRole: "engineer",
    senderId: amir.id,
    content: "چهارشنبه بعدازظهر مناسب است.",
    createdAtLabel: "دیروز",
    createdAtMs: BASE_MS + 15,
    status: "sent",
  },
  ...Array.from({ length: 9 }, (_, index) => ({
    id: `msg-extra-${index + 1}`,
    conversationId: `conv-extra-${index + 1}`,
    senderRole: "user" as const,
    senderId: otherCustomer.id,
    content: "سلام، برای هماهنگی بازدید پیام می‌دهم.",
    createdAtLabel: `${index + 2} روز پیش`,
    createdAtMs: BASE_MS - (index + 1) * 1000,
    status: "sent" as const,
  })),
];

export const mockMessagingSeed = {
  conversations: mockConversations,
  messages: mockMessages,
} as const;
