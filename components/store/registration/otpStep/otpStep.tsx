"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlertIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { OtpInput } from "@/components/ui/otpInput/otpInput";
import { RegistrationProgress } from "@/components/store/registration/registrationProgress/registrationProgress";
import { RegistrationStepNav } from "@/components/store/registration/registrationStepNav/registrationStepNav";
import {
  otpStepSchema,
  type OtpError,
  type OtpStepData,
} from "@/components/store/registration/otpStep/type/otpStep.types";
import { registrationCopy } from "@/config/registration.config/registration.config";
import { useRegistrationWizard } from "@/providers/registration-wizard-provider/registration-wizard-provider";
import {
  sendOtp,
  verifyOtp,
} from "@/services/registration-service/registration-service";
import { useOtpTimer } from "@/hooks/use-otp-timer/use-otp-timer";

export function OtpStep() {
  const router = useRouter();
  const { data, commitOtpVerified, maxStep } = useRegistrationWizard();
  const { secondsLeft, canResend, restartTimer } = useOtpTimer();
  const [otpError, setOtpError] = useState<OtpError>(null);
  const [resendError, setResendError] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);

  // Guard: redirect if step 1 not completed
  const phone = data.identity?.phone;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OtpStepData>({
    resolver: zodResolver(otpStepSchema),
    defaultValues: { code: "" },
  });

  // Guard redirect on mount — no fake state
  if (!phone || maxStep < 2) {
    // This runs during render on first evaluation (edge case on refresh)
    // OtpGuard component handles the redirect imperatively via useEffect
  }

  async function onSubmit(formData: OtpStepData) {
    if (!phone) return;
    setOtpError(null);

    try {
      await verifyOtp({ phone, code: formData.code });
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      // API CONTRACT REQUIRED for distinguishing invalid vs expired codes.
      // Using a generic error until error codes are defined.
      if (message.includes("expired")) {
        setOtpError("expired");
      } else {
        setOtpError("invalid");
      }
      return;
    }

    commitOtpVerified();
    router.push("/expert-registration/service-area");
  }

  async function handleResend() {
    if (!phone || !canResend) return;
    setResendError(null);
    setIsResending(true);

    try {
      await sendOtp({ phone, nationalId: data.identity?.nationalId ?? "" });
      restartTimer();
      reset();
      setOtpError(null);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : registrationCopy.errorGenericDescription;
      setResendError(message);
    } finally {
      setIsResending(false);
    }
  }

  function handleEditPhone() {
    router.push("/expert-registration");
  }

  const otpErrorMessage =
    otpError === "expired"
      ? registrationCopy.otpExpiredError
      : otpError === "invalid"
        ? registrationCopy.otpInvalidError
        : null;

  return (
    <div className="space-y-8">
      <RegistrationProgress currentStep={2} />
      <div className="space-y-2">
        <h2 className="type-h3 font-semibold text-foreground">
          {registrationCopy.step2Title}
        </h2>
        <p className="type-body text-muted-foreground">
          {phone
            ? registrationCopy.step2Description(phone)
            : registrationCopy.step2Description("—")}
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-6"
        aria-label={registrationCopy.step2Title}
      >
        <Field invalid={Boolean(errors.code) || Boolean(otpErrorMessage)}>
          <FieldLabel htmlFor="reg-otp">{registrationCopy.otpLabel}</FieldLabel>
          <Controller
            control={control}
            name="code"
            render={({ field }) => (
              <OtpInput
                id="reg-otp"
                length={5}
                value={field.value}
                onChange={field.onChange}
                invalid={Boolean(errors.code) || Boolean(otpErrorMessage)}
                disabled={isSubmitting}
                aria-describedby={
                  otpErrorMessage || errors.code ? "reg-otp-error" : undefined
                }
              />
            )}
          />
          <FieldError id="reg-otp-error">
            {otpErrorMessage ?? errors.code?.message}
          </FieldError>
        </Field>

        {resendError ? (
          <Alert variant="danger">
            <CircleAlertIcon />
            <AlertTitle>{registrationCopy.errorGenericTitle}</AlertTitle>
            <AlertDescription>{resendError}</AlertDescription>
          </Alert>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleEditPhone}
            disabled={isSubmitting}
          >
            {registrationCopy.editPhoneLabel}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              void handleResend();
            }}
            disabled={!canResend || isResending || isSubmitting}
            loading={isResending}
          >
            {canResend
              ? registrationCopy.resendLabel
              : registrationCopy.resendCooldown(secondsLeft)}
          </Button>
        </div>

        <RegistrationStepNav
          onBack={handleEditPhone}
          onContinue={() => {
            void handleSubmit(onSubmit)();
          }}
          continueLabel={registrationCopy.verifyLabel}
          isPending={isSubmitting}
          isContinueDisabled={isSubmitting}
        />
      </form>
    </div>
  );
}
