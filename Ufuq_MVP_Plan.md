# Ufuq (Ø£ÙÙ‚): MVP Plan, Epics and Stories (v9)

> **Product name:** Ufuq (Ø£ÙÙ‚), selected from the shortlist in Appendix A. Trademark, domain, and handle checks are still pending (name clearance outstanding; see Open Decisions).
> **Purpose:** Product definition, ordered epics and stories, and reference material for the MVP.
> **Convention:** **[Proposed]** = recommended default awaiting confirmation. **[Decision]** = locked.

---

## 1. Product Summary

**The product turns PDFs into interactive learning experiences.**

A learner uploads a document. The product understands its content, identifies the concepts that matter, chooses a suitable way to teach them, grounds everything in the source pages, and creates an interactive experience the learner can explore and revisit.

### 1.1 Principles

1. **Learning through exploration:** interact with ideas, not only read about them.
2. **The right format for the topic:** AI picks a suitable visual and interaction format per concept.
3. **PDF-first:** PDF is the only source in the MVP.
4. **Automatic creation:** minimal configuration from the learner.
5. **All ages:** welcoming and playful without looking childish.
6. **Bilingual from day one:** English and Arabic, with proper RTL.
7. **Safe rendering:** AI produces structured data; the app renders it with trusted components. No AI-generated code is ever executed.
8. **Grounded in the source:** every explanation traces back to pages in the document.
9. **Resume anywhere:** learners return to saved experiences.

### 1.2 Not in the MVP

A PDF summarizer, a quiz or flashcard generator, a document chat interface, or a platform that executes AI-generated code.

### 1.3 Success metrics

| Metric | Initial target |
|---|---|
| Upload-to-first-section completion rate | >= 70% of started uploads |
| Generation success rate (supported PDFs) | >= 90% |
| Experience completion rate (>= 80% of sections viewed) | Baseline from first cohort |
| Return within 7 days | Baseline from first cohort |
| Thumbs-up rate | >= 70% |
| "Report a problem" rate | < 5% of experiences |
| Cost per experience | Within an agreed cost budget (to be set; see Open Decisions) |
| "Did this help you understand?" (1 tap) | Baseline from first cohort |

### 1.4 Confirmed decisions

| Area | Decision |
|---|---|
| Product name | Ufuq (Ø£ÙÙ‚), pending clearance checks |
| Audience | All ages (subject to the age policy; undecided — see Open Decisions) |
| Source | PDF uploads only |
| Experience | Combination of visual formats and interactions, chosen by AI |
| Accounts | Independent learner accounts |
| Languages | English and Arabic, LTR and RTL |
| Frontend | Angular + TypeScript (standalone components, signals) |
| Backend | TypeScript (NestJS) |
| Monorepo | Nx |
| UI i18n | Transloco (runtime translations), not Angular's build-time per-locale builds |
| Authentication | JWT via NestJS and Passport: short-lived access token plus rotating refresh token |
| API style | REST (JSON) with an OpenAPI contract, versioned under `/v1` |
| Rendering | Client-side rendered Angular app (no SSR). SSR is set aside and will be revisited by the owner later |
| Visual direction | Sunshine Creative: light surfaces, vibrant accents |
| Brand colors | Sunshine Yellow (primary), Turquoise (supporting) |
| Personality | Playful, balanced, mature |

### 1.5 Proposed defaults (decisions outstanding; see Open Decisions)

| Area | Proposal |
|---|---|
| Limits | 25 MB, 150 pages |
| OCR | Not in MVP; detect scanned PDFs and explain clearly |
| Minimum age | 13+; under-13 with parental consent deferred (confirm with counsel) |
| Component set | Generic data-driven primitives (Appendix D); 3D deferred |
| Regeneration | Allowed, about 2 per document, optional reason |
| Free tier | Monthly generation quota set from cost data (benchmark outstanding) |
| Output language | Follows learner preference; source terms kept in brackets when useful |
| Sign-in methods | Email + password with verification, plus Google sign-in; Apple sign-in if iOS web users matter |
| Dark theme | Deferred; tokens stay theme-ready |
| Progress updates | Polling the stage status endpoint (every 2 to 3 seconds with backoff) through one Angular service, so it can be swapped for SSE later |

---

## 2. Epic Overview

| # | Epic | Goal | Depends on |
|---|---|---|---|
| E1 | Platform Foundation | Deployable skeleton with tokens, i18n, RTL | none |
| E2 | Accounts, Age Policy and Legal | Secure sign-up under the chosen policy | E1 |
| E3 | PDF Upload and Management | Upload, preview, list, delete PDFs | E2 |
| E4 | Extraction Pipeline | Stored PDF becomes a structured document model | E3 |
| E5 | AI Understanding and Generation | Document model becomes a validated, grounded experience | E4 |
| E6 | Interactive Learning Player | Render any valid experience accessibly | E5 (can start earlier with hand-authored data) |
| E7 | Library, Progress and Feedback | Return, resume, regenerate, measure | E6 |
| E8 | Quality, Safety and Launch | Controlled, safe launch | E7 |

**Definition of done (every story):** acceptance criteria met; tests written and passing; works in English LTR and Arabic RTL; keyboard accessible; loading, empty, and error states handled; no document content in logs; reviewed and merged with CI green.

---

# 3. EPICS AND STORIES

---

## E1: Platform Foundation

**Goal:** A working, deployable skeleton with design tokens, i18n, and RTL built in from the start.

### E1-S1: Nx workspace setup
**As** a developer, **I want** an Nx monorepo with shared libraries, **so that** one schema is the source of truth and builds stay fast.
- Apps: `web` (Angular), `api` (NestJS), `web-e2e` (Playwright).
- Libraries: `shared/schema` (Zod), `shared/i18n`, `web/ui` (design system), `web/player` (player components), `eval`.
- Module-boundary lint rules enforced with Nx tags (for example, `web` libraries cannot import `api` libraries; only `shared` libraries are imported by both).
- Both apps import the shared schema library.
- Nx affected commands and caching used in CI.

### E1-S2: CI and environments
**As** a developer, **I want** automated checks and separate environments, **so that** changes ship safely.
- CI runs lint, type-check, unit tests, and build on every PR, using Nx affected commands and caching.
- Local, staging, and production environments exist.
- Secrets are stored outside source control.

### E1-S3: Database and storage baseline
**As** a developer, **I want** PostgreSQL, Prisma, Redis, and object storage configured, **so that** features can persist data and run jobs.
- Prisma migrations run in CI and deploys.
- Local emulators for storage and Redis.

### E1-S4: Design tokens and theming
**As** a designer, **I want** tokens implemented in code, **so that** all components share one visual language.
- Brand tokens from Appendix B in place.
- Structure allows a future dark theme without rewriting components.
- Semantic tokens (success, warning, error, info) defined and contrast-tested.

### E1-S5: i18n and RTL foundation
**As** a learner, **I want** English and Arabic with correct direction, **so that** the product feels native.
- `dir` set per language; CSS logical properties used throughout.
- Translation workflow for English and Arabic using Transloco (runtime translations), so language can switch without a rebuild.
- Angular CDK bidi (`Directionality`) used for direction-aware components; `dir` and `lang` set on the document root.
- A sample page verified in LTR and RTL.

### E1-S6: Base component library
**As** a developer, **I want** shared buttons, inputs, cards, modals, navigation, and progress components, **so that** screens are consistent.
- Every component supports focus states, keyboard use, and RTL.
- Built as Angular standalone components on top of Angular CDK primitives (a11y, overlay, focus management).
- Documented in Storybook (Angular) or an equivalent.

### E1-S7: Observability and analytics layer
**As** the team, **I want** logging, error tracking, and an event layer, **so that** problems and usage are visible.
- Structured logs contain no document content or unnecessary personal data.
- Error tracking connected.
- Event tracking helper in place (event list in Appendix G).

### E1-S8: REST API contract and conventions
**As** a developer, **I want** one documented REST contract, **so that** the Angular app and the API never drift apart.
- Resource-style REST endpoints with JSON, versioned under `/v1`.
- OpenAPI document generated from the NestJS code, with request validation backed by the shared Zod schemas; a typed Angular client is generated from it in CI.
- Consistent error format (problem-details style: `type`, `title`, `status`, `detail`, `code`) with machine-readable codes the UI can localize.
- Pagination, filtering, and idempotency-key conventions for upload and generation endpoints.
- Breaking changes require a new version or a deprecation period.

### E1-S9: Logo, wordmarks, and brand sheet
**As** the business, **I want** a finished logo and brand sheet, **so that** every screen and channel looks consistent.
- Logo mark, plus Latin and Arabic wordmarks designed as a pair, in horizontal and stacked lockups.
- Favicon, app icon, and social share image.
- Clear-space and minimum-size rules; approved color variants (full color, one color, on yellow, on white).
- Delivered as SVG and approved before the landing page is built.

### E1-S10: Icon and illustration set
**As** a designer, **I want** a consistent icon and illustration set, **so that** screens and generated experiences share one visual language.
- Icon set covering navigation, upload, status, player controls, and the icons used by the component catalog (for example sun, cloud, rain).
- Directional icons have RTL variants; non-directional icons are not mirrored.
- Simple geometric spot illustrations for empty states, errors, and the landing page.
- Delivered as SVG in the shared design-system library.

**Epic exit criteria**
- [ ] Web, API, and services run locally with one command.
- [ ] A page renders correctly in LTR and RTL.
- [ ] CI is green and staging is deployed.

---

## E2: Accounts, Age Policy and Legal

**Goal:** Learners can securely sign up and sign in under the age policy (undecided; see Open Decisions).

### E2-S1: Sign up
**As** a new learner, **I want** to create an account, **so that** my uploads and progress are saved.
- Minimal fields; clear validation and errors.
- Language selection at sign-up.
- Works in LTR and RTL.

### E2-S2: Email verification
**As** a learner, **I want** to verify my email, **so that** my account is secure and recoverable.
- Verification email sent in the learner's language.
- Unverified accounts have defined, limited access.
- Resend with rate limiting.

### E2-S3: Sign in and sign out (JWT)
**As** a learner, **I want** to sign in and out securely, **so that** only I can access my account.
- API issues a short-lived access token (proposal: 15 minutes) and a rotating refresh token (proposal: 7 to 30 days). Access tokens cannot be revoked mid-lifetime, which is why they stay short.
- The access token is kept in memory in the Angular app and sent in the `Authorization` header; it is never stored in `localStorage`.
- The refresh token is an `httpOnly`, `Secure`, `SameSite` cookie, stored hashed on the server, rotated on every use, with reuse detection that revokes the whole token family.
- The refresh endpoint is protected against CSRF.
- An Angular HTTP interceptor attaches the token and silently refreshes on 401 with a single in-flight refresh; route guards protect signed-in routes.
- Sign out revokes the refresh token server-side and clears the cookie; "sign out of all devices" is available in settings.
- Passwords hashed with Argon2; brute-force protection and rate limits on sign-in.
- Tests cover expiry, rotation, reuse detection, and revocation.

### E2-S4: Password recovery
**As** a learner, **I want** to reset a forgotten password, **so that** I can regain access.
- Time-limited, single-use reset link.
- Localized reset email.
- No account-existence leakage in messages.
- All existing refresh tokens are revoked after a password reset.

### E2-S5: Social sign-in
**As** a learner, **I want** to sign in with Google, **so that** sign-up is faster.
- Account linking rules defined.
- Google sign-in is handled by the API, which then issues the same JWT access and refresh tokens as email sign-in.
- Apple sign-in added if iOS web users are a target.

### E2-S6: Age gate and consent
**As** the business, **I want** the age policy enforced at sign-up, **so that** we comply with privacy rules.
- Age or age-band collected only as the policy requires.
- Under-minimum users are blocked with a clear message.
- Consent records stored with the policy version.
- Parental-consent flow built only if under-13 is in scope.

### E2-S7: Learner profile
**As** a learner, **I want** to manage my profile and preferences, **so that** the product fits me.
- Display name, language, accessibility preferences (reduced motion, text size).
- Language change applies immediately and persists.

### E2-S8: Authorization boundaries
**As** a learner, **I want** my data to be private, **so that** nobody else can access it.
- Every API resource is scoped to its owner.
- Automated tests prove cross-user access is denied.

### E2-S9: Account deletion and data export
**As** a learner, **I want** to delete my account and export my data, **so that** I control my information.
- Deletion removes PDFs, extracted data, experiences, and progress per the retention policy.
- All sessions and refresh tokens are revoked on deletion.
- Export delivers account data in a readable format.

### E2-S10: Legal and support pages
**As** a visitor, **I want** to read the terms, privacy policy, copyright and takedown process, and contact details, **so that** I understand my rights.
- Pages available in English and Arabic.
- Linked from footer, sign-up, and upload.
- Privacy policy discloses AI processing by a third-party provider.

### E2-S11: Landing page
**As** a visitor, **I want** to understand the product quickly, **so that** I choose to start.
- Hero with value proposition, primary CTA, and secondary "explore an example".
- How it works (upload, understand, explore), example topics, benefits, footer.
- Bright, spacious design with yellow primary CTA; avoids clutter and a childish look.
- The landing page is client-rendered for now; it sets its page title and meta tags and keeps its bundle small so it loads fast. SSR or prerendering can be added later if search visibility matters.

**Epic exit criteria**
- [ ] Full auth journey works in both languages.
- [ ] Age gate enforces the chosen policy.
- [ ] Cross-user access tests pass.
- [ ] Account deletion verified.

---

## E3: PDF Upload and Management

**Goal:** Learners can upload, preview, list, and delete PDFs safely.

### E3-S1: Dashboard shell
**As** a learner, **I want** a clear starting point, **so that** I know what to do next.
- Welcome, prominent upload action, empty state for new learners.
- Continue-learning and recent sections appear once data exists.

### E3-S2: Upload interface
**As** a learner, **I want** to drag and drop or browse for a PDF, **so that** uploading is easy.
- File constraints (size, pages, type) visible before upload.
- Upload progress shown.
- Learner must accept the upload-rights terms.

### E3-S3: Upload validation
**As** the system, **I want** to reject invalid files, **so that** bad input never enters the pipeline.
- Validates MIME type, extension, magic bytes, size, page count, and encryption.
- Clear, specific error messages for each case.

### E3-S4: Secure storage and access
**As** a learner, **I want** my files kept private, **so that** only I can view them.
- Direct-to-storage upload via signed URLs.
- Files private by default; access URLs are signed and time-limited.

### E3-S5: Malware and unsafe-content scanning
**As** the system, **I want** to scan uploads, **so that** malicious files are blocked.
- Infected or suspicious files rejected and not retained.
- Scan failures handled safely.

### E3-S6: PDF preview and metadata
**As** a learner, **I want** to preview my PDF and see its title and page count, **so that** I can confirm it is the right file.
- Preview renders on desktop and mobile.
- Title editable.
- **Output language** selectable before starting.

### E3-S7: Quotas and rate limits
**As** the business, **I want** upload limits enforced, **so that** cost stays under control.
- Per-user quota checked at upload; remaining usage shown.
- Rate limits applied to upload endpoints.

### E3-S8: Delete a document
**As** a learner, **I want** to delete a PDF, **so that** I control my content.
- Deletes the file, derived data, and linked experiences after confirmation.
- Deletion follows the retention policy.

**Epic exit criteria**
- [ ] Valid PDFs upload and preview; invalid ones fail with clear messages.
- [ ] Files are private and URLs expire.
- [ ] Quotas and rate limits work.

---

## E4: Extraction Pipeline

**Goal:** Turn a stored PDF into clean, structured, page-referenced content.

### E4-S1: Background job infrastructure
**As** the system, **I want** reliable asynchronous jobs, **so that** the app stays responsive.
- BullMQ jobs with stages, retries, timeouts, and idempotency.
- No duplicate jobs per document.
- Failed jobs are observable and recoverable.

### E4-S2: Text and reading-order extraction
**As** the system, **I want** accurate text in correct reading order, **so that** AI receives clean input.
- Uses the PDF extraction approach (undecided; spike outstanding; see Open Decisions).
- Arabic shaping and direction verified on the spike set.

### E4-S3: Structure detection
**As** the system, **I want** headings and sections identified, **so that** content can be organized.
- Headings, sections, and paragraphs with page references.
- Documents with no clear structure degrade gracefully.

### E4-S4: Figures, tables, and formulas
**As** the system, **I want** figures, tables, and formulas handled, **so that** key content is not lost.
- Figures and captions extracted or referenced by page region.
- Tables extracted as structured data or read via a vision-capable model.
- Formula handling strategy implemented as decided (undecided; see Open Decisions).

### E4-S5: Scanned and unsupported detection
**As** a learner, **I want** a clear message when my PDF cannot be read, **so that** I know what to do.
- Scanned or image-only PDFs detected.
- A specific failure reason and next step shown; no broken experience created.

### E4-S6: Document model
**As** the system, **I want** a normalized document model, **so that** the AI pipeline has one input format.
- Pages, sections, paragraphs, figures, and tables with page references.
- Extractor version stored.
- Schema defined in the shared package.

### E4-S7: Chunking for long documents
**As** the system, **I want** long documents split into overlapping chunks, **so that** they fit model limits.
- Chunk boundaries follow sections where possible.
- Chunks carry page references.

### E4-S8: Stage status API
**As** a learner, **I want** real processing status, **so that** I know what is happening.
- API exposes the current stage and error code.
- The endpoint is cheap to poll and returns `stage`, `status`, `errorCode`, and `updatedAt`.
- The Angular app polls through a single progress service (every 2 to 3 seconds with backoff), so it can move to server-sent events later without changing any screen.
- No invented percentages.

**Epic exit criteria**
- [ ] The spike PDF set extracts with acceptable quality in both languages.
- [ ] Scanned PDFs produce a clear failure.
- [ ] Jobs are retriable and have no duplicates.

---

## E5: AI Understanding and Experience Generation

**Goal:** Produce a validated, grounded, safe experience from the document model.

### E5-S1: Experience schema v1
**As** the team, **I want** a versioned Zod schema, **so that** AI output is validated and renderable.
- Defines allowed component types, props, interactions, localization, and `sourceRefs`.
- Required per section: `id`, `title`, `visual`, `explanation`, `textAlternative`, `sourceRefs`.
- Illustrative shape in Appendix C.

### E5-S2: Provider-independent AI service
**As** a developer, **I want** one AI interface, **so that** models can be swapped.
- Model, prompt version, and parameters recorded per run (`GenerationRun`).
- Provider keys and settings configurable per environment.

### E5-S3: Concept extraction (map)
**As** the system, **I want** topics, concepts, definitions, and relationships extracted per chunk, **so that** understanding is built bottom-up.
- Each item carries source page references.

### E5-S4: Outline, concept graph, and objectives (reduce)
**As** the system, **I want** chunk results merged, **so that** the document has one coherent structure.
- Document outline and concept graph produced.
- Learning objectives derived.

### E5-S5: Experience planning
**As** the system, **I want** a visual primitive chosen per section, **so that** each concept is taught in a fitting way.
- Selection uses the catalog (Appendix D).
- If no primitive fits, the `guided_reading` fallback is used.
- Concept sequence defined.

### E5-S6: Section content generation
**As** a learner, **I want** clear explanations in my chosen language, **so that** I understand the material.
- Content generated in the selected output language.
- Source terminology preserved in brackets when useful.
- English and Arabic combinations (EN to EN, EN to AR, AR to AR, AR to EN) tested.

### E5-S7: Source grounding and verification
**As** a learner, **I want** explanations to match my document, **so that** I can trust them.
- A verification pass checks claims against cited pages.
- Unsupported claims are removed or flagged.
- Each section stores `sourceRefs`.

### E5-S8: Prompt-injection defenses
**As** the business, **I want** PDF text treated as untrusted, **so that** documents cannot hijack the pipeline.
- Document content passed as delimited data, never as instructions.
- The model has no tools or network access during generation.
- Post-checks flag content unrelated to the source.
- Injection test PDFs included in the evaluation set.

### E5-S9: Content moderation
**As** the business, **I want** inputs and outputs moderated, **so that** the product is safe, especially for younger learners.
- Moderation applied to extracted content and generated output.
- Age-appropriate filtering applied where the learner is a minor.
- Blocked content produces a clear, non-technical message.

### E5-S10: Validation and bounded repair
**As** the system, **I want** every output validated, **so that** only valid experiences are stored.
- Checks schema, allowed components, interactions, and localization completeness.
- At most N repair attempts, then a clean failure.
- Incomplete experiences are never published.

### E5-S11: Cost guards
**As** the business, **I want** hard cost limits, **so that** one upload cannot overspend.
- Per-job token budget and cost cap.
- Cost and duration recorded per run.
- Jobs exceeding limits fail gracefully with a clear message.

### E5-S12: Generation progress screen
**As** a learner, **I want** to see real progress, **so that** I trust the wait.
- Stages: Uploading, Reading the PDF, Understanding concepts, Designing the experience, Checking against your document, Preparing interactive content, Ready.
- Friendly plain-language copy; actual backend status only.
- Specific failure reasons with retry where appropriate.

### E5-S13: Notify when ready
**As** a learner, **I want** to be notified when my experience is ready, **so that** I can leave and come back.
- In-app notification and localized email.
- Opt-out in settings.

### E5-S14: AI evaluation harness
**As** the team, **I want** automated evaluation, **so that** quality is measurable.
- 30+ PDFs across subjects, languages, layouts, and adversarial cases.
- Rubric scoring (Section 5).
- Runs from the command line and in CI.

**Epic exit criteria**
- [ ] Schema validity >= 98% on the evaluation set.
- [ ] Grounding check measurably reduces unsupported claims.
- [ ] Cost and time per experience within agreed limits.
- [ ] Injection test PDFs do not change pipeline behavior.

---

## E6: Interactive Learning Player

**Goal:** Render any valid experience with trusted components, accessibly, in both directions. Can start in parallel with E5 using hand-authored experiences.

### E6-S1: Player shell
**As** a learner, **I want** a clear learning screen, **so that** I can focus on exploring.
- Large canvas, contextual explanation panel, language switch, exit to library.
- Canvas gets priority; panels adapt on narrow screens.

### E6-S2: Section navigation and progress
**As** a learner, **I want** to move between sections and see progress, **so that** I know where I am.
- Previous and next, section list, progress indicator.
- Revisit earlier sections freely.
- Progress saved automatically.

### E6-S3: Renderer and component registry
**As** a developer, **I want** a registry mapping schema types to trusted components, **so that** only allowed visuals render.
- Registry maps schema `type` values to trusted Angular standalone components, rendered dynamically.
- Unknown or invalid component types fail safely with a fallback message.
- Components lazy-loaded (`@defer` or dynamic imports).
- AI-provided text is rendered as plain text; `bypassSecurityTrust*` APIs are never used on generated content.

### E6-S4: Timeline component
**As** a learner, **I want** to explore events in order, **so that** I understand chronology.
- Scroll or step navigation; item detail on selection.

### E6-S5: Process flow component
**As** a learner, **I want** to step through or play a process, **so that** I understand how stages connect.
- Step-through and optional loop; reduced-motion alternative.

### E6-S6: Labeled diagram and hotspot image components
**As** a learner, **I want** to explore parts of an image, **so that** I learn what each part is.
- Hotspots with labels and explanations; keyboard-reachable.

### E6-S7: Concept map component
**As** a learner, **I want** to explore relationships between ideas, **so that** I see the big picture.
- Nodes and relationships; selecting a node shows its explanation.

### E6-S8: Step-through (math and procedures) component
**As** a learner, **I want** to reveal steps one at a time, **so that** I can follow worked solutions.
- Reveal, back, and reset controls.

### E6-S9: Function plot component
**As** a learner, **I want** to change values and see a graph update, **so that** I build intuition.
- Sliders with keyboard control; text description of the current state.

### E6-S10: Simple map component
**As** a learner, **I want** to explore places on a map, **so that** I understand geography.
- Regions and markers; zoom and highlight; RTL-aware labels.

### E6-S11: Comparison component
**As** a learner, **I want** to compare items side by side, **so that** differences are clear.
- Aligned attributes; responsive stacking on mobile.

### E6-S12: Guided-reading fallback
**As** a learner, **I want** useful structure even when no visual fits, **so that** every document yields a good experience.
- Structured explanation, key terms, and expandable detail.
- Used automatically when the planner finds no better fit.

### E6-S13: Accessible read-through mode
**As** a learner using assistive technology, **I want** a linear text view of every experience, **so that** nothing depends on seeing a visual.
- Every section shows `textAlternative` and explanation in order.
- Toggle available on every screen of the player.
- Screen-reader labels and instructions on all interactions.

### E6-S14: Source reference view
**As** a learner, **I want** to jump to the source page, **so that** I can verify or read more.
- "See in your PDF (p. X)" opens the preview at that page.

### E6-S15: In-player feedback controls
**As** a learner, **I want** to rate an experience and report problems, **so that** quality improves.
- Thumbs up/down and "Report a problem" with a category.
- Optional one-tap "Did this help you understand?" at the end.

### E6-S16: Mobile and tablet behavior
**As** a learner, **I want** the player to work on my phone or tablet, **so that** I can learn anywhere.
- Touch targets sized appropriately; layouts adapt.
- Performance verified on mid-range devices.

### E6-S17: Cross-cutting accessibility and RTL pass
**As** a learner, **I want** every component to meet accessibility and direction requirements, **so that** all learners can use them.
- Keyboard operation, visible focus, WCAG AA contrast, reduced-motion support, RTL rendering verified per component.

**Epic exit criteria**
- [ ] All catalog components pass keyboard, screen-reader, RTL, and reduced-motion checks.
- [ ] Every experience works in read-through mode.
- [ ] Player works on desktop, tablet, and mobile.
- [ ] Hand-authored experiences render correctly.

---

## E7: Library, Progress and Feedback

**Goal:** Learners return, resume, and improve experiences; the team gets quality and usage signals.

### E7-S1: Personal library
**As** a learner, **I want** to see my PDFs and experiences in one place, **so that** I can find them.
- Lists documents and experiences; recent and in-progress filters; search.
- Empty state for new learners.

### E7-S2: Resume learning
**As** a learner, **I want** to continue where I stopped, **so that** I do not lose my place.
- Resumes at the saved section on any device.
- Dashboard "continue learning" is accurate.

### E7-S3: Progress indicators
**As** a learner, **I want** to see how far I am, **so that** I stay motivated.
- Based on viewed sections.
- Percentage shown only when reliably computed.

### E7-S4: Delete experience
**As** a learner, **I want** to delete an experience, **so that** I control my library.
- Confirmation shown; progress and feedback removed per policy.

### E7-S5: Regenerate an experience
**As** a learner, **I want** to regenerate a poor experience, **so that** I can get a better one.
- Limited per document; optional reason captured.
- Previous version retained until the new one succeeds.
- Counts against quota as defined.

### E7-S6: Report a problem pipeline
**As** the team, **I want** reports stored with context, **so that** we can triage quality issues.
- Stored with experience version, model ID, prompt version, and category.
- Reports are exportable for the team (no admin interface for now).
- Recurring issues can be added to the evaluation set.

### E7-S7: Schema migrations
**As** the team, **I want** stored experiences to upgrade across schema versions, **so that** old content keeps working.
- `schemaVersion` on every experience; migration functions with tests.
- Player supports current and previous versions.

### E7-S8: Analytics and dashboards
**As** the team, **I want** to see the metrics in Section 1.3, **so that** we can judge the MVP.
- Events from Appendix G collected.
- Dashboard shows funnel, generation success, completion, return rate, ratings, and cost.

### E7-S9: Plan, usage, and quota UI
**As** a learner, **I want** to see my usage and limits, **so that** there are no surprises.
- Remaining generations shown in dashboard and settings.
- Clear message and upgrade placeholder when the limit is reached.

### E7-S10: Settings completion
**As** a learner, **I want** all settings in one place, **so that** I can manage my account.
- Language, accessibility, notifications, plan and usage, data export, deletion, sign out, and sign out of all devices.

### E7-S11: Billing readiness [Proposed, may follow controlled launch]
**As** the business, **I want** a billing path, **so that** paid usage can start.
- Billing provider chosen after cost data is available.
- Free versus paid limits defined.

**Epic exit criteria**
- [ ] Returning learner resumes on any device.
- [ ] Regeneration and reporting work end to end.
- [ ] A schema version bump is tested with a real migration.
- [ ] Core metrics are being collected.

---

## E8: Quality, Safety and Launch

**Goal:** A controlled launch with confidence in safety, quality, and operations.

### E8-S1: Arabic RTL full pass
**As** an Arabic-speaking learner, **I want** every screen and component to work in RTL, **so that** the product feels native.
- All screens and components verified; mixed-language text, numerals, forms, dialogs, and player controls checked.

### E8-S2: Accessibility audit
**As** a learner with accessibility needs, **I want** the product audited, **so that** I can use it fully.
- Automated checks plus manual screen-reader and keyboard testing.
- Findings fixed or tracked with owners.

### E8-S3: Security review and penetration test
**As** the business, **I want** an independent security review, **so that** vulnerabilities are found early.
- Covers upload handling, authorization, signed URLs, sessions, and injection.
- Critical and high findings resolved before launch.

### E8-S4: Privacy and child-safety review
**As** the business, **I want** a compliance check for each launch market, **so that** we meet our obligations.
- Age policy, consent, retention, deletion, and AI provider disclosures verified.
- Counsel sign-off recorded.

### E8-S5: Copyright and takedown process
**As** the business, **I want** a working takedown process, **so that** infringement claims are handled.
- Request intake, review, removal, and notification tested end to end.

### E8-S6: Moderation review
**As** the business, **I want** moderation tested on real and adversarial inputs, **so that** unsafe content is handled.
- Moderation outcomes reviewed on a sampled set across languages.

### E8-S7: AI regression gate
**As** the team, **I want** model, prompt, extractor, or schema changes blocked when quality drops, **so that** we never ship a regression.
- Evaluation runs automatically on every such change.
- Release blocked when scores fall below thresholds.
- Human review of a sample each release.

### E8-S8: Performance and load testing
**As** the team, **I want** to know the system handles real load, **so that** launch day is stable.
- Concurrent generations, queue behavior, and player performance tested.
- Stage timeouts and back-pressure verified.

### E8-S9: Operations readiness
**As** the team, **I want** monitoring, backups, and runbooks, **so that** incidents are manageable.
- Alerts on error rates, queue depth, and cost.
- Backup and restore tested.
- Runbooks for common failures.

### E8-S10: Support and feedback process
**As** a learner, **I want** a way to get help, **so that** problems are resolved.
- Contact channel, response expectations, and triage owner defined.

### E8-S11: Controlled release
**As** the business, **I want** a staged rollout with a kill switch, **so that** risk is contained.
- Feature flags and invite-based cohort.
- Kill switch for generation.
- Go / no-go review signed off.

**Epic exit criteria**
- [ ] Release checklist (Section 6) complete.
- [ ] Controlled cohort completes the main journeys without assistance.
- [ ] Go / no-go signed off.

---

# 4. Main User Journeys

**Journey A: First-time learner.** Landing page, Get Started, sign up, select language, dashboard, upload PDF, preview, choose output language, start, generation progress, player, explore.

**Journey B: Returning learner.** Sign in, dashboard, pick a recent or in-progress experience, resume at the saved section, continue, return to library.

**Journey C: Processing failure.** Upload, processing fails (invalid, protected, scanned, unreadable), clear explanation, upload another file or retry where appropriate. No broken experience is created.

**Journey D: Poor experience.** Learner reports a problem or regenerates; the previous version stays until the new one succeeds.

---

# 5. AI Quality Rubric

Used by the evaluation harness (E5-S14) and regression gate (E8-S7).

- Factual alignment with the source.
- Coverage of key concepts.
- Quality of learning objectives.
- Suitability of the chosen visual format.
- Accuracy of explanations.
- Usefulness of interactions.
- Arabic and English language quality.
- Schema validity.
- Grounding rate (claims supported by cited pages).
- Robustness to injection and malformed inputs.

---

# 6. MVP Release Checklist

### Product
- [ ] Sign up, login, logout, verification, and recovery.
- [ ] Independent learner accounts under the confirmed age policy.
- [ ] English and Arabic, including cross-language generation.
- [ ] Upload and preview.
- [ ] Real progress and clear errors, plus "notify me when ready".
- [ ] Grounded AI-generated experiences with source references.
- [ ] Interactive player with read-through mode.
- [ ] Library, save and resume.
- [ ] Regeneration, thumbs, report a problem.
- [ ] Profile, settings, quotas.
- [ ] Legal pages and takedown process.

### Design
- [ ] Brand tokens implemented; shared typography and spacing.
- [ ] Shared components; responsive layouts.
- [ ] RTL and LTR verified on every screen and component.
- [ ] Contrast-tested semantic colors and focus states.
- [ ] Loading, empty, error, and success states.

### Engineering
- [ ] Nx monorepo with shared schema library and enforced module boundaries.
- [ ] Angular frontend and NestJS backend.
- [ ] PostgreSQL, Prisma, secure storage with signed URLs and malware scanning.
- [ ] Redis and BullMQ with idempotent jobs.
- [ ] Extraction validated on Arabic and English PDFs.
- [ ] Provider-independent AI service with cost guards.
- [ ] Versioned schema with migrations; output validation, grounding, moderation.
- [ ] Injection tests, authorization tests.
- [ ] Analytics, monitoring, backups, restore test.

### Launch readiness
- [ ] Evaluation set and regression gate.
- [ ] Security, privacy, accessibility reviews.
- [ ] Copyright and takedown process tested.
- [ ] Performance tests.
- [ ] Support process, feature flags, kill switch.

---

# 7. Deferred Beyond MVP

- AI voice conversations, live tutor, audio narration.
- Multiplayer, social sharing, community.
- Teacher and classroom management.
- Native iOS and Android apps.
- Other source formats (DOCX, PPTX, web pages).
- Advanced assessments and adaptive paths.
- Offline learning.
- Advanced analytics and reporting.
- OCR (unless the extraction work shows it is essential).
- 3D beyond an optional curated showcase.
- Under-13 accounts with parental consent (unless the age policy requires them).
- Dark theme.
- Paid billing, if not ready for the controlled launch.
- Admin and back-office tooling and staff roles. Until then, problem reports, takedown requests, and moderation reviews are handled by the engineering team through database queries and exports.
- Server-side rendering or prerendering (Angular SSR) for the landing and legal pages. To be revisited by the owner; until then everything is client-rendered.

---

# 8. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Inaccurate explanations | Source grounding, verification pass, evaluation set, report button |
| Unsuitable visual format | Generic catalog, planning step, fallback, evaluation |
| Invalid output | Versioned schema, bounded repair |
| Arbitrary code risk | Never execute AI code; trusted components only |
| Prompt injection via PDF | Untrusted-data handling, no model tools, post-checks, injection tests |
| Arabic extraction failures | Layout-aware or vision extraction (spike outstanding), clear unsupported messaging |
| Scanned PDFs, math, tables | Detection, explicit strategy, OCR evaluated separately |
| Catalog cannot cover real documents | Hand-authored validation, fallback, iterative additions |
| Cost overruns | Token budgets, quotas, per-job caps, cost tracking |
| Slow generation | Background jobs, stage feedback, notifications, timeouts |
| 3D performance on mobile | Deferred; 2D alternatives |
| RTL breakage | Logical properties, RTL tests on every component |
| Child privacy violations | Age policy before auth, minimal data, legal review |
| Copyright claims | Terms, upload warranty, takedown process, retention rules |
| Harmful content | Moderation on input and output, age-appropriate filtering |
| Quality regressions from model changes | Versioned runs, regression gate |
| Schema changes break old content | Version field, migrations, compatibility window |
| Two-codebase overhead | Nx monorepo, shared schema library, affected builds |
| Smaller ecosystem for interactive visuals in Angular | Use framework-agnostic libraries (D3, Three.js, SVG) wrapped in thin Angular components |
| Token theft or JWT misuse | Short-lived access tokens, rotating hashed refresh tokens with reuse detection, httpOnly cookies, CSRF protection on refresh, revocation on password change and deletion |
| Weaker search visibility for a client-rendered landing page | Page titles and meta tags, small bundle, sitemap; add prerendering or SSR for landing and legal pages when SEO matters |

---

# 9. Open Decisions

1. Final file-size and page limits (proposal: 25 MB, 150 pages). *Decision outstanding.*
2. OCR or vision-based reading in MVP. *Decision outstanding.*
3. Minimum age and consent approach. *Decision outstanding.*
4. AI model, provider, and cost ceiling per experience. *Decisions outstanding.*
5. Clearance of the name Ufuq (trademark, domain, handles). *Decision outstanding.*
6. Retention and deletion policy. *Decision outstanding.*
7. Launch countries. *Decision outstanding.*
8. Billing provider and pricing (may follow launch). *E7-S11*
9. Hosting provider and topology. *E1-S2*
10. Final Arabic and English font pair. *E1-S4*
11. Final semantic status colors, contrast-tested. *E1-S4*
12. Arabic numeral style (Western or Arabic-Indic). *E1-S5*
13. JWT lifetimes and refresh-token policy (proposal: access token 15 minutes, rotating refresh token 7 to 30 days). *E2-S3*
14. Progress delivery: polling (proposed) or server-sent events. *E4-S8*

---

# APPENDICES

## Appendix A: Name Candidates

**Selected: Ufuq (Ø£ÙÙ‚)**, meaning "horizon": the edge of what you can see, and what a learner explores toward. The earlier working title "Lerno" was dropped because it reads as a misspelling of "learn". Trademark, domain, and handle checks have not yet been run for Ufuq or any other name below.

### English-first

| Name | Idea | Arabic rendering |
|---|---|---|
| Curio | Curiosity | ÙƒÙˆØ±ÙŠÙˆ |
| Unfold | A PDF unfolds into an experience | Ø£Ù†ÙÙˆÙ„Ø¯ |
| Wonderly | Wonder + learning | ÙˆØ§Ù†Ø¯Ø±Ù„ÙŠ |
| Pagelands | Pages become places to explore | Ø¨ÙŠØ¬Ù„Ø§Ù†Ø¯Ø² |
| Inkling | A first glimmer of understanding | Ø¥Ù†ÙƒÙ„Ù†Øº |
| Fathom | To understand deeply | ÙØ§Ø«ÙˆÙ… |
| Glimmer | A spark of insight | ØºÙ„ÙŠÙ…Ø± |
| Prism | One document, many views | Ø¨Ø±ÙŠØ²Ù… |
| Orbit | Exploring around a topic | Ø£ÙˆØ±Ø¨Øª |
| Trailhead | Where an exploration begins | ØªØ±ÙŠÙ„Ù‡ÙŠØ¯ |
| Bloomly | Ideas that grow | Ø¨Ù„ÙˆÙ…Ø§Ù„ÙŠ |
| Aha | The moment of understanding | Ø¢Ù‡Ø§ |
| Tinker | Hands-on learning | ØªÙŠÙ†ÙƒØ± |
| Mosaic | Pieces forming a picture | Ù…ÙˆØ²Ø§ÙŠÙŠÙƒ |
| Atlas | A map of knowledge | Ø£Ø·Ù„Ø³ |
| Lumio | Light and insight (likely collides with an existing product) | Ù„ÙˆÙ…ÙŠÙˆ |

### Arabic-meaning or bilingual-friendly

| Name | Meaning | Latin form |
|---|---|---|
| ÙÙ‡Ù… | Understanding | Fahm |
| Ø¥Ø¯Ø±Ø§Ùƒ | Perception, realizing | Idrak |
| Ø£ÙÙ‚ | Horizon | Ufuq |
| Ù…Ø´ÙƒØ§Ø© | A niche holding a lamp; light | Mishkat |
| ÙƒØ´Ù‘Ø§Ù | Scout or explorer | Kashaf |
| Ø¯Ù„ÙŠÙ„ | Guide | Dalil |
| Ù†Ø¨Ø±Ø§Ø³ | Lantern, guiding light | Nibras |
| Ø¨ØµÙŠØ±Ø© | Insight | Basira |
| Ø´Ø±Ø§Ø±Ø© | Spark | Shirara |
| Ø±Ø­Ù„Ø© | Journey | Rihla |

### Selection criteria

1. Easy to say and write in both English and Arabic.
2. Available .com or .app domain and social handles.
3. Clear in trademark searches (Classes 9, 41, 42) in launch markets.
4. No negative meaning in either language.
5. Works for children and adults.

Fallback candidates if Ufuq fails clearance: **Idrak**, **Curio**, **Unfold**, **Pagelands**.

---

## Appendix B: Brand Identity and Design Tokens

### Direction: Sunshine Creative
Clean, light interface with vibrant accents. Optimistic, curious, creative, friendly, clear, playful but mature.

### Usage principles
- White and light gray as main backgrounds.
- Sunshine Yellow as primary action color, with dark text on yellow buttons.
- Turquoise as supporting color; blue, pink, peach, gold, muted red as secondary accents.
- Near-black for primary text.
- No large saturated color blocks across whole pages; avoid heavy gradients.
- Color communicates hierarchy and meaning, never as decoration everywhere.
- Never rely on color alone to convey state.

### Palette

| Token | HEX | Use |
|---|---|---|
| Sunshine Yellow | `#FCC60C` | Primary brand and actions |
| Yellow Hover | `#E8B400` | Hover/active on yellow |
| Soft Yellow | `#FFF4C7` | Soft backgrounds, selected states |
| Turquoise | `#54AFAD` | Supporting brand, secondary actions |
| Bright Blue | `#23A6F2` | Informational accents, links |
| Vibrant Pink | `#EA87DE` | Creative accent |
| Golden Yellow | `#EBC348` | Secondary highlight |
| Soft Peach | `#F6D0AC` | Warm surfaces |
| Muted Red | `#C36B66` | Decorative accent only |
| Near Black | `#171717` | Primary text |
| Light Gray | `#F4F4F4` | Page background |
| White | `#FFFFFF` | Cards and surfaces |
| Secondary Text | `#555555` | Supporting text |
| Border | `#E5E5E5` | Dividers, inputs |

### Semantic colors
Define accessible tokens for success (green), warning (amber), error (red), and information (blue). Muted red is not automatically the error color. Contrast-test every pairing to WCAG AA before release.

### CSS tokens

```css
:root {
  /* Brand */
  --brand-primary: #FCC60C;
  --brand-primary-hover: #E8B400;
  --brand-primary-soft: #FFF4C7;

  --brand-turquoise: #54AFAD;
  --brand-blue: #23A6F2;
  --brand-pink: #EA87DE;
  --brand-gold: #EBC348;
  --brand-peach: #F6D0AC;
  --brand-red: #C36B66;

  /* Surfaces */
  --background: #F4F4F4;
  --surface: #FFFFFF;
  --surface-muted: #FFF4C7;

  /* Text */
  --text-primary: #171717;
  --text-secondary: #555555;

  /* Borders */
  --border: #E5E5E5;

  /* Shape */
  --radius-card: 16px;
  --radius-button: 10px;
  --radius-badge: 6px;
}
```

### Color combinations

| Combination | Use |
|---|---|
| White + Yellow + Near Black | Main actions, hero |
| Light Gray + White + Teal | Dashboard, library |
| White + Blue + Near Black | Informational content |
| White + Pink + Near Black | Creative examples |
| Soft Yellow + Teal | Selected states, supporting panels |
| White + Peach + Near Black | Warm illustration backgrounds |

### Typography
- Clean sans-serif for English; high-quality Arabic sans-serif for screens; the pair must harmonize.
- Consistent heading, body, caption, and label scales.
- No playful display fonts for long explanations.
- Arabic line height and punctuation tested separately.

### Components and shapes
Rounded cards with consistent radii, shadows only where elevation helps, minimal borders, small colorful badges, simple geometric illustrations. The player must not become a card grid.

### Theme
Light-first; tokens structured for a later dark theme.

---

## Appendix C: Experience Schema (illustrative v1)

The production schema lives in `libs/shared/schema`. Components are generic and data-driven; topic-specific components are not allowed.

```json
{
  "schemaVersion": "1.0",
  "title": "The Water Cycle",
  "language": "en",
  "sourceLanguage": "en",
  "experienceType": "guided_exploration",
  "learningObjectives": [
    "Understand the main stages of the water cycle",
    "Explain how water moves between stages"
  ],
  "sections": [
    {
      "id": "water-cycle-overview",
      "title": "The cycle at a glance",
      "visual": {
        "type": "process_flow",
        "data": {
          "loop": true,
          "steps": [
            { "id": "evaporation", "label": "Evaporation", "description": "Heat turns liquid water into vapor.", "icon": "sun" },
            { "id": "condensation", "label": "Condensation", "description": "Vapor cools and forms clouds.", "icon": "cloud" },
            { "id": "precipitation", "label": "Precipitation", "description": "Water falls as rain or snow.", "icon": "rain" }
          ]
        }
      },
      "explanation": "Heat causes liquid water to change into water vapor.",
      "keyTerms": [{ "term": "Water vapor", "definition": "Water in gas form." }],
      "interactions": ["step_through", "show_explanation"],
      "textAlternative": "A looping three-step process: evaporation, condensation, precipitation.",
      "sourceRefs": [{ "page": 4, "excerptId": "p4-s2" }]
    }
  ]
}
```

---

## Appendix D: Component Catalog v1

| Primitive | Use | Examples |
|---|---|---|
| `timeline` | Ordered events | History, biographies |
| `process_flow` | Animated or step-through process, optional loop | Water cycle, photosynthesis |
| `labeled_diagram` | Image/SVG with labeled hotspots | Anatomy, machines |
| `concept_map` | Nodes and relationships | Any topic |
| `step_through` | Sequential worked steps | Math, proofs, procedures |
| `function_plot` | Interactive 2D graph with sliders | Physics, math, economics |
| `simple_map` | Regions and markers | Geography, trade routes |
| `comparison` | Side-by-side attributes | Species, options |
| `hotspot_image` | Source figure with pins | Figures from the PDF |
| `guided_reading` | **Fallback** structured explanation | Law, literature, business |

Rules:
- 3D is post-MVP (or one curated showcase) because it needs curated assets.
- Every primitive supports `textAlternative`, RTL, keyboard operation, and reduced motion.
- New primitives are added by engineering, versioned in the schema, and added to the evaluation set.

---

## Appendix E: Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Angular + TypeScript (standalone components, signals), Angular CDK |
| Backend | NestJS + TypeScript |
| API | REST (JSON), OpenAPI generated from NestJS, typed Angular client generated in CI |
| Monorepo | Nx (with pnpm) |
| Styling | Tailwind CSS with logical properties |
| UI | Custom design system (`libs/web/ui`) |
| Database | PostgreSQL + Prisma |
| Auth | JWT: NestJS + Passport (`passport-jwt`), Google OAuth, passwords hashed with Argon2 |
| Storage | S3-compatible object storage |
| PDF processing | `pdfjs-dist` plus a layout-aware or vision approach (approach undecided) |
| Jobs | BullMQ + Redis |
| AI | Provider-independent TypeScript service |
| Validation | Zod (shared library) |
| i18n | Transloco (runtime translations), Angular CDK bidi |
| 2D visuals | SVG + Angular templates (D3 for layout or math where useful) |
| Animation | Angular animations and CSS, plus a framework-agnostic animation library where needed |
| 3D (deferred) | Three.js wrapped in an Angular component (or angular-three), GLB |
| Email | Transactional provider with localized templates |
| Analytics / errors | Privacy-respecting analytics, error tracker |
| Testing | Vitest/Jest, Playwright |

**Backend modules:** `auth`, `users`, `learners`, `documents`, `pdf-processing`, `learning-experiences`, `ai-orchestration`, `evaluation`, `jobs`, `progress`, `storage`, `preferences`, `notifications`, `feedback`, `analytics`, `billing-quotas`, `moderation`.

**Frontend areas:** `auth`, `dashboard`, `upload`, `document-preview`, `generation`, `learning-player`, `library`, `profile`, `settings`, `legal`, `shared`, `design-system`.

**Repository layout**

```text
apps/
  web/              Angular app
  web-e2e/          Playwright end-to-end tests
  api/              NestJS API
libs/
  shared/
    schema/         Zod: API contracts + experience schema (tag scope:shared)
    i18n/           EN/AR translations
  web/
    ui/             Design system (Angular standalone components)
    player/         Player shell and visual components
    feature-*/      Feature libraries: auth, upload, library, settings, ...
    data-access/    API clients and state
  api/
    feature-*/      NestJS modules: documents, ai-orchestration, ...
    data-access/    Prisma and storage
  eval/             AI evaluation sets and regression runner
```

**Nx notes**
- Tags: `scope:web`, `scope:api`, `scope:shared`, plus `type:feature`, `type:ui`, `type:data-access`, `type:util`. Lint rules block `scope:web` from importing `scope:api` and keep `type:ui` libraries independent of feature libraries.
- The shared schema library is the only place the experience schema is defined; the AI pipeline validates against it and the Angular player renders from it.
- CI runs `nx affected` for lint, test, and build, with caching to keep pipelines fast.
- Nx generators scaffold new player components and NestJS modules consistently.

**Angular notes**
- Standalone components and signals throughout; no NgModules in new code.
- Angular CDK provides accessibility, overlay, focus, and bidi primitives; the visual design system is custom to the brand rather than a full third-party UI kit.
- Each visual primitive is an Angular component rendering SVG; third-party chart or graph libraries are wrapped thinly so they can be swapped.
- The player's component registry renders components dynamically and lazy-loads them with `@defer`.
- Angular's template sanitization stays on; generated content is never marked as trusted.
- The app is client-side rendered for now; SSR is deferred and can be added later.

---

## Appendix F: Architecture and Data Model

### Architecture

```text
                          PRODUCT
                             |
               +-------------+-------------+
               |                           |
         Angular App                 NestJS API
         Angular + TypeScript        TypeScript
               |                           |
               |                    +------+------+
               |                    |             |
               |               PostgreSQL    Object Storage
               |               (Prisma)      (private PDFs)
               |                                   |
               +--------------------------------> API
                                                   |
                                          Upload validation
                                          + malware scan
                                                   |
                                             Job Queue
                                          (Redis + BullMQ)
                                                   |
                                         Extraction Pipeline
                                          -> Document Model
                                                   |
                                      AI Pipeline (map-reduce)
                                  map -> reduce -> plan -> generate
                                                   |
                                    Ground + Moderate + Validate
                                                   |
                                    Structured Experience JSON
                                                   |
                                       Experience Storage
                                                   |
                                      Learning Player (trusted
                                      Angular components only)
```

**Core rule:** do not execute arbitrary AI-generated code in the browser. AI generates structured content; the app validates it and renders it with predefined components.

### Data model (conceptual)

- **User:** `id`, `email`, `emailVerifiedAt`, auth provider reference, timestamps.
- **Session / RefreshToken:** `id`, `userId`, `tokenHash`, `familyId`, `expiresAt`, `revokedAt`, `replacedByTokenId`, `userAgent`, `createdAt`.
- **LearnerProfile:** `id`, `userId`, `displayName`, `preferredLanguage`, `ageGroup` (only if needed), accessibility preferences.
- **ConsentRecord:** `id`, `userId`, `type`, `version`, `grantedAt`, `guardianInfo` (only if under-13 is supported).
- **Document:** `id`, `userId`, `title`, `storageKey`, `mimeType`, `fileSize`, `pageCount`, `processingStatus`, `processingError`, `uploadRightsAcceptedAt`.
- **DocumentModel:** `id`, `documentId`, structured pages, sections, figures, tables, `extractorVersion`.
- **ProcessingJob:** `id`, `documentId`, `jobType`, `status`, `stage`, `errorCode`, `attempt`.
- **GenerationRun:** `id`, `documentId`, `modelId`, `promptVersion`, `tokensIn`, `tokensOut`, `costEstimate`, `durationMs`, `status`.
- **LearningExperience:** `id`, `userId`, `documentId`, `generationRunId`, `title`, `language`, `schemaVersion`, `experienceType`, `contentJson`, `generationStatus`, `version`.
- **LearningProgress:** `id`, `userId`, `experienceId`, `currentSectionId`, `viewedSectionIds`, `completionPercentage` (only if reliable), `lastOpenedAt`.
- **Feedback:** `id`, `experienceId`, `userId`, `rating`, `reportCategory`, `comment`, `experienceVersion`.
- **Notification:** `id`, `userId`, `type`, `channel`, `sentAt`, `readAt`.
- **UsageQuota / Plan:** `userId`, `plan`, `periodStart`, `generationsUsed`, `limits`.
- **TakedownRequest:** `id`, `documentId`, `reporter`, `status`, `resolvedAt`.
- **AnalyticsEvent:** `id`, `userId` (or pseudonymous), `name`, `properties`, `createdAt`.

---

## Appendix G: Analytics Events

`signup_completed`, `upload_started`, `upload_completed`, `generation_started`, `generation_completed`, `generation_failed` (with error code), `experience_opened`, `section_viewed`, `interaction_used` (type), `experience_completed`, `thumb_up`, `thumb_down`, `report_submitted`, `regeneration_requested`, `understanding_check_answered`.

---

## Appendix H: Security, Privacy and Accessibility Requirements

**Authentication:** short-lived JWT access tokens kept in memory; rotating refresh tokens in `httpOnly`, `Secure`, `SameSite` cookies, stored hashed server-side with reuse detection; CSRF protection on the refresh endpoint; tokens never stored in `localStorage`; sessions revoked on password reset, account deletion, and sign out.

**Access and storage:** user-level authorization everywhere; private PDFs; signed, time-limited URLs; file validation and malware scanning; secrets outside source control; rate limits on auth, upload, and generation.

**AI safety:** never execute generated code; PDF text is untrusted data; no model tools or network during generation; schema-constrained output; grounding and moderation; validation before rendering.

**Privacy and legal:** logs free of document content and unnecessary personal data; AI provider with a data processing agreement and no training on customer data, disclosed in the privacy policy; defined retention, deletion, and export; child privacy per the age policy; copyright handled through terms, upload warranty, and takedown; uploads are used only to serve the learner.

**Accessibility:** keyboard-accessible controls, visible focus, WCAG AA contrast, accessible labels, reduced-motion support, text alternative and read-through mode for every visual, screen-reader testing of every catalog component.

**Internationalization:** `dir` per language, logical CSS properties, directional mirroring only where meaningful, tested forms, dialogs, tables, controls, and progress in both directions, mixed Arabic/English term handling, localized emails and legal pages, and all four EN/AR generation combinations tested.

**Performance and reliability:** async heavy work; lazy-loaded interactive assets; per-stage timeouts; idempotent retries; never publish incomplete experiences; tested backups.
