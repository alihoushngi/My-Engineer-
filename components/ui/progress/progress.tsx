"use client";

import { Progress as ProgressPrimitive } from "radix-ui";
import { type ComponentProps } from "react";
import { cn } from "@/lib/utils/cn/cn";

type ProgressProps = ComponentProps<typeof ProgressPrimitive.Root>;

export function Progress({ className, value, ...props }: ProgressProps) {
  const safeValue = value ?? 0;

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-primary/15",
        className,
      )}
      value={value}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full bg-primary transition-all duration-(--duration-normal)"
        style={{ width: `${safeValue}%` }}
      />
    </ProgressPrimitive.Root>
  );
}
