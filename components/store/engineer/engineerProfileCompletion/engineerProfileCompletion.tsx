import Link from "next/link";
import { Progress } from "@/components/ui/progress/progress";
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { type ProfileCompletion } from "@/types/store/engineer.types";
import { cn } from "@/lib/utils/cn/cn";

type EngineerProfileCompletionProps = {
  completion: ProfileCompletion;
};

export function EngineerProfileCompletion({
  completion,
}: EngineerProfileCompletionProps) {
  return (
    <section className="rounded-lg border border-border bg-surface p-(--space-card)">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1">
          <h2 className="type-h4 text-foreground">
            {engineerPanelCopy.completionTitle}
          </h2>
          <p className="type-caption text-muted-foreground">
            {engineerPanelCopy.completionHint}
          </p>
        </div>
        <p className="type-h3 text-foreground">
          {formatFaNumber(completion.percent)}٪
        </p>
      </div>
      <Progress
        value={completion.percent}
        aria-label={engineerPanelCopy.completionTitle}
      />
      <ul className="mt-5 divide-y divide-border">
        {completion.items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className={cn(
                "flex min-h-11 items-center justify-between gap-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-ring",
                item.complete ? "text-muted-foreground" : "text-foreground",
              )}
            >
              <span className="type-body-sm">{item.label}</span>
              <span className="type-caption">
                {item.complete ? "انجام شده" : "ناتمام"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
