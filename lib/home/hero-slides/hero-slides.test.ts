import assert from "node:assert/strict";
import test from "node:test";
import { homeHeroSlides } from "./hero-slides.ts";

test("home hero has multiple local slides with copy and CTA", () => {
  assert.equal(homeHeroSlides.length > 1, true);
  for (const slide of homeHeroSlides) {
    assert.match(slide.imageSrc, /^\/images\//);
    assert.equal(slide.headline.trim().length > 0, true);
    assert.equal(slide.description.trim().length > 0, true);
    assert.equal(slide.ctaLabel.trim().length > 0, true);
    assert.equal(slide.ctaHref.trim().length > 0, true);
  }
});
