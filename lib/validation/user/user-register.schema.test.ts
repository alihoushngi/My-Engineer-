import assert from "node:assert/strict";
import test from "node:test";
import { userRegisterProfileSchema } from "./user-register.schema.ts";

test("userRegisterProfileSchema requires a name and 8-character password", async () => {
  await assert.rejects(() =>
    userRegisterProfileSchema.validate({ displayName: "", password: "" }),
  );
  await assert.rejects(() =>
    userRegisterProfileSchema.validate({
      displayName: "س",
      password: "1234567",
    }),
  );

  const value = await userRegisterProfileSchema.validate({
    displayName: "  سارا مشتری  ",
    password: "user1234",
  });

  assert.equal(value.displayName, "سارا مشتری");
  assert.equal(value.password, "user1234");
});
