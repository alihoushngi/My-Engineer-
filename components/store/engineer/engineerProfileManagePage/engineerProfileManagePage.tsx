import Link from "next/link";
import { EngineerPageHeader } from "@/components/store/engineer/engineerPageHeader/engineerPageHeader";
import { EngineerProfileBasicsForm } from "@/components/store/engineer/engineerProfileBasicsForm/engineerProfileBasicsForm";
import { EngineerProfileSection } from "@/components/store/engineer/engineerProfileSection/engineerProfileSection";
import { EngineerSpecialtiesForm } from "@/components/store/engineer/engineerSpecialtiesForm/engineerSpecialtiesForm";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import {
  engineerPageTitles,
  engineerPanelCopy,
  engineerPanelPaths,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerWorkspace } from "@/types/store/engineer.types";

type EngineerProfilePageProps = {
  workspace: EngineerWorkspace;
};

export function EngineerProfileManagePage({
  workspace,
}: EngineerProfilePageProps) {
  const { profile, account } = workspace;
  const publicHref = account.publicExpertId
    ? `/experts/${account.publicExpertId}`
    : undefined;

  return (
    <div className="flex flex-col gap-6">
      <EngineerPageHeader
        title={engineerPageTitles.profile}
        description="اطلاعاتی که در پروفایل عمومی متخصص نمایش داده می‌شود."
        actions={
          publicHref ? (
            <Button asChild variant="outline">
              <Link href={publicHref}>
                {engineerPanelCopy.publicProfileLabel}
              </Link>
            </Button>
          ) : null
        }
      />
      <EngineerProfileSection
        title="نام و عنوان حرفه‌ای"
        action={<EngineerProfileBasicsForm profile={profile} />}
      >
        <dl className="grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="type-caption text-muted-foreground">نام</dt>
            <dd className="type-body">{profile.firstName}</dd>
          </div>
          <div>
            <dt className="type-caption text-muted-foreground">نام خانوادگی</dt>
            <dd className="type-body">{profile.lastName}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="type-caption text-muted-foreground">
              عنوان حرفه‌ای
            </dt>
            <dd className="type-body">{profile.profession}</dd>
          </div>
          {profile.about ? (
            <div className="sm:col-span-2">
              <dt className="type-caption text-muted-foreground">درباره من</dt>
              <dd className="type-body leading-loose">{profile.about}</dd>
            </div>
          ) : null}
        </dl>
      </EngineerProfileSection>
      <EngineerProfileSection
        title="تخصص‌ها و نرم‌افزارها"
        action={
          <EngineerSpecialtiesForm
            specialties={profile.specialties}
            software={profile.software}
          />
        }
      >
        <TagList items={profile.specialties} empty="تخصصی ثبت نشده است." />
        <p className="mt-4 type-caption text-muted-foreground">نرم‌افزارها</p>
        <TagList items={profile.software} empty="نرم‌افزاری ثبت نشده است." />
      </EngineerProfileSection>
      <EngineerProfileSection
        title="سوابق"
        description="ویرایش کامل سوابق از همین بخش انجام می‌شود؛ ثبت‌نام برای ورود اولیه است."
        action={
          <Button asChild variant="outline" size="sm">
            <Link href={engineerPanelPaths.credentials}>مدارک مرتبط</Link>
          </Button>
        }
      >
        <p className="type-body leading-loose text-foreground">
          {profile.history ?? "شرح سوابق هنوز تکمیل نشده است."}
        </p>
      </EngineerProfileSection>
      <EngineerProfileSection title="شهرهای فعالیت">
        <TagList
          items={profile.serviceCities}
          empty="محدوده فعالیت ثبت نشده است."
        />
        <Button asChild variant="link" size="sm" className="mt-2 px-0">
          <Link href={engineerPanelPaths.serviceAreas}>
            مدیریت محدوده فعالیت
          </Link>
        </Button>
      </EngineerProfileSection>
    </div>
  );
}

function TagList({
  items,
  empty,
}: {
  items: readonly string[];
  empty: string;
}) {
  if (items.length === 0) {
    return <p className="type-body-sm text-muted-foreground">{empty}</p>;
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item}>
          <Badge variant="outline">{item}</Badge>
        </li>
      ))}
    </ul>
  );
}
