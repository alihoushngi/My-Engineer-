"use client";

import { useSyncExternalStore } from "react";
import { CircleCheckIcon, InfoIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";

type InstallStatus = "browser" | "standalone" | "supported" | "unknown";

function subscribe() {
  return () => undefined;
}

function detectInstallStatus(): InstallStatus {
  const userAgent = window.navigator.userAgent;
  const isIOS =
    /iPad|iPhone|iPod/.test(userAgent) ||
    (window.navigator.platform === "MacIntel" &&
      window.navigator.maxTouchPoints > 1);
  const isSafari =
    /WebKit/.test(userAgent) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(userAgent);
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    Boolean(
      (window.navigator as Navigator & { standalone?: boolean }).standalone,
    );

  if (isStandalone) return "standalone";
  if (isIOS && !isSafari) return "browser";
  if (isIOS && isSafari) return "supported";
  return "unknown";
}

export function InstallStatusBanner() {
  const status = useSyncExternalStore(
    subscribe,
    detectInstallStatus,
    () => "unknown" as const,
  );

  if (status === "standalone") {
    return (
      <Alert variant="success">
        <CircleCheckIcon aria-hidden="true" />
        <AlertTitle>مهندس من به‌صورت مستقل باز شده است</AlertTitle>
        <AlertDescription>
          این نسخه از صفحه اصلی آیفون اجرا شده و نیازی به نصب دوباره ندارد.
        </AlertDescription>
      </Alert>
    );
  }

  if (status === "browser") {
    return (
      <Alert variant="info">
        <InfoIcon aria-hidden="true" />
        <AlertTitle>این صفحه را در Safari باز کنید</AlertTitle>
        <AlertDescription>
          برای افزودن مطمئن مهندس من به صفحه اصلی آیفون، نشانی همین صفحه را در
          Safari باز کنید و مراحل زیر را ادامه دهید.
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}
