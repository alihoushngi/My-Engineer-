"use client";

import { type UseFormReturn } from "react-hook-form";
import { PasswordInput } from "@/components/store/auth/passwordInput/passwordInput";
import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";
import { userAuthCopy } from "@/config/user-auth.config/user-auth.config";
import { type UserRegisterProfileData } from "@/lib/validation/user/user-register.schema";

type UserRegisterProfileStepProps = {
  form: UseFormReturn<UserRegisterProfileData>;
  authError: string | null;
  isBusy: boolean;
  onSubmit: (data: UserRegisterProfileData) => Promise<void>;
};

export function UserRegisterProfileStep({
  form,
  authError,
  isBusy,
  onSubmit,
}: UserRegisterProfileStepProps) {
  return (
    <form
      noValidate
      className="space-y-6"
      onSubmit={form.handleSubmit(onSubmit)}
      aria-label={userAuthCopy.completeRegisterLabel}
    >
      <Field invalid={Boolean(form.formState.errors.displayName)}>
        <FieldLabel htmlFor="user-register-name" required>
          {userAuthCopy.displayNameLabel}
        </FieldLabel>
        <Input
          id="user-register-name"
          autoComplete="name"
          placeholder={userAuthCopy.displayNamePlaceholder}
          aria-invalid={Boolean(form.formState.errors.displayName)}
          {...form.register("displayName")}
        />
        <FieldError>{form.formState.errors.displayName?.message}</FieldError>
      </Field>
      <Field
        invalid={Boolean(form.formState.errors.password) || Boolean(authError)}
      >
        <FieldLabel htmlFor="user-register-password" required>
          {userAuthCopy.passwordLabel}
        </FieldLabel>
        <PasswordInput
          id="user-register-password"
          autoComplete="new-password"
          placeholder={userAuthCopy.passwordPlaceholder}
          aria-invalid={
            Boolean(form.formState.errors.password) || Boolean(authError)
          }
          {...form.register("password")}
        />
        <p className="type-caption text-muted-foreground">
          {userAuthCopy.registerPasswordHelp}
        </p>
        <FieldError>
          {authError ?? form.formState.errors.password?.message}
        </FieldError>
      </Field>
      <Button type="submit" className="w-full" loading={isBusy}>
        {userAuthCopy.completeRegisterLabel}
      </Button>
    </form>
  );
}
