import assert from "node:assert/strict";
import test from "node:test";
import {
  isAccountConversationThreadPath,
  isEngineerConversationThreadPath,
} from "./conversation-paths.ts";

test("account thread paths hide list, start, and nested segments", () => {
  assert.equal(isAccountConversationThreadPath("/account/messages"), false);
  assert.equal(
    isAccountConversationThreadPath("/account/messages/start"),
    false,
  );
  assert.equal(
    isAccountConversationThreadPath("/account/messages/conv-utm-niavaran"),
    true,
  );
  assert.equal(
    isAccountConversationThreadPath("/account/messages/conv-1/extra"),
    false,
  );
});

test("engineer thread paths match conversation ids only", () => {
  assert.equal(isEngineerConversationThreadPath("/engineer/messages"), false);
  assert.equal(
    isEngineerConversationThreadPath("/engineer/messages/conv-utm-niavaran"),
    true,
  );
});
