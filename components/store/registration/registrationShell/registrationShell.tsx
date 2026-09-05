"use client";

import { type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { CheckIcon } from "lucide-react";
import {
  registrationCopy,
  REGISTRATION_STEPS,
} from "@/config/registration.config/registration.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { cn } from "@/lib/utils/cn/cn";

type RegistrationShellProps = { children: ReactNode };

export function RegistrationShell({ children }: RegistrationShellProps) {
  const pathname = usePathname();
  const current = REGISTRATION_STEPS.find((step) => step.path === pathname);

  return (
    <div className="mx-auto grid w-full max-w-5xl items-stretch overflow-hidden rounded-xl border border-border bg-surface shadow-lg lg:grid-cols-[17rem_minmax(0,1fr)]">
      <aside
        className="hidden bg-primary-deep p-7 text-primary-foreground lg:block"
        aria-label="مراحل ثبت‌نام"
      >
        <p className="mb-2 type-label text-primary">پروفایل حرفه‌ای</p>
        <p className="mb-7 type-h3">{registrationCopy.wizardTitle}</p>
        <ol className="space-y-1">
          {REGISTRATION_STEPS.map((step) => {
            const active = step.index === current?.index;
            const passed = current
              ? step.index < current.index
              : pathname.endsWith("/complete");
            return (
              <li
                key={step.index}
                aria-current={active ? "step" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-3 type-body-sm",
                  active
                    ? "bg-primary-foreground/10 font-semibold text-primary-foreground"
                    : "text-primary-foreground/55",
                )}
              >
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full border type-caption tabular-nums",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-primary-foreground/25",
                  )}
                >
                  {passed ? (
                    <CheckIcon className="size-4" aria-hidden="true" />
                  ) : (
                    formatFaNumber(step.index)
                  )}
                </span>
                {step.label}
              </li>
            );
          })}
        </ol>
      </aside>
      <div className="min-w-0 bg-surface p-5 sm:p-9 lg:p-12">
        <h1 className="mb-7 type-h1 text-foreground">
          {registrationCopy.wizardTitle}
        </h1>
        {children}
      </div>
    </div>
  );
}
