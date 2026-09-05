import Link from "next/link";
import { engineerPanelPaths } from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerRequest } from "@/types/store/engineer.types";
import { requestStatusBadge } from "@/components/store/engineer/engineerStatusLabel/engineerStatusLabel";
import { Badge } from "@/components/ui/badge/badge";

type EngineerRequestRowProps = {
  request: EngineerRequest;
};

export function EngineerRequestRow({ request }: EngineerRequestRowProps) {
  const status = requestStatusBadge(request.status);

  return (
    <Link
      href={`${engineerPanelPaths.requests}/${request.id}`}
      className="flex flex-col gap-2 py-4 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:flex-row sm:items-start sm:justify-between"
    >
      <div className="min-w-0 space-y-1">
        <p className="type-body font-medium text-foreground">{request.title}</p>
        <p className="type-body-sm text-muted-foreground">{request.summary}</p>
        <p className="type-caption text-muted-foreground">
          {[request.serviceLabel, request.city, request.createdAtLabel]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        {request.isNew ? <Badge variant="info">جدید</Badge> : null}
        <Badge variant={status.variant}>{status.label}</Badge>
      </div>
    </Link>
  );
}
