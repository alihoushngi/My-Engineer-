import assert from "node:assert/strict";
import test from "node:test";
import {
  parseMessagingOverlayCookie,
  serializeMessagingOverlayCookie,
} from "./messaging-overlay-cookie.ts";

const conversation = {
  id: "conv-1",
  participants: [
    { role: "user", id: "user-sara", displayName: "سارا" },
    { role: "engineer", id: "eng-a", displayName: "مهندس" },
  ],
  relatedEngineerId: "eng-a",
  relatedCustomerId: "user-sara",
  unreadByRole: { user: 0, engineer: 1 },
  createdAtLabel: "الان",
  updatedAtLabel: "الان",
  updatedAtMs: 20,
};

const message = {
  id: "msg-1",
  conversationId: "conv-1",
  senderRole: "user",
  senderId: "user-sara",
  content: "سلام",
  createdAtLabel: "الان",
  createdAtMs: 20,
  status: "sent",
};

test("messaging overlay cookie round-trips conversations and messages", () => {
  const raw = serializeMessagingOverlayCookie({
    conversations: [conversation],
    messages: [message],
  });
  const parsed = parseMessagingOverlayCookie(raw);
  assert.equal(parsed.conversations[0]?.id, "conv-1");
  assert.equal(parsed.messages[0]?.content, "سلام");
  assert.equal(parsed.conversations[0]?.unreadByRole.engineer, 1);
});

test("invalid overlay cookie values become an empty overlay", () => {
  assert.deepEqual(parseMessagingOverlayCookie(undefined), {
    conversations: [],
    messages: [],
  });
  assert.deepEqual(parseMessagingOverlayCookie("%7Bnot-json"), {
    conversations: [],
    messages: [],
  });
});
