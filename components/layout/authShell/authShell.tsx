import { type ReactNode } from "react";
import { AuthFooter } from "@/components/layout/authFooter/authFooter";
import { AuthHeader } from "@/components/layout/authHeader/authHeader";
import { SkipLink } from "@/components/layout/skipLink/skipLink";

type AuthShellProps = {
  children: ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <SkipLink />
      <AuthHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-1 items-center justify-center py-page outline-none"
      >
        <div className="container-form w-full">{children}</div>
      </main>
      <AuthFooter />
    </div>
  );
}
