import Link from "next/link";
import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { Button } from "@/components/ui/button/button";
import { homeFaqCopy } from "@/config/home.config/home.config";

export function HomeFaqEntry() {
  return (
    <section
      aria-labelledby="home-faq-heading"
      className="container-app py-16 sm:py-20"
    >
      <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            titleId="home-faq-heading"
            title={homeFaqCopy.title}
            description={homeFaqCopy.description}
          />
          <Button asChild variant="outline">
            <Link href={homeFaqCopy.href}>{homeFaqCopy.actionLabel}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
