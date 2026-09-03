"use client";

import { StoreError } from "@/components/layout/storeError/storeError";

type AuthErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AuthError({ reset }: AuthErrorProps) {
  return <StoreError onRetry={reset} />;
}
