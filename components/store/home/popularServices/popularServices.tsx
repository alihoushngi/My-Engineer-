import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeftIcon } from "lucide-react";
import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";

type PopularService = {
  id: string;
  title: string;
  description: string;
  href: string;
  imageSrc: string;
};
type PopularServicesProps = { items: readonly PopularService[] };

export function PopularServices({ items }: PopularServicesProps) {
  if (items.length === 0) return null;
  return (
    <section
      aria-labelledby="popular-services-heading"
      className="container-wide py-section"
    >
      <div className="space-y-8">
        <SectionHeader
          titleId="popular-services-heading"
          title="خدمات پرکاربرد"
          description="مسیرهای پرتکرار کاربران، از مسئله ملک تا طراحی و اجرای پروژه."
        />
        <ul className="grid gap-4 lg:grid-cols-3">
          {items.map((item, index) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="group relative block min-h-56 overflow-hidden rounded-xl bg-primary-deep text-primary-deep-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:min-h-72 lg:min-h-80"
              >
                <Image
                  src={item.imageSrc}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover opacity-65 transition duration-300 group-hover:scale-[1.03] motion-reduce:transform-none"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-primary-deep via-primary-deep/25 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:gap-5 sm:p-6">
                  <span className="space-y-2">
                    <span className="block type-caption text-accent">
                      {formatFaNumber(index + 1).padStart(2, "۰")}
                    </span>
                    <span className="block type-h3">{item.title}</span>
                    <span className="block type-body-sm text-primary-foreground/75">
                      {item.description}
                    </span>
                  </span>
                  <ArrowUpLeftIcon
                    aria-hidden="true"
                    className="size-6 shrink-0 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 motion-reduce:transform-none"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
