"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthLoginCard } from "@/components/store/auth/authLoginCard/authLoginCard";
import { UserRegisterLoginCrossLink } from "@/components/store/userRegister/userRegisterLoginCrossLink/userRegisterLoginCrossLink";
import { UserRegisterOtpStep } from "@/components/store/userRegister/userRegisterOtpStep/userRegisterOtpStep";
import { UserRegisterPhoneStep } from "@/components/store/userRegister/userRegisterPhoneStep/userRegisterPhoneStep";
import { UserRegisterProfileStep } from "@/components/store/userRegister/userRegisterProfileStep/userRegisterProfileStep";
import { userAuthCopy } from "@/config/user-auth.config/user-auth.config";
import { OTP_RESEND_COOLDOWN_SECONDS } from "@/config/registration.config/registration.config";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { useOtpTimer } from "@/hooks/use-otp-timer/use-otp-timer";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import {
  completeUserRegister,
  requestUserRegisterOtp,
  verifyUserRegisterOtp,
} from "@/services/user-auth-service/user-auth-service";
import {
  loginOtpSchema,
  type LoginOtpData,
} from "@/lib/validation/login/login-otp.schema";
import {
  loginPhoneSchema,
  type LoginPhoneData,
} from "@/lib/validation/login/login-phone.schema";
import {
  userRegisterProfileSchema,
  type UserRegisterProfileData,
} from "@/lib/validation/user/user-register.schema";

type UserRegisterFormProps = {
  nextPath: string;
  isMockMode: boolean;
};

export function UserRegisterForm({
  nextPath,
  isMockMode,
}: UserRegisterFormProps) {
  const router = useRouter();
  const [phase, setPhase] = useState<"phone" | "otp" | "profile">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const requestMutation = useApiMutation(requestUserRegisterOtp);
  const verifyMutation = useApiMutation(({ code }: { code: string }) =>
    verifyUserRegisterOtp(phone, code),
  );
  const completeMutation = useApiMutation((profile: UserRegisterProfileData) =>
    completeUserRegister({
      phone,
      otp,
      displayName: profile.displayName,
      password: profile.password,
    }),
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
  const profileForm = useForm<UserRegisterProfileData>({
    resolver: yupResolver(userRegisterProfileSchema),
    defaultValues: { displayName: "", password: "" },
  });
  const isBusy =
    phoneForm.formState.isSubmitting ||
    otpForm.formState.isSubmitting ||
    profileForm.formState.isSubmitting ||
    requestMutation.isPending ||
    verifyMutation.isPending ||
    completeMutation.isPending;

  async function onRequestOtp(formData: LoginPhoneData) {
    setAuthError(null);
    try {
      await requestMutation.mutateAsync(formData.phone);
    } catch (error) {
      setAuthError(toUserErrorMessage(error, userAuthCopy.registerDescription));
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
      await verifyMutation.mutateAsync({ code: formData.code });
    } catch (error) {
      setAuthError(toUserErrorMessage(error, "کد واردشده صحیح نیست."));
      return;
    }
    setOtp(formData.code);
    setPhase("profile");
  }

  async function onComplete(formData: UserRegisterProfileData) {
    setAuthError(null);
    try {
      await completeMutation.mutateAsync(formData);
    } catch (error) {
      setAuthError(toUserErrorMessage(error, userAuthCopy.registerDescription));
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
      setAuthError(toUserErrorMessage(error, userAuthCopy.registerDescription));
    }
  }

  return (
    <AuthLoginCard
      title={userAuthCopy.registerTitle}
      description={userAuthCopy.registerDescription}
      isMockMode={isMockMode}
      footer={<UserRegisterLoginCrossLink nextPath={nextPath} />}
    >
      {phase === "phone" ? (
        <UserRegisterPhoneStep
          form={phoneForm}
          authError={authError}
          isBusy={isBusy}
          onSubmit={onRequestOtp}
        />
      ) : null}
      {phase === "otp" ? (
        <UserRegisterOtpStep
          form={otpForm}
          authError={authError}
          isBusy={isBusy}
          canResend={canResend}
          secondsLeft={secondsLeft}
          isResending={requestMutation.isPending}
          onSubmit={onVerify}
          onEditPhone={() => {
            setPhase("phone");
            setAuthError(null);
          }}
          onResend={() => {
            void onResend();
          }}
          onOtpChange={() => {
            setAuthError(null);
          }}
        />
      ) : null}
      {phase === "profile" ? (
        <UserRegisterProfileStep
          form={profileForm}
          authError={authError}
          isBusy={isBusy}
          onSubmit={onComplete}
        />
      ) : null}
    </AuthLoginCard>
  );
}
