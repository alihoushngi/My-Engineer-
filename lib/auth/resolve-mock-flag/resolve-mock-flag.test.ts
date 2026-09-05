import assert from "node:assert/strict";
import test from "node:test";
import { resolveMockFlag } from "./resolve-mock-flag.ts";

test("production safety: mocks stay off even when config and env are true", () => {
  assert.equal(resolveMockFlag(false, true, true), false);
});

test("config flag is used when env override is unset", () => {
  assert.equal(resolveMockFlag(true, true, undefined), true);
  assert.equal(resolveMockFlag(true, false, undefined), false);
});

test("env false disables an enabled config flag", () => {
  assert.equal(resolveMockFlag(true, true, false), false);
});

test("env true enables a disabled config flag outside production", () => {
  assert.equal(resolveMockFlag(true, false, true), true);
});
