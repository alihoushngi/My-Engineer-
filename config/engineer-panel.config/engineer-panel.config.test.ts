import assert from "node:assert/strict";
import test from "node:test";
import {
  engineerPanelPaths,
  isEngineerNavActive,
} from "./engineer-panel.config.ts";

test("isEngineerNavActive treats review detail as reviews navigation", () => {
  assert.equal(
    isEngineerNavActive("/engineer/reviews/rev-1", engineerPanelPaths.reviews),
    true,
  );
  assert.equal(
    isEngineerNavActive("/engineer/reviews", engineerPanelPaths.reviews),
    true,
  );
  assert.equal(
    isEngineerNavActive(
      "/engineer/reviews/rev-1",
      engineerPanelPaths.dashboard,
    ),
    false,
  );
});
