"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { logoutUser } from "@/services/user-auth-service/user-auth-service";
import { userAuthCopy } from "@/config/user-auth.config/user-auth.config";
import { siteConfig } from "@/config/site.config/site.config";

export function useUserLogout() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const mutation = useApiMutation(logoutUser);

  async function logout() {
    setError(null);

    try {
      await mutation.mutateAsync();
      router.replace(siteConfig.homeHref);
      router.refresh();
    } catch (err) {
      setError(toUserErrorMessage(err, userAuthCopy.logoutUnavailable));
    }
  }

  return {
    logout,
    error,
    isPending: mutation.isPending,
  };
}
