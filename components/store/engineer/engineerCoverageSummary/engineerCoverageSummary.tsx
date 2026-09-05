import Link from "next/link";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import {
  engineerPanelCopy,
  engineerPanelPaths,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerWorkspace } from "@/types/store/engineer.types";
import { deriveProfileCompletion } from "@/lib/engineer/profile-completion/profile-completion";

type EngineerCoverageSummaryProps = {
  workspace: EngineerWorkspace;
};

export function EngineerCoverageSummary({
  workspace,
}: EngineerCoverageSummaryProps) {
  const completion = deriveProfileCompletion(workspace);
  const activeServices = workspace.services.filter(
    (service) => service.isListedOnProfile,
  ).length;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <section className="rounded-lg border border-border bg-surface p-(--space-card)">
        <h2 className="mb-3 type-h4 text-foreground">
          {engineerPanelCopy.portfolioStatus}
        </h2>
        <p className="type-body text-muted-foreground">
          {formatFaNumber(workspace.portfolio.length)} نمونه‌کار در پروفایل
        </p>
        <Link
          href={engineerPanelPaths.portfolio}
          className="mt-3 inline-flex min-h-11 items-center type-body-sm text-primary outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {engineerPanelCopy.viewAll}
        </Link>
      </section>
      <section className="rounded-lg border border-border bg-surface p-(--space-card)">
        <h2 className="mb-3 type-h4 text-foreground">
          {engineerPanelCopy.serviceCoverage}
        </h2>
        <p className="type-body text-muted-foreground">
          {formatFaNumber(activeServices)} خدمت فعال ·{" "}
          {formatFaNumber(completion.percent)}٪ تکمیل پروفایل
        </p>
        <Link
          href={engineerPanelPaths.services}
          className="mt-3 inline-flex min-h-11 items-center type-body-sm text-primary outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {engineerPanelCopy.viewAll}
        </Link>
      </section>
    </div>
  );
}
