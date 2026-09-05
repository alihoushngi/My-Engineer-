"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { InfoIcon } from "lucide-react";
import { ReviewRatingInput } from "@/components/store/reviews/reviewRatingInput/reviewRatingInput";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { Button } from "@/components/ui/button/button";
import {
  Field,
  FieldError,
  FieldHint,
  FieldLabel,
} from "@/components/ui/field/field";
import { Textarea } from "@/components/ui/textarea/textarea";
import {
  REVIEW_COMMENT_MAX_LENGTH,
  REVIEW_COMMENT_MIN_LENGTH,
  reviewsCopy,
} from "@/config/reviews.config/reviews.config";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { submitReview } from "@/services/review-service/review-service";

type ReviewSubmitFormProps = {
  requestId: string;
  onSuccess?: (reviewId: string) => void;
};

export function ReviewSubmitForm({
  requestId,
  onSuccess,
}: ReviewSubmitFormProps) {
  const router = useRouter();
  const mutation = useApiMutation(submitReview);
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const trimmed = body.trim();
  const ratingInvalid = rating < 1;
  const commentInvalid =
    trimmed.length > 0 && trimmed.length < REVIEW_COMMENT_MIN_LENGTH;

  async function onSubmit() {
    setError(null);

    if (ratingInvalid) {
      setError(reviewsCopy.ratingRequired);
      return;
    }

    if (trimmed.length < REVIEW_COMMENT_MIN_LENGTH) {
      setError(reviewsCopy.commentMinError);
      return;
    }

    try {
      const reviewId = await mutation.mutateAsync({
        requestId,
        rating,
        body: trimmed,
      });
      onSuccess?.(reviewId);
      router.refresh();
    } catch (err: unknown) {
      setError(toUserErrorMessage(err, reviewsCopy.mutationErrorFallback));
    }
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        void onSubmit();
      }}
    >
      {error ? (
        <Alert variant="danger">
          <InfoIcon />
          <AlertTitle>{reviewsCopy.mutationErrorFallback}</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      <Field invalid={Boolean(error) && ratingInvalid}>
        <FieldLabel required>{reviewsCopy.ratingLabel}</FieldLabel>
        <ReviewRatingInput
          value={rating}
          invalid={Boolean(error) && ratingInvalid}
          onChange={(next) => {
            setRating(next);
            setError(null);
          }}
        />
      </Field>
      <Field invalid={commentInvalid}>
        <FieldLabel htmlFor="review-comment" required>
          {reviewsCopy.commentLabel}
        </FieldLabel>
        <Textarea
          id="review-comment"
          name="body"
          value={body}
          maxLength={REVIEW_COMMENT_MAX_LENGTH}
          aria-invalid={commentInvalid || undefined}
          onChange={(event) => {
            setBody(event.target.value);
            setError(null);
          }}
        />
        <FieldHint>{reviewsCopy.commentHint}</FieldHint>
        {commentInvalid ? (
          <FieldError>{reviewsCopy.commentMinError}</FieldError>
        ) : null}
      </Field>
      <Button type="submit" loading={mutation.isPending}>
        {reviewsCopy.submitCta}
      </Button>
    </form>
  );
}
