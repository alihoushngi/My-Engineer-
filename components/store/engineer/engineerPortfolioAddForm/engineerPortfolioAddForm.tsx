"use client";

import { useState, type ChangeEvent } from "react";
import { EngineerActionError } from "@/components/layout/engineerLogoutItem/engineerLogoutItem";
import { Button } from "@/components/ui/button/button";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field/field";
import { FileUpload } from "@/components/ui/fileUpload/fileUpload";
import { Input } from "@/components/ui/input/input";
import { Textarea } from "@/components/ui/textarea/textarea";
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { addEngineerPortfolioItem } from "@/services/engineer-service/engineer-service";

export function EngineerPortfolioAddForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mutation = useApiMutation(addEngineerPortfolioItem);

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setFileName(file?.name ?? null);
  }

  async function handleSubmit() {
    setError(null);

    try {
      await mutation.mutateAsync({
        title: title.trim() || "نمونه‌کار جدید",
        description: description.trim() || undefined,
      });
    } catch (err) {
      setError(toUserErrorMessage(err, engineerPanelCopy.mutationUnavailable));
    }
  }

  return (
    <form
      className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-(--space-card)"
      onSubmit={(event) => {
        event.preventDefault();
        void handleSubmit();
      }}
    >
      <Field>
        <FieldLabel htmlFor="portfolio-title">عنوان پروژه</FieldLabel>
        <Input
          id="portfolio-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="portfolio-description">توضیح (اختیاری)</FieldLabel>
        <Textarea
          id="portfolio-description"
          rows={3}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </Field>
      <Field>
        <FieldLabel>تصویر نمونه‌کار</FieldLabel>
        <FileUpload
          accept="image/*"
          onChange={handleFile}
          description={
            fileName
              ? `فایل انتخاب‌شده: ${fileName}`
              : engineerPanelCopy.uploadUnavailable
          }
        />
        <FieldDescription>
          {engineerPanelCopy.uploadUnavailable}
        </FieldDescription>
      </Field>
      <EngineerActionError
        message={error}
        onRetry={() => void handleSubmit()}
      />
      <Button
        type="submit"
        loading={mutation.isPending}
        disabled={mutation.isPending}
      >
        {engineerPanelCopy.addLabel}
      </Button>
    </form>
  );
}
