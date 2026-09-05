import { EngineerPageHeader } from "@/components/store/engineer/engineerPageHeader/engineerPageHeader";
import { EngineerServiceAreaForm } from "@/components/store/engineer/engineerServiceAreaForm/engineerServiceAreaForm";
import { engineerPageTitles } from "@/config/engineer-panel.config/engineer-panel.config";
import { type City, type Province } from "@/types/store/registration.types";
import { type EngineerWorkspace } from "@/types/store/engineer.types";

type EngineerServiceAreasPageProps = {
  workspace: EngineerWorkspace;
  provinces: readonly Province[];
  cities: readonly City[];
};

export function EngineerServiceAreasPage({
  workspace,
  provinces,
  cities,
}: EngineerServiceAreasPageProps) {
  const area = workspace.serviceArea;

  return (
    <div className="flex flex-col gap-6">
      <EngineerPageHeader
        title={engineerPageTitles.serviceAreas}
        description="استان و شهر اصلی ارائه خدمت. شعاع جغرافیایی در محصول فعلی تعریف نشده است."
      />
      <div className="rounded-lg border border-border bg-surface-subtle p-(--space-card)">
        <p className="type-body text-foreground">
          شهر اصلی فعلی: {area.cityName}، {area.provinceName}
        </p>
        {area.nearbyCities.length > 0 ? (
          <p className="mt-2 type-body-sm text-muted-foreground">
            شهرهای مجاور:{" "}
            {area.nearbyCities.map((city) => city.name).join("، ")}
          </p>
        ) : null}
      </div>
      <EngineerServiceAreaForm
        area={area}
        provinces={provinces}
        cities={cities}
      />
    </div>
  );
}
