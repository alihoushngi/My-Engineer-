"use client";

import Image from "next/image";
import Link from "next/link";
import { A11y, Autoplay, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button/button";
import { homeHeroCopy, homeHeroSlides } from "@/config/home.config/home.config";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion/use-prefers-reduced-motion";
import {
  HOME_HERO_AUTOPLAY_MS,
  shouldEnableHeroAutoplay,
} from "@/lib/home/hero-autoplay/hero-autoplay";

export function HomeHeroSlider() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const enableAutoplay = shouldEnableHeroAutoplay(
    prefersReducedMotion,
    homeHeroSlides.length,
  );

  return (
    <Swiper
      dir="rtl"
      className="home-hero-swiper h-full w-full"
      modules={[Pagination, Keyboard, A11y, Autoplay]}
      pagination={{ clickable: true }}
      keyboard={{ enabled: true }}
      speed={prefersReducedMotion ? 0 : 450}
      loop={enableAutoplay}
      autoplay={
        enableAutoplay
          ? {
              delay: HOME_HERO_AUTOPLAY_MS,
              pauseOnMouseEnter: true,
              disableOnInteraction: false,
            }
          : false
      }
      a11y={{
        enabled: true,
        containerMessage: homeHeroCopy.sliderLabel,
      }}
    >
      {homeHeroSlides.map((slide, index) => (
        <SwiperSlide key={slide.id} className="relative h-full">
          <Image
            src={slide.imageSrc}
            alt={slide.imageAlt}
            fill
            priority={index === 0}
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-primary-deep/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 space-y-3 p-4 pb-10 sm:p-6 sm:pb-12">
            <p className="type-h4 text-primary-deep-foreground">
              {slide.headline}
            </p>
            <p className="hidden max-w-md type-body-sm text-primary-deep-foreground/80 sm:block">
              {slide.description}
            </p>
            <Button asChild variant="outline" size="sm">
              <Link href={slide.ctaHref}>{slide.ctaLabel}</Link>
            </Button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
