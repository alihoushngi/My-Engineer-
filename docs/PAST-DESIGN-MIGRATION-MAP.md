# PastDesign migration map

Every legacy HTML page and meaningful product section is classified below. Status terms are intentionally limited to: **MIGRATE**, **MERGE**, **MODERNIZE**, **REUSE CONTENT**, **ALREADY IMPLEMENTED**, and **NOT APPLICABLE** (with a reason). Unresolved scope is additionally marked **BUSINESS DECISION REQUIRED**.

## Global patterns

| Legacy source / section                                  | New destination                                     | Implementation                                        | Status                                                            |
| -------------------------------------------------------- | --------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------------------- |
| All pages / brand, Persian RTL, teal/navy color language | Entire app                                          | semantic tokens, Kalameh FaNum, RTL layout            | MODERNIZE                                                         |
| `index.html` / compact header and mobile drawer          | all storefront routes                               | `StoreHeader`, `HeaderNavigation`, `MobileNavigation` | MODERNIZE                                                         |
| `index.html` / global service search                     | header, `/`, `/search`                              | `SearchSurface`, `SearchInput`, URL query             | ALREADY IMPLEMENTED + MODERNIZE                                   |
| Home + service pages / city selector                     | `/`, `/search`, service discovery                   | city filter controls using supported mock catalog     | MIGRATE                                                           |
| Home + service pages / six service families              | `/`, `/services/[slug]`, navigation/footer          | service config and category components                | ALREADY IMPLEMENTED + MODERNIZE                                   |
| Home + service pages / expert listing card               | `/`, `/search`, `/services/[slug]`, related experts | shared `ExpertCard`                                   | MODERNIZE                                                         |
| `index.html` / grouped footer                            | all storefront routes                               | `StoreFooter`                                         | MODERNIZE                                                         |
| Placeholder social URLs                                  | footer                                              | none until real profiles exist                        | NOT APPLICABLE — links are `#` and unsupported                    |
| Legacy support address and phones                        | footer                                              | omit pending approved contact source                  | NOT APPLICABLE — current product config does not approve them     |
| Customer testimonial/review submission + OTP             | Home                                                | omit transactional form                               | NOT APPLICABLE — fake testimonials and no review/OTP API contract |

## Home (`PastDesign/index.html` → `/`)

| Legacy section                                                      | Implementation                                                       | Status                                      |
| ------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------- |
| Search/city hero and construction message                           | `HomeHero` with Swiper visual, search, city, and join                | MODERNIZE                                   |
| Six illustrated categories                                          | Shared `ServiceCategoryGrid` / `GlassInfoCard` on Home and About     | MODERNIZE                                   |
| Marketplace result immediately below categories                     | `HomeMarketplace` with category, city, expertise, and page size 9    | MIGRATE                                     |
| Banner carousel                                                     | Merged into the first-section Swiper (`homeHeroSlides`)              | MERGE                                       |
| “What is Mohandes Man?”                                             | `HomeNarrative`                                                      | REUSE CONTENT + MODERNIZE                   |
| Popular services                                                    | `PopularServices` driven by central display data                     | MIGRATE                                     |
| Drawing consultation (architecture/structure/electrical/mechanical) | `DrawingConsultation`                                                | MIGRATE                                     |
| Why/trust benefits                                                  | `WhyMohandesMan`                                                     | REUSE CONTENT + MODERNIZE                   |
| Join experts                                                        | `JoinCtaSection`                                                     | MODERNIZE                                   |
| Auto-scrolling expert portraits                                     | Featured discovery lives in `HomeMarketplace`; no forced auto-scroll | MERGE                                       |
| Knowledge tip carousel                                              | `HomeKnowledgeTips` Swiper from catalog tips                         | MERGE                                       |
| Article/resource preview                                            | `ContentHighlights` linking to `/articles`, `/knowledge`, `/faq`     | MIGRATE                                     |
| FAQ category modal                                                  | Accessible FAQ category tiles + `/faq` CTA (`HomeFaqEntry`)          | MERGE                                       |
| Duplicate testimonial slides                                        | One unique quote in `HomeTestimonials`                               | MERGE                                       |
| Ask-question modal                                                  | none                                                                 | NOT APPLICABLE — no submission API contract |
| Home review form + OTP                                              | Honest “coming after API” note only                                  | NOT APPLICABLE — no review/OTP API contract |

## Service pages (all → `/services/[slug]`)

All service pages migrate to one reusable `ServiceDiscoveryPage` architecture with per-service content from the data boundary: hero, specialty modules, URL-driven filters, result summary, paginated expert results, empty state, process, service information, FAQ, and related services.

| Legacy page / section                                                                                          | New slug / implementation                     | Status                                        |
| -------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | --------------------------------------------- |
| `services/land-surveying.html` / hero, surveying specialties, experts, filters, FAQ, featured experts          | `land-surveying`                              | MIGRATE                                       |
| Shared service filters: city, skill, experience, license, discipline, degree                                   | `service-filters.config` + marketplace sheet  | MIGRATE + MODERNIZE                           |
| Surveying 3-band vs other 4-band experience radios                                                             | per-slug `experienceBands`                    | MIGRATE                                       |
| `services/construction-workers.html` / craftsperson and contractor tabs/lists                                  | `construction-workers` tabs                   | MIGRATE + MERGE                               |
| `services/construction-workers.html` / copied surveying FAQ and skill radios                                   | none; worker specialties from current catalog | NOT APPLICABLE — incorrect duplicated content |
| `services/drawing.html` / architecture, structural, electrical, mechanical tabs and software concepts          | `drawing` tabs; structure skill radios        | MIGRATE                                       |
| `services/drawing.html` / repeated surveying descriptions and FAQ                                              | none                                          | NOT APPLICABLE — incorrect duplicated content |
| `services/interior-design.html` / facade/interior/landscape specialties and education                          | `interior-design`                             | MIGRATE                                       |
| `services/interior-design.html` / surveying filter items                                                       | interior specialties from current catalog     | NOT APPLICABLE — incorrect taxonomy           |
| `services/building-permit.html` / permits, completion, municipal work, required drawings                       | `building-permit`                             | MIGRATE                                       |
| `services/building-permit.html` / generic surveying filter list                                                | permit specialties from current catalog       | NOT APPLICABLE — incorrect taxonomy           |
| `services/construction-admin-services.html` / registry, municipal, land-use, Housing Foundation administration | `administrative-services`                     | MIGRATE                                       |
| Legacy unwired “load more” on result lists                                                                     | page-size 9 pagination preserving filters     | MODERNIZE                                     |
| Legacy route name `construction-admin-services.html`                                                           | canonical `/services/administrative-services` | MERGE                                         |

## Expert profile (`PastDesign/resume.html` → `/experts/[id]`)

| Legacy section                                           | Implementation                                  | Status                                            |
| -------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------- |
| Portrait, name, profession, city, verified/active        | `ExpertProfileHero`, `ExpertStatusBadges`       | MODERNIZE                                         |
| Views, experience, degree, license competencies          | Hero + `ExpertQuickFacts`                       | MIGRATE + MODERNIZE                               |
| Share                                                    | `ExpertShareButton`                             | ALREADY IMPLEMENTED                               |
| Bookmark                                                 | `ExpertLegacyFeature` honest unavailable        | MODERNIZE — no customer-account contract          |
| Specialties and service cities                           | `ExpertSpecialties`, `ExpertTagSection`         | ALREADY IMPLEMENTED + MODERNIZE                   |
| Software, education, membership, license, qualifications | `ExpertProfessionalInfo`                        | ALREADY IMPLEMENTED + MODERNIZE                   |
| Certificates / فنی حرفه‌ای mention                       | `ExpertCertificates` text list                  | MIGRATE                                           |
| Professional history/about                               | `ExpertExperience`, `ExpertAbout`               | ALREADY IMPLEMENTED + MODERNIZE                   |
| Portfolio gallery + lightbox, thumbs, count              | `ExpertPortfolio` Drawer/Dialog                 | MODERNIZE                                         |
| Reviews, stars, tags, expert reply, load more            | `ExpertReviews` with page size 9                | MIGRATE + MODERNIZE                               |
| Review submission/auth modal                             | Honest unavailable sheet                        | NOT APPLICABLE — no mutation/auth contract        |
| Phone/SMS drawer and sticky mobile contact               | `ExpertContactDrawer`, `ExpertStickyContactBar` | ALREADY IMPLEMENTED + MODERNIZE                   |
| Chat and file attachment                                 | Honest unavailable sheet                        | NOT APPLICABLE — no chat/auth/upload API contract |
| Related experts                                          | `RelatedExperts`                                | MIGRATE                                           |

## Registration (`PastDesign/auth/step1.html` … `step9.html`)

| Legacy page / section                                         | New route / implementation                                           | Status                                              |
| ------------------------------------------------------------- | -------------------------------------------------------------------- | --------------------------------------------------- |
| `step1.html` / recruitment context, phone, national ID, terms | `/expert-registration`, `IdentityStep`                               | ALREADY IMPLEMENTED + MODERNIZE                     |
| `step2.html` / five-digit OTP, timer, resend, edit phone      | `/expert-registration/otp`, `OtpStep`                                | ALREADY IMPLEMENTED + MODERNIZE                     |
| `step3.html` / province, city, nearby cities                  | `/expert-registration/service-area`, `ServiceAreaStep`               | ALREADY IMPLEMENTED + MODERNIZE                     |
| `step4.html` / category sheets, expertise, software           | `/expert-registration/expertise`, `ExpertiseStep`                    | ALREADY IMPLEMENTED + MODERNIZE                     |
| `step5.html` / selected specialties                           | `/expert-registration/expertise` and personal-info summary           | MERGE                                               |
| `step5.html` / name, read-only ID, avatar                     | `/expert-registration/personal-info`, `PersonalInfoStep`             | ALREADY IMPLEMENTED + MODERNIZE                     |
| `step5.html` / duplicate province/city                        | none                                                                 | NOT APPLICABLE — service area is owned by step 3    |
| `step6.html` / level, degrees, document uploads               | `/expert-registration/education`, `EducationStep`                    | ALREADY IMPLEMENTED + MODERNIZE                     |
| `step7.html` / membership and professional license            | `/expert-registration/engineering-organization`, `OrganizationStep`  | ALREADY IMPLEMENTED + MODERNIZE                     |
| `step8.html` / years and resume                               | `/expert-registration/professional-resume`, `ProfessionalResumeStep` | ALREADY IMPLEMENTED + MODERNIZE                     |
| `step9.html` / portfolio images, certificates, rules, submit  | `/expert-registration/portfolio`, `PortfolioStep`                    | ALREADY IMPLEMENTED + MODERNIZE                     |
| Post-submit state                                             | `/expert-registration/complete`, `RegistrationComplete`              | ALREADY IMPLEMENTED; API-dependent                  |
| Legacy inline fake success/navigation                         | none                                                                 | NOT APPLICABLE — backend success is never simulated |

## Articles

| Legacy page / section                                                                | New destination / implementation        | Status                                |
| ------------------------------------------------------------------------------------ | --------------------------------------- | ------------------------------------- |
| `articles/article-landing.html` / editorial header, most-viewed, recommended, latest | `/articles`, `ArticlesPage`             | MIGRATE + MODERNIZE                   |
| `articles/all-articles.html` / all results, search, category, sort                   | `/articles`                             | MERGE                                 |
| `articles/article-sum.html` / compact result variation                               | `/articles`                             | MERGE — duplicate listing concept     |
| `articles/sample-article.html` / breadcrumb, cover, title, metadata, long form       | `/articles/[slug]`, `ArticleDetailPage` | MIGRATE                               |
| Article table of contents                                                            | `ArticleToc`                            | ALREADY IMPLEMENTED + MODERNIZE       |
| Article FAQ                                                                          | detail page accessible accordion        | MIGRATE                               |
| Related service and related articles                                                 | `RelatedArticles` + service CTA         | ALREADY IMPLEMENTED + MODERNIZE       |
| Category selection                                                                   | `/articles/categories/[slug]`           | ALREADY IMPLEMENTED + MIGRATE CONTENT |

## FAQ

| Legacy page / section                                    | New destination / implementation                      | Status                                           |
| -------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------ |
| `FAQs/landig-faq.html` / search and service categories   | `/faq`, `FaqLandingPage`                              | MIGRATE + MODERNIZE                              |
| `FAQs/faq-land-surveying.html` / ten surveying questions | `/faq/land-surveying`, `FaqCategoryPage`              | REUSE CONTENT                                    |
| Related service CTA                                      | category page                                         | MIGRATE                                          |
| Category modal                                           | inline responsive category navigation                 | MERGE                                            |
| Ask-a-question modal                                     | none                                                  | NOT APPLICABLE — no question-submission contract |
| Placeholder FAQ links for other domains                  | category fixtures with supported legacy concepts only | MODERNIZE; no invented answers                   |

## Knowledge and engineering forms

| Legacy page / section                                                       | New destination / implementation                                | Status                                                                                                      |
| --------------------------------------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `knowledge/knowledge-category.html` / six colorful categories and previews  | `/knowledge`, `KnowledgeLandingPage`                            | MIGRATE + MODERNIZE                                                                                         |
| `knowledge/knowledge-surveying.html` / numbered tips                        | `/knowledge/land-surveying`, `KnowledgeCategoryPage`            | REUSE CONTENT                                                                                               |
| Related service CTA and other-category sidebar                              | knowledge detail layout                                         | MIGRATE                                                                                                     |
| Load more                                                                   | static fixture renders available tips; pagination only with API | NOT APPLICABLE — no pagination contract                                                                     |
| `knowledge/forms.html` / forms search, province/category filters, downloads | unresolved                                                      | BUSINESS DECISION REQUIRED — canonical route, data ownership, document files, and download API do not exist |

## About and legal

| Legacy page / section                                                     | New destination / implementation | Status                                       |
| ------------------------------------------------------------------------- | -------------------------------- | -------------------------------------------- |
| `about-us/about-us.html` / why, story, how, services, values              | `/about`, `AboutPage`            | REUSE CONTENT + MODERNIZE                    |
| Service illustrations                                                     | About service band               | MIGRATE where image quality supports it      |
| `about-us/terms.html` / ten legal articles                                | `/terms`, `LegalPage`            | ALREADY IMPLEMENTED + REUSE CONTENT          |
| `about-us/privacy-policy.html` / seven privacy articles + contact heading | `/privacy-policy`, `LegalPage`   | ALREADY IMPLEMENTED + REUSE CONTENT          |
| Unverified legal/contact additions                                        | none                             | NOT APPLICABLE — do not invent legal wording |

## Pages without a PastDesign equivalent

| Current route/state          | Design derivation                                                                                  | Status    |
| ---------------------------- | -------------------------------------------------------------------------------------------------- | --------- |
| `/search` full result page   | Home/service marketplace language, URL filters, active chips, summary, results, empty/error states | MODERNIZE |
| `/dev/redesign-review`       | new PastDesign-derived token and component catalogue                                               | MODERNIZE |
| Global/app route 404         | dark navy/teal utility composition                                                                 | MODERNIZE |
| Loading and error boundaries | semantic surface, skeleton, alert, retry language                                                  | MODERNIZE |
| Registration complete route  | same registration shell; honest API-dependent state                                                | MODERNIZE |

## Final coverage decision

All 29 legacy HTML files are represented in this map. The only meaningful legacy product area without a canonical destination is the downloadable Engineering Organization forms library, explicitly marked **BUSINESS DECISION REQUIRED**. Placeholder social links, fake review/auth success, chat, bookmark, and copied cross-service content are explicitly excluded rather than silently dropped.
