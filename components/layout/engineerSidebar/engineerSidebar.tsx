import { EngineerNavLink } from "@/components/layout/engineerNavLink/engineerNavLink";
import { BrandLogo } from "@/components/layout/brandLogo/brandLogo";
import { engineerSidebarNav } from "@/config/engineer-panel.config/engineer-panel.config";

export function EngineerSidebar() {
  return (
    <aside className="hidden border-e border-border bg-surface lg:flex lg:h-full lg:min-h-0 lg:flex-col">
      <div className="sticky top-0 flex max-h-dvh flex-col gap-6 overflow-y-auto px-4 py-5">
        <BrandLogo className="px-1" />
        <nav aria-label="ناوبری فضای کاری متخصص">
          <ul className="flex flex-col gap-1">
            {engineerSidebarNav.map((item) => (
              <li key={item.id}>
                <EngineerNavLink item={item} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
