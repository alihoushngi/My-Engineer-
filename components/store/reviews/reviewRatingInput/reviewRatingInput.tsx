"use client";

import { StarIcon } from "lucide-react";
import { reviewsCopy } from "@/config/reviews.config/reviews.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { cn } from "@/lib/utils/cn/cn";

type ReviewRatingInputProps = {
  value: number;
  onChange: (rating: number) => void;
  invalid?: boolean;
};

export function ReviewRatingInput({
  value,
  onChange,
  invalid = false,
}: ReviewRatingInputProps) {
  return (
    <div
      role="radiogroup"
      aria-label={reviewsCopy.ratingLabel}
      aria-invalid={invalid || undefined}
      className="flex items-center gap-1"
    >
      {Array.from({ length: 5 }, (_, index) => {
        const rating = index + 1;
        const selected = rating <= value;

        return (
          <button
            key={rating}
            type="button"
            role="radio"
            aria-checked={value === rating}
            aria-label={`${reviewsCopy.ratingOptionLabel} ${formatFaNumber(rating)}`}
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring",
              invalid && "ring-1 ring-danger/40",
            )}
            onClick={() => {
              onChange(rating);
            }}
          >
            <StarIcon
              aria-hidden="true"
              className={cn(
                "size-5",
                selected ? "fill-accent text-accent" : "text-muted-foreground",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
