"use client";

import { StoreError } from "@/components/layout/storeError/storeError";

type ServiceDiscoveryErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ServiceDiscoveryError({
  reset,
}: ServiceDiscoveryErrorProps) {
  return <StoreError onRetry={reset} />;
}
