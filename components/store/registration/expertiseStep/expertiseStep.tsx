"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlertIcon, XIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { Badge } from "@/components/ui/badge/badge";
import { RegistrationError } from "@/components/store/registration/registrationError/registrationError";
import { RegistrationProgress } from "@/components/store/registration/registrationProgress/registrationProgress";
import { RegistrationStepNav } from "@/components/store/registration/registrationStepNav/registrationStepNav";
import {
  expertiseStepSchema,
  type ExpertiseStepData,
} from "@/components/store/registration/expertiseStep/type/expertiseStep.types";
import { registrationCopy } from "@/config/registration.config/registration.config";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { useRegistrationWizard } from "@/providers/registration-wizard-provider/registration-wizard-provider";
import { saveExpertise } from "@/services/registration-service/registration-service";

export function ExpertiseStep() {
  const router = useRouter();
  const { data, commitExpertise } = useRegistrationWizard();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<ExpertiseStepData>({
    resolver: zodResolver(expertiseStepSchema),
    defaultValues: {
      expertiseIds: data.expertise?.expertiseIds
        ? [...data.expertise.expertiseIds]
        : [],
      softwareIds: data.expertise?.softwareIds
        ? [...data.expertise.softwareIds]
        : [],
    },
  });

  const expertiseIds = watch("expertiseIds");
  const softwareIds = watch("softwareIds");

  function removeExpertise(id: string) {
    setValue(
      "expertiseIds",
      expertiseIds.filter((e) => e !== id),
    );
  }

  function removeSoftware(id: string) {
    setValue(
      "softwareIds",
      softwareIds.filter((s) => s !== id),
    );
  }

  async function onSubmit(formData: ExpertiseStepData) {
    setApiError(null);

    try {
      await saveExpertise({
        expertiseIds: formData.expertiseIds,
        softwareIds: formData.softwareIds,
      });
    } catch (err) {
      setApiError(
        toUserErrorMessage(err, registrationCopy.errorGenericDescription),
      );
      return;
    }

    commitExpertise({
      expertiseIds: formData.expertiseIds,
      softwareIds: formData.softwareIds,
    });
    router.push("/expert-registration/personal-info");
  }

  function handleBack() {
    router.push("/expert-registration/service-area");
  }

  return (
    <div className="space-y-8">
      <RegistrationProgress currentStep={4} />
      <div className="space-y-2">
        <h2 className="type-h3 font-semibold text-foreground">
          {registrationCopy.step4Title}
        </h2>
        <p className="type-body text-muted-foreground">
          {registrationCopy.step4Description}
        </p>
      </div>

      {/*
       * API CONTRACT REQUIRED — expertise catalog endpoint does not exist yet.
       * The selection UI (ExpertiseCategorySheet) will be enabled once the catalog
       * API is documented. Currently shows an integration-status alert.
       * IMPLEMENTATION NOTE: replace this Alert with ExpertiseCategorySheet triggers
       * when the catalog API contract is established.
       */}
      <Alert variant="info">
        <CircleAlertIcon />
        <AlertTitle>{registrationCopy.expertiseCatalogErrorTitle}</AlertTitle>
        <AlertDescription>
          {registrationCopy.expertiseCatalogApiNote}
        </AlertDescription>
      </Alert>

      {/* Selected expertise chips — shown when selections exist (e.g. after back navigation) */}
      {expertiseIds.length > 0 || softwareIds.length > 0 ? (
        <section
          className="space-y-3"
          aria-label={registrationCopy.expertiseSelectedLabel}
        >
          <p className="type-body-sm font-medium text-foreground">
            {registrationCopy.expertiseSelectedLabel}
          </p>
          <div className="flex flex-wrap gap-2" role="list">
            {expertiseIds.map((id) => (
              <div key={id} role="listitem">
                <Badge
                  variant="secondary"
                  className="max-w-full min-w-0 gap-1 pe-0.5 whitespace-normal"
                >
                  <span>{id}</span>
                  <button
                    type="button"
                    onClick={() => removeExpertise(id)}
                    aria-label={registrationCopy.removeExpertiseLabel(id)}
                    className="inline-flex size-8 items-center justify-center rounded-full hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <XIcon className="size-3" aria-hidden="true" />
                  </button>
                </Badge>
              </div>
            ))}
            {softwareIds.map((id) => (
              <div key={`sw-${id}`} role="listitem">
                <Badge
                  variant="outline"
                  className="max-w-full min-w-0 gap-1 pe-0.5 whitespace-normal"
                >
                  <span>{id}</span>
                  <button
                    type="button"
                    onClick={() => removeSoftware(id)}
                    aria-label={registrationCopy.removeExpertiseLabel(id)}
                    className="inline-flex size-8 items-center justify-center rounded-full hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <XIcon className="size-3" aria-hidden="true" />
                  </button>
                </Badge>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <p className="type-body-sm text-muted-foreground">
          {registrationCopy.expertiseNoneSelected}
        </p>
      )}

      {apiError ? (
        <RegistrationError
          message={apiError}
          onRetry={() => {
            void handleSubmit(onSubmit)();
          }}
        />
      ) : null}

      <RegistrationStepNav
        onBack={handleBack}
        onContinue={() => {
          void handleSubmit(onSubmit)();
        }}
        isPending={isSubmitting}
        isContinueDisabled={isSubmitting}
      />
    </div>
  );
}
