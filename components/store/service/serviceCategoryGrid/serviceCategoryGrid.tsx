import { ServiceCard } from "@/components/store/service/serviceCard/serviceCard";
import { ServiceIcon } from "@/components/store/service/serviceIcon/serviceIcon";
import { serviceCategories } from "@/config/services.config/services.config";

type ServiceCategoryGridProps = {
  onServiceSelect?: () => void;
};

export function ServiceCategoryGrid({
  onServiceSelect,
}: ServiceCategoryGridProps) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      {serviceCategories.map((service) => (
        <li key={service.slug}>
          <ServiceCard
            href={service.href}
            title={service.label}
            description={service.description}
            icon={<ServiceIcon slug={service.slug} />}
            onClick={onServiceSelect}
          />
        </li>
      ))}
    </ul>
  );
}
