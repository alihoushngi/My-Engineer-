"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EngineerActionError } from "@/components/layout/engineerLogoutItem/engineerLogoutItem";
import { Button } from "@/components/ui/button/button";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Field, FieldLabel } from "@/components/ui/field/field";
import { Label } from "@/components/ui/label/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { updateEngineerServiceArea } from "@/services/engineer-service/engineer-service";
import { type City, type Province } from "@/types/store/registration.types";
import { type EngineerServiceArea } from "@/types/store/engineer.types";

const schema = z.object({
  provinceId: z.string().min(1),
  cityId: z.string().min(1),
  nearbyCityIds: z.array(z.string()),
});

type FormValues = z.infer<typeof schema>;

type EngineerServiceAreaFormProps = {
  area: EngineerServiceArea;
  provinces: readonly Province[];
  cities: readonly City[];
};

export function EngineerServiceAreaForm({
  area,
  provinces,
  cities,
}: EngineerServiceAreaFormProps) {
  const [error, setError] = useState<string | null>(null);
  const mutation = useApiMutation(updateEngineerServiceArea);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      provinceId: area.provinceId,
      cityId: area.cityId,
      nearbyCityIds: area.nearbyCities.map((city) => city.id),
    },
  });

  const provinceId = form.watch("provinceId");
  const cityId = form.watch("cityId");
  const nearbyCityIds = form.watch("nearbyCityIds");
  const provinceCities = useMemo(
    () => cities.filter((city) => city.provinceId === provinceId),
    [cities, provinceId],
  );
  const nearbyOptions = useMemo(
    () =>
      cities.filter(
        (city) => city.provinceId === provinceId && city.id !== cityId,
      ),
    [cities, cityId, provinceId],
  );

  async function onSubmit(values: FormValues) {
    setError(null);

    try {
      await mutation.mutateAsync(values);
    } catch (err) {
      setError(toUserErrorMessage(err, engineerPanelCopy.mutationUnavailable));
    }
  }

  return (
    <form
      className="flex flex-col gap-5 rounded-lg border border-border bg-surface p-(--space-card)"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Field>
        <FieldLabel>استان</FieldLabel>
        <Select
          value={provinceId}
          onValueChange={(value) => {
            form.setValue("provinceId", value, { shouldDirty: true });
            form.setValue("cityId", "", { shouldDirty: true });
            form.setValue("nearbyCityIds", [], { shouldDirty: true });
          }}
        >
          <SelectTrigger aria-label="استان">
            <SelectValue placeholder="انتخاب استان" />
          </SelectTrigger>
          <SelectContent>
            {provinces.map((province) => (
              <SelectItem key={province.id} value={province.id}>
                {province.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field>
        <FieldLabel>شهر اصلی</FieldLabel>
        <Select
          value={cityId || undefined}
          onValueChange={(value) =>
            form.setValue("cityId", value, { shouldDirty: true })
          }
        >
          <SelectTrigger aria-label="شهر اصلی">
            <SelectValue placeholder="انتخاب شهر" />
          </SelectTrigger>
          <SelectContent>
            {provinceCities.map((city) => (
              <SelectItem key={city.id} value={city.id}>
                {city.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <fieldset className="space-y-3">
        <legend className="type-label text-foreground">شهرهای مجاور</legend>
        {nearbyOptions.length === 0 ? (
          <p className="type-body-sm text-muted-foreground">
            پس از انتخاب شهر اصلی، شهرهای همان استان در صورت وجود نمایش داده
            می‌شوند.
          </p>
        ) : (
          nearbyOptions.map((city) => {
            const checked = nearbyCityIds.includes(city.id);

            return (
              <div key={city.id} className="flex min-h-11 items-center gap-3">
                <Checkbox
                  id={`nearby-${city.id}`}
                  checked={checked}
                  onCheckedChange={(value) => {
                    const next =
                      value === true
                        ? [...nearbyCityIds, city.id]
                        : nearbyCityIds.filter((id) => id !== city.id);
                    form.setValue("nearbyCityIds", next, { shouldDirty: true });
                  }}
                />
                <Label htmlFor={`nearby-${city.id}`}>{city.name}</Label>
              </div>
            );
          })
        )}
      </fieldset>
      <EngineerActionError
        message={error}
        onRetry={() => void form.handleSubmit(onSubmit)()}
      />
      <Button
        type="submit"
        loading={mutation.isPending}
        disabled={!form.formState.isDirty || mutation.isPending}
      >
        {engineerPanelCopy.saveLabel}
      </Button>
    </form>
  );
}
