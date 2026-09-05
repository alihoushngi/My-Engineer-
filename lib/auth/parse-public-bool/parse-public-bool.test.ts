import assert from "node:assert/strict";
import test from "node:test";
import { parsePublicBool } from "./parse-public-bool.ts";

test("parsePublicBool reads true and false and fallback", () => {
  assert.equal(parsePublicBool("true", false), true);
  assert.equal(parsePublicBool("false", true), false);
  assert.equal(parsePublicBool(undefined, true), true);
  assert.equal(parsePublicBool("other", false), false);
});
