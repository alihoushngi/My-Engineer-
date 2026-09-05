"use client";

import { useMemo, useState } from "react";
import { UsersIcon } from "lucide-react";
import { ExpertCard } from "@/components/store/expert/expertCard/expertCard";
import { Empty } from "@/components/ui/empty/empty";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { type ExpertCardData } from "@/types/store/expert.types";

type Props = { experts: readonly ExpertCardData[] };

export function ServiceExpertMarketplace({ experts }: Props) {
  const [city, setCity] = useState("all");
  const [specialty, setSpecialty] = useState("all");
  const cities = useMemo(
    () =>
      [
        ...new Set(experts.map((item) => item.city).filter(Boolean)),
      ] as string[],
    [experts],
  );
  const specialties = useMemo(
    () => [...new Set(experts.flatMap((item) => item.specialties ?? []))],
    [experts],
  );
  const results = experts.filter(
    (expert) =>
      (city === "all" || expert.city === city) &&
      (specialty === "all" || expert.specialties?.includes(specialty)),
  );

  return (
    <section aria-labelledby="service-experts-heading" className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 id="service-experts-heading" className="type-h2">
            متخصصان این حوزه
          </h2>
          <p className="mt-1 type-body-sm text-foreground-muted">
            {formatFaNumber(results.length)} متخصص متناسب با انتخاب شما
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 md:w-[28rem]">
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger aria-label="فیلتر شهر">
              <SelectValue placeholder="همه شهرها" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه شهرها</SelectItem>
              {cities.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={specialty} onValueChange={setSpecialty}>
            <SelectTrigger aria-label="فیلتر تخصص">
              <SelectValue placeholder="همه تخصص‌ها" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه تخصص‌ها</SelectItem>
              {specialties.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {results.length ? (
        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {results.map((expert) => (
            <li key={expert.id}>
              <ExpertCard expert={expert} />
            </li>
          ))}
        </ul>
      ) : (
        <Empty
          icon={<UsersIcon aria-hidden="true" />}
          title="متخصصی با این ترکیب پیدا نشد"
          description="فیلتر شهر یا تخصص را تغییر دهید."
        />
      )}
    </section>
  );
}
