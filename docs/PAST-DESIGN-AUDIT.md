# PastDesign audit

Audit date: 2026-09-05. Source: the complete `PastDesign/` tree (29 HTML files, 7 CSS files, 3 JavaScript files, local fonts, SVGs, PNGs, and JPGs). `PastDesign` is treated as a product/content reference only; none of its Bootstrap, CSS, or JavaScript is imported by the Next.js application.

## Executive summary

The legacy product is a Persian, RTL marketplace for finding engineers, contractors, and construction specialists and contacting them directly. Its defining product ideas are service-first discovery, city-aware filtering, visible professional trust signals, expert registration, practical engineering content, and direct contact. Its strongest visual identity is a vivid teal paired with a dark charcoal navy, with blue, orange, green, and a small set of category colors. The new application already has the correct App Router architecture and many semantic components, but several areas are empty or visually underdeveloped: the home marketplace list, all public mock catalog content, service-specific detail, imagery, article/FAQ/knowledge content, and the visual rhythm requested by this redesign.

## Complete page inventory and section audit

### Home

#### `PastDesign/index.html`

- Compact dark mobile-first header: menu, wordmark, and expert-membership CTA.
- Asymmetric headline/search hero with service search, city selection, construction-stage messaging, and expert-registration prompt.
- Six main service categories with distinctive local illustrations: surveying, contractor/craftspeople, drawing, facade/interior design, permits/completion, and administrative services.
- Three promotional construction banners.
- “What is Mohandes Man?” product explanation.
- Popular services rail: land/title surveying, plastering/masonry, registry administration, structural contracting, facade design, and building permits.
- Drawing consultation rail: architectural, structural, electrical, and mechanical drawings.
- “Why Mohandes Man?” trust benefits: comprehensive coverage, free/fast access, transparency, and qualification verification.
- Expert-registration CTA with illustration.
- Auto-scrolling experts showcase (concept retained; unsafe auto-scroll behavior is not).
- Customer-testimonial carousel and review-submission/OTP concepts.
- Knowledge-tip carousel.
- Footer grouped into engineering services, contractor services, resources, company, contact, social, and legal areas.
- Mobile drawer with all service, article, knowledge, legal, about, FAQ, and registration destinations.
- City selector with popular cities, province accordions, multi-select, selected chips, clear-all, and local persistence.
- Global search drawer with service taxonomy.
- FAQ category modal and ask-a-question modal.

Modern-app status: header, hero/search shell, six categories, trust, about/how-it-works, content links, FAQ entry, join CTA, and footer exist. The filterable marketplace list, imagery, popular-service content, drawing rail, experts showcase, knowledge preview, rich FAQ preview, and varied editorial composition were missing or empty before this task.

### Service discovery pages

All six pages share a reusable product pattern: service hero; search and city controls; category, experience, discipline, education, and professional-license filters; service-specialty disclosure; result count and selected city; expert cards; empty state; load more; service education; FAQ; related/featured experts; and the same city selector. Repeated surveying copy inside unrelated pages is a legacy content bug and must not be preserved.

#### `PastDesign/services/land-surveying.html`

- “Iran surveying engineers network” hero and trust statement.
- Surveying specialties: UTM/شمیم/سیماک and subdivision, apartment subdivision, drone surveying, as-built drawings, cadastral placement.
- Expert results, city state, empty result, and featured-experts rail.
- Filters: experience, surveying specialty, discipline, degree, engineering license, and city.
- Service-specific FAQ/content concerning UTM, cadastral location, pricing factors, boundary disputes, single-page title deeds, and as-built drawings.

#### `PastDesign/services/construction-workers.html`

- Combined marketplace with separate craftspeople and contractor tabs.
- Separate specialty disclosures and result lists for each side.
- City/filter controls, empty states, load-more actions, and FAQ areas.
- Intended concepts include excavation, stabilization, reinforcement, formwork, concrete/steel structure, ceilings, utilities, and finish work; some body copy is incorrectly copied from surveying.

#### `PastDesign/services/drawing.html`

- Four service tabs and result areas: architectural, structural, electrical, and mechanical drawing.
- Structural calculation subcategories and software-aware filtering concepts.
- Separate list/empty/FAQ regions per tab.
- The duplicated surveying FAQ/body content is not authoritative and is excluded.

#### `PastDesign/services/interior-design.html`

- Facade/interior hero and direct-specialist positioning.
- Service disclosure for facade, interior, and landscape design.
- Expert results with city and professional filters.
- Editorial explanations: what facade design is and who a facade designer is.
- The surveying specialty list accidentally embedded in the disclosure/filter UI is not carried forward.

#### `PastDesign/services/building-permit.html`

- Permit/completion-certificate hero.
- Intended service concepts: obtaining a building permit, completion certificate, municipal/rural-district administration, and required survey/as-built/apartment-subdivision documents.
- Expert discovery with city and professional filters.
- Editorial explanations: what a building permit and completion certificate are.
- The generic surveying filter content is a legacy mismatch and is not reused as permit taxonomy.

#### `PastDesign/services/construction-admin-services.html`

- Administrative-services hero.
- Intended concepts: permit/completion administration, title/registry work, land-use change, and Housing Foundation processes.
- Expert results with city and professional filters.
- Editorial explanations: what administrative services are and who performs them.
- Surveying content duplicated into the disclosure/filter body is not reused as administrative taxonomy.

Modern-app status: one reusable `/services/[slug]` route and service component existed, but it only showed an empty expert state, a short about paragraph, how-it-works, and related-service links. Rich service content, supported specialties, expert results, filter interaction, FAQ, and visual identity were missing.

### Expert profile

#### `PastDesign/resume.html`

- Profile actions: views, bookmark, share, contact, chat.
- Identity block: portrait, name, profession, active/verified states, city, and short introduction.
- Specialties, service cities, software, professional history, education, organization membership, license, and qualifications.
- Portfolio/gallery with thumbnails and next/previous viewing controls.
- Rating summary, review list, expert replies, positive/negative review filtering, and review form.
- Contact drawer for phone/SMS and a chat/file-attachment concept.
- Login/OTP gates around review submission.

Modern-app status: nearly every meaningful public profile field already has a typed component and responsive main/sidebar layout. The old chat, bookmark, and review mutation flows have no approved backend contract and remain classified as business/API work rather than simulated success. The redesign must enrich the visual hierarchy and supply centralized display fixtures without changing those boundaries.

### Expert registration

#### `PastDesign/auth/step1.html`

- Recruitment image and earnings-oriented message.
- Phone and ten-digit national ID fields, client validation, terms acknowledgement, and “register as specialist” CTA.

#### `PastDesign/auth/step2.html`

- Five-digit OTP, two-minute resend timer, edit-phone action, and code validation.

#### `PastDesign/auth/step3.html`

- Province and primary-city selection plus optional nearby cities and helper copy.

#### `PastDesign/auth/step4.html`

- Eight expertise families: surveying, permit, drawing, structural calculation/software design, craftspeople, contractors, facade/interior design, and administrative services.
- Nested expertise checkboxes and software selections (AutoCAD, Revit, Archicad, Civil 3D, Tekla, V-Ray, 3ds Max, SketchUp, Rhino, Lumion, ETABS, SAFE, SAP2000, CSI Bridge, and ANSYS).

#### `PastDesign/auth/step5.html`

- Review/remove selected expertise, add more, first/last name, read-only national ID, repeated activity location, and avatar upload/preview.

#### `PastDesign/auth/step6.html`

- Internal three-stage education flow: level branch, degree multi-selection, and one document upload per selected degree.

#### `PastDesign/auth/step7.html`

- Engineering Organization membership yes/no, membership number, employment-license status/number/file, discipline, and qualifications (design, supervision, execution where applicable).

#### `PastDesign/auth/step8.html`

- Years of experience and free-form professional resume.

#### `PastDesign/auth/step9.html`

- Multiple portfolio images, addable professional-certificate title/file rows, rules acceptance, and final submit.

Modern-app status: all canonical routes and fields exist in a guarded, typed wizard with honest unavailable-API errors. The architecture fixes several legacy problems: API mutations are not faked, OTP is an LTR island, uploads remain local until an API exists, steps are separate routes, and server success is required where appropriate.

### Articles

#### `PastDesign/articles/article-landing.html`

- Editorial header and article search.
- Category and sort controls.
- Most-viewed feature, recommended articles, latest articles, metadata, thumbnails, and all-articles CTA.

#### `PastDesign/articles/all-articles.html`

- Search, category/sort filters, all-articles heading, article result cards, and metadata.

#### `PastDesign/articles/article-sum.html`

- Compact filtered article-results variation; duplicate of the all-articles pattern and should merge into the canonical `/articles` component.

#### `PastDesign/articles/sample-article.html`

- Breadcrumbs, article hero image, title and introduction.
- Sticky/in-page table of contents.
- Long-form sections about UTM and title-deed surveying, comparison, conclusion, FAQ, service CTA, and related articles.

Modern-app status: hub, category, and detail routes/components exist but services intentionally return empty/null because no API contract existed. This redesign may use centralized mock display data, while keeping article access behind the service boundary.

### FAQ

#### `PastDesign/FAQs/landig-faq.html`

- Searchable FAQ landing page with visual service-category navigation.

#### `PastDesign/FAQs/faq-land-surveying.html`

- Ten accessible disclosure concepts covering surveying use, UTM, required documents, time, pricing factors, property size, cadastral placement, as-built maps, geographic availability, and requesting service.
- Related service CTA, all-category modal, and ask-a-question concept.

Modern-app status: canonical landing/category routes and an accessible accordion exist, but catalog services were empty. Question submission is not implemented because no mutation/API contract exists.

### Knowledge and forms

#### `PastDesign/knowledge/knowledge-category.html`

- Search and category selector.
- Six colorful knowledge categories: surveying/title deeds, permits, structure/calculation, facade/interior, execution/technical tips, and insurance/law.
- “Did you know?” preview, more-tips link, and related-experts CTA.

#### `PastDesign/knowledge/knowledge-surveying.html`

- Breadcrumb and category introduction.
- Numbered, readable tip list.
- Load-more action.
- Desktop sidebar with related-service CTA and other knowledge categories.

#### `PastDesign/knowledge/forms.html`

- Searchable/downloadable Engineering Organization forms by category and province.
- Categories shown: drawing registration/control, supervision, execution, and pre-issuance changes.
- Only one placeholder form row is present and no canonical modern route or file source is defined.

Modern-app status: knowledge landing/detail routes and types exist but return empty data. The forms library is **BUSINESS DECISION REQUIRED**: its canonical route, content ownership, document storage, province coverage, and download contract are unresolved.

### About and legal

#### `PastDesign/about-us/about-us.html`

- Brand introduction and “why” narrative.
- Origin story from real construction work to platform.
- Three-step operation model: find, compare, contact.
- Six service-domain coverage section with imagery.
- Organizational values: transparency, specialization, and direct connection.

#### `PastDesign/about-us/terms.html`

- Approved ten-article terms structure covering definitions, accounts, service use, payments, platform responsibilities, disputes, technical/IP terms, user content, restriction/termination, and distance agreement.

#### `PastDesign/about-us/privacy-policy.html`

- Approved seven-article privacy structure covering definitions, collected data, purposes, security, sharing/transfer, user rights, retention, and contact routes.

Modern-app status: About and legal routes already preserve this copy through config and reusable legal layout. They need the PastDesign-derived visual system and richer About composition, not invented claims or legal language.

## Reusable legacy product patterns

- Service-first search plus city context.
- Six stable service families with per-category icons and controlled accent colors.
- One reusable marketplace result card with portrait, profession, specialties, city, experience, rating, verified/active states, and profile CTA.
- Reusable service discovery shell with specialty tabs/chips, result summary, city selection, filters, empty state, FAQ, and education.
- City selector with popular cities, province grouping, multi-select, selected chips, and clear/reset.
- Expert profile information architecture and contact drawer.
- Nine-step registration workflow with progressive disclosure and uploads.
- Editorial page header/search/filter pattern across articles, FAQ, knowledge, and forms.
- Article card, FAQ category tile, knowledge category preview, tip row, content sidebar, and related-service CTA.
- Grouped global footer and mobile drawer.

## Legacy navigation structure

- Home.
- Services: surveying; contractors/craftspeople; drawing; facade/interior; permit/completion; administrative services.
- Expert registration.
- Articles.
- Knowledge base.
- Terms.
- About.
- FAQ with subcategories for the service families, general questions, specialist registration, and customer/employer registration.
- Footer additionally exposes selected engineering and execution specialties, support address/phones, social placeholders, privacy, and copyright.

The modern navigation keeps only canonical working routes. Placeholder `#` specialties and social profiles are not exposed.

## Color language

Values below come from `PastDesign/assets/css/main.css`; Bootstrap defaults were distinguished from custom product colors.

- Primary legacy teal: `#01BFA6`.
- Dark brand/navy: `#24313E` and editorial charcoal `#2B2D42`.
- Strong steel blue: `#669BBC`; darker companion `#4A7C9D`.
- Link/action blue: `#0D6EFD` / `#4361EE`.
- Orange accent: `#FF9F1C` / `#FF9500`; Bootstrap warning `#FFC107` is also frequent.
- Success green: `#198754`; bright support green `#06D6A0`.
- Information cyan/blue: `#0DCAF0`, `#118AB2`.
- Category support colors: coral `#EF476F`, pink `#E94FEE`.
- Backgrounds/surfaces: white `#FFFFFF`, pale gray `#F8F9FA`, blue-gray `#F0F4F8`, mint `#E8F7F3`.
- Text: `#212529`, `#24313E`, `#495057`; muted `#6B6B6B` / `#6C757D`.
- Borders: `#DEE2E6`, `#CCCCCC`, `#EEF0F2`.
- Error: `#DC3545` / `#F01414`.

## Typography, imagery, and CTA patterns

- Typography: local IRANSansWeb, generally small Bootstrap-derived sizes with many one-off `.font-*` utilities. Persian line-height is often acceptable in content but hierarchy is inconsistent. The modern app keeps local Kalameh FaNum and replaces ad-hoc sizes with semantic type tokens.
- Imagery: three 960×300 construction/architecture banners; six square service illustrations; three 172×172 trust illustrations; a join illustration; expert/avatar files; portfolio/project photos; one article/surveying image; and a large worker photo. Suitable project-owned local assets can be reorganized under `public/images/` and rendered with `next/image`.
- CTA hierarchy: search, choose city, view specialists/profile, contact, join as specialist, see more, related service, and read more. Legacy pages frequently show several competing Bootstrap primary buttons; the redesign establishes primary/secondary/outline/ghost roles.

## Content and workflow coverage in the modern app

Already implemented before redesign: all required routes, thin pages, service taxonomy, search query parsing, service matching, responsive header/footer/menu/search/city shells, expert profile component coverage, guarded registration steps, form validation and upload boundaries, article/FAQ/knowledge shells, legal documents, loading/error/empty primitives, 404 pages, and development review pages.

Missing or redesign-required before this task: centralized display data, visible expert marketplace on Home, supported Home filters, populated service/category/article/FAQ/knowledge content, richer service detail architecture, real image treatment, colorful category identity, stronger Home rhythm, editorial hierarchy, consistent page backgrounds, and a visual QA catalogue matching the new identity.

## Legacy implementation problems not to copy

- Bootstrap and multiple icon-font systems mixed with large monolithic global CSS.
- Repeated IDs, duplicate `alt` attributes, missing alt text, placeholder remote images, and many `href="#"` links.
- Direct inline event handlers, global DOM mutation, global body classes, repeated `DOMContentLoaded` blocks, and implicit Bootstrap globals.
- Repeated markup and service pages containing copied surveying specialties/FAQ text unrelated to the service.
- Fake counts, professionals, success states, phone numbers, testimonials, ratings, and OTP/review flows presented as real.
- An obviously unrelated celebrity image used as an engineer profile.
- Inconsistent OTP lengths (registration five digits, review gate four digits), hard-coded phone/national-ID values, and resend links that navigate to the next step.
- Invalid modal/offcanvas usage, inaccessible clickable `div` controls, `alert()` validation, dead buttons, and fragile selectors.
- Hard-coded city lists, mismatched province/city data, unbounded localStorage assumptions, and unsupported production filters.
- Tiny text, inconsistent spacing/radii, overuse of cards/shadows, accidental rainbow colors, and desktop structures simply compressed for mobile.
- Remote placeholder hotlinks and image slots that can break.
- Engineering forms with no real downloadable document contract.
