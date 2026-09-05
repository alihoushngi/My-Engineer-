import Link from "next/link";
import { Button } from "@/components/ui/button/button";
import {
  userAccountCopy,
  userAccountPaths,
} from "@/config/user-account.config/user-account.config";
import { siteConfig } from "@/config/site.config/site.config";

export function UserQuickActions() {
  return (
    <section className="flex flex-wrap gap-2">
      <Button asChild size="sm">
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
