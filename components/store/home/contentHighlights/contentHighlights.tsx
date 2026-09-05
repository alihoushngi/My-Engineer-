import Link from "next/link";
import {
  ArrowLeftIcon,
  BookOpenTextIcon,
  CircleHelpIcon,
  NewspaperIcon,
} from "lucide-react";
import { GlassInfoCard } from "@/components/common/glassInfoCard/glassInfoCard";
import { homeContentCopy } from "@/config/home.config/home.config";
import { cn } from "@/lib/utils/cn/cn";

const icons = [NewspaperIcon, BookOpenTextIcon, CircleHelpIcon] as const;
const accents = [
  "bg-category-orange",
  "bg-category-blue",
  "bg-category-teal",
] as const;

export function ContentHighlights() {
  return (
    <section
      aria-labelledby="content-highlights-heading"
      className="container-app py-section"
    >
      <div className="mb-8 max-w-2xl space-y-3">
        <p className="type-label text-primary">مرکز یادگیری</p>
        <h2 id="content-highlights-heading" className="type-h1">
          {homeContentCopy.title}
        </h2>
        <p className="type-body text-foreground-muted">
          {homeContentCopy.description}
        </p>
      </div>
      <ul className="grid gap-4 md:grid-cols-3">
        {homeContentCopy.items.map((item, index) => {
          const Icon = icons[index] ?? NewspaperIcon;
          const accent = accents[index] ?? "bg-category-teal";
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group block h-full rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <GlassInfoCard className="min-h-48 p-5 transition-transform group-hover:-translate-y-1 motion-reduce:transform-none sm:min-h-56 sm:p-6">
                  <span
                    className={cn(
                      "inline-flex size-12 items-center justify-center rounded-full",
                      accent,
                    )}
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-6 stroke-[1.5] text-primary-deep"
                    />
                  </span>
                  <span className="mt-auto space-y-2">
                    <span className="flex items-center justify-between gap-4">
                      <span className="type-h3">{item.title}</span>
                      <ArrowLeftIcon
                        aria-hidden="true"
                        className="size-5 text-primary transition-transform group-hover:-translate-x-1 motion-reduce:transform-none"
                      />
                    </span>
                    <span className="block type-body-sm text-muted-foreground">
                      {item.description}
                    </span>
                  </span>
                </GlassInfoCard>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
