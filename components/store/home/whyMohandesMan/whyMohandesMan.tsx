import {
  BadgeCheckIcon,
  MessageCircleMoreIcon,
  ShapesIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { homeWhyCopy } from "@/config/home.config/home.config";

const icons = [
  ShapesIcon,
  MessageCircleMoreIcon,
  BadgeCheckIcon,
  ShieldCheckIcon,
] as const;

export function WhyMohandesMan() {
  return (
    <section
      aria-labelledby="why-mohandes-man-heading"
      className="container-app py-section"
    >
      <div className="max-w-3xl space-y-4">
        <p className="type-label text-primary">
          انتخاب روشن‌تر، همکاری مستقیم‌تر
        </p>
        <h2 id="why-mohandes-man-heading" className="type-h1">
          {homeWhyCopy.title}
        </h2>
        <p className="type-body-lg text-foreground-muted">
          {homeWhyCopy.intro}
        </p>
      </div>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {homeWhyCopy.items.map((item, index) => {
          const Icon = icons[index] ?? ShapesIcon;
          return (
            <li
              key={item.title}
              className="rounded-xl border border-border bg-surface p-5 sm:p-6"
            >
              <Icon
                aria-hidden="true"
                className="size-6 stroke-[1.5] text-primary"
              />
              <h3 className="mt-5 type-h4">{item.title}</h3>
              <p className="mt-2 type-body-sm text-foreground-muted">
                {item.description}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
