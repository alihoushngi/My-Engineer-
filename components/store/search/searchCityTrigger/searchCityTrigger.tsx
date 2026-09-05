"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { MapPinIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";
import { mockCities } from "@/lib/mock-data/mock-data";
import { buildSearchHref } from "@/lib/search/search-params/search-params";
import { cn } from "@/lib/utils/cn/cn";

type Props = { className?: string; cities?: readonly string[] };

export function SearchCityTrigger({ className, cities = [] }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const value = cities[0] ?? "all";

  return (
    <Select
      value={value}
      onValueChange={(next) =>
        router.push(
          buildSearchHref({ q: query, cities: next === "all" ? [] : [next] }),
        )
      }
    >
      <SelectTrigger
        aria-label="فیلتر شهر"
        className={cn("h-12 w-full min-w-0 sm:min-w-40", className)}
      >
        <MapPinIcon aria-hidden="true" className="size-4" />
        <SelectValue placeholder="همه شهرها" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">همه شهرها</SelectItem>
        {mockCities.map((city) => (
          <SelectItem key={city.id} value={city.name}>
            {city.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
