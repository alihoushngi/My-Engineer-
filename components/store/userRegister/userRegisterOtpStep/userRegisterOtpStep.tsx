"use client";

import { Controller, type UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { OtpInput } from "@/components/ui/otpInput/otpInput";
import { userAuthCopy } from "@/config/user-auth.config/user-auth.config";
import { type LoginOtpData } from "@/lib/validation/login/login-otp.schema";
import { LOGIN_OTP_LENGTH } from "@/lib/validation/login/login-otp-length";

type UserRegisterOtpStepProps = {
  form: UseFormReturn<LoginOtpData>;
  authError: string | null;
  isBusy: boolean;
  canResend: boolean;
  secondsLeft: number;
  isResending: boolean;
  onSubmit: (data: LoginOtpData) => Promise<void>;
  onEditPhone: () => void;
  onResend: () => void;
  onOtpChange: () => void;
};

export function UserRegisterOtpStep({
  form,
  authError,
  isBusy,
  canResend,
  secondsLeft,
  isResending,
  onSubmit,
  onEditPhone,
  onResend,
  onOtpChange,
}: UserRegisterOtpStepProps) {
  return (
    <form
      noValidate
      className="space-y-6"
      onSubmit={form.handleSubmit(onSubmit)}
      aria-label={userAuthCopy.otpLabel}
    >
      <Field
        invalid={Boolean(form.formState.errors.code) || Boolean(authError)}
      >
        <FieldLabel htmlFor="user-register-otp">
          {userAuthCopy.otpLabel}
        </FieldLabel>
        <Controller
          control={form.control}
          name="code"
          render={({ field }) => (
            <OtpInput
              id="user-register-otp"
              length={LOGIN_OTP_LENGTH}
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                onOtpChange();
              }}
              invalid={
                Boolean(form.formState.errors.code) || Boolean(authError)
              }
              disabled={isBusy}
            />
          )}
        />
        <p className="type-caption text-muted-foreground">
          {userAuthCopy.otpHelp}
        </p>
        <FieldError>
          {authError ?? form.formState.errors.code?.message}
        </FieldError>
      </Field>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={isBusy}
          onClick={onEditPhone}
        >
          {userAuthCopy.editPhoneLabel}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!canResend || isBusy}
          loading={isResending}
          onClick={onResend}
        >
          {canResend
            ? userAuthCopy.resendLabel
            : `ارسال مجدد (${secondsLeft} ثانیه)`}
        </Button>
      </div>
      <Button type="submit" className="w-full" loading={isBusy}>
        {userAuthCopy.verifyLabel}
      </Button>
    </form>
  );
}
