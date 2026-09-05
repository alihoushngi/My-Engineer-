import Link from "next/link";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { engineerLoginCopy } from "@/config/engineer-login.config/engineer-login.config";

export function EngineerLoginRegisterCrossLink() {
  return (
    <p className="type-body-sm text-center text-muted-foreground">
      {engineerLoginCopy.registerPrefix}{" "}
      <Link
        href={storePaths.expertRegistration}
        className="font-medium text-primary underline-offset-4 hover:underline"
      >
        {engineerLoginCopy.registerAction}
      </Link>
    </p>
  );
}
