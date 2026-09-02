import { type ComponentProps } from "react";
import { cn } from "@/lib/utils/cn/cn";

type InputProps = ComponentProps<"input">;

export function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-md border border-input bg-input-background px-3 text-body shadow-xs transition-colors duration-(--duration-fast) outline-none placeholder:text-muted-foreground file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-body-sm file:font-medium file:text-foreground disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40",
        "aria-invalid:border-danger aria-invalid:ring-2 aria-invalid:ring-danger/20",
        className,
      )}
      {...props}
    />
  );
}
