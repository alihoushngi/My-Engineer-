"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import { useContext, type ComponentProps } from "react";
import { cn } from "@/lib/utils/cn/cn";

export function OtpInput({
  className,
  containerClassName,
  ...props
}: ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="otp-input"
      dir="ltr"
      containerClassName={cn(
        "ltr-data flex items-center justify-center gap-2 has-disabled:opacity-50",
        containerClassName,
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

export function OtpInputGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="otp-input-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  );
}

export function OtpInputSlot({
  index,
  className,
  ...props
}: ComponentProps<"div"> & { index: number }) {
  const inputOTPContext = useContext(OTPInputContext);
  const slot = inputOTPContext?.slots[index];
  const char = slot?.char;
  const hasFakeCaret = slot?.hasFakeCaret;
  const isActive = slot?.isActive;

  return (
    <div
      data-slot="otp-input-slot"
      data-active={isActive}
      className={cn(
        "relative flex size-11 items-center justify-center border border-input bg-input-background text-body shadow-xs outline-none transition-colors first:rounded-s-md last:rounded-e-md",
        "data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-2 data-[active=true]:ring-ring/40",
        "aria-invalid:border-danger data-[active=true]:aria-invalid:ring-danger/20",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-pulse bg-foreground" />
        </div>
      ) : null}
    </div>
  );
}
