import assert from "node:assert/strict";
import test from "node:test";
import { resolveResponsiveDialogSurface } from "./responsive-dialog.ts";

test("resolveResponsiveDialogSurface uses a drawer on mobile for every desktop variant", () => {
  assert.equal(resolveResponsiveDialogSurface(false), "drawer");
  assert.equal(resolveResponsiveDialogSurface(false, "dialog"), "drawer");
  assert.equal(resolveResponsiveDialogSurface(false, "sheet"), "drawer");
});

test("resolveResponsiveDialogSurface keeps a dialog on desktop by default", () => {
  assert.equal(resolveResponsiveDialogSurface(true), "dialog");
  assert.equal(resolveResponsiveDialogSurface(true, "dialog"), "dialog");
});

test("resolveResponsiveDialogSurface keeps a sheet on desktop when requested", () => {
  assert.equal(resolveResponsiveDialogSurface(true, "sheet"), "sheet");
});
