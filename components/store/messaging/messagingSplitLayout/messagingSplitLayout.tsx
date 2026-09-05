import { type ReactNode } from "react";

type MessagingSplitLayoutProps = {
  sidebar: ReactNode;
  children: ReactNode;
};

export function MessagingSplitLayout({
  sidebar,
  children,
}: MessagingSplitLayoutProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 lg:grid lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-stretch">
      <aside className="hidden min-h-0 overflow-y-auto rounded-lg border border-border bg-surface px-(--space-card) lg:block">
        <ul className="divide-y divide-border">{sidebar}</ul>
      </aside>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
