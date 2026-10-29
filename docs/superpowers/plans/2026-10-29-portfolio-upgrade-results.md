# Portfolio upgrade execution results

Date: 29 October 2026
Plan: `2026-10-29-portfolio-upgrade.md`
Spec: `PRD.md` sections 13.1–13.7
Branch: `codex/portfolio-professional-upgrade`

## Phase results

1. Contact application fixes implemented. Duplicate-send initial/retry tests failed before implementation and passed after the ref guard and field protection. Provider error-category tests also failed before normalization and passed after. Production delivery remains blocked on the provider configuration below.
2. CV-supported experience and practical AI integration are presented separately from ongoing Python and agentic workflow learning. No public CV or private contact details were added.
3. Existing design refined with Tailwind; current photo and single-line name preserved, work moved before toolkit, and actual DevPath-AI landing screenshot captured. No fabricated product imagery or metrics.
4. Automated and browser checks performed; separate read-only final review completed. Preview available at http://localhost:3002. No deployment, push, commit, or merge performed.

## Verification evidence

- Baseline `npm run test`: 10 files, 24 tests passed.
- Contact regression RED: field edit permitted a second initial send and a third send during retry. Both detected before implementation.
- Provider error classification RED: six new scenarios failed before normalization.
- Contact targeted GREEN: 2 files, 14 tests passed.
- Content/order RED: missing learning region and old section order detected before implementation.
- Content/order/metadata/data GREEN: 4 files, 12 tests passed.
- Final `npm run test`: 10 files, 34 tests passed.
- Final `npm run lint`: passed, no lint errors.
- Final `npm run build`: passed, including TypeScript and static generation.
- `git diff --check`: passed after whitespace cleanup.
- Browser: no horizontal overflow at 320, 390, 768, 1024, 1440 pixels; name fits without wrapping at all widths.
- Browser: mobile menu opened and closed on navigation; theme switch and contact validation inspected. Corrected manual dark mode from light RGB(248,250,252) with dark class to RGB(10,15,28).
- Public assets inspected: original profile photo and project screenshot only, no CV.
- Reduced-motion behavior retains the existing motion component implementation; a separate OS reduced-motion emulation was not performed.

## Independent review

Fresh read-only reviewer found no critical issues. Its important finding was manual dark token specificity; reproduced in browser, corrected from `:where(.dark)` to `:root.dark`, verified in browser, and final tests/build passed.

Deferred minor: retryable service failures currently advise checking the connection. The helper distinguishes service from network correctly; clearer temporary-service wording and visible error-category tests remain a small follow-up.

## Confirmed contact delivery blocker

The owner reported the generic live error and explicitly authorized one diagnostic message using portfolio-test@example.com. Public deployed settings matched the local settings. Exactly one provider request was attempted; EmailJS returned HTTP 400, "The service ID not found." No message was accepted. Configuration values and message contents were not logged.

The owner must locate or create the appropriate connected service in EmailJS and provide its Service ID. No service value was guessed or changed. A further verification test requires approval; inbox receipt and reply addressing remain unverified. Production settings/redeployment are separate from the local implementation.

## Rulings made and their limits

- Windows-native ledger/extraction replaces Bash bookkeeping scripts because the approved plan uses Phase headings and execution runs in PowerShell. Risk: bookkeeping differences only; verification commands/results are recorded explicitly.
- Changes remain uncommitted and the execution ledger is retained because the approved plan forbids commits without instruction. Risk: the owner must later request/preserve commits explicitly.
- Blue palette shades were adjusted for light/dark contrast without changing the selected visual direction. Risk: visual preference remains subject to preview feedback.
- Production email success is withheld until corrected configuration and actual inbox verification. Risk: code fixes alone do not restore delivery.
- CV-reported experience is treated as owner-supplied evidence, not independent employment verification. Risk: the owner must correct any inaccurate public wording.
- Browser/automated/handoff checks were performed by the implementer; the separate reviewer inspected code and did not duplicate these checks. Risk: browser checks are not independently certified.

## Remaining work

- Correct EmailJS service configuration and verify a further authorized test, recipient and reply address.
- Owner review of local preview and approval before any production deployment.
- Optional deferred minor wording/test improvement described above.

### Contact verification update — 29 October 2026

The owner supplied the corrected public Service ID, and only `NEXT_PUBLIC_EMAILJS_SERVICE_ID` in the ignored `.env.local` was updated. A separately authorized single verification request using the corrected setting returned EmailJS HTTP 200 OK. The owner confirmed that the verification email arrived. This verifies provider acceptance and actual inbox receipt for the corrected local configuration; reply-address behavior has not been independently checked.

The live deployment still requires the same environment-setting correction and an approved redeployment. Do not report the live website repaired until those changes are deployed and verified. No production environment, Git remote, or CV file was changed.

Latest production build with the corrected public Service ID passed, including TypeScript and static generation. Production preview was verified at http://localhost:3002; the previous preview occupied port3001. No production deployment occurred.

Follow-up: the owner requested an embedded YouTube demonstration instead of the DevPath-AI screenshot. The project now embeds video mDVlat1dtDY with inline playback, fullscreen, lazy loading, no autoplay, an accessible title, and a direct Watch on YouTube fallback. The unused generated screenshot was removed. Browser inspection confirmed the actual YouTube player loads; at 320px viewport its frame is239x200 with no page overflow. The latest code also includes GitHub beside LinkedIn in Contact and the CV Core Technical Skills categories. Full suite36 tests, lint, and TypeScript checks passed. Current source preview: http://localhost:3001/#projects. No deployment occurred.

## Portrait spotlight implementation

User selected the portrait spotlight direction. The hero now uses a separate transparent portrait, a restrained spotlight/outline, staggered text entrances, and subtle CTA hover movement. Original photo remains unchanged. Tailwind owns the layout; the decorative orbit uses one CSS keyframe, gated by visibility and reduced-motion preference, with an explicit pause/resume control that freezes its current position.

The fresh focused review identified a server/client motion-preference mismatch. A hydration regression test reproduced it, and the existing useSyncExternalStore mount pattern corrected it. Tests for pause/resume and reduced motion pass. No additional actionable reviewer findings.

Verification: full suite39/39 passed; lint and TypeScript passed. Browser reload reported no new hydration errors. Paused outline kept an identical computed transform across checks. Name fitted and page had no horizontal overflow at320,390,768,1024,1440px. Portrait was inspected in light and dark themes and fully visible on mobile. Production build outcome is recorded in the execution ledger. No commit or deployment.

Asset: public/images/profile-cutout-v1.png, generated with the built-in image_gen editing tool. Actual alpha transparency was verified (background sample alpha0). Original public/images/profile.jpg is retained. The edited portrait is subject to the owner's visual review.

Image edit prompt: Use case: precise-object-edit. Asset type: transparent photographic portrait cutout for this person's professional portfolio hero. Edit target: the supplied original photograph. Remove ONLY the entire background (brick wall, vegetation, sky and all scenery). Isolate the SAME person, preserving their exact facial identity, facial features, expression, hair, natural skin texture, pose, white jacket, white shirt, hands in pockets, blue jeans, proportions and original photographic appearance. Do not retouch, beautify, change clothing, redraw, stylize, add props, or change the person. Crop away empty scenery so the person fills a tight tall portrait canvas, showing from the top of the hair to the existing bottom edge of the jeans. Preserve the existing lower-body crop; do not invent legs or missing anatomy. Clean realistic fine hair edges, no green wall fringe, no halo, no shadows, no border, no text. Background must be truly transparent alpha, not a checkerboard image, not white or black.

### Approved layout cleanup — 2026-10-29
Removed hero/footer social navigation; retained both contact profiles and hero actions. Simplified footer to name/copyright. Reduced section padding from 64/80px to 48/56px and tightened heading, card and column gaps. Preserved navigation, theme toggle and portrait animation. Verified logo containers already have no background/border. Validation: 40 tests passed; full ESLint passed; local browser preview checked, narrow viewport content width matches viewport (360px). Desktop preview saved as layout-cleanup-desktop.jpg. No deployment or email sent.

### Social rail and experience timeline — 2026-10-29
Implemented the owner-approved reference-inspired social rail and timeline without applying the broader redesign concepts. The rail appears at 1360px and wider, with 44px link targets, accessible names, brand icons, and hover/focus labels. Existing Contact links remain. Experience remains a chronological ordered list, with a decorative scroll-linked fill and endpoint. Motion values update the line without per-scroll React state. Mobile padding/logo sizing adjusted to accommodate the track. Reduced-motion CSS provides an immediate static fallback; a reproduced server/client hydration mismatch was fixed with the existing hydration-safe mount pattern and covered by a regression test.
Validation: 44 tests passed across 13 files; full ESLint and TypeScript passed; production build passed. Browser checks confirmed progressing fill/endpoint, both profiles, no new console errors, light/dark rendering, no horizontal overflow at 320/375/768px tested viewports, hidden rail at narrow sizes, and rail visibility on wide desktop. No emails, deployment, commits, or pushes.

Follow-up approved: anchor the wide-desktop social rail at the bottom-left (16px left, 32px bottom); use the site blue accent for the timeline fill, endpoint, and glow; hide the root page scrollbar while retaining scrolling. Browser checks confirmed placement, matching blue colors, scrollbar-width none, and working Page Down scrolling. Four focused tests and lint passed.

Approved placement update: on desktop, center the blue animated timeline in the gap between company details and contribution lists. Preserve a left-side track on stacked mobile cards. Browser checks confirmed exact center alignment in the 40px column gap and no overflow at 375px. Ten focused tests and lint passed.

Latest owner preference: remove the repeated GitHub/LinkedIn profile links from Contact and place LinkedIn before GitHub in the bottom-left social rail. Contact description now points to the form. Preserve the LinkedIn service-error fallback. Eight focused tests and lint passed.

Combined experience panel — owner approved: both company entries now share one rounded surface and outer border, separated by a subtle internal rule. The blue timeline remains continuous between the desktop columns and inset on mobile. Experience heading reveal: 400ms/10px; company metadata: 420ms/12px; contributions: 450ms/12px after 80ms, each triggered once at its own viewport entry. Other sections retain their existing Reveal defaults. Timeline follows the 55% viewport reading position, with one shared spring-smoothed progress value for fill and endpoint (stiffness 180, damping 32, mass 0.35). Reduced-motion static behavior and hydration protection remain. Validation: 44 tests, lint, TypeScript, and production build passed; no overflow at 320/375/768/1024px; desktop line center matched the column-gap center; browser error log empty. No deployment or email sent.

Small-screen hero update: show the existing portrait before the name/introduction below the desktop breakpoint, with compact 208px phone / 256px tablet sizing. Keep desktop text left and 448px portrait right. Browser checks confirmed photo-before-name at 375px, unchanged desktop positioning at 1280px, and no page overflow. This does not implement the pending broader typography/navbar redesign proposal.

Approved stacked About/Contact layout: both use an aligned, centered 720px maximum-width column. About heading appears above its paragraphs; Contact heading/introduction appear above the existing form card. Content, colors, and form behavior retained. Browser checks confirmed matching 720px widths and left edges on desktop and no horizontal overflow at 375px. Thirteen focused content/contact tests passed.

### Approved Motion and typography package — 2026-10-29
Implemented the approved Htet header wordmark (four-letter entrance, 35ms stagger / 350ms duration, blue hover/focus underline), full-name word reveal (50ms stagger / 450ms duration), and consistent 350ms / 8px section-heading entrances. Replaced the earlier concurrent hero sheen/entrance treatment with one grouped reveal. A browser check caught clipped per-token observers preventing visibility; the group now owns the viewport trigger, and all tokens finish visible. Accessible text remains one full phrase, with reduced-motion and no-JavaScript CSS fallbacks and a hydration regression test.
Self-hosted Latin Inter and Manrope WOFF2 files from Google Fonts, with accompanying SIL OFL licenses, font-display swap, and preload links. Body uses Inter; headings/wordmark use Manrope. Sources: https://fonts.googleapis.com/ and https://github.com/google/fonts/tree/main/ofl/inter and https://github.com/google/fonts/tree/main/ofl/manrope. Total font payload about 73KB. No new package dependency or GSAP added.
Shortened the hero introduction while preserving the factual full-stack/AI positioning and photo-first mobile layout. Moved project context/contributions before the YouTube demo. Added LinkedIn-first professional links to the mobile menu and retained Escape handling. Existing stacked 720px About/Contact layouts, combined blue timeline, contact behavior, CV privacy, and desktop social rail remain.
Verification: 47 tests across 14 files, lint, TypeScript, and production build passed. Production preview http://localhost:3003 verified local font loading, completed visible wordmark/name, light and dark themes, mobile menu ordering and Escape close, and no new browser warnings/errors. No horizontal overflow at 320/375/768/1024/1440px and name fit within its column. Screenshots: motion-package-desktop.jpg, motion-package-mobile.jpg, motion-package-dark.jpg. No deployment, email, commit, or push.

Paragraph alignment preference: justify non-uppercase paragraphs within the main page, with each final line aligned to the start. Preserve headings, uppercase labels, buttons/form fields, and the centered footer. Browser verification confirmed justified paragraph alignment, start-aligned final lines/headings, centered footer, and no horizontal overflow at 375px. CSS diff formatting check passed. Latest source preview is http://localhost:3000/; the earlier port-3003 production preview predates this CSS-only adjustment.

### Experience timeline synchronization correction — 2026-10-29
Replace approximate section-wide spring progress with measured company and contribution heading anchors. Each of the 11 headings has an aligned timeline marker; the glow and fill share the latest reached heading (55% viewport reading position) and a short coordinated 120ms transition. Remove independent experience text reveals and duplicate bullet dots so content is always readable and the timeline markers serve as the bullets. Preserve the combined card, blue palette, and static reduced-motion/hydration behavior. Remeasure on resize, panel size changes, font loading, and content mutations; a regression reproduced stale detached heading references after content replacement and now passes.
Validation: 51 tests across 15 files, full lint, TypeScript, and production build passed. Browser checks at 320/375/768/1280px found no overflow and maximum marker-to-heading error below 0.25px. Forward and reverse scrolling both stopped the glow on the expected current heading within 0.25px. Browser error/warning log empty. The separate About/Contact width/two-column clarification remains pending and was not changed.

### Restored wider two-column layout and social feedback — 2026-10-29
Owner clarified preference for the previous two-column About/Contact layout. Both now share a 1280px maximum width, approximately 47.5%/52.5% desktop columns, and matching column alignment; mobile/tablet remain stacked. Heading size adapts to available desktop width to preserve one-line titles at tested 1024/1440px sizes. Social rail and mobile-menu links now share explicit hover/focus feedback: blue-tinted background, outline/glow, subtle icon lift/scale when motion is allowed, and visible rail labels. Direct hover/focus selectors replace the earlier subtle utility-only rail effect.
Verification: 11 focused content/navigation/social tests, full lint, and TypeScript passed. Browser checks confirmed matching 1280px widths and right-column starts, no overflow at 375/768/1024/1440px, and visible blue highlights/labels for both LinkedIn and GitHub using keyboard focus. Hover and focus use the same selector. No deployment, email, commit, or push.

### Final content and cleanup decisions — 2026-10-29
These owner-approved refinements supersede earlier layout and animation notes above. About and Contact use top-aligned 40/60 desktop columns. The social rail shows LinkedIn then GitHub without a container border, hover circles, or visible labels; the Dock magnification remains and the rail clears the footer. The Htet wordmark uses a blue/violet gradient, dances briefly every 10 seconds and on hover/focus, has no underline, and respects reduced motion and hidden-tab pausing. The browser title is Htet Lin Lin Naing, with an H icon.
The hero contains one introductory paragraph with bold blue emphasis on 4+ years of experience. Project context precedes the embedded demo, with the description using the full card width. Experience retains supported responsibilities and results without mentioning promotion. Skills lists tools without a duplicate learning narrative; About explains the agentic workflow direction. Contact uses a concise invitation and visitor-email guidance.
The continuous blue experience timeline begins at the summary's first line and has one moving glow, without repeated markers. Cleanup removes unused tooltip styles and the superseded opaque Galaxy Wave logo, consolidates timeline progress into its tested helper, and renders contact fields from shared definitions. Keep the original portrait because link previews still use it. Ignore generated TypeScript build caches. No dependency was added.
Validation: all 51 tests, full lint, TypeScript with unused-code checks, production build, and diff whitespace checks passed. Contact tests mock email delivery. The owner authorized committing and pushing the feature branch; merging and production deployment are separate actions. Local environment settings and private CV files remain outside the commit.
