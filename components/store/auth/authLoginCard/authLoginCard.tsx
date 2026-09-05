import { type ReactNode } from "react";
import { MockModeBadge } from "@/components/store/auth/mockModeBadge/mockModeBadge";
import { authUiCopy } from "@/config/auth-ui.config/auth-ui.config";

type AuthLoginCardProps = {
  title: string;
  description: string;
  isMockMode: boolean;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthLoginCard({
  title,
  description,
  isMockMode,
  children,
  footer,
}: AuthLoginCardProps) {
  return (
    <div className="mx-auto w-full max-w-md space-y-8 rounded-xl border border-border bg-surface p-5 shadow-lg sm:p-8">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="type-h1 text-foreground">{title}</h1>
          <MockModeBadge visible={isMockMode} />
        </div>
        <p className="type-body text-muted-foreground">{description}</p>
      </div>
      {children}
      {footer ? (
        <div className="space-y-3 border-t border-border pt-5">
          {footer}
          {isMockMode ? (
            <p className="type-caption text-center text-muted-foreground">
              {authUiCopy.mockModeHint}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
