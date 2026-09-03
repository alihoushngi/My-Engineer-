"use client";

import { StoreError } from "@/components/layout/storeError/storeError";

type KnowledgeCategoryErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function KnowledgeCategoryError({
  reset,
}: KnowledgeCategoryErrorProps) {
  return <StoreError onRetry={reset} />;
}
