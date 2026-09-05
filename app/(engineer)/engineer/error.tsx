"use client";

import { StoreError } from "@/components/layout/storeError/storeError";

type EngineerErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function EngineerError({ reset }: EngineerErrorProps) {
  return <StoreError onRetry={reset} />;
}
