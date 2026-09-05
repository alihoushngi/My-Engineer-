import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion/accordion";
import { serviceFilterCopy } from "@/config/service-filters.config/service-filters.config";
import { serviceDiscoveryCopy } from "@/config/services.config/services.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { type ServiceDetailData } from "@/types/store/service.types";

type ServiceScopeSectionProps = {
  detail: ServiceDetailData;
};

export function ServiceScopeSection({ detail }: ServiceScopeSectionProps) {
  return (
    <section className="container-app py-section">
      <div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:gap-16">
        <div>
          <p className="type-label text-primary">
            {serviceDiscoveryCopy.scopeLabel}
          </p>
          <h2 className="mt-3 type-h1">{serviceDiscoveryCopy.scopeTitle}</h2>
        </div>
        <p className="type-body-lg text-foreground-muted">
          {detail.longDescription}
        </p>
      </div>
      <ul className="mt-10 grid gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-2 lg:grid-cols-3">
        {detail.specialties.map((item, index) => (
          <li key={item.id} className="bg-surface p-6">
            <span className="type-caption text-secondary">
              {formatFaNumber(index + 1).padStart(2, "۰")}
            </span>
            <h3 className="mt-4 type-h4">{item.title}</h3>
            <p className="mt-2 type-body-sm text-foreground-muted">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
      {detail.scopeItems && detail.scopeItems.length > 0 ? (
        <Accordion
          type="single"
          collapsible
          className="mt-8 border-t border-border"
        >
          <AccordionItem value="scope">
            <AccordionTrigger>
              {serviceFilterCopy.scopeAccordionTitle}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc space-y-2 ps-5">
                {detail.scopeItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : null}
    </section>
  );
}
