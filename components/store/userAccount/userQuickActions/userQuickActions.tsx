import Link from "next/link";
import { RequestCreateDialog } from "@/components/store/marketplace/requestCreateDialog/requestCreateDialog";
import { Button } from "@/components/ui/button/button";
import {
  userAccountCopy,
  userAccountPaths,
} from "@/config/user-account.config/user-account.config";
import { siteConfig } from "@/config/site.config/site.config";
import { type City } from "@/types/store/registration.types";
import { type RequestExpertOption } from "@/types/store/service-request.types";

type UserQuickActionsProps = {
  experts: readonly RequestExpertOption[];
  cities: readonly City[];
  defaultCityId?: string;
};

export function UserQuickActions({
  experts,
  cities,
  defaultCityId,
}: UserQuickActionsProps) {
  return (
    <section className="flex flex-wrap gap-2">
      <RequestCreateDialog
        experts={experts}
        cities={cities}
        isUserAuthenticated
        nextPath={userAccountPaths.dashboard}
        defaultCityId={defaultCityId}
        triggerSize="sm"
      />
      <Button asChild variant="outline" size="sm">
        <Link href={siteConfig.homeHref}>{userAccountCopy.findExpert}</Link>
      </Button>
      <Button asChild variant="outline" size="sm">
        <Link href={userAccountPaths.messages}>
          {userAccountCopy.viewMessages}
        </Link>
      </Button>
      <Button asChild variant="outline" size="sm">
        <Link href={userAccountPaths.saved}>{userAccountCopy.viewSaved}</Link>
      </Button>
    </section>
  );
}
