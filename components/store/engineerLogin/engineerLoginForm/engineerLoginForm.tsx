"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs/tabs";
import { EngineerOtpLoginForm } from "@/components/store/engineerLogin/engineerOtpLoginForm/engineerOtpLoginForm";
import { EngineerPasswordLoginForm } from "@/components/store/engineerLogin/engineerPasswordLoginForm/engineerPasswordLoginForm";
import { EngineerLoginRegisterCrossLink } from "@/components/store/engineerLogin/engineerLoginRegisterCrossLink/engineerLoginRegisterCrossLink";
import { MockModeBadge } from "@/components/store/engineerLogin/mockModeBadge/mockModeBadge";
import { engineerLoginCopy } from "@/config/engineer-login.config/engineer-login.config";

type EngineerLoginFormProps = {
  nextPath: string;
  isMockMode: boolean;
};

export function EngineerLoginForm({
  nextPath,
  isMockMode,
}: EngineerLoginFormProps) {
  return (
    <div className="mx-auto w-full max-w-md space-y-8 rounded-xl border border-border bg-surface p-5 shadow-lg sm:p-8">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="type-h1 text-foreground">{engineerLoginCopy.title}</h1>
          <MockModeBadge visible={isMockMode} />
        </div>
        <p className="type-body text-muted-foreground">
          {engineerLoginCopy.description}
        </p>
      </div>
      <Tabs defaultValue="otp" className="gap-5">
        <TabsList className="grid h-auto w-full grid-cols-2">
          <TabsTrigger value="otp" className="min-h-11 whitespace-normal">
            {engineerLoginCopy.otpMethod}
          </TabsTrigger>
          <TabsTrigger value="password" className="min-h-11 whitespace-normal">
            {engineerLoginCopy.passwordMethod}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="otp">
          <EngineerOtpLoginForm nextPath={nextPath} />
        </TabsContent>
        <TabsContent value="password">
          <EngineerPasswordLoginForm nextPath={nextPath} />
        </TabsContent>
      </Tabs>
      <div className="space-y-3 border-t border-border pt-5">
        <EngineerLoginRegisterCrossLink />
        {isMockMode ? (
          <p className="type-caption text-center text-muted-foreground">
            {engineerLoginCopy.mockModeHint}
          </p>
        ) : null}
      </div>
    </div>
  );
}
