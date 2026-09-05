"use client";

import { useState } from "react";
import { ReviewSubmitForm } from "@/components/store/reviews/reviewSubmitForm/reviewSubmitForm";
import { ResponsiveDialog } from "@/components/common/responsiveDialog/responsiveDialog";
import { Button } from "@/components/ui/button/button";
import { reviewsCopy } from "@/config/reviews.config/reviews.config";

type ReviewSubmitDialogProps = {
  requestId: string;
  triggerLabel?: string;
  triggerVariant?: "primary" | "outline";
  triggerClassName?: string;
  onSubmitted?: (reviewId: string) => void;
};

export function ReviewSubmitDialog({
  requestId,
  triggerLabel = reviewsCopy.submitLabel,
  triggerVariant = "outline",
  triggerClassName,
  onSubmitted,
}: ReviewSubmitDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant={triggerVariant}
        className={triggerClassName}
        onClick={() => {
          setOpen(true);
        }}
      >
        {triggerLabel}
      </Button>
      <ResponsiveDialog
        open={open}
        title={reviewsCopy.submitTitle}
        description={reviewsCopy.submitDescription}
        onOpenChange={setOpen}
      >
        <ReviewSubmitForm
          requestId={requestId}
          onSuccess={(reviewId) => {
            setOpen(false);
            onSubmitted?.(reviewId);
          }}
        />
      </ResponsiveDialog>
    </>
  );
}
