import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { GlassInfoCard } from "@/components/common/glassInfoCard/glassInfoCard";
import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { Button } from "@/components/ui/button/button";
import { homeFaqCopy } from "@/config/home.config/home.config";
import { type FaqCategory } from "@/types/store/faq.types";

type HomeFaqEntryProps = {
  categories: readonly FaqCategory[];
};

export function HomeFaqEntry({ categories }: HomeFaqEntryProps) {
  return (
    <section
      id="home-faq"
      aria-labelledby="home-faq-heading"
      className="container-app pb-section"
    >
      <div className="space-y-8 border-t border-border pt-8">
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
        {categories.length > 0 ? (
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={category.href}
                  className="group block h-full rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <GlassInfoCard className="min-h-16 flex-row items-center justify-between gap-3 p-4">
                    <span className="type-h4">{category.title}</span>
                    <ArrowLeftIcon
                      aria-hidden="true"
                      className="size-4 shrink-0 text-primary transition-transform group-hover:-translate-x-1 motion-reduce:transform-none"
                    />
                  </GlassInfoCard>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
