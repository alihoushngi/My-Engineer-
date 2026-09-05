"use client";

import { useQuery } from "@tanstack/react-query";
import { CircleAlertIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Field, FieldLabel } from "@/components/ui/field/field";
import { registrationCopy } from "@/config/registration.config/registration.config";
import { getExpertiseCatalog } from "@/services/registration-service/registration-service";
import { type ExpertiseStepData } from "@/components/store/registration/expertiseStep/type/expertiseStep.types";
import { type UseFormSetValue } from "react-hook-form";

type ExpertiseCatalogPickerProps = {
  expertiseIds: readonly string[];
  softwareIds: readonly string[];
  setValue: UseFormSetValue<ExpertiseStepData>;
  disabled?: boolean;
};

export function ExpertiseCatalogPicker({
  expertiseIds,
  softwareIds,
  setValue,
  disabled = false,
}: ExpertiseCatalogPickerProps) {
  const catalogQuery = useQuery({
    queryKey: ["registration", "expertise-catalog"],
    queryFn: getExpertiseCatalog,
    retry: false,
  });

  if (catalogQuery.isPending) {
    return (
      <p className="type-body-sm text-muted-foreground">
        {registrationCopy.expertiseCatalogLoading}
      </p>
    );
  }

  if (catalogQuery.error || !catalogQuery.data) {
    return (
      <Alert variant="info">
        <CircleAlertIcon />
        <AlertTitle>{registrationCopy.expertiseCatalogErrorTitle}</AlertTitle>
        <AlertDescription>
          {registrationCopy.expertiseCatalogApiNote}
        </AlertDescription>
      </Alert>
    );
  }

  const { expertise, software } = catalogQuery.data;

  return (
    <div className="space-y-6">
      <Field>
        <FieldLabel>{registrationCopy.expertiseSelectedLabel}</FieldLabel>
        <div className="grid gap-2 sm:grid-cols-2">
          {expertise.map((item) => {
            const checked = expertiseIds.includes(item.id);

            return (
              <label
                key={item.id}
                className="flex min-h-11 items-center gap-3 rounded-md border border-border px-3 py-2 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary-subtle"
              >
                <Checkbox
                  checked={checked}
                  disabled={disabled}
                  onCheckedChange={(next) => {
                    setValue(
                      "expertiseIds",
                      next
                        ? [...expertiseIds, item.id]
                        : expertiseIds.filter((id) => id !== item.id),
                    );
                  }}
                />
                <span className="type-body-sm">{item.label}</span>
              </label>
            );
          })}
        </div>
      </Field>
      <Field>
        <FieldLabel>{registrationCopy.softwareLabel}</FieldLabel>
        <div className="grid gap-2 sm:grid-cols-2">
          {software.map((item) => {
            const checked = softwareIds.includes(item.id);

            return (
              <label
                key={item.id}
                className="flex min-h-11 items-center gap-3 rounded-md border border-border px-3 py-2 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary-subtle"
              >
                <Checkbox
                  checked={checked}
                  disabled={disabled}
                  onCheckedChange={(next) => {
                    setValue(
                      "softwareIds",
                      next
                        ? [...softwareIds, item.id]
                        : softwareIds.filter((id) => id !== item.id),
                    );
                  }}
                />
                <span className="type-body-sm">{item.label}</span>
              </label>
            );
          })}
        </div>
      </Field>
    </div>
  );
}
