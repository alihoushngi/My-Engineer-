import { ServiceCard } from "@/components/store/service/serviceCard/serviceCard";
import { ServiceIcon } from "@/components/store/service/serviceIcon/serviceIcon";
import { serviceCategories } from "@/config/services.config/services.config";

type ServiceCategoryGridProps = {
  onServiceSelect?: () => void;
  hideDescription?: boolean;
};

export function ServiceCategoryGrid({
  onServiceSelect,
  hideDescription = false,
}: ServiceCategoryGridProps) {
  return (
    <ul className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
      {serviceCategories.map((service) => (
        <li key={service.slug} className="min-w-0">
          <ServiceCard
            href={service.href}
            title={service.label}
            description={hideDescription ? undefined : service.description}
            icon={<ServiceIcon slug={service.slug} />}
            onClick={onServiceSelect}
          />
        </li>
      ))}
    </ul>
  );
}
