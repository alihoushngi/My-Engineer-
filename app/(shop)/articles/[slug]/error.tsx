"use client";

import { StoreError } from "@/components/layout/storeError/storeError";

type ArticleDetailErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ArticleDetailError({ reset }: ArticleDetailErrorProps) {
  return <StoreError onRetry={reset} />;
}
