import assert from "node:assert/strict";
import test from "node:test";
import {
  applyMarkRead,
  applySendMessage,
  excerptMessagePreview,
  findConversationForPair,
  mergeMessagingSnapshot,
} from "./messaging-store.ts";

const seedConversation = {
  id: "conv-1",
  participants: [
    { role: "user", id: "user-sara", displayName: "سارا" },
    { role: "engineer", id: "eng-a", displayName: "مهندس" },
  ],
  relatedEngineerId: "eng-a",
  relatedCustomerId: "user-sara",
  unreadByRole: { user: 1, engineer: 2 },
  createdAtLabel: "دیروز",
  updatedAtLabel: "دیروز",
  updatedAtMs: 10,
};

const seedMessage = {
  id: "msg-1",
  conversationId: "conv-1",
  senderRole: "engineer",
  senderId: "eng-a",
  content: "سلام",
  createdAtLabel: "دیروز",
  createdAtMs: 10,
  status: "sent",
};

test("findConversationForPair matches customer and engineer together", () => {
  const other = {
    ...seedConversation,
    id: "conv-2",
    relatedEngineerId: "eng-b",
  };
  const found = findConversationForPair(
    [seedConversation, other],
    "user-sara",
    "eng-a",
  );
  assert.equal(found?.id, "conv-1");
  assert.equal(
    findConversationForPair([seedConversation], "user-sara", "missing"),
    undefined,
  );
});

test("mergeMessagingSnapshot lets overlay conversations and messages win", () => {
  const overlayConversation = {
    ...seedConversation,
    updatedAtMs: 20,
    updatedAtLabel: "الان",
    unreadByRole: { user: 0, engineer: 2 },
  };
  const extra = {
    ...seedMessage,
    id: "msg-2",
    createdAtMs: 20,
    content: "پیام جدید",
  };
  const merged = mergeMessagingSnapshot(
    { conversations: [seedConversation], messages: [seedMessage] },
    { conversations: [overlayConversation], messages: [extra] },
  );
  assert.equal(merged.conversations[0]?.unreadByRole.engineer, 2);
  assert.equal(merged.conversations[0]?.latestMessage?.preview, "پیام جدید");
  assert.deepEqual(
    merged.messages.map((item) => item.id),
    ["msg-1", "msg-2"],
  );
});

test("applySendMessage appends a message and increments the other unread count", () => {
  const sent = {
    ...seedMessage,
    id: "msg-hello",
    senderRole: "user",
    senderId: "user-sara",
    content: "سلام",
    createdAtMs: 50,
    createdAtLabel: "همین الان",
  };
  const overlay = applySendMessage(
    { conversations: [], messages: [] },
    {
      conversation: {
        ...seedConversation,
        unreadByRole: { user: 1, engineer: 0 },
      },
      message: sent,
      viewerRole: "user",
    },
  );
  assert.equal(overlay.messages.at(-1)?.content, "سلام");
  assert.equal(overlay.conversations[0]?.unreadByRole.engineer, 1);
  assert.equal(overlay.conversations[0]?.unreadByRole.user, 1);
  assert.equal(overlay.conversations[0]?.latestMessage?.preview, "سلام");
});

test("applyMarkRead zeros the viewer unread count without touching the other party", () => {
  const overlay = applyMarkRead(
    { conversations: [], messages: [] },
    seedConversation,
    "user",
  );
  assert.equal(overlay.conversations[0]?.unreadByRole.user, 0);
  assert.equal(overlay.conversations[0]?.unreadByRole.engineer, 2);
});

test("excerptMessagePreview trims long text", () => {
  assert.equal(excerptMessagePreview("کوتاه"), "کوتاه");
  assert.equal(excerptMessagePreview("الف".repeat(80), 10).endsWith("…"), true);
});
