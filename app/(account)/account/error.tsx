"use client";

import { StoreError } from "@/components/layout/storeError/storeError";

type AccountErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AccountError({ reset }: AccountErrorProps) {
  return <StoreError onRetry={reset} />;
}
