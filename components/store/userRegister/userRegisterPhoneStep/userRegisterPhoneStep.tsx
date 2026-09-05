"use client";

import { type UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";
import { userAuthCopy } from "@/config/user-auth.config/user-auth.config";
import { type LoginPhoneData } from "@/lib/validation/login/login-phone.schema";

type UserRegisterPhoneStepProps = {
  form: UseFormReturn<LoginPhoneData>;
  authError: string | null;
  isBusy: boolean;
  onSubmit: (data: LoginPhoneData) => Promise<void>;
};

export function UserRegisterPhoneStep({
  form,
  authError,
  isBusy,
  onSubmit,
}: UserRegisterPhoneStepProps) {
  return (
    <form
      noValidate
      className="space-y-6"
      onSubmit={form.handleSubmit(onSubmit)}
      aria-label={userAuthCopy.registerTitle}
    >
      <Field invalid={Boolean(form.formState.errors.phone)}>
        <FieldLabel htmlFor="user-register-phone" required>
          {userAuthCopy.phoneLabel}
        </FieldLabel>
        <Input
          id="user-register-phone"
          type="tel"
          autoComplete="tel-national"
          inputMode="tel"
          dir="ltr"
          placeholder={userAuthCopy.phonePlaceholder}
          aria-invalid={Boolean(form.formState.errors.phone)}
          {...form.register("phone")}
        />
        <FieldError>{form.formState.errors.phone?.message}</FieldError>
      </Field>
      {authError ? (
        <p className="type-body-sm text-danger" role="alert">
          {authError}
        </p>
      ) : null}
      <Button type="submit" className="w-full" loading={isBusy}>
        {userAuthCopy.requestOtpLabel}
      </Button>
    </form>
  );
}
