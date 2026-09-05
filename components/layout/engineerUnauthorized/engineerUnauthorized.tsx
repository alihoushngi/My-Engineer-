import Link from "next/link";
import { CircleAlertIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { Button } from "@/components/ui/button/button";
import { BrandLogo } from "@/components/layout/brandLogo/brandLogo";
import { siteConfig } from "@/config/site.config/site.config";
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerAccessDenied } from "@/types/store/engineer.types";

type EngineerUnauthorizedProps = {
  access: EngineerAccessDenied;
};

export function EngineerUnauthorized({ access }: EngineerUnauthorizedProps) {
  const copy =
    access.kind === "unauthenticated"
      ? {
          title: engineerPanelCopy.unauthenticatedTitle,
          description: engineerPanelCopy.unauthenticatedDescription,
        }
      : access.kind === "forbidden"
        ? {
            title: engineerPanelCopy.forbiddenTitle,
            description: engineerPanelCopy.forbiddenDescription,
          }
        : {
            title: engineerPanelCopy.unavailableTitle,
            description: engineerPanelCopy.unavailableDescription,
          };

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="border-b border-border bg-surface px-4 py-3">
        <BrandLogo />
      </header>
      <main
        id="main-content"
        tabIndex={-1}
        className="container-narrow flex flex-1 flex-col justify-center gap-6 py-section outline-none"
      >
        <Alert variant="danger">
          <CircleAlertIcon />
          <AlertTitle>{copy.title}</AlertTitle>
          <AlertDescription>{copy.description}</AlertDescription>
        </Alert>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href={siteConfig.engineerLoginHref}>
              {engineerPanelCopy.loginCta}
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={siteConfig.joinHref}>{engineerPanelCopy.joinCta}</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href={siteConfig.homeHref}>{engineerPanelCopy.homeCta}</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
