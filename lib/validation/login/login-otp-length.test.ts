import assert from "node:assert/strict";
import test from "node:test";
import { LOGIN_OTP_LENGTH } from "./login-otp-length.ts";

test("login OTP length is six digits", () => {
  assert.equal(LOGIN_OTP_LENGTH, 6);
});
