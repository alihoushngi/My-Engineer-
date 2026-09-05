import { type ComponentProps } from "react";
import { cn } from "@/lib/utils/cn/cn";

type GlassInfoCardProps = ComponentProps<"div">;

export function GlassInfoCard({ className, ...props }: GlassInfoCardProps) {
  return (
    <div
      className={cn(
        "glass-card flex h-full flex-col rounded-xl p-4 text-foreground",
        className,
      )}
      {...props}
    />
  );
}
