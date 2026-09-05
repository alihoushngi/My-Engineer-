import assert from "node:assert/strict";
import test from "node:test";
import {
  isAccountPath,
  isUserAuthEntryPath,
  userAuthPaths,
} from "./user-auth.config.ts";

test("isAccountPath accepts the account tree only", () => {
  assert.equal(isAccountPath(userAuthPaths.account), true);
  assert.equal(isAccountPath("/account/saved"), true);
  assert.equal(isAccountPath("/login"), false);
  assert.equal(isAccountPath("/engineer"), false);
  assert.equal(isAccountPath("/accountant"), false);
});

test("isUserAuthEntryPath matches login and register only", () => {
  assert.equal(isUserAuthEntryPath("/login"), true);
  assert.equal(isUserAuthEntryPath("/register"), true);
  assert.equal(isUserAuthEntryPath("/login/extra"), false);
  assert.equal(isUserAuthEntryPath("/engineer/login"), false);
});
