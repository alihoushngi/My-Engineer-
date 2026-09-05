import Link from "next/link";
import { Button } from "@/components/ui/button/button";
import {
  engineerPanelCopy,
  engineerPanelPaths,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerWorkspace } from "@/types/store/engineer.types";

type EngineerQuickActionsProps = {
  workspace: EngineerWorkspace;
};

export function EngineerQuickActions({ workspace }: EngineerQuickActionsProps) {
  const publicHref = workspace.account.publicExpertId
    ? `/experts/${workspace.account.publicExpertId}`
    : undefined;

  return (
    <section className="flex flex-wrap gap-2">
      <Button asChild variant="outline" size="sm">
        <Link href={engineerPanelPaths.profile}>
          {engineerPanelCopy.quickEditProfile}
        </Link>
      </Button>
      <Button asChild variant="outline" size="sm">
        <Link href={engineerPanelPaths.portfolio}>
          {engineerPanelCopy.quickAddPortfolio}
        </Link>
      </Button>
      <Button asChild variant="outline" size="sm">
        <Link href={engineerPanelPaths.serviceAreas}>
          {engineerPanelCopy.quickServiceAreas}
        </Link>
      </Button>
      <Button asChild variant="outline" size="sm">
        <Link href={engineerPanelPaths.requests}>
          {engineerPanelCopy.quickRequests}
        </Link>
      </Button>
      {publicHref ? (
        <Button asChild variant="outline" size="sm">
          <Link href={publicHref}>{engineerPanelCopy.publicProfileLabel}</Link>
        </Button>
      ) : null}
    </section>
  );
}
