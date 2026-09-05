import Link from "next/link";
import { EngineerPageHeader } from "@/components/store/engineer/engineerPageHeader/engineerPageHeader";
import { requestStatusBadge } from "@/components/store/engineer/engineerStatusLabel/engineerStatusLabel";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { InfoIcon } from "lucide-react";
import {
  engineerPageTitles,
  engineerPanelCopy,
  engineerPanelPaths,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerRequest } from "@/types/store/engineer.types";

type EngineerRequestDetailPageProps = {
  request: EngineerRequest;
};

export function EngineerRequestDetailPage({
  request,
}: EngineerRequestDetailPageProps) {
  const status = requestStatusBadge(request.status);

  return (
    <div className="flex flex-col gap-6">
      <EngineerPageHeader
        title={request.title}
        breadcrumbs={[
          {
            label: engineerPageTitles.dashboard,
            href: engineerPanelPaths.dashboard,
          },
          {
            label: engineerPageTitles.requests,
            href: engineerPanelPaths.requests,
          },
          { label: engineerPageTitles.requestDetail },
        ]}
      />
      <article className="space-y-5 rounded-lg border border-border bg-surface p-(--space-card)">
        <div className="flex flex-wrap gap-2">
          {request.isNew ? <Badge variant="info">جدید</Badge> : null}
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>
        <dl className="grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="type-caption text-muted-foreground">خدمت</dt>
            <dd className="type-body">{request.serviceLabel}</dd>
          </div>
          {request.city ? (
            <div>
              <dt className="type-caption text-muted-foreground">شهر</dt>
              <dd className="type-body">{request.city}</dd>
            </div>
          ) : null}
          <div>
            <dt className="type-caption text-muted-foreground">تاریخ</dt>
            <dd className="type-body">{request.createdAtLabel}</dd>
          </div>
          {request.customerDisplayName ? (
            <div>
              <dt className="type-caption text-muted-foreground">متقاضی</dt>
              <dd className="type-body">{request.customerDisplayName}</dd>
            </div>
          ) : null}
        </dl>
        <p className="type-body leading-loose text-foreground">
          {request.description ?? request.summary}
        </p>
        {request.conversationId ? (
          <Button asChild>
            <Link
              href={`${engineerPanelPaths.messages}/${request.conversationId}`}
            >
              {engineerPanelCopy.startConversationCta}
            </Link>
          </Button>
        ) : null}
      </article>
      <Alert variant="info">
        <InfoIcon />
        <AlertTitle>اقدامات درخواست</AlertTitle>
        <AlertDescription>
          {engineerPanelCopy.requestActionsUnavailable}
        </AlertDescription>
      </Alert>
    </div>
  );
}
