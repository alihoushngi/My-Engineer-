import Link from "next/link";
import { Empty } from "@/components/ui/empty/empty";
import { Button } from "@/components/ui/button/button";
import { engineerPanelPaths } from "@/config/engineer-panel.config/engineer-panel.config";

export default function EngineerNotFound() {
  return (
    <Empty
      title="صفحه فضای کاری پیدا نشد"
      description="این بخش در فضای کاری متخصص وجود ندارد."
      action={
        <Button asChild>
          <Link href={engineerPanelPaths.dashboard}>بازگشت به پیشخوان</Link>
        </Button>
      }
    />
  );
}
