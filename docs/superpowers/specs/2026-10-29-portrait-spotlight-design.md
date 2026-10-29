# Portrait spotlight hero refinement

Approved direction: background-free portrait, slowly moving outline, staggered text entrances, and subtle hover effects. Preserve the current professional copy, one-line name behavior, light/dark theme support, and mobile readability. Preserve the original photo unchanged.

Implementation: retain server-rendered hero content and existing Reveal entrances; isolate the decorative orbit animation in a client HeroPortrait component. Display a separate transparent PNG using Next Image. Use Tailwind for the responsive stage, low-contrast spotlight, line treatment, and hover states. Disable orbit movement for reduced-motion preference and while offscreen. No new dependencies, public claims, audio, or navigation changes.

Checks: verify portrait asset selection, both themes and mobile overflow; run tests, lint and TypeScript; request a separate focused review of animation/accessibility before handoff. No commit or deployment.

Asset: public/images/profile-cutout-v1.png, built-in image_gen edit with alpha transparency, original public/images/profile.jpg unchanged.

## Portrait spotlight implementation

User selected the portrait spotlight direction. The hero now uses a separate transparent portrait, a restrained spotlight/outline, staggered text entrances, and subtle CTA hover movement. Original photo remains unchanged. Tailwind owns the layout; the decorative orbit uses one CSS keyframe, gated by visibility and reduced-motion preference, with an explicit pause/resume control that freezes its current position.

The fresh focused review identified a server/client motion-preference mismatch. A hydration regression test reproduced it, and the existing useSyncExternalStore mount pattern corrected it. Tests for pause/resume and reduced motion pass. No additional actionable reviewer findings.

Verification: full suite39/39 passed; lint and TypeScript passed. Browser reload reported no new hydration errors. Paused outline kept an identical computed transform across checks. Name fitted and page had no horizontal overflow at320,390,768,1024,1440px. Portrait was inspected in light and dark themes and fully visible on mobile. Production build outcome is recorded in the execution ledger. No commit or deployment.

Asset: public/images/profile-cutout-v1.png, generated with the built-in image_gen editing tool. Actual alpha transparency was verified (background sample alpha0). Original public/images/profile.jpg is retained. The edited portrait is subject to the owner's visual review.

Image edit prompt: Use case: precise-object-edit. Asset type: transparent photographic portrait cutout for this person's professional portfolio hero. Edit target: the supplied original photograph. Remove ONLY the entire background (brick wall, vegetation, sky and all scenery). Isolate the SAME person, preserving their exact facial identity, facial features, expression, hair, natural skin texture, pose, white jacket, white shirt, hands in pockets, blue jeans, proportions and original photographic appearance. Do not retouch, beautify, change clothing, redraw, stylize, add props, or change the person. Crop away empty scenery so the person fills a tight tall portrait canvas, showing from the top of the hair to the existing bottom edge of the jeans. Preserve the existing lower-body crop; do not invent legs or missing anatomy. Clean realistic fine hair edges, no green wall fringe, no halo, no shadows, no border, no text. Background must be truly transparent alpha, not a checkerboard image, not white or black.
