import { Loader2Icon } from "lucide-react";
import { type ComponentProps } from "react";
import { cn } from "@/lib/utils/cn/cn";

type SpinnerProps = ComponentProps<"svg">;

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <Loader2Icon
      role="status"
      aria-label="در حال بارگذاری"
      className={cn(
        "size-4 animate-spin motion-reduce:animate-none",
        className,
      )}
      {...props}
    />
  );
}
