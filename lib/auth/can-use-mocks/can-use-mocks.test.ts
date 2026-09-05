import assert from "node:assert/strict";
import test from "node:test";
import { canUseMocks } from "./can-use-mocks.ts";

test("canUseMocks is false in production and true otherwise", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "production";
  assert.equal(canUseMocks(), false);
  process.env.NODE_ENV = "development";
  assert.equal(canUseMocks(), true);
  process.env.NODE_ENV = original;
});
