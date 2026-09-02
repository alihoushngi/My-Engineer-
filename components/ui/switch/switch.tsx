"use client";

import { Switch as SwitchPrimitive } from "radix-ui";
import { type ComponentProps } from "react";
import { cn } from "@/lib/utils/cn/cn";

type SwitchProps = ComponentProps<typeof SwitchPrimitive.Root>;

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-transparent bg-input transition-colors duration-(--duration-fast) outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-5 rounded-full bg-background shadow-xs ring-0 transition-transform duration-(--duration-fast) data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 rtl:data-[state=checked]:-translate-x-5 rtl:data-[state=unchecked]:translate-x-0"
      />
    </SwitchPrimitive.Root>
  );
}
