import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { ServiceCard } from "@/components/store/service/serviceCard/serviceCard";
import { type MappedHomeLink } from "@/config/home.config/home.config";

type PopularServicesProps = {
  items: readonly MappedHomeLink[];
};

export function PopularServices({ items }: PopularServicesProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="popular-services-heading"
      className="container-app py-16 sm:py-20"
    >
      <div className="space-y-8">
        <SectionHeader
          titleId="popular-services-heading"
          title="خدمات پرکاربرد"
        />
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.href}>
              <ServiceCard href={item.href} title={item.label} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
