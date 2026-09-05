# Image asset plan

The redesign reuses project-owned PastDesign imagery when it is suitable and records every intentionally missing production asset. Components use guarded image slots so a missing future file never renders as a broken image.

## Reused local assets

| New public path                            | Legacy source                                                       | Use                                        | Native size      |
| ------------------------------------------ | ------------------------------------------------------------------- | ------------------------------------------ | ---------------- |
| `public/images/home/hero-construction.png` | `PastDesign/assets/img/banner/bb(1).png`                            | Home hero Swiper slide 1                   | 960×300          |
| `public/images/home/project-engineer.png`  | `PastDesign/assets/img/banner/craiyon__Engineer.png`                | Home hero Swiper slide 2 and trust/process | 959×299          |
| `public/images/home/interior-design.png`   | `PastDesign/assets/img/banner/craiyon_143104….png`                  | Home hero Swiper slide 3                   | 961×301          |
| `public/images/articles/surveying.jpg`     | `PastDesign/assets/img/middle-section/fullyView/surveing.jpg`       | Surveying article/knowledge cover          | 400×250          |
| `public/images/portfolio/project-01.jpg`   | `PastDesign/assets/img/sample-work/1.jpg`                           | Demo project portfolio                     | 259×194          |
| `public/images/portfolio/project-02.jpg`   | `PastDesign/assets/img/sample-work/2.jpg`                           | Demo project portfolio                     | 255×198          |
| `public/images/portfolio/project-03.jpg`   | `PastDesign/assets/img/sample-work/3.jpg`                           | Demo project portfolio                     | 201×251          |
| `public/images/services/*.png`             | `PastDesign/assets/img/services/*.png`                              | Six category illustrations                 | 172–341px square |
| `public/images/trust/*.png`                | `PastDesign/assets/img/icon-services-auth/icons/icon-why-eng/*.png` | Three trust visuals                        | 172×172          |

The legacy celebrity portrait, 50×50 expert thumbnail, generic testimonial portraits, remote placeholder URLs, and the decorative join illustration (`PastDesign/assets/img/join-experts/Frame656.svg`) are deliberately not reused. The modern join CTA is typographic.

## Missing production images to provide

### Home expert portraits

Path: `public/images/experts/nazanin-farhadi.webp`

- Page/section: Home marketplace, service/search results, expert profile.
- Recommended size: 900×1125.
- Ratio: 4:5 portrait.
- Subject: Iranian woman architect in a real studio or construction-review setting.
- Composition: chest-up, direct but natural expression, uncluttered environmental background, safe crop around head and shoulders.
- Mood: credible, warm, premium documentary photography.
- Avoid: generic corporate headshot, hard beauty retouching, fake helmet pose, logos, text.
- Persian alt: `پرتره مهندس نازنین فرهادی، معمار و طراح داخلی`.

Path: `public/images/experts/amirhossein-rostami.webp`

- Page/section: Home marketplace, surveying service/search, expert profile.
- Recommended size: 900×1125.
- Ratio: 4:5 portrait.
- Subject: Iranian male land surveyor outdoors near surveying equipment.
- Composition: chest-up with total station softly visible in background.
- Mood: technical, trustworthy, natural daylight.
- Avoid: staged stock-photo handshake, brand marks, text.
- Persian alt: `پرتره مهندس امیرحسین رستمی، متخصص نقشه‌برداری`.

Path: `public/images/experts/mahdi-karimi.webp`

- Page/section: Home marketplace, execution service/search, expert profile.
- Recommended size: 900×1125.
- Ratio: 4:5 portrait.
- Subject: Iranian construction contractor at an active, safe job site.
- Composition: waist/chest-up, contextual structure visible, PPE used naturally.
- Mood: experienced, dependable, editorial.
- Avoid: unsafe site, fake logos, text.
- Persian alt: `پرتره مهدی کریمی، پیمانکار ساختمان`.

Path: `public/images/experts/sara-tavakoli.webp`

- Page/section: Home marketplace, permit/administrative service/search, expert profile.
- Recommended size: 900×1125.
- Ratio: 4:5 portrait.
- Subject: Iranian woman civil engineer reviewing permit drawings.
- Composition: chest-up, drawings/document context, clean office light.
- Mood: precise, calm, professional.
- Avoid: generic call-center imagery, visible private information, text.
- Persian alt: `پرتره مهندس سارا توکلی، کارشناس پروانه ساختمان`.

Until these files are supplied, the UI uses initials in designed avatar fallbacks; no broken `<img>` is emitted.

### Service editorial covers

Path: `public/images/services/land-surveying-cover.webp`

- Page/section: `/services/land-surveying` hero.
- Recommended size: 1440×900; ratio 8:5.
- Subject: Iranian surveyor using a total station on a real urban or land project.
- Composition: subject to the left side of the photograph so RTL copy can sit on the right; visible land/building context.
- Mood: crisp documentary realism, morning light, teal/orange details.
- Persian alt: `مهندس نقشه‌بردار در حال برداشت دقیق یک پروژه`.

Path: `public/images/services/construction-workers-cover.webp`

- Page/section: `/services/construction-workers` hero.
- Recommended size: 1440×900; ratio 8:5.
- Subject: skilled Iranian construction crew performing structural or finish work safely.
- Composition: active hands/work, one clear focal person, negative space at right.
- Mood: tactile, confident, authentic.
- Persian alt: `تیم استادکاران و پیمانکاران در کارگاه ساختمان`.

Path: `public/images/services/drawing-cover.webp`

- Page/section: `/services/drawing` hero.
- Recommended size: 1440×900; ratio 8:5.
- Subject: architect/engineer reviewing architectural, structural, electrical, and mechanical drawings.
- Composition: top/oblique desk scene with human presence and readable-but-nonprivate linework.
- Mood: exact, modern studio, natural material texture.
- Persian alt: `بررسی نقشه‌های معماری و مهندسی ساختمان`.

Path: `public/images/services/interior-design-cover.webp`

- Page/section: `/services/interior-design` hero.
- Recommended size: 1440×900; ratio 8:5.
- Subject: contemporary Iranian residential interior with architect reviewing material samples.
- Composition: architecture-first, human figure secondary, negative space at right.
- Mood: warm daylight, refined but attainable.
- Persian alt: `طراحی داخلی حرفه‌ای برای فضای مسکونی`.

Path: `public/images/services/building-permit-cover.webp`

- Page/section: `/services/building-permit` hero.
- Recommended size: 1440×900; ratio 8:5.
- Subject: engineer reviewing approved plans and building documentation at a project desk.
- Composition: documents without personal data, building model or site beyond.
- Mood: ordered, reliable, administrative clarity.
- Persian alt: `بررسی مدارک و نقشه‌های پروانه ساختمان`.

Path: `public/images/services/administrative-services-cover.webp`

- Page/section: `/services/administrative-services` hero.
- Recommended size: 1440×900; ratio 8:5.
- Subject: construction administration specialist organizing registry and municipal documents.
- Composition: professional workspace; no government marks or private data.
- Mood: calm, efficient, trustworthy.
- Persian alt: `کارشناس امور اداری ساختمان در حال بررسی پرونده`.

The implementation falls back to the appropriate local PastDesign banner or category illustration until these covers exist.

### Editorial and company imagery

Path: `public/images/about/team-site.webp`

- Page/section: `/about`, origin story.
- Recommended size: 1400×1050; ratio 4:3.
- Subject: small Iranian engineering team discussing drawings on a real job site.
- Composition: candid working moment, diverse professionals, room for crop.
- Mood: grounded, experienced, human.
- Persian alt: `تیم مهندسی در حال بررسی نقشه‌های یک پروژه ساختمانی`.

Path: `public/images/articles/permit-guide.webp`

- Page/section: article cards/detail for permit guidance.
- Recommended size: 1200×750; ratio 8:5.
- Subject: building plans, permit checklist, and architectural model.
- Composition: editorial still life without readable personal data.
- Mood: clean, informative, tactile.
- Persian alt: `مدارک و نقشه‌های مورد نیاز برای پروانه ساختمان`.

Path: `public/images/articles/interior-planning.webp`

- Page/section: article cards/detail for interior-design guidance.
- Recommended size: 1200×750; ratio 8:5.
- Subject: interior materials and plan review.
- Composition: layered samples, drawing, hand for scale.
- Mood: warm, contemporary editorial.
- Persian alt: `نمونه متریال و نقشه در فرایند طراحی داخلی`.

Missing editorial files use a semantic colored media surface rather than a broken image.
