import Link from "next/link";
import {
  ArrowLeftIcon,
  Building2Icon,
  CableIcon,
  DraftingCompassIcon,
  WindIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { homeDrawingCopy } from "@/config/home.config/home.config";
import { type HomeDrawingService } from "@/types/store/home.types";

type DrawingConsultationProps = { items: readonly HomeDrawingService[] };
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
          title={homeDrawingCopy.title}
          description={homeDrawingCopy.description}
        />
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = icons[index % icons.length] ?? DraftingCompassIcon;
            return (
              <li
                key={item.id}
                className="border-b border-border-strong lg:border-b-0 lg:border-e lg:border-s-0 last:lg:border-e-0"
              >
                <Link
                  href={item.href}
                  className="group flex h-full min-h-44 flex-col gap-4 px-4 py-6 outline-none hover:bg-surface/70 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:px-5 sm:py-7"
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
