"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { Textarea } from "@/components/ui/textarea/textarea";
import { messagingCopy } from "@/config/messaging.config/messaging.config";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { sendMessage } from "@/services/messaging-service/messaging-service";
import { useRouter } from "next/navigation";

type MessagingComposerProps = {
  conversationId: string;
};

export function MessagingComposer({ conversationId }: MessagingComposerProps) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);
  const mutation = useApiMutation(sendMessage);

  async function handleSubmit() {
    const trimmed = body.trim();
    setFieldError(null);
    setSendError(null);

    if (trimmed === "") {
      setFieldError(messagingCopy.composerEmptyError);
      return;
    }

    try {
      await mutation.mutateAsync({ conversationId, body: trimmed });
      setBody("");
      router.refresh();
    } catch (error) {
      setSendError(toUserErrorMessage(error, messagingCopy.sendFailed));
    }
  }

  return (
    <form
      className="shrink-0 space-y-3 border-t border-border bg-surface p-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
      onSubmit={(event) => {
        event.preventDefault();
        void handleSubmit();
      }}
    >
      <Field invalid={Boolean(fieldError)}>
        <FieldLabel htmlFor="messaging-composer">
          {messagingCopy.sendLabel}
        </FieldLabel>
        <Textarea
          id="messaging-composer"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder={messagingCopy.composerPlaceholder}
          rows={3}
        />
        <FieldError>{fieldError}</FieldError>
      </Field>
      {sendError ? (
        <div className="flex flex-wrap items-center gap-2" role="alert">
          <p className="type-caption text-danger">{sendError}</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => void handleSubmit()}
          >
            {messagingCopy.retryLabel}
          </Button>
        </div>
      ) : null}
      <Button
        type="submit"
        loading={mutation.isPending}
        disabled={mutation.isPending}
      >
        {messagingCopy.sendLabel}
      </Button>
    </form>
  );
}
