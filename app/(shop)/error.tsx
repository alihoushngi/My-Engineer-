"use client";

import { StoreError } from "@/components/layout/storeError/storeError";

type ShopErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ShopError({ reset }: ShopErrorProps) {
  return <StoreError onRetry={reset} />;
}
