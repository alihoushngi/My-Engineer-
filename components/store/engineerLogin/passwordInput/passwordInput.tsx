"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { forwardRef, useState, type ComponentProps } from "react";
import { Input } from "@/components/ui/input/input";
import { engineerLoginCopy } from "@/config/engineer-login.config/engineer-login.config";
import { cn } from "@/lib/utils/cn/cn";

type PasswordInputProps = Omit<ComponentProps<typeof Input>, "type">;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({ className, ...props }, ref) {
    const [visible, setVisible] = useState(false);

    return (
      <div className="relative">
        <Input
          {...props}
          ref={ref}
          type={visible ? "text" : "password"}
          autoComplete="current-password"
          className={cn("pe-12", className)}
        />
        <button
          type="button"
          className="absolute inset-y-0 end-0 flex w-11 items-center justify-center text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={
            visible
              ? engineerLoginCopy.hidePassword
              : engineerLoginCopy.showPassword
          }
          onClick={() => {
            setVisible((current) => !current);
          }}
        >
          {visible ? (
            <EyeOffIcon aria-hidden="true" className="size-4" />
          ) : (
            <EyeIcon aria-hidden="true" className="size-4" />
          )}
        </button>
      </div>
    );
  },
);
