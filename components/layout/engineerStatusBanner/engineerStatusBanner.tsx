import Link from "next/link";
import { InfoIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { Button } from "@/components/ui/button/button";
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerShellData } from "@/types/store/engineer.types";

type EngineerStatusBannerProps = {
  shell: EngineerShellData;
};

export function EngineerStatusBanner({ shell }: EngineerStatusBannerProps) {
  if (shell.accessKind === "visual_review") {
    return (
      <Alert variant="warning">
        <InfoIcon />
        <AlertTitle>{engineerPanelCopy.visualReviewTitle}</AlertTitle>
        <AlertDescription>
          {engineerPanelCopy.visualReviewDescription}
        </AlertDescription>
      </Alert>
    );
  }

  if (shell.accessKind === "registration_in_progress") {
    return (
      <Alert variant="warning">
        <InfoIcon />
        <AlertTitle>{engineerPanelCopy.incompleteRegistrationTitle}</AlertTitle>
        <AlertDescription>
          <p>{engineerPanelCopy.incompleteRegistrationDescription}</p>
          {shell.continueRegistrationPath ? (
            <Button asChild size="sm" className="mt-3">
              <Link href={shell.continueRegistrationPath}>
                {engineerPanelCopy.continueRegistrationLabel}
              </Link>
            </Button>
          ) : null}
        </AlertDescription>
      </Alert>
    );
  }

  if (shell.accessKind === "pending_review") {
    return (
      <Alert variant="info">
        <InfoIcon />
        <AlertTitle>{engineerPanelCopy.pendingReviewTitle}</AlertTitle>
        <AlertDescription>
          {engineerPanelCopy.pendingReviewDescription}
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}
