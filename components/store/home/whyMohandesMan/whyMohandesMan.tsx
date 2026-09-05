import Image from "next/image";
import {
  BadgeCheckIcon,
  MapPinnedIcon,
  MessageCircleMoreIcon,
  ShapesIcon,
} from "lucide-react";
import { homeWhyCopy } from "@/config/home.config/home.config";

const icons = [
  ShapesIcon,
  MessageCircleMoreIcon,
  BadgeCheckIcon,
  MapPinnedIcon,
] as const;

export function WhyMohandesMan() {
  return (
    <section
      aria-labelledby="why-mohandes-man-heading"
      className="container-wide py-section"
    >
      <div className="grid items-stretch overflow-hidden rounded-xl border border-border lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative min-h-56 lg:min-h-[34rem]">
          <Image
            src="/images/home/project-engineer.png"
            alt="مهندس پروژه در فضای ساختمانی"
            fill
            sizes="(min-width: 1024px) 44vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center bg-surface px-4 py-8 sm:px-10 sm:py-10 lg:px-14">
          <p className="type-label text-primary">
            انتخاب روشن‌تر، همکاری مستقیم‌تر
          </p>
          <h2 id="why-mohandes-man-heading" className="mt-3 type-h1">
            {homeWhyCopy.title}
          </h2>
          <ul className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {homeWhyCopy.items.map((item, index) => {
              const Icon = icons[index] ?? ShapesIcon;
              return (
                <li
                  key={item.title}
                  className="space-y-3 border-t border-border pt-5"
                >
                  <Icon
                    aria-hidden="true"
                    className="size-6 stroke-[1.5] text-primary"
                  />
                  <h3 className="type-h4">{item.title}</h3>
                  <p className="type-body-sm text-foreground-muted">
                    {item.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
