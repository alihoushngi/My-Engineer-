import { type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn/cn";
import { Label } from "@/components/ui/label/label";

type FieldProps = ComponentProps<"div"> & {
  disabled?: boolean;
  invalid?: boolean;
};

export function Field({ className, disabled, invalid, ...props }: FieldProps) {
  return (
    <div
      data-slot="field"
      data-disabled={disabled || undefined}
      data-invalid={invalid || undefined}
      className={cn(
        "flex w-full flex-col gap-2 data-[disabled=true]:opacity-60",
        className,
      )}
      {...props}
    />
  );
}

type FieldLabelProps = ComponentProps<typeof Label> & {
  required?: boolean;
};

export function FieldLabel({
  className,
  required,
  children,
  ...props
}: FieldLabelProps) {
  return (
    <Label data-slot="field-label" className={cn(className)} {...props}>
      {children}
      {required ? (
        <>
          <span className="text-danger" aria-hidden="true">
            *
          </span>
          <span className="sr-only"> الزامی</span>
        </>
      ) : null}
    </Label>
  );
}

export function FieldDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn("type-body-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export function FieldError({
  className,
  children,
  ...props
}: ComponentProps<"p">) {
  if (!children) {
    return null;
  }

  return (
    <p
      role="alert"
      data-slot="field-error"
      className={cn("type-body-sm text-danger", className)}
      {...props}
    >
      {children}
    </p>
  );
}

type FieldHintProps = {
  className?: string;
  children: ReactNode;
};

export function FieldHint({ className, children }: FieldHintProps) {
  return (
    <p
      data-slot="field-hint"
      className={cn("type-caption text-muted-foreground", className)}
    >
      {children}
    </p>
  );
}
