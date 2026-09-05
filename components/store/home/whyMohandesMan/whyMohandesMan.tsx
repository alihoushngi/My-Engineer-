import { CheckIcon } from "lucide-react";
import { IconCallout } from "@/components/common/iconCallout/iconCallout";
import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { homeWhyCopy } from "@/config/home.config/home.config";

export function WhyMohandesMan() {
  return (
    <section
      aria-labelledby="why-mohandes-man-heading"
      className="container-app py-section"
    >
      <div className="space-y-8">
        <SectionHeader
          titleId="why-mohandes-man-heading"
          title={homeWhyCopy.title}
        />
        <ul className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          {homeWhyCopy.items.map((item) => (
            <li key={item.title} className="min-w-0">
              <IconCallout
                icon={<CheckIcon aria-hidden="true" className="size-4" />}
                title={item.title}
                description={item.description}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
