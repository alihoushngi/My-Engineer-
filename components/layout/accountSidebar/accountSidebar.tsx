import { AccountNavLink } from "@/components/layout/accountNavLink/accountNavLink";
import { BrandLogo } from "@/components/layout/brandLogo/brandLogo";
import { userAccountSidebarNav } from "@/config/user-account.config/user-account.config";

export function AccountSidebar() {
  return (
    <aside className="hidden border-e border-border bg-surface lg:flex lg:h-full lg:min-h-0 lg:flex-col">
      <div className="sticky top-0 flex max-h-dvh flex-col gap-6 overflow-y-auto px-4 py-5">
        <BrandLogo className="px-1" />
        <nav aria-label="ناوبری حساب کاربری">
          <ul className="flex flex-col gap-1">
            {userAccountSidebarNav.map((item) => (
              <li key={item.id}>
                <AccountNavLink item={item} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
