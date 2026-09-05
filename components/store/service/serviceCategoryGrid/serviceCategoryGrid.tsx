import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import {
  serviceCategories,
  type ServiceSlug,
} from "@/config/services.config/services.config";

type ServiceCategoryGridProps = {
  onServiceSelect?: () => void;
  hideDescription?: boolean;
};

const visualMap: Record<ServiceSlug, { image: string; tone: string }> = {
  "land-surveying": {
    image: "/images/services/surveying.png",
    tone: "bg-category-teal",
  },
  "construction-workers": {
    image: "/images/services/contractor.png",
    tone: "bg-category-orange",
  },
  drawing: {
    image: "/images/services/engineeringservice.png",
    tone: "bg-category-blue",
  },
  "interior-design": {
    image: "/images/services/designer.png",
    tone: "bg-category-violet",
  },
  "building-permit": {
    image: "/images/services/licence.png",
    tone: "bg-category-green",
  },
  "administrative-services": {
    image: "/images/services/adminastrative.png",
    tone: "bg-category-rose",
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
              className={`group flex h-full min-h-52 flex-col overflow-hidden rounded-xl p-4 outline-none transition-transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transform-none ${visual.tone}`}
            >
              <span className="relative -mx-2 -mt-1 mb-3 h-28">
                <Image
                  src={visual.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 16vw, 45vw"
                  className="object-contain object-center"
                />
              </span>
              <span className="mt-auto flex items-end justify-between gap-2">
                <span>
                  <span className="block type-h4">{service.label}</span>
                  {!hideDescription ? (
                    <span className="mt-1 block type-caption text-foreground-muted">
                      {service.description}
                    </span>
                  ) : null}
                </span>
                <ArrowLeftIcon
                  aria-hidden="true"
                  className="size-4 shrink-0 text-primary"
                />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
