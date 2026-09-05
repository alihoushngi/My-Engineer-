"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";
import { PasswordInput } from "@/components/store/engineerLogin/passwordInput/passwordInput";
import { engineerLoginCopy } from "@/config/engineer-login.config/engineer-login.config";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { loginEngineerWithPassword } from "@/services/engineer-auth-service/engineer-auth-service";
import {
  loginPasswordSchema,
  type LoginPasswordData,
} from "@/lib/validation/login/login-password.schema";

type EngineerPasswordLoginFormProps = {
  nextPath: string;
};

export function EngineerPasswordLoginForm({
  nextPath,
}: EngineerPasswordLoginFormProps) {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);
  const mutation = useApiMutation(({ phone, password }: LoginPasswordData) =>
    loginEngineerWithPassword(phone, password),
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginPasswordData>({
    resolver: yupResolver(loginPasswordSchema),
    defaultValues: { phone: "", password: "" },
  });

  async function onSubmit(formData: LoginPasswordData) {
    setAuthError(null);

    try {
      await mutation.mutateAsync(formData);
    } catch (error) {
      setAuthError(
        toUserErrorMessage(error, "شماره موبایل یا رمز عبور صحیح نیست."),
      );
      return;
    }

    router.replace(nextPath);
    router.refresh();
  }

  const isBusy = isSubmitting || mutation.isPending;

  return (
    <form
      noValidate
      className="space-y-6"
      onSubmit={handleSubmit(onSubmit)}
      aria-label={engineerLoginCopy.passwordMethod}
    >
      <Field invalid={Boolean(errors.phone)}>
        <FieldLabel htmlFor="login-password-phone" required>
          {engineerLoginCopy.phoneLabel}
        </FieldLabel>
        <Input
          id="login-password-phone"
          type="tel"
          autoComplete="tel-national"
          inputMode="tel"
          placeholder={engineerLoginCopy.phonePlaceholder}
          aria-invalid={Boolean(errors.phone)}
          {...register("phone")}
        />
        <FieldError>{errors.phone?.message}</FieldError>
      </Field>
      <Field invalid={Boolean(errors.password) || Boolean(authError)}>
        <FieldLabel htmlFor="login-password" required>
          {engineerLoginCopy.passwordLabel}
        </FieldLabel>
        <PasswordInput
          id="login-password"
          placeholder={engineerLoginCopy.passwordPlaceholder}
          aria-invalid={Boolean(errors.password) || Boolean(authError)}
          {...register("password")}
        />
        <FieldError>{authError ?? errors.password?.message}</FieldError>
      </Field>
      <Button type="submit" className="w-full" loading={isBusy}>
        {engineerLoginCopy.submitPassword}
      </Button>
    </form>
  );
}
