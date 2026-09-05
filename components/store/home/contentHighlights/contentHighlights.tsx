import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { homeContentCopy } from "@/config/home.config/home.config";

export function ContentHighlights() {
  return (
    <section
      aria-labelledby="content-highlights-heading"
      className="container-app py-section"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <SectionHeader
          titleId="content-highlights-heading"
          title={homeContentCopy.title}
          description={homeContentCopy.description}
        />
        <ul className="divide-y divide-border border-t border-border">
          {homeContentCopy.items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex items-center justify-between gap-5 py-6 outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="space-y-2">
                  <h3 className="type-h3 group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="type-body-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <ArrowLeftIcon
                  aria-hidden="true"
                  className="size-5 shrink-0 text-primary ltr:rotate-180"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
