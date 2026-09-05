import Link from "next/link";
import { AccountPageHeader } from "@/components/store/userAccount/accountPageHeader/accountPageHeader";
import { UserRequestStatusBadge } from "@/components/store/userAccount/userRequestStatusBadge/userRequestStatusBadge";
import { StartConversationButton } from "@/components/store/messaging/startConversationButton/startConversationButton";
import { Button } from "@/components/ui/button/button";
import {
  userAccountCopy,
  userAccountPaths,
} from "@/config/user-account.config/user-account.config";
import { type UserRequest } from "@/types/store/user-account.types";

type UserRequestDetailPageProps = {
  request: UserRequest;
};

export function UserRequestDetailPage({ request }: UserRequestDetailPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeader
        title={request.title}
        description={userAccountCopy.requestDetailDescription}
      />
      <article className="space-y-5 rounded-lg border border-border bg-surface p-(--space-card)">
        <UserRequestStatusBadge status={request.status} />
        <dl className="grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="type-caption text-muted-foreground">خدمت</dt>
            <dd className="type-body">{request.serviceLabel}</dd>
          </div>
          <div>
            <dt className="type-caption text-muted-foreground">
              {userAccountCopy.relatedExpert}
            </dt>
            <dd className="type-body">
              <Link
                href={request.expertHref}
                className="text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
              >
                {request.expertName}
              </Link>
            </dd>
          </div>
          {request.city ? (
            <div>
              <dt className="type-caption text-muted-foreground">
                {userAccountCopy.cityLabel}
              </dt>
              <dd className="type-body">{request.city}</dd>
            </div>
          ) : null}
          <div>
            <dt className="type-caption text-muted-foreground">تاریخ</dt>
            <dd className="type-body">{request.createdAtLabel}</dd>
          </div>
          {request.latestActivityLabel ? (
            <div>
              <dt className="type-caption text-muted-foreground">
                آخرین فعالیت
              </dt>
              <dd className="type-body">{request.latestActivityLabel}</dd>
            </div>
          ) : null}
        </dl>
        <p className="type-body leading-loose text-foreground">
          {request.description ?? request.summary}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href={request.expertHref}>
              {userAccountCopy.openPublicProfile}
            </Link>
          </Button>
          {request.conversationId ? (
            <Button asChild>
              <Link
                href={`${userAccountPaths.messages}/${request.conversationId}`}
              >
                {userAccountCopy.openConversation}
              </Link>
            </Button>
          ) : null}
        </div>
      </article>
      {!request.conversationId ? (
        <StartConversationButton
          expertId={request.expertId}
          isUserAuthenticated
        />
      ) : null}
    </div>
  );
}
