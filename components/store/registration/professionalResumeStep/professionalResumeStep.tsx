"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";
import { Textarea } from "@/components/ui/textarea/textarea";
import { RegistrationProgress } from "@/components/store/registration/registrationProgress/registrationProgress";
import { RegistrationStepNav } from "@/components/store/registration/registrationStepNav/registrationStepNav";
import {
  resumeStepSchema,
  type ResumeStepData,
} from "@/components/store/registration/professionalResumeStep/type/professionalResumeStep.types";
import { registrationCopy } from "@/config/registration.config/registration.config";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { RegistrationError } from "@/components/store/registration/registrationError/registrationError";
import { registrationPaths } from "@/lib/registration/guard-path/guard-path";
import { useRegistrationWizard } from "@/providers/registration-wizard-provider/registration-wizard-provider";
import { saveResume } from "@/services/registration-service/registration-service";

export function ProfessionalResumeStep() {
  const router = useRouter();
  const { data, commitResume } = useRegistrationWizard();
  const [apiError, setApiError] = useState<string | null>(null);
  const saveMutation = useApiMutation(saveResume);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResumeStepData>({
    resolver: zodResolver(resumeStepSchema),
    defaultValues: {
      experienceYears: data.resume?.experienceYears ?? 0,
      resumeText: data.resume?.resumeText ?? "",
    },
  });

  async function onSubmit(formData: ResumeStepData) {
    setApiError(null);

    try {
      await saveMutation.mutateAsync({
        experienceYears: formData.experienceYears,
        resumeText: formData.resumeText,
      });
    } catch (err) {
      setApiError(
        toUserErrorMessage(err, registrationCopy.errorGenericDescription),
      );
      return;
    }

    commitResume({
      experienceYears: formData.experienceYears,
      resumeText: formData.resumeText,
    });
    router.push(registrationPaths.portfolio);
  }

  return (
    <div className="space-y-8">
      <RegistrationProgress currentStep={8} />
      <div className="space-y-2">
        <h2 className="type-h3 font-semibold text-foreground">
          {registrationCopy.step8Title}
        </h2>
        <p className="type-body text-muted-foreground">
          {registrationCopy.step8Description}
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-6"
        aria-label={registrationCopy.step8Title}
      >
        <Field invalid={Boolean(errors.experienceYears)}>
          <FieldLabel htmlFor="reg-experience-years" required>
            {registrationCopy.experienceYearsLabel}
          </FieldLabel>
          <Input
            id="reg-experience-years"
            type="number"
            inputMode="numeric"
            min={0}
            step="any"
            dir="ltr"
            className="ltr-data"
            placeholder={registrationCopy.experienceYearsPlaceholder}
            aria-invalid={Boolean(errors.experienceYears)}
            aria-describedby={
              errors.experienceYears ? "reg-experience-years-error" : undefined
            }
            {...register("experienceYears", { valueAsNumber: true })}
          />
          <FieldError id="reg-experience-years-error">
            {errors.experienceYears?.message}
          </FieldError>
        </Field>

        <Field invalid={Boolean(errors.resumeText)}>
          <FieldLabel htmlFor="reg-resume-text" required>
            {registrationCopy.resumeTextLabel}
          </FieldLabel>
          <Textarea
            id="reg-resume-text"
            rows={8}
            placeholder={registrationCopy.resumeTextPlaceholder}
            aria-invalid={Boolean(errors.resumeText)}
            aria-describedby={
              errors.resumeText
                ? "reg-resume-text-error"
                : "reg-resume-text-help"
            }
            {...register("resumeText")}
          />
          <FieldDescription id="reg-resume-text-help">
            {registrationCopy.resumeTextHelp}
          </FieldDescription>
          <FieldError id="reg-resume-text-error">
            {errors.resumeText?.message}
          </FieldError>
        </Field>

        {apiError ? (
          <RegistrationError
            message={apiError}
            onRetry={() => {
              void handleSubmit(onSubmit)();
            }}
          />
        ) : null}

        <RegistrationStepNav
          onBack={() => {
            router.push(registrationPaths.organization);
          }}
          onContinue={() => {
            void handleSubmit(onSubmit)();
          }}
          isPending={isSubmitting || saveMutation.isPending}
          isContinueDisabled={isSubmitting || saveMutation.isPending}
        />
      </form>
    </div>
  );
}
