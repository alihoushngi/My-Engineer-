"use client";

import { StoreError } from "@/components/layout/storeError/storeError";

type ExpertProfileErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ExpertProfileError({ reset }: ExpertProfileErrorProps) {
  return <StoreError onRetry={reset} />;
}
