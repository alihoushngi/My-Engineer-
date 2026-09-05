import Link from "next/link";
import { CheckCircleIcon } from "lucide-react";
import { Empty } from "@/components/ui/empty/empty";
import { Button } from "@/components/ui/button/button";
import { registrationCopy } from "@/config/registration.config/registration.config";
import { engineerPanelPaths } from "@/config/engineer-panel.config/engineer-panel.config";
import { siteConfig } from "@/config/site.config/site.config";

export function RegistrationComplete() {
  return (
    <div className="space-y-8 border-t border-border pt-8">
      <Empty
        icon={<CheckCircleIcon aria-hidden="true" className="text-success" />}
        title={registrationCopy.completeTitle}
        description={registrationCopy.completeDescription}
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href={siteConfig.homeHref}>
                {registrationCopy.completeHomeCta}
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={engineerPanelPaths.dashboard}>
                {registrationCopy.completeWorkspaceCta}
              </Link>
            </Button>
          </div>
        }
      />
    </div>
  );
}
