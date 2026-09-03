"use client";

import { StoreError } from "@/components/layout/storeError/storeError";

type ArticleCategoryErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ArticleCategoryError({
  reset,
}: ArticleCategoryErrorProps) {
  return <StoreError onRetry={reset} />;
}
