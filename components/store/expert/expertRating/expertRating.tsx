import { StarIcon } from "lucide-react";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { cn } from "@/lib/utils/cn/cn";

type ExpertRatingProps = {
  rating: number;
  reviewCount?: number;
  className?: string;
};

export function ExpertRating({
  rating,
  reviewCount,
  className,
}: ExpertRatingProps) {
  const label =
    reviewCount === undefined
      ? `${expertProfileCopy.ratingLabel} ${formatFaNumber(rating)}`
      : `${expertProfileCopy.ratingLabel} ${formatFaNumber(rating)} از ${formatFaNumber(reviewCount)} نظر`;

  return (
    <p
      className={cn(
        "flex items-center gap-2 type-body-sm text-muted-foreground",
        className,
      )}
    >
      <StarIcon aria-hidden="true" className="size-4 fill-accent text-accent" />
      <span>{label}</span>
    </p>
  );
}
