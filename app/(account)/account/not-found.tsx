import Link from "next/link";
import { Empty } from "@/components/ui/empty/empty";
import { Button } from "@/components/ui/button/button";
import { userAccountPaths } from "@/config/user-account.config/user-account.config";

export default function AccountNotFound() {
  return (
    <Empty
      title="صفحه حساب پیدا نشد"
      description="این بخش در حساب کاربری وجود ندارد."
      action={
        <Button asChild>
          <Link href={userAccountPaths.dashboard}>بازگشت به پیشخوان</Link>
        </Button>
      }
    />
  );
}
