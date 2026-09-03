"use client";

import { useMutation } from "@tanstack/react-query";

/**
 * Client mutation wrapper for documented service functions.
 * Does not invent endpoints. retry is off so failed OTP/registration
 * submits are not silently repeated.
 */
export function useApiMutation<TVariables, TData = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
) {
  return useMutation({
    mutationFn,
    retry: false,
  });
}
