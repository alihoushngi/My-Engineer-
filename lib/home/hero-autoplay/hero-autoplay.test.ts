import assert from "node:assert/strict";
import test from "node:test";
import { shouldEnableHeroAutoplay } from "./hero-autoplay.ts";

test("shouldEnableHeroAutoplay stays off when reduced motion is preferred", () => {
  assert.equal(shouldEnableHeroAutoplay(true, 3), false);
});

test("shouldEnableHeroAutoplay stays off for a single slide", () => {
  assert.equal(shouldEnableHeroAutoplay(false, 1), false);
});

test("shouldEnableHeroAutoplay enables restrained autoplay for multiple slides", () => {
  assert.equal(shouldEnableHeroAutoplay(false, 3), true);
});
