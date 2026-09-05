import Link from "next/link";
import {
  ArrowLeftIcon,
  Building2Icon,
  CableIcon,
  DraftingCompassIcon,
  WindIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";

type DrawingService = {
  id: string;
  title: string;
  description: string;
  href: string;
};
type DrawingConsultationProps = { items: readonly DrawingService[] };
const icons = [
  DraftingCompassIcon,
  Building2Icon,
  CableIcon,
  WindIcon,
] as const;

export function DrawingConsultation({ items }: DrawingConsultationProps) {
  if (items.length === 0) return null;
  return (
    <section
      aria-labelledby="drawing-consultation-heading"
      className="bg-secondary-subtle py-section"
    >
      <div className="container-app space-y-8">
        <SectionHeader
          titleId="drawing-consultation-heading"
          title="مشاوره ترسیم نقشه"
          description="برای هماهنگی بهتر میان رشته‌ها، نوع نقشه مورد نیاز پروژه را انتخاب کنید."
        />
        <ul className="grid border-y border-border-strong sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-x-reverse lg:divide-border-strong">
          {items.map((item, index) => {
            const Icon = icons[index % icons.length] ?? DraftingCompassIcon;
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col gap-5 px-5 py-7 outline-none hover:bg-surface/70 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                >
                  <Icon
                    aria-hidden="true"
                    className="size-8 stroke-[1.5] text-secondary"
                  />
                  <span className="space-y-1">
                    <span className="block type-h4">{item.title}</span>
                    <span className="block type-body-sm text-foreground-muted">
                      {item.description}
                    </span>
                  </span>
                  <ArrowLeftIcon
                    aria-hidden="true"
                    className="mt-auto size-4 text-secondary transition-transform group-hover:-translate-x-1 motion-reduce:transform-none"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
