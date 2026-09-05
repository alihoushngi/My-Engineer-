import assert from "node:assert/strict";
import test from "node:test";
import { getDisplayInitials } from "./display-initials.ts";

test("getDisplayInitials uses first and last visible parts", () => {
  assert.equal(getDisplayInitials("سارا مشتری"), "سم");
  assert.equal(getDisplayInitials("سارا"), "س");
  assert.equal(getDisplayInitials("  "), "");
});
