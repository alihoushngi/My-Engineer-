"use client";

import { OTPInput, type SlotProps } from "input-otp";
import { useState, type ComponentProps } from "react";
import { cn } from "@/lib/utils/cn/cn";
import {
  LOCAL_DIGIT_PATTERN,
  toLatinDigits,
} from "@/lib/utils/to-latin-digits/to-latin-digits";

type OtpInputProps = Omit<
  ComponentProps<typeof OTPInput>,
  "maxLength" | "children" | "render" | "textAlign"
> & {
  length: number;
  invalid?: boolean;
};

function OtpSlot({
  char,
  isActive,
  hasFakeCaret,
  invalid,
}: SlotProps & { invalid: boolean }) {
  return (
    <div
      data-slot="otp-input-slot"
      data-active={isActive || undefined}
      data-filled={char ? true : undefined}
      className={cn(
        "relative flex h-12 min-w-10 flex-1 items-center justify-center rounded-md border bg-input-background type-h3 font-medium tabular-nums shadow-xs transition-colors",
        "border-border text-foreground",
        "data-[filled=true]:border-border-strong",
        "data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-2 data-[active=true]:ring-ring/30",
        invalid &&
          "border-danger data-[active=true]:border-danger data-[active=true]:ring-danger/20",
      )}
    >
      {char}
      {hasFakeCaret ? (
        <span className="pointer-events-none absolute inset-y-3 start-1/2 w-px -translate-x-1/2 bg-foreground motion-reduce:animate-none animate-pulse" />
      ) : null}
    </div>
  );
}

export function OtpInput({
  length,
  invalid = false,
  className,
  containerClassName,
  disabled,
  value,
  defaultValue,
  onChange,
  pasteTransformer,
  ...props
}: OtpInputProps) {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(() =>
    toLatinDigits(String(defaultValue ?? "")),
  );
  const currentValue = isControlled ? toLatinDigits(value) : uncontrolledValue;

  function handleChange(next: string) {
    const latin = toLatinDigits(next);

    if (!isControlled) {
      setUncontrolledValue(latin);
    }

    onChange?.(latin);
  }

  return (
    <OTPInput
      data-slot="otp-input"
      maxLength={length}
      textAlign="left"
      inputMode="numeric"
      autoComplete="one-time-code"
      pattern={LOCAL_DIGIT_PATTERN}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      pushPasswordManagerStrategy="none"
      value={currentValue}
      containerClassName={cn(
        "flex w-full max-w-sm justify-center has-disabled:opacity-50",
        containerClassName,
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
      dir="ltr"
      onChange={handleChange}
      pasteTransformer={(pasted) =>
        toLatinDigits(pasteTransformer ? pasteTransformer(pasted) : pasted)
      }
      render={({ slots }) => (
        <div
          dir="ltr"
          className="flex w-full flex-row gap-2"
          style={{ direction: "ltr" }}
        >
          {slots.map((slot, index) => (
            <OtpSlot key={index} {...slot} invalid={invalid} />
          ))}
        </div>
      )}
    />
  );
}

export type { OtpInputProps };
