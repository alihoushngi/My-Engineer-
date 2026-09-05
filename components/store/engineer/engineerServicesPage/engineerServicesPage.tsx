import { EngineerPageHeader } from "@/components/store/engineer/engineerPageHeader/engineerPageHeader";
import { EngineerSpecialtiesForm } from "@/components/store/engineer/engineerSpecialtiesForm/engineerSpecialtiesForm";
import { Badge } from "@/components/ui/badge/badge";
import { Empty } from "@/components/ui/empty/empty";
import {
  engineerPageTitles,
  engineerPanelCopy,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerWorkspace } from "@/types/store/engineer.types";

type EngineerServicesPageProps = {
  workspace: EngineerWorkspace;
};

export function EngineerServicesPage({ workspace }: EngineerServicesPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <EngineerPageHeader
        title={engineerPageTitles.services}
        description="خدمات و تخصص‌های متصل به پروفایل عمومی. قیمت‌گذاری و کمیسیون در محصول تعریف نشده است."
        actions={
          <EngineerSpecialtiesForm
            specialties={workspace.profile.specialties}
            software={workspace.profile.software}
          />
        }
      />
      {workspace.services.length === 0 ? (
        <Empty title={engineerPanelCopy.emptyServices} />
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {workspace.services.map((service) => (
            <li
              key={service.slug}
              className="rounded-lg border border-border bg-surface p-(--space-card)"
            >
              <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                <h2 className="type-h4 text-foreground">{service.label}</h2>
                <Badge
                  variant={service.isListedOnProfile ? "success" : "outline"}
                >
                  {service.isListedOnProfile
                    ? engineerPanelCopy.listedOnProfile
                    : engineerPanelCopy.notListedOnProfile}
                </Badge>
              </div>
              {service.specialties.length > 0 ? (
                <ul className="flex flex-wrap gap-2">
                  {service.specialties.map((item) => (
                    <li key={item}>
                      <Badge variant="outline">{item}</Badge>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="type-body-sm text-muted-foreground">
                  تخصصی برای این خدمت ثبت نشده است.
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
