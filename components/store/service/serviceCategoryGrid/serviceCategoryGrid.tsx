import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { GlassInfoCard } from "@/components/common/glassInfoCard/glassInfoCard";
import {
  serviceCategories,
  type ServiceSlug,
} from "@/config/services.config/services.config";
import { cn } from "@/lib/utils/cn/cn";

type ServiceCategoryGridProps = {
  onServiceSelect?: () => void;
  hideDescription?: boolean;
};

const visualMap: Record<ServiceSlug, { image: string; accent: string }> = {
  "land-surveying": {
    image: "/images/services/surveying.png",
    accent: "bg-category-teal",
  },
  "construction-workers": {
    image: "/images/services/contractor.png",
    accent: "bg-category-orange",
  },
  drawing: {
    image: "/images/services/engineeringservice.png",
    accent: "bg-category-blue",
  },
  "interior-design": {
    image: "/images/services/designer.png",
    accent: "bg-category-violet",
  },
  "building-permit": {
    image: "/images/services/licence.png",
    accent: "bg-category-green",
  },
  "administrative-services": {
    image: "/images/services/adminastrative.png",
    accent: "bg-category-rose",
  },
};

export function ServiceCategoryGrid({
  onServiceSelect,
  hideDescription = false,
}: ServiceCategoryGridProps) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {serviceCategories.map((service) => {
        const visual = visualMap[service.slug];
        return (
          <li key={service.slug} className="min-w-0">
            <Link
              href={service.href}
              onClick={onServiceSelect}
              className="group block h-full rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <GlassInfoCard className="min-h-40 p-3 transition-transform group-hover:-translate-y-1 motion-reduce:transform-none sm:min-h-52 sm:p-4">
                <span
                  className={cn(
                    "relative mx-auto mb-3 flex size-16 items-center justify-center overflow-hidden rounded-full sm:size-20",
                    visual.accent,
                  )}
                >
                  <Image
                    src={visual.image}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-contain p-2"
                  />
                </span>
                <span className="mt-auto flex items-end justify-between gap-2">
                  <span>
                    <span className="block type-h4">{service.label}</span>
                    {!hideDescription ? (
                      <span className="mt-1 hidden type-caption text-muted-foreground sm:block">
                        {service.description}
                      </span>
                    ) : null}
                  </span>
                  <ArrowLeftIcon
                    aria-hidden="true"
                    className="size-4 shrink-0 text-primary"
                  />
                </span>
              </GlassInfoCard>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
