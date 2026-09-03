import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { type ExpertProfile } from "@/types/store/expert.types";
import { hasItems } from "@/lib/experts/expert-profile/expert-profile";

type ExpertProfessionalInfoProps = {
  expert: ExpertProfile;
};

export function ExpertProfessionalInfo({
  expert,
}: ExpertProfessionalInfoProps) {
  const education = expert.education ?? [];
  const qualifications = expert.qualifications ?? [];
  const competencies = expert.license?.competencies ?? [];
  const hasMembership = Boolean(expert.organizationMembership?.label);
  const hasLicense = Boolean(expert.license?.title);

  if (
    education.length === 0 &&
    !hasMembership &&
    !hasLicense &&
    qualifications.length === 0
  ) {
    return null;
  }

  return (
    <section
      aria-labelledby="expert-professional-heading"
      className="border-y border-border bg-surface-muted"
    >
      <div className="container-app py-10 sm:py-12">
        <div className="max-w-3xl space-y-8">
          <SectionHeader
            titleId="expert-professional-heading"
            title={expertProfileCopy.professionalTitle}
          />
          <dl className="space-y-6">
            {hasItems(education) ? (
              <div className="space-y-3">
                <dt className="type-caption text-muted-foreground">
                  {expertProfileCopy.educationLabel}
                </dt>
                <dd>
                  <ul className="space-y-3">
                    {education.map((item) => (
                      <li
                        key={`${item.degree}-${item.field ?? ""}-${item.institution ?? ""}`}
                        className="type-body text-foreground"
                      >
                        <p className="font-medium">{item.degree}</p>
                        {item.field ? (
                          <p className="type-body-sm text-muted-foreground">
                            {item.field}
                          </p>
                        ) : null}
                        {item.institution ? (
                          <p className="type-body-sm text-muted-foreground">
                            {item.institution}
                          </p>
                        ) : null}
                        {item.year ? (
                          <p className="type-caption text-muted-foreground">
                            {item.year}
                          </p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ) : null}
            {hasMembership ? (
              <div className="space-y-1">
                <dt className="type-caption text-muted-foreground">
                  {expertProfileCopy.membershipLabel}
                </dt>
                <dd className="type-body text-foreground">
                  {expert.organizationMembership?.label}
                </dd>
              </div>
            ) : null}
            {hasLicense ? (
              <div className="space-y-2">
                <dt className="type-caption text-muted-foreground">
                  {expertProfileCopy.licenseLabel}
                </dt>
                <dd className="space-y-2">
                  <p className="type-body text-foreground">
                    {expert.license?.title}
                  </p>
                  {hasItems(competencies) ? (
                    <p className="type-body-sm text-muted-foreground">
                      {competencies.join("، ")}
                    </p>
                  ) : null}
                </dd>
              </div>
            ) : null}
            {hasItems(qualifications) ? (
              <div className="space-y-1">
                <dt className="type-caption text-muted-foreground">
                  {expertProfileCopy.qualificationsLabel}
                </dt>
                <dd className="type-body text-foreground">
                  {qualifications.join("، ")}
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
      </div>
    </section>
  );
}
