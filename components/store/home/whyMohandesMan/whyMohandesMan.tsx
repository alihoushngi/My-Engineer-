import { CheckIcon } from "lucide-react";
import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { homeWhyCopy } from "@/config/home.config/home.config";

export function WhyMohandesMan() {
  return (
    <section
      aria-labelledby="why-mohandes-man-heading"
      className="container-app py-16 sm:py-20"
    >
      <div className="space-y-8">
        <SectionHeader
          titleId="why-mohandes-man-heading"
          title={homeWhyCopy.title}
        />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {homeWhyCopy.items.map((item) => (
            <li
              key={item.title}
              className="flex gap-3 rounded-lg border border-border bg-card p-5"
            >
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                <CheckIcon aria-hidden="true" className="size-4" />
              </span>
              <div className="space-y-1">
                <h3 className="type-h4 text-foreground">{item.title}</h3>
                <p className="type-body-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
