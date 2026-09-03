import {
  ClipboardListIcon,
  CompassIcon,
  HammerIcon,
  HomeIcon,
  PenToolIcon,
  ScrollTextIcon,
} from "lucide-react";
import { type ReactNode } from "react";
import { ServiceCard } from "@/components/store/service/serviceCard/serviceCard";
import {
  serviceCategories,
  type ServiceSlug,
} from "@/config/services.config/services.config";

const serviceIcons: Record<ServiceSlug, ReactNode> = {
  "land-surveying": <CompassIcon aria-hidden="true" />,
  "construction-workers": <HammerIcon aria-hidden="true" />,
  drawing: <PenToolIcon aria-hidden="true" />,
  "interior-design": <HomeIcon aria-hidden="true" />,
  "building-permit": <ScrollTextIcon aria-hidden="true" />,
  "administrative-services": <ClipboardListIcon aria-hidden="true" />,
};

export function ServiceCategoryGrid() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      {serviceCategories.map((service) => (
        <li key={service.slug}>
          <ServiceCard
            href={service.href}
            title={service.label}
            description={service.description}
            icon={serviceIcons[service.slug]}
          />
        </li>
      ))}
    </ul>
  );
}
