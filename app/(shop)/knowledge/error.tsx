"use client";

import { StoreError } from "@/components/layout/storeError/storeError";

type KnowledgeErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function KnowledgeError({ reset }: KnowledgeErrorProps) {
  return <StoreError onRetry={reset} />;
}
