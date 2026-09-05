import Link from "next/link";
import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { Button } from "@/components/ui/button/button";
import { homeFaqCopy } from "@/config/home.config/home.config";

export function HomeFaqEntry() {
  return (
    <section
      aria-labelledby="home-faq-heading"
      className="container-app pb-section"
    >
      <div className="border-t border-border pt-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            titleId="home-faq-heading"
            title={homeFaqCopy.title}
            description={homeFaqCopy.description}
          />
          <Button asChild variant="outline" className="shrink-0">
            <Link href={homeFaqCopy.href}>{homeFaqCopy.actionLabel}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
