"use client";

import { StoreError } from "@/components/layout/storeError/storeError";

type FaqErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function FaqError({ reset }: FaqErrorProps) {
  return <StoreError onRetry={reset} />;
}
