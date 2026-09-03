import Link from "next/link";
import { CheckCircleIcon } from "lucide-react";
import { Empty } from "@/components/ui/empty/empty";
import { Button } from "@/components/ui/button/button";
import { registrationCopy } from "@/config/registration.config/registration.config";
import { siteConfig } from "@/config/site.config/site.config";

export function RegistrationComplete() {
  return (
    <div className="space-y-8">
      <Empty
        icon={<CheckCircleIcon aria-hidden="true" />}
        title={registrationCopy.completeTitle}
        description={registrationCopy.completeDescription}
        action={
          <Button asChild>
            <Link href={siteConfig.homeHref}>
              {registrationCopy.completeHomeCta}
            </Link>
          </Button>
        }
      />
      <p className="text-center type-caption text-muted-foreground">
        {registrationCopy.completeDestinationNote}
      </p>
    </div>
  );
}
