import Link from "next/link";
import { Empty } from "@/components/ui/empty/empty";
import { Button } from "@/components/ui/button/button";
import {
  engineerPanelCopy,
  engineerPanelPaths,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerRequest } from "@/types/store/engineer.types";
import { EngineerRequestRow } from "@/components/store/engineer/engineerRequestRow/engineerRequestRow";

type EngineerRecentRequestsProps = {
  requests: readonly EngineerRequest[];
};

export function EngineerRecentRequests({
  requests,
}: EngineerRecentRequestsProps) {
  const items = requests.slice(0, 3);

  return (
    <section className="rounded-lg border border-border bg-surface p-(--space-card)">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="type-h4 text-foreground">
          {engineerPanelCopy.recentRequests}
        </h2>
        <Button asChild variant="link" size="sm">
          <Link href={engineerPanelPaths.requests}>
            {engineerPanelCopy.viewAll}
          </Link>
        </Button>
      </div>
      {items.length === 0 ? (
        <Empty title={engineerPanelCopy.emptyRequests} className="py-8" />
      ) : (
        <ul className="divide-y divide-border">
          {items.map((request) => (
            <li key={request.id}>
              <EngineerRequestRow request={request} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
