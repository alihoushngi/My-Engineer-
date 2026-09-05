import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { ServiceIcon } from "@/components/store/service/serviceIcon/serviceIcon";
import {
  serviceCategories,
  serviceDiscoveryCopy,
  type ServiceCategory,
} from "@/config/services.config/services.config";

type ServiceRelatedSectionProps = {
  service: ServiceCategory;
};

export function ServiceRelatedSection({ service }: ServiceRelatedSectionProps) {
  return (
    <section className="container-app py-section">
      <h2 className="type-h2">{serviceDiscoveryCopy.relatedTitle}</h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {serviceCategories
          .filter((item) => item.slug !== service.slug)
          .map((item) => (
            <li key={item.slug}>
              <Link
                href={item.href}
                className="group flex min-h-24 items-center gap-4 rounded-xl border border-border p-5 outline-none hover:border-primary focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="text-primary [&_svg]:size-6">
                  <ServiceIcon slug={item.slug} />
                </span>
                <span className="type-h4">{item.label}</span>
                <ArrowLeftIcon
                  aria-hidden="true"
                  className="ms-auto size-4 text-primary transition-transform group-hover:-translate-x-1 motion-reduce:transform-none"
                />
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
}
