import { EngineerPageHeader } from "@/components/store/engineer/engineerPageHeader/engineerPageHeader";
import { credentialStatusBadge } from "@/components/store/engineer/engineerStatusLabel/engineerStatusLabel";
import { Badge } from "@/components/ui/badge/badge";
import { Empty } from "@/components/ui/empty/empty";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { InfoIcon } from "lucide-react";
import {
  engineerPageTitles,
  engineerPanelCopy,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerWorkspace } from "@/types/store/engineer.types";

type EngineerCredentialsPageProps = {
  workspace: EngineerWorkspace;
};

export function EngineerCredentialsPage({
  workspace,
}: EngineerCredentialsPageProps) {
  const { credentials, profile } = workspace;

  return (
    <div className="flex flex-col gap-6">
      <EngineerPageHeader
        title={engineerPageTitles.credentials}
        description="تحصیلات، نظام مهندسی و مدارک حرفه‌ای. فایل خام مدارک در صفحات عمومی نمایش داده نمی‌شود."
      />
      <Alert variant="info">
        <InfoIcon />
        <AlertTitle>حریم مدارک</AlertTitle>
        <AlertDescription>
          {engineerPanelCopy.documentPrivateNote}
        </AlertDescription>
      </Alert>
      {profile.education.length > 0 ? (
        <section className="rounded-lg border border-border bg-surface p-(--space-card)">
          <h2 className="mb-3 type-h4">تحصیلات</h2>
          <ul className="space-y-2">
            {profile.education.map((item) => (
              <li
                key={`${item.degree}-${item.field ?? ""}`}
                className="type-body"
              >
                {[item.degree, item.field, item.institution]
                  .filter(Boolean)
                  .join("، ")}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {credentials.length === 0 ? (
        <Empty title={engineerPanelCopy.emptyCredentials} />
      ) : (
        <ul className="space-y-3">
          {credentials.map((item) => {
            const status = credentialStatusBadge(item.status);

            return (
              <li
                key={item.id}
                className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-(--space-card) sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="space-y-1">
                  <h2 className="type-h4">{item.title}</h2>
                  {item.description ? (
                    <p className="type-body-sm text-muted-foreground">
                      {item.description}
                    </p>
                  ) : null}
                  <p className="type-caption text-muted-foreground">
                    {item.hasDocument
                      ? "پرونده ارسال شده است"
                      : "پرونده‌ای پیوست نشده است"}
                  </p>
                </div>
                <Badge variant={status.variant}>{status.label}</Badge>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
