"use client";

import { StoreError } from "@/components/layout/storeError/storeError";

type FaqCategoryErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function FaqCategoryError({ reset }: FaqCategoryErrorProps) {
  return <StoreError onRetry={reset} />;
}
