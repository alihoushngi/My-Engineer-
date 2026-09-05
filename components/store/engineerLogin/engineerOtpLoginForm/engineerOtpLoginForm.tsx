"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";
import { OtpInput } from "@/components/ui/otpInput/otpInput";
import { engineerLoginCopy } from "@/config/engineer-login.config/engineer-login.config";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { useOtpTimer } from "@/hooks/use-otp-timer/use-otp-timer";
import {
  loginEngineerWithOtp,
  requestEngineerLoginOtp,
} from "@/services/engineer-auth-service/engineer-auth-service";
import {
  loginOtpSchema,
  type LoginOtpData,
} from "@/lib/validation/login/login-otp.schema";
import {
  loginPhoneSchema,
  type LoginPhoneData,
} from "@/lib/validation/login/login-phone.schema";
import { LOGIN_OTP_LENGTH } from "@/lib/validation/login/login-otp-length";
import { OTP_RESEND_COOLDOWN_SECONDS } from "@/config/registration.config/registration.config";

type EngineerOtpLoginFormProps = {
  nextPath: string;
};

export function EngineerOtpLoginForm({ nextPath }: EngineerOtpLoginFormProps) {
  const router = useRouter();
  const [phase, setPhase] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const requestMutation = useApiMutation(requestEngineerLoginOtp);
  const verifyMutation = useApiMutation(({ otp }: { otp: string }) =>
    loginEngineerWithOtp(phone, otp),
  );
  const { secondsLeft, canResend, restartTimer } = useOtpTimer(
    OTP_RESEND_COOLDOWN_SECONDS,
  );

  const phoneForm = useForm<LoginPhoneData>({
    resolver: yupResolver(loginPhoneSchema),
    defaultValues: { phone: "" },
  });

  const otpForm = useForm<LoginOtpData>({
    resolver: yupResolver(loginOtpSchema),
    defaultValues: { code: "" },
  });

  async function onRequestOtp(formData: LoginPhoneData) {
    setAuthError(null);

    try {
      await requestMutation.mutateAsync(formData.phone);
    } catch (error) {
      setAuthError(toUserErrorMessage(error, engineerLoginCopy.description));
      return;
    }

    setPhone(formData.phone);
    setPhase("otp");
    otpForm.reset({ code: "" });
    restartTimer();
  }

  async function onVerify(formData: LoginOtpData) {
    setAuthError(null);

    try {
      await verifyMutation.mutateAsync({ otp: formData.code });
    } catch (error) {
      setAuthError(toUserErrorMessage(error, "کد واردشده صحیح نیست."));
      return;
    }

    router.replace(nextPath);
    router.refresh();
  }

  async function onResend() {
    if (!canResend || phone === "") {
      return;
    }

    setAuthError(null);

    try {
      await requestMutation.mutateAsync(phone);
      otpForm.reset({ code: "" });
      restartTimer();
    } catch (error) {
      setAuthError(toUserErrorMessage(error, engineerLoginCopy.description));
    }
  }

  const isBusy =
    phoneForm.formState.isSubmitting ||
    otpForm.formState.isSubmitting ||
    requestMutation.isPending ||
    verifyMutation.isPending;

  if (phase === "phone") {
    return (
      <form
        noValidate
        className="space-y-6"
        onSubmit={phoneForm.handleSubmit(onRequestOtp)}
        aria-label={engineerLoginCopy.otpMethod}
      >
        <Field invalid={Boolean(phoneForm.formState.errors.phone)}>
          <FieldLabel htmlFor="login-otp-phone" required>
            {engineerLoginCopy.phoneLabel}
          </FieldLabel>
          <Input
            id="login-otp-phone"
            type="tel"
            autoComplete="tel-national"
            inputMode="tel"
            placeholder={engineerLoginCopy.phonePlaceholder}
            aria-invalid={Boolean(phoneForm.formState.errors.phone)}
            {...phoneForm.register("phone")}
          />
          <FieldError>{phoneForm.formState.errors.phone?.message}</FieldError>
        </Field>
        {authError ? (
          <p className="type-body-sm text-danger" role="alert">
            {authError}
          </p>
        ) : null}
        <Button type="submit" className="w-full" loading={isBusy}>
          {engineerLoginCopy.requestOtpLabel}
        </Button>
      </form>
    );
  }

  return (
    <form
      noValidate
      className="space-y-6"
      onSubmit={otpForm.handleSubmit(onVerify)}
      aria-label={engineerLoginCopy.otpMethod}
    >
      <Field
        invalid={Boolean(otpForm.formState.errors.code) || Boolean(authError)}
      >
        <FieldLabel htmlFor="login-otp-code">
          {engineerLoginCopy.otpLabel}
        </FieldLabel>
        <Controller
          control={otpForm.control}
          name="code"
          render={({ field }) => (
            <OtpInput
              id="login-otp-code"
              length={LOGIN_OTP_LENGTH}
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                setAuthError(null);
              }}
              invalid={
                Boolean(otpForm.formState.errors.code) || Boolean(authError)
              }
              disabled={isBusy}
            />
          )}
        />
        <p className="type-caption text-muted-foreground">
          {engineerLoginCopy.otpHelp}
        </p>
        <FieldError>
          {authError ?? otpForm.formState.errors.code?.message}
        </FieldError>
      </Field>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={isBusy}
          onClick={() => {
            setPhase("phone");
            setAuthError(null);
          }}
        >
          {engineerLoginCopy.editPhoneLabel}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!canResend || isBusy}
          loading={requestMutation.isPending}
          onClick={() => {
            void onResend();
          }}
        >
          {canResend
            ? engineerLoginCopy.resendLabel
            : `ارسال مجدد (${secondsLeft} ثانیه)`}
        </Button>
      </div>
      <Button type="submit" className="w-full" loading={isBusy}>
        {engineerLoginCopy.verifyLabel}
      </Button>
    </form>
  );
}
