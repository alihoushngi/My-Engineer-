"use client";

import { AuthLoginCard } from "@/components/store/auth/authLoginCard/authLoginCard";
import { AuthLoginMethods } from "@/components/store/auth/authLoginMethods/authLoginMethods";
import { AuthOtpLoginForm } from "@/components/store/auth/authOtpLoginForm/authOtpLoginForm";
import { AuthPasswordLoginForm } from "@/components/store/auth/authPasswordLoginForm/authPasswordLoginForm";
import { EngineerLoginRegisterCrossLink } from "@/components/store/engineerLogin/engineerLoginRegisterCrossLink/engineerLoginRegisterCrossLink";
import { engineerLoginCopy } from "@/config/engineer-login.config/engineer-login.config";
import {
  loginEngineerWithOtp,
  loginEngineerWithPassword,
  requestEngineerLoginOtp,
} from "@/services/engineer-auth-service/engineer-auth-service";

type EngineerLoginFormProps = {
  nextPath: string;
  isMockMode: boolean;
};

export function EngineerLoginForm({
  nextPath,
  isMockMode,
}: EngineerLoginFormProps) {
  return (
    <AuthLoginCard
      title={engineerLoginCopy.title}
      description={engineerLoginCopy.description}
      isMockMode={isMockMode}
      footer={<EngineerLoginRegisterCrossLink />}
    >
      <AuthLoginMethods
        otpLabel={engineerLoginCopy.otpMethod}
        passwordLabel={engineerLoginCopy.passwordMethod}
        otp={
          <AuthOtpLoginForm
            nextPath={nextPath}
            idPrefix="engineer-login"
            copy={engineerLoginCopy}
            requestOtp={requestEngineerLoginOtp}
            verifyOtp={loginEngineerWithOtp}
          />
        }
        password={
          <AuthPasswordLoginForm
            nextPath={nextPath}
            idPrefix="engineer-login"
            copy={engineerLoginCopy}
            loginWithPassword={loginEngineerWithPassword}
          />
        }
      />
    </AuthLoginCard>
  );
}
