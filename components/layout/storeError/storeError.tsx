"use client";

import Link from "next/link";
import { CircleAlertIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { Button } from "@/components/ui/button/button";
import { siteConfig } from "@/config/site.config/site.config";

type StoreErrorProps = {
  onRetry: () => void;
};

export function StoreError({ onRetry }: StoreErrorProps) {
  return (
    <div className="container-narrow min-h-[50dvh] flex flex-col gap-6 py-section">
      <Alert variant="danger">
        <CircleAlertIcon />
        <AlertTitle>بارگذاری صفحه با مشکل مواجه شد</AlertTitle>
        <AlertDescription>
          لطفاً دوباره تلاش کنید یا به صفحه اصلی برگردید.
        </AlertDescription>
      </Alert>
      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={onRetry}>
          تلاش دوباره
        </Button>
        <Button asChild variant="outline">
          <Link href={siteConfig.homeHref}>بازگشت به خانه</Link>
        </Button>
      </div>
    </div>
  );
}
