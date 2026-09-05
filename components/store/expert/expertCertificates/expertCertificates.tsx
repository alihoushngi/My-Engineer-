import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { type ExpertCertificate } from "@/types/store/expert.types";
import { hasItems } from "@/lib/experts/expert-profile/expert-profile";

type ExpertCertificatesProps = {
  certificates?: readonly ExpertCertificate[];
};

export function ExpertCertificates({ certificates }: ExpertCertificatesProps) {
  if (!hasItems(certificates)) {
    return null;
  }

  return (
    <section
      aria-labelledby="expert-certificates-heading"
      className="py-8 first:pt-0"
    >
      <div className="max-w-3xl space-y-6">
        <SectionHeader
          titleId="expert-certificates-heading"
          title={expertProfileCopy.certificatesTitle}
        />
        <ul className="space-y-4">
          {certificates.map((item) => (
            <li
              key={item.id}
              className="border-b border-border pb-4 last:border-b-0 last:pb-0"
            >
              <p className="type-body font-medium text-foreground">
                {item.title}
              </p>
              {item.issuer ? (
                <p className="mt-1 type-body-sm text-muted-foreground">
                  {item.issuer}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
