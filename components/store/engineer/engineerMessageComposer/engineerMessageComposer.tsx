"use client";

import { useState } from "react";
import { EngineerActionError } from "@/components/layout/engineerLogoutItem/engineerLogoutItem";
import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { Textarea } from "@/components/ui/textarea/textarea";
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { sendEngineerMessage } from "@/services/engineer-service/engineer-service";

type EngineerMessageComposerProps = {
  conversationId: string;
};

export function EngineerMessageComposer({
  conversationId,
}: EngineerMessageComposerProps) {
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const mutation = useApiMutation(sendEngineerMessage);

  async function handleSubmit() {
    const trimmed = body.trim();
    setFieldError(null);
    setError(null);

    if (trimmed === "") {
      setFieldError(engineerPanelCopy.composerEmptyError);
      return;
    }

    try {
      await mutation.mutateAsync({ conversationId, body: trimmed });
    } catch (err) {
      setError(toUserErrorMessage(err, engineerPanelCopy.mutationUnavailable));
    }
  }

  return (
    <form
      className="shrink-0 space-y-3 border-t border-border bg-surface p-4"
      onSubmit={(event) => {
        event.preventDefault();
        void handleSubmit();
      }}
    >
      <Field invalid={Boolean(fieldError)}>
        <FieldLabel htmlFor="engineer-message">
          {engineerPanelCopy.sendLabel}
        </FieldLabel>
        <Textarea
          id="engineer-message"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder={engineerPanelCopy.composerPlaceholder}
          rows={3}
        />
        <FieldError>{fieldError}</FieldError>
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
        {engineerPanelCopy.sendLabel}
      </Button>
    </form>
  );
}
