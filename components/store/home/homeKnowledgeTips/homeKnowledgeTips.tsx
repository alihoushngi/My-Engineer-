"use client";

import Link from "next/link";
import { A11y, Autoplay, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { GlassInfoCard } from "@/components/common/glassInfoCard/glassInfoCard";
import { homeKnowledgeCopy } from "@/config/home.config/home.config";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion/use-prefers-reduced-motion";
import {
  HOME_HERO_AUTOPLAY_MS,
  shouldEnableHeroAutoplay,
} from "@/lib/home/hero-autoplay/hero-autoplay";
import { type HomeKnowledgeTip } from "@/types/store/home.types";

type HomeKnowledgeTipsProps = {
  tips: readonly HomeKnowledgeTip[];
};

export function HomeKnowledgeTips({ tips }: HomeKnowledgeTipsProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const enableAutoplay = shouldEnableHeroAutoplay(
    prefersReducedMotion,
    tips.length,
  );

  if (tips.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="home-knowledge-heading"
      className="bg-background-subtle py-section"
    >
      <div className="container-app space-y-6">
        <h2 id="home-knowledge-heading" className="type-h2">
          {homeKnowledgeCopy.title}
        </h2>
        <Swiper
          dir="rtl"
          className="home-knowledge-swiper"
          modules={[Pagination, Keyboard, A11y, Autoplay]}
          pagination={{ clickable: true }}
          keyboard={{ enabled: true }}
          speed={prefersReducedMotion ? 0 : 400}
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
            containerMessage: homeKnowledgeCopy.sliderLabel,
          }}
        >
          {tips.map((tip) => (
            <SwiperSlide key={tip.id} className="pb-12">
              <Link
                href={tip.href}
                className="block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <GlassInfoCard className="min-h-40 gap-4 p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="type-label text-accent">
                      {homeKnowledgeCopy.didYouKnow}
                    </span>
                    <span className="rounded-full bg-primary-subtle px-3 py-1 type-caption text-primary">
                      {tip.categoryTitle}
                    </span>
                  </div>
                  <p className="type-body text-foreground">{tip.body}</p>
                </GlassInfoCard>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
