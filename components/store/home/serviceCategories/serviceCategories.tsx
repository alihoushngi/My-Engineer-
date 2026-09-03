import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { ServiceCategoryGrid } from "@/components/store/service/serviceCategoryGrid/serviceCategoryGrid";
import { homeServicesCopy } from "@/config/home.config/home.config";

export function ServiceCategories() {
  return (
    <section
      id="service-categories"
      aria-labelledby="service-categories-heading"
      className="container-app py-16 sm:py-20"
    >
      <div className="space-y-8">
        <SectionHeader
          titleId="service-categories-heading"
          title={homeServicesCopy.title}
          description={homeServicesCopy.description}
        />
        <ServiceCategoryGrid />
      </div>
    </section>
  );
}
