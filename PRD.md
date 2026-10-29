# Product Requirements Document (PRD)
## Personal Portfolio Website — Htet Lin Lin Naing

**Author:** Htet Lin Lin Naing
**Date:** Sep 20 2026
**Version:** 1.1
**Status:** Draft — awaiting Figma color values

---

## 1. Overview

Build a personal portfolio website for **Htet Lin Lin Naing — Full Stack Developer**. The site showcases projects, skills, and provides a way for visitors to get in touch. Built with **Next.js + Tailwind CSS**, featuring dark/light theme, animations, and a working contact form.

**Reference Design:** [Figma — Personal Portfolio Website Template](https://www.figma.com/design/FmAm0poFJ6rwLiXSOKerfe/Personal-Portfolio-Website-Template--Community-?node-id=0-1&p=f&t=d9yq4T2YgSlMAm4N-0)

---

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14+ (App Router) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Language | TypeScript |
| Contact Form | EmailJS |
| Deployment | Vercel |
| Version Control | Git + GitHub |

---

## 3. Pages & Structure

Four separate pages with shared layout (navbar + footer):

### 3.1 Home (Landing)
- Hero section with name, title, and tagline
- Animated text / typewriter effect
- Brief intro or CTA to view projects
- Social links (GitHub, LinkedIn, etc.)
- Scroll indicator or animated arrow

### 3.2 About
- Profile photo / avatar
- Bio / personal story
- Skills section (grouped by category: Frontend, Backend, Tools)
- Experience timeline or education
- ~~Downloadable resume/CV link~~ (removed — private)

### 3.3 Projects
- Filterable project grid (by category/tech stack)
- Each project card shows:
  - Thumbnail / preview image
  - Project name
  - Short description
  - Tech stack tags
  - Live demo link
  - GitHub repo link
- Click to view project detail (modal or expanded card)

### 3.4 Contact
- Contact form with fields:
  - Name
  - Email
  - Subject
  - Message
- Form validation (client-side)
- Submit via EmailJS
- Success/error feedback
- Alternative contact info (email, social links)
- Optional: Map or location indicator

---

## 4. Shared Components

| Component | Description |
|-----------|-------------|
| Navbar | Fixed/sticky navigation with page links, mobile hamburger menu, theme toggle |
| Footer | Copyright, social links, quick nav links |
| Theme Toggle | Sun/Moon icon button, persists preference in localStorage |
| Page Transition | Framer Motion page enter/exit animations |
| Scroll-to-Top | Floating button appears on scroll |

---

## 5. Features

### 5.1 Dark/Light Mode
- System preference detection (`prefers-color-scheme`)
- Manual toggle with localStorage persistence
- Smooth transition between themes
- Tailwind `dark:` variants for all components

### 5.2 Animations (Framer Motion)
- Page transitions (fade/slide)
- Scroll-triggered reveal animations (staggered children)
- Hover effects on cards and buttons
- Hero section text animation
- Navbar entrance animation

### 5.3 Responsive Design
- Mobile-first approach
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Mobile hamburger navigation
- Touch-friendly interactions

### 5.4 Contact Form
- Client-side validation (required fields, email format)
- Loading state during submission
- Success toast/notification on send
- Error handling with retry option
- Rate limiting consideration

### 5.5 SEO & Performance
- `<head>` metadata for each page (title, description, OG tags)
- Open Graph image for social sharing
- Semantic HTML (`<main>`, `<section>`, `<article>`)
- Image optimization via `next/image`
- Lighthouse score target: 90+ across all metrics

---

## 6. Design Tokens

Based on the Figma reference (to be refined from actual design):

### Colors
```
Light Theme:
  --bg-primary: #FFFFFF
  --bg-secondary: #F5F5F5
  --text-primary: #1A1A2E
  --text-secondary: #4A4A6A
  --accent: #6C63FF (or from Figma)

Dark Theme:
  --bg-primary: #0A0A0F
  --bg-secondary: #1A1A2E
  --text-primary: #FFFFFF
  --text-secondary: #B0B0CC
  --accent: #6C63FF (or from Figma)
```

### Typography
```
Headings: Inter / Space Grotesk (bold, 600-700)
Body: Inter (regular, 400-500)
Code: JetBrains Mono / Fira Code
```

### Spacing & Layout
```
Max content width: 1200px
Section padding: 80px (vertical)
Card border radius: 12px
```

---

## 7. Data Structure

### Projects (hardcoded in `/data/projects.ts`)
```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  category: 'web' | 'mobile' | 'fullstack' | 'other';
  featured: boolean;
}
```

### Skills (hardcoded in `/data/skills.ts`)
```typescript
interface Skill {
  name: string;
  icon: string; // or React component
  category: 'frontend' | 'backend' | 'database' | 'tools';
  proficiency: 'beginner' | 'intermediate' | 'advanced';
}
```

### Social Links (hardcoded in `/data/socials.ts`)
```typescript
interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// Confirmed links:
const socials: SocialLink[] = [
  { platform: 'GitHub', url: 'https://github.com/HtetLinLinNaing', icon: 'github' },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/htetlinlinnaing/', icon: 'linkedin' },
];
```

---

## 8. Folder Structure

```
my_portfolio/
├── app/
│   ├── layout.tsx          # Root layout (navbar, footer, theme provider)
│   ├── page.tsx            # Home page
│   ├── about/
│   │   └── page.tsx
│   ├── projects/
│   │   ├── page.tsx        # Projects listing
│   │   └── [id]/
│   │       └── page.tsx    # Project detail (optional)
│   ├── contact/
│   │   └── page.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ThemeToggle.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── Input.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Skills.tsx
│   │   ├── ProjectGrid.tsx
│   │   └── ContactForm.tsx
│   └── animations/
│       ├── FadeIn.tsx
│       ├── SlideUp.tsx
│       └── StaggerContainer.tsx
├── data/
│   ├── projects.ts
│   ├── skills.ts
│   └── socials.ts
├── lib/
│   └── utils.ts
├── public/
│   ├── images/
│   │   ├── projects/
│   │   └── profile.jpg
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
├── package.json
└── PRD.md
```

---

## 9. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Performance | Lighthouse 90+ scores |
| Accessibility | WCAG 2.1 AA compliance |
| SEO | Proper meta tags, sitemap, robots.txt |
| Browser Support | Chrome, Firefox, Safari, Edge (latest 2 versions) |
| Mobile | iOS Safari, Android Chrome |
| Bundle Size | < 200KB initial JS load |

---

## 10. Implementation Phases

### Phase 1: Project Setup & Layout
- Initialize Next.js project with TypeScript + Tailwind
- Configure dark/light theme
- Build Navbar + Footer
- Set up page routing (4 pages)
- Theme toggle with localStorage

### Phase 2: Home Page
- Hero section with animations
- Social links
- Responsive layout

### Phase 3: About Page
- Bio section
- Skills display
- Profile image

### Phase 4: Projects Page
- Project grid with cards
- Filter by category
- Hover effects & animations
- Project detail view
- 1 project now, 2 more later

### Phase 5: Contact Page
- Contact form with validation
- EmailJS integration
- Success/error states
- Alternative contact info

### Phase 6: Polish & Deploy
- Framer Motion page transitions
- Scroll animations
- SEO metadata
- Performance optimization
- Deploy to Vercel

---

## 11. Open Questions

| # | Question | Status |
|---|----------|--------|
| 1 | Email service for contact form? | **EmailJS** ✅ |
| 2 | Custom domain? | **TBD** |
| 3 | Profile photo? | **Available** ✅ |
| 4 | Resume PDF? | **Private — excluded** ✅ |
| 5 | Project details & images? | **1 project ready, 2 more later** ⏳ |
| 6 | Social links? | **GitHub + LinkedIn confirmed** ✅ |
| 7 | Figma design colors? | **Pending — user to share hex values** ⏳ |
| 8 | EmailJS Service ID + Template ID? | **Need to set up EmailJS account** ⏳ |

---

## 12. Success Metrics

- All 4 pages built and responsive
- Dark/light mode working across all pages
- Contact form successfully sends emails
- Lighthouse score 90+ on all categories
- Smooth animations on all page transitions
- Deployed and accessible via Vercel URL

---

## 13. Portfolio Upgrade Requirements — 29 October 2026

**Status:** Proposed scope; application implementation has not been authorized.

This section records the current user decisions and supersedes conflicting assumptions in sections 1–12. Preserve existing application work; do not reinitialize the project. The original four-page plan, fixed Figma reference, pending color approval, and promise of two future projects are historical assumptions, not requirements for this upgrade.

### 13.1 Confirmed direction

- Primary goal: obtain interviews for AI full-stack developer roles.
- Positioning: 4+ years of production full-stack experience, expanding into AI application development.
- Current learning: agentic workflows and Python. Distinguish learning from demonstrated professional experience.
- Retain the photo already used on the site.
- No public CV, resume download, or resume file included in deployment assets.
- Public GitHub and LinkedIn profiles may inform content; verify claims before publication.
- DevPath-AI is the existing featured project. No additional app is currently planned; do not invent projects or coming-soon cards.
- Review proposed design directions before selecting the final visual treatment.
- No coding until the user explicitly approves implementation. Documentation updates and read-only investigation are permitted.

### 13.2 Tailwind design and layout requirement

Tailwind CSS is required for the design and responsive layout. Define consistent typography, spacing, colors, content widths, border radii, and interaction states. Prefer reusable styling patterns and use custom CSS only where justified.

Review mobile, tablet, and desktop layouts, including portrait cropping, section spacing, text wrapping, keyboard focus, touch targets, error visibility, and light/dark themes. No horizontal overflow at supported widths. Design selection precedes implementation.

Proposed page order: introduction, selected work, experience, skills and AI learning, brief about, contact. Compare a refined version of the existing design, a technical product showcase, and a personal editorial direction before selection.

### 13.3 Contact reliability — priority defect work

**Problem:** The user reports that contact is not working properly. A working contact path is essential for interview opportunities. Contact repair is required scope, rather than an optional visual improvement.

**Evidence boundary:** Findings below come from reading the current local implementation and tests. No real message was sent, no test suite was executed, and production provider settings or mailbox delivery were not inspected. The local implementation has not been established as identical to the deployed build. These findings do not establish the cause of a production delivery failure.

#### Confirmed source findings

| ID | Finding and evidence | Consequence | Required correction |
|----|----------------------|-------------|---------------------|
| CONTACT-01 | `components/contact/contact-form.tsx:23–28` resets any non-idle status to idle when a field changes. Inputs remain editable during sending; the submit guard and disabled button depend on that status at lines 58–62 and 123–124. | Editing during an in-flight send removes the submission lock and permits another request before the first finishes. Responses may also update feedback for values different from those originally sent. | Keep in-flight request state independent of editable-field feedback, or prevent editing during submission. Guard every submission entry point, including retry. Define which submitted values success refers to. |
| CONTACT-02 | `components/contact/contact-form.tsx:50–55` discards the caught error; lines 115–119 display the same retry message for all failures. `lib/emailjs.ts:9–10` can fail before any provider request when configuration is missing. | Visitors receive identical advice for configuration, transport, and provider failures. The application preserves no useful error category for troubleshooting, so retrying may never help. | Classify failures, provide appropriate visitor guidance and safe diagnostics, and avoid displaying private configuration, message bodies, or visitor addresses in logs. |
| CONTACT-03 | `tests/components/contact-form.test.tsx` mocks the application send helper; `tests/lib/emailjs.test.ts` mocks the EmailJS SDK. The pending-request test does not edit a field while sending. | Existing tests cannot establish actual email delivery and do not detect CONTACT-01. | Add a focused regression scenario for editing while sending and retry behavior. Separately verify provider acceptance and actual mailbox receipt with a controlled message. |
| CONTACT-04 | `components/sections/contact.tsx` renders only the form and introduction; it provides no alternative contact link within the contact section. | A visitor facing a persistent form error has no nearby alternative, although social links exist elsewhere on the page. | Add the approved LinkedIn link beside the form and in persistent failure guidance. Do not introduce a new public email address without approval. |

#### Delivery causes still to investigate

- All three required local EmailJS settings have nonempty assignments. Their validity and the deployed values have not been verified; do not label configuration as absent without evidence.
- Verify production service ID, template ID, public key, correct deployment environment, and whether a rebuild/redeployment is needed after changing public configuration.
- Verify the configured recipient, service connection, template status, and matching template variables: `from_name`, `reply_to`, `subject`, and `message`.
- Inspect any configured origin restrictions, provider quota, and the actual provider response to a failing request.
- Confirm receipt in the intended inbox, spam handling, and that replying addresses the submitted sender.
- Record the production failure category and evidence before selecting a delivery fix. Retain EmailJS unless evidence justifies changing providers or architecture.

EmailJS SDK documentation reference: https://github.com/emailjs-com/emailjs-sdk/blob/main/_autodocs/api-reference/send.md

#### Acceptance criteria

- **CONTACT-A1:** Invalid or whitespace-only required fields and malformed email addresses display associated field errors without sending a request.
- **CONTACT-A2:** While a request is pending, editing, repeated submit actions, keyboard submission, and retry actions cannot create a second concurrent request.
- **CONTACT-A3:** Feedback corresponds to the actual submitted values. An outstanding response cannot be mistaken for confirmation of a different draft.
- **CONTACT-A4:** Rejected requests preserve the draft. Retry works after a recoverable failure; persistent configuration/provider failures offer the approved alternative contact link.
- **CONTACT-A5:** Success appears only after provider acceptance. It must not claim verified inbox receipt based solely on an API response.
- **CONTACT-A6:** Missing configuration and provider/network failures produce useful, privacy-conscious diagnostics and clear visitor feedback.
- **CONTACT-A7:** Loading, validation, error, retry, and success states remain accessible and visually readable across mobile/desktop and both themes, using Tailwind styling.
- **CONTACT-A8:** A controlled production message is accepted by the provider, arrives in the intended mailbox, and has the correct reply address. Record the result separately from mocked test results.
- **CONTACT-A9:** No mailbox passwords, private provider credentials, or CV files enter public assets or diagnostics.

### 13.4 Revised delivery phases

| Phase | Deliverables | Completion criteria |
|-------|--------------|---------------------|
| 1. Evidence and contact diagnosis | Verify profile/project claims, inspect the existing application, and capture the production contact failure category and provider configuration status | Distinguish confirmed defects from unverified delivery hypotheses; document missing evidence |
| 2. Design exploration | Two or three concepts covering introduction, project presentation, and contact states, with mobile examples | User selects the design direction |
| 3. Content and implementation approval | Final positioning, experience, DevPath-AI case study, AI learning copy, contact behavior, and Tailwind layout requirements | User confirms factual accuracy and explicitly authorizes coding |
| 4A. Contact repair | Correct confirmed request-state and feedback defects; resolve the evidenced delivery cause and add focused regression coverage | CONTACT-A1–A7 and A9 satisfied; provider delivery verification prepared |
| 4B. Portfolio upgrade | Implement approved responsive design and content using Tailwind, retaining the current photo and excluding public CV assets | Approved content and design are complete |
| 5. Verification and preview | Relevant automated checks, responsive/accessibility review, link checks, and controlled delivery verification | Acceptance criteria pass; distinguish API acceptance from actual inbox receipt |
| 6. Launch | Reviewable preview, final corrections, production approval, and deployed contact verification | User approves launch; CONTACT-A8 passes against the production deployment |

If the user prioritizes an urgent contact repair before the visual redesign, obtain explicit approval for that bounded implementation and bring phase 4A forward. This document update itself does not start application changes.

### 13.5 Professional visual standard

The portfolio must communicate the judgment and experience of a developer with 4+ years of professional work. Use clear typography, consistent Tailwind spacing and alignment, a restrained palette, subtle interactions, the existing portrait, and genuine product screenshots. Prioritize readable case studies and specific contributions.

Avoid generic AI imagery, excessive gradients, glowing cards, typing animations, decorative dashboards, unsupported statistics, and exaggerated marketing copy. This supersedes the historical animated/typewriter requirements. Design acceptance requires user review of desktop and mobile concepts before implementation.

### 13.6 CV evidence and proposed portfolio content

**Source reviewed:** User-provided `HTET_LIN_LIN_NAING_Dev.docx`, read on 29 October 2026. These are CV-reported facts for draft content, not independent employment or implementation verification. The CV remains outside the repository and public assets. Do not copy it into the project.

**LinkedIn:** The supplied profile URL is https://www.linkedin.com/in/HtetLinLinNaing . The public page requires sign-in; the available connector located the matching profile URL but did not provide its content. No profile claims have been independently corroborated from LinkedIn. Retain the approved link and resolve discrepancies with the user rather than guessing.

| Content area | Evidence reported in the CV | Portfolio requirement |
|--------------|-----------------------------|-----------------------|
| Positioning | 4+ years developing production business applications across frontend, backend, APIs, databases, tests, and delivery | Lead with practical full-stack experience and use specific responsibilities as evidence; target AI full-stack roles without presenting all employment as AI work |
| Galaxy Wave | Software Engineer, November 2022–present; promoted from Full Stack Developer | Update the proposed experience entry to reflect progression. Confirm current title and promotion date before splitting the role into separately dated positions |
| Business application work | Approval workflows, dashboards, dynamic forms, reporting, large-data exports, authentication, authorization, and RBAC | Select a few representative contributions and explain the problem and personal contribution. Do not expose employer data or infer measured improvements |
| Engineering maturity | Production root-cause investigation, pull request review, mentoring junior developers, and technical documentation | Make ownership, troubleshooting, and collaboration visible rather than relying solely on a technology list; do not invent team size or a formal management title |
| Testing and delivery | Playwright automation, Docker, Bitbucket Pipelines, CircleCI, Azure logging and monitoring | Group these under testing, delivery, and production support; use supported examples without inventing infrastructure ownership |
| Kopwar | Backend Developer (Golang), May–October 2022; Go, Gin, GORM, REST APIs, Postman testing, MinIO uploads, API documentation | Retain this earlier backend role as evidence of API and data experience |
| DevPath-AI | Next.js, TypeScript, OpenAI API, Vercel; personalized learning paths; authentication, validation, API integration, persistent storage | Expand the case study around these reported features. Verify the actual implementation and project status before publishing detailed claims or architecture. Do not infer model, database vendor, agents, RAG, evaluations, or user counts |
| AI-assisted engineering | Use of AI development tools, custom agentic development workflows, and review of generated output before incorporation | Explain the working practice concisely when supported by an example. Tool use does not establish deployed autonomous agent systems |
| Current learning | User explicitly identified agentic workflows and Python in this conversation | Label Python and agentic workflows as current learning; Python is not established as professional production experience by the CV |
| Education | Bachelor of Computer Science, University of Computer Studies, Lashio, 2012–2017; Master of Computer Science coursework, University of Computer Studies, Yangon, 2017–2020, with thesis in progress | Education is optional and secondary to experience. Confirm the present thesis status before publication; never label the master's degree as awarded based on this CV |

#### Proposed introduction copy for approval

**Headline:** Full Stack Developer with 4+ Years of Experience

**Supporting copy:** I build and maintain production business applications across frontend, backend APIs, and databases. My work includes automated testing, production troubleshooting, code review, and mentoring. I have integrated the OpenAI API into DevPath-AI and am developing my skills in agentic workflows and Python.

**Actions:** View my work; Contact me. Supporting links: GitHub and LinkedIn. No CV download.

#### Content selection and privacy

- Prioritize the promotion, production ownership, mentoring, and actual AI application integration over a long AI-tool inventory.
- Treat AI-assisted development, AI application integration, and current AI learning as distinct claims.
- The CV contains no quantified impact supporting fabricated percentages, user counts, performance gains, or team sizes. Add numbers only with additional evidence.
- Do not automatically publish the CV's phone number, email, location, relocation preference, or the complete CV text. Use the already approved public contact links; confirm any additional contact or availability details before publication.
- Use concise, natural first-person writing and real project evidence. Keep the full CV private and unchanged.
- Before final content approval, confirm the Galaxy Wave title/promotion timing, current master's thesis status if education is included, DevPath-AI implementation details, and which professional examples are permitted to share.

**Completion criteria:** The content draft traces factual claims to the CV or explicit user statements, marks unresolved claims, preserves the CV privacy boundary, and accurately distinguishes professional full-stack experience from AI integration and ongoing learning. Application code remains unchanged until explicitly approved.

### 13.7 Implementation status — 29 October 2026

The user approved the implementation plan and chose native execution on `codex/portfolio-professional-upgrade` in the existing folder, preserving existing edits. Application work is implemented locally and has not been committed, pushed, or deployed.

- Contact request locking, draft protection, safe failure classification, keyboard focus, dark-theme token specificity, and LinkedIn fallback are implemented.
- Professional content, separate AI learning, updated navigation/section order, responsive Tailwind refinement, and an actual public DevPath-AI screenshot are implemented. The original profile photo remains; the CV is not in public assets.
- Full suite: 34 tests passed across 10 files. Lint and production build including TypeScript passed. Browser checks found no horizontal overflow at 320, 390, 768, 1024, or 1440 pixels, and the hero name remained on one line. Mobile navigation and dark contact validation were inspected.
- A fresh independent review identified a dark-theme specificity defect; it was reproduced and corrected, then verified in-browser. One minor improvement is deferred: service-specific wording for retryable provider failures and additional visible error-category assertions.

**Confirmed delivery cause:** The user authorized exactly one diagnostic test. EmailJS rejected that request with HTTP 400: "The service ID not found." The three local public configuration values were found in the deployed JavaScript without exposing the values in output. The configured service ID is not accepted for the tested account configuration. No message was accepted for delivery.

**Remaining dependency:** The owner must supply the correct Service ID from EmailJS Email Services (https://dashboard.emailjs.com/admin). If no service exists, the owner must connect one. After the setting is corrected, obtain permission for a further verification message, verify recipient/template/account consistency, update the appropriate production settings and rebuild/redeploy only with approval, and confirm inbox receipt/reply addressing. Do not mark CONTACT-A8 satisfied until this succeeds.

The execution record is `docs/superpowers/plans/2026-10-29-portfolio-upgrade-results.md`. No provider setting has been guessed or changed.

### Contact verification update — 29 October 2026

The owner supplied the corrected public Service ID, and only `NEXT_PUBLIC_EMAILJS_SERVICE_ID` in the ignored `.env.local` was updated. A separately authorized single verification request using the corrected setting returned EmailJS HTTP 200 OK. The owner confirmed that the verification email arrived. This verifies provider acceptance and actual inbox receipt for the corrected local configuration; reply-address behavior has not been independently checked.

The live deployment still requires the same environment-setting correction and an approved redeployment. Do not report the live website repaired until those changes are deployed and verified. No production environment, Git remote, or CV file was changed.

Follow-up: the owner requested an embedded YouTube demonstration instead of the DevPath-AI screenshot. The project now embeds video mDVlat1dtDY with inline playback, fullscreen, lazy loading, no autoplay, an accessible title, and a direct Watch on YouTube fallback. The unused generated screenshot was removed. Browser inspection confirmed the actual YouTube player loads; at 320px viewport its frame is239x200 with no page overflow. The latest code also includes GitHub beside LinkedIn in Contact and the CV Core Technical Skills categories. Full suite36 tests, lint, and TypeScript checks passed. Current source preview: http://localhost:3001/#projects. No deployment occurred.

### Approved layout cleanup — 2026-10-29
Keep only View my work and Contact me in the hero. Keep section navigation and the theme toggle. Group GitHub and LinkedIn in Contact; show only name and copyright in the footer. Reduce section padding and related-element gaps while retaining readable text and accessible controls. Company logo containers have no added background or border.

### Approved social rail and experience timeline — 2026-10-29
Add a GitHub/LinkedIn rail in the spare margin on wide desktop screens, with accessible link names, keyboard focus, and hover labels. Keep Contact social links on mobile. Add a decorative scroll-linked blue/violet timeline beside the existing employment cards; it represents reading progress, not skill or employment duration. Preserve factual content, company logos, existing theme, and other sections. Provide a fully filled static timeline and no moving endpoint for reduced-motion preferences.

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
