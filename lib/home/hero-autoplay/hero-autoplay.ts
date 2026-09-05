export const HOME_HERO_AUTOPLAY_MS = 6500;

export function shouldEnableHeroAutoplay(
  prefersReducedMotion: boolean,
  slideCount: number,
): boolean {
  return !prefersReducedMotion && slideCount > 1;
}
