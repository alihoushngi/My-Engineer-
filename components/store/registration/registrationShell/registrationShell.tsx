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
    <div className="mx-auto grid w-full max-w-4xl items-start gap-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
      <aside className="hidden py-6 lg:block" aria-label="مراحل ثبت‌نام">
        <p className="mb-6 type-h3">{registrationCopy.wizardTitle}</p>
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
                    ? "bg-primary-subtle font-semibold text-primary"
                    : "text-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full border type-caption tabular-nums",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border-strong",
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
      <div className="min-w-0 rounded-lg bg-surface p-5 sm:p-8 lg:p-10">
        <h1 className="mb-7 type-h2 text-foreground">
          {registrationCopy.wizardTitle}
        </h1>
        {children}
      </div>
    </div>
  );
}
