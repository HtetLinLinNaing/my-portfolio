# Portfolio Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. The user selected native execution in this chat, followed by a separate review. Steps use checkbox syntax for tracking.

**Goal:** Upgrade the portfolio to support AI full-stack developer interviews through credible professional content, restrained Tailwind layouts, a stronger DevPath-AI presentation, and reliable contact behavior.

**Architecture:** Evolve the existing Next.js single scrolling page and typed local content modules. Keep static content server rendered and interactive behavior confined to existing client components. Retain EmailJS and repair the form state and failure handling without introducing a replacement backend.

**Tech Stack:** Existing Next.js 16.3.5, React 19.3, TypeScript, Tailwind CSS v4, EmailJS Browser v4, Vitest and Testing Library; do not change dependency versions as part of this work.

**Spec:** `PRD.md`, sections 13.1–13.6. The existing `docs/superpowers/specs/2026-09-20-personal-portfolio-design.md` supplies still-compatible constraints: private contact details, existing blue accent, current photo, and one anchored page. The current PRD overrides conflicting historical design requirements.

## Global Constraints

- Primary goal: obtain interviews for AI full-stack developer roles.
- Positioning: 4+ years of production full-stack experience, expanding into AI application development.
- Current learning: agentic workflows and Python. Distinguish learning from demonstrated professional experience.
- Retain the photo already used on the site.
- No public CV, resume download, or resume file included in deployment assets.
- Tailwind CSS is required for the design and responsive layout.
- User selected: refine the current clean design with stronger project presentation.
- User selected: native implementation phase by phase, with a separate review at the end.
- Preserve existing edits in `components/sections/hero.tsx`, `tests/components/sections.test.tsx`, and generated `next-env.d.ts`. Preserve the single-line hero name behavior and verify it at narrow widths.
- No invented metrics, additional projects, testimonials, AI capabilities, or public project repository links.
- Do not display phone, email, location, relocation preferences, or master's thesis status. Do not import the CV into the repository.
- Do not commit, push, or deploy without user instruction. Present a local preview for review.
- Stop and request user approval for material unresolved choices rather than guessing.

## Review Focus

1. A field edit or keyboard submit during an in-flight send must not bypass the send lock; task 1 regression covers this.
2. A retry after failure must preserve the draft and issue only one new request; task 1 covers the retry lifecycle.
3. Missing configuration and provider failure must never display success or expose raw messages/credentials; task 1 covers error classification and safe feedback.
4. AI learning and CV-reported experience must not turn into invented production AI claims; task 2 checks rendered content, project links, and privacy.
5. Long names, narrow viewports, theme changes, and keyboard focus must not break layout or hide controls; task 3/4 browser verification covers these conditions.

## Phase 1 — Contact reliability

**Modify:** `components/contact/contact-form.tsx`, `lib/emailjs.ts`, `components/sections/contact.tsx`, `components/ui/button.tsx`.
**Tests:** `tests/components/contact-form.test.tsx`, `tests/lib/emailjs.test.ts`.

**Interfaces:** Preserve `sendContactMessage(values: ContactFormValues): Promise<void>` and its existing template parameter names. Add a typed `ContactSendError` with a safe category and retryability. Normalize errors at the provider boundary; the form consumes only safe categories and never renders/logs raw provider text.

- [x] Add a regression test using a pending promise: submit, attempt to edit Subject, then submit the form again via its form event. Assert one send call while pending and no success message before resolution.
- [x] Add a retry test: reject the first send, assert draft preservation, retry with a pending second send, attempt another submit, and assert exactly two total calls before resolving the second.
- [x] Add failure tests for missing configuration, status 429, configuration/provider rejection, and network failure. Assert safe category and appropriate retry guidance; do not assert raw error text.
- [x] Run `npm run test -- tests/components/contact-form.test.tsx tests/lib/emailjs.test.ts`; confirm the new tests detect the missing behavior before implementing.
- [x] Use an immediate ref-based in-flight guard around every send entry point. Keep submission state independent of field updates and disable fields during the send so success clearly refers to the submitted draft. Release the guard in `finally`.
- [x] Retain the existing success copy after provider acceptance only. Preserve failed drafts. Provide retry for recoverable failures; show configuration/service guidance plus the approved LinkedIn link for persistent failures. Include a nearby LinkedIn alternative in the contact section.
- [x] Record only safe diagnostic category/status, never message content, sender information, credentials, or raw provider text. Handle configuration failures distinctly; do not pretend retry can repair them.
- [x] Add Tailwind focus-visible styling to the shared Button instead of suppressing its only visible focus outline. Ensure error/success feedback and disabled controls are readable in both themes.
- [x] Run the focused contact tests again and record results. This proves form behavior, not mailbox delivery.

**Delivery limitation:** Local settings are present, but production values and recipient delivery remain unverified. Do not change settings or switch providers based on guesses. Ask for production failure evidence/account access if needed. A controlled message to the owner and inbox confirmation are required before claiming delivery is fixed; do not message recruiters or other third parties.

## Phase 2 — Accurate professional content

**Modify:** `data/experience.ts`, `data/projects.ts`, `data/skills.ts`, `lib/types.ts`, `components/sections/hero.tsx`, `components/sections/about.tsx`, `components/sections/skills.tsx`, `app/layout.tsx`.
**Tests:** existing data, sections, and metadata tests.

**Interfaces:** Keep the existing typed data exports. Extend `Project` only with fields actually used by the case study (for example problem, contribution, and integration notes); no unused future scaffolding. Keep navigation section IDs stable.

- [x] Add content checks for 4+ years, current AI learning labels, and absence of public CV actions and fabricated project links. Preserve existing privacy and hero single-line assertions. Run the affected tests to establish the missing behavior.
- [x] Introduce the developer with 4+ years, production business applications, and current AI direction in concise first-person copy.
- [x] Present the Galaxy Wave title as Software Engineer with the CV-reported promotion from Full Stack Developer, without inventing a promotion date. Include mentoring, reviews, production troubleshooting, testing, and delivery contributions. Keep Kopwar dates and scope accurate.
- [x] Highlight production stack skills and separately describe OpenAI API project integration, AI-assisted engineering practices, and current learning in agentic workflows/Python.
- [x] Expand DevPath-AI using CV-supported facts: personalized learning paths, OpenAI API, Next.js/TypeScript, authentication, validation, and persistent storage. Do not name an unverified storage vendor or claim agent/RAG implementation. Keep the approved live link and omit an unverified GitHub link.
- [x] Update metadata description to reflect experience and AI application direction while preserving accurate professional title and current social image.
- [x] Run the affected tests and record results.

## Phase 3 — Professional Tailwind presentation

**Modify:** `app/page.tsx`, `app/layout.tsx`, `app/globals.css` only for shared tokens/base rules, `components/sections/hero.tsx`, `components/sections/projects.tsx`, `components/sections/experience.tsx`, `components/sections/skills.tsx`, `components/sections/about.tsx`, `components/sections/contact.tsx`, `components/ui/section-heading.tsx`.
**Asset:** Add a local DevPath-AI screenshot only if it can be captured from the actual application without private information; otherwise request a screenshot and leave this acceptance item pending. Do not fabricate a product mockup and label it a screenshot.

- [x] Reorder the page to hero, selected work, experience, skills/AI learning, about, contact; match navigation order. Update the page-structure test to assert this order and keep named landmarks.
- [x] Keep the blue/neutral visual identity with clear text hierarchy, consistent content width, responsive gutters, and restrained borders/radii. Avoid glowing decoration, statistics tiles, typing effects, excessive gradients, and generic AI imagery.
- [x] Reduce oversized portrait decoration and adjust the existing image crop after inspecting the actual asset; retain the photo and responsive reserved dimensions.
- [x] Present DevPath-AI as a readable case study with verified content, real imagery when available, technology tags, and clear demo action. Remove the apologetic one-project placeholder text. Do not add unsupported outcomes or invented technical lessons.
- [x] Make experience and skills scannable with consistent spacing and readable line lengths. Keep AI learning visually clear without overstating it.
- [x] Verify desktop, tablet, and narrow mobile layouts in-browser; inspect screenshots and check for horizontal overflow. Preserve the single-line name at 320px and common mobile widths without hiding overflow as a workaround.
- [x] Check light/dark themes, mobile menu, keyboard focus, touch targets, reduced motion, and contact-state styling. Correct concrete issues before moving on.

## Phase 4 — Verification, separate review, and handoff

**Modify:** `README.md`, `PRD.md` implementation status only, and `docs/superpowers/plans/2026-10-29-portfolio-upgrade.md` checklist/results. Save a concise execution record in `docs/superpowers/plans/2026-10-29-portfolio-upgrade-results.md`.

- [x] Run `npm run test`, `npm run lint`, and `npm run build`; inspect all results. Run TypeScript separately only if the build does not cover it. Repair failures and rerun affected checks.
- [ ] Inspect final local preview across relevant widths and both themes, including link destinations, mobile navigation, focus, and private information boundaries. Check public assets contain no CV.
- [x] Request a fresh independent review of the implementation against the PRD and this plan using the Superpowers review workflow. Preserve the user's choice of native implementation with separate review; do not claim writer self-checks are independent review.
- [x] Resolve actionable review findings and rerun affected checks. If a fix changes product scope, stop for user approval.
- [x] Document exact checks and results, any pending real email delivery/screenshot evidence, and which phases are complete. Do not mark production delivery, publishing, or unexecuted checks complete.
- [ ] Present a local preview and concise phase results. Ask for production deployment approval only after the changes are reviewable; no automatic deployment or Git commit.

## Pending approval before application edits

Review this plan and confirm that it captures the intended work. The design direction and execution method have already been selected; do not ask the user to choose them again. Missing promotion dates and education status do not block the approved scope because no dated promotion split or education section will be added.

Execution note: user approved this plan. Local implementation and checks are complete; provider acceptance/inbox receipt and production deployment remain pending. No commits were created.
