import { type ReactNode } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs/tabs";

type AuthLoginMethodsProps = {
  otpLabel: string;
  passwordLabel: string;
  otp: ReactNode;
  password: ReactNode;
};

export function AuthLoginMethods({
  otpLabel,
  passwordLabel,
  otp,
  password,
}: AuthLoginMethodsProps) {
  return (
    <Tabs defaultValue="otp" className="gap-5">
      <TabsList className="grid h-auto w-full grid-cols-2">
        <TabsTrigger value="otp" className="min-h-11 whitespace-normal">
          {otpLabel}
        </TabsTrigger>
        <TabsTrigger value="password" className="min-h-11 whitespace-normal">
          {passwordLabel}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="otp">{otp}</TabsContent>
      <TabsContent value="password">{password}</TabsContent>
    </Tabs>
  );
}
