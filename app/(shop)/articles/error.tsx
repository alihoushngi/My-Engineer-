"use client";

import { StoreError } from "@/components/layout/storeError/storeError";

type ArticlesErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ArticlesError({ reset }: ArticlesErrorProps) {
  return <StoreError onRetry={reset} />;
}
