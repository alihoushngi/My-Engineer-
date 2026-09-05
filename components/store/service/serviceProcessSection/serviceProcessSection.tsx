import { CheckIcon } from "lucide-react";
import { serviceDiscoveryCopy } from "@/config/services.config/services.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { type ServiceDetailData } from "@/types/store/service.types";

type ServiceProcessSectionProps = {
  detail: ServiceDetailData;
};

export function ServiceProcessSection({ detail }: ServiceProcessSectionProps) {
  return (
    <section className="container-app grid gap-12 py-section lg:grid-cols-[1fr_.85fr] lg:gap-20">
      <div>
        <p className="type-label text-primary">
          {serviceDiscoveryCopy.processLabel}
        </p>
        <h2 className="mt-3 type-h1">{serviceDiscoveryCopy.processTitle}</h2>
        <ol className="mt-7 border-t border-border">
          {detail.process.map((step, index) => (
            <li
              key={step.id}
              className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-border py-5"
            >
              <span className="type-h4 text-primary">
                {formatFaNumber(index + 1)}
              </span>
              <div>
                <h3 className="type-h4">{step.title}</h3>
                <p className="mt-1 type-body-sm text-foreground-muted">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="rounded-xl bg-primary-deep p-7 text-primary-foreground sm:p-9">
        <CheckIcon
          aria-hidden="true"
          className="size-8 text-primary-deep-foreground"
        />
        <h2 className="mt-5 type-h2">{serviceDiscoveryCopy.prepareTitle}</h2>
        <p className="mt-3 type-body text-primary-foreground/70">
          {serviceDiscoveryCopy.prepareBody}
        </p>
      </div>
    </section>
  );
}
