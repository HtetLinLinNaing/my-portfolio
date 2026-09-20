# Personal Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Htet Lin Lin Naing’s responsive one-page Full Stack Developer portfolio with the approved blue visual system, featured DevPath-AI project, theme switching, animations, and an EmailJS contact form.

**Architecture:** Use a Next.js App Router page composed from focused section and layout components. Keep content in typed local data modules, keep interactive behavior in small client components, and keep EmailJS configuration in environment variables. The page is server-rendered where possible, with client boundaries only for theme, navigation, animation, and form behavior.

**Tech Stack:** TypeScript, Next.js App Router, React, Tailwind CSS v4, Framer Motion, next-themes, EmailJS Browser SDK, Zod, Vitest, Testing Library, npm.

**Spec:** `docs/superpowers/specs/2026-09-20-personal-portfolio-design.md`

## Global Constraints

- The first release is one scrolling page with anchored navigation.
- The professional title is “Full Stack Developer”.
- The primary accent color is exactly `#4C78CA`; the reference yellow is not used as the primary color.
- Phone number and email address must not appear as visible portfolio text.
- DevPath-AI is the only initial project and links to `https://devpath-ai-three.vercel.app/`.
- Galaxy Wave and Kopwar may be named publicly.
- The Master’s thesis status is excluded.
- EmailJS configuration uses `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, and `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`.
- The project uses TypeScript, Next.js App Router, Tailwind CSS, Framer Motion, and npm.
- Semantic HTML, keyboard access, visible focus states, useful labels, alt text, responsive behavior, and reduced-motion support are required.
- No database, authentication, CMS, public resume, map, or separate project-detail route is included in the first release.

## Review Focus

- Missing or malformed EmailJS environment values must produce a visible configuration error and must not attempt a send; test the configuration guard in Task 6.
- Invalid or duplicate contact submissions must not call EmailJS; test validation and the submitting lock in Task 6.
- Theme preference must survive reloads and avoid server/client markup mismatch; test the theme provider and toggle in Task 3.
- Mobile navigation must close after selection and remain keyboard-operable; test the navigation state transitions in Task 3.
- Reduced-motion users must not receive nonessential animation; test the reveal wrapper behavior in Task 4.

## File Map

The implementation should create these focused boundaries:

- `app/layout.tsx`: root metadata, providers, global layout, and document structure.
- `app/page.tsx`: one-page section composition only.
- `app/globals.css`: Tailwind entrypoint, theme tokens, base styles, and reduced-motion CSS.
- `app/sitemap.ts`: sitemap metadata.
- `app/robots.ts`: robots metadata.
- `components/layout/navbar.tsx`: sticky navigation and mobile menu.
- `components/layout/footer.tsx`: footer links and copyright.
- `components/theme/theme-provider.tsx`: next-themes provider boundary.
- `components/theme/theme-toggle.tsx`: accessible light/dark/system toggle control.
- `components/motion/reveal.tsx`: reduced-motion-aware Framer Motion wrapper.
- `components/sections/hero.tsx`: hero content and profile image.
- `components/sections/about.tsx`: curated professional summary.
- `components/sections/skills.tsx`: grouped skill display.
- `components/sections/experience.tsx`: public employment timeline/cards.
- `components/sections/projects.tsx`: featured and future-ready project grid.
- `components/contact/contact-form.tsx`: contact fields, validation, submission states.
- `components/ui/button.tsx`: shared button/link styles.
- `components/ui/section-heading.tsx`: consistent section heading treatment.
- `data/projects.ts`: typed project entries.
- `data/skills.ts`: typed skill groups.
- `data/socials.ts`: GitHub and LinkedIn entries.
- `data/experience.ts`: public work history entries.
- `lib/types.ts`: shared data interfaces.
- `lib/emailjs.ts`: EmailJS configuration guard and send wrapper.
- `lib/contact-schema.ts`: Zod contact form schema and inferred form type.
- `public/images/profile.jpg`: user-provided profile image, cropped only for display through CSS/Next image sizing.
- `.env.example`: variable names without secrets.
- `.gitignore`: excludes `.env.local`, build output, and local tooling artifacts.
- `tests/setup.ts`: Testing Library and Jest DOM setup.
- `tests/lib/contact-schema.test.ts`: validation tests.
- `tests/lib/emailjs.test.ts`: configuration and send-wrapper tests.
- `tests/components/theme-toggle.test.tsx`: theme control tests.
- `tests/components/navbar.test.tsx`: navigation behavior tests.
- `tests/components/contact-form.test.tsx`: form state and submission tests.
- `vitest.config.ts`: Vitest, jsdom, path alias, and setup configuration.

### Task 1: Scaffold the Next.js application and test harness

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`
- Create: `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- Create: `.env.example`, `.gitignore`, `vitest.config.ts`, `tests/setup.ts`
- Modify: `PRD.md` only if the implementation status needs to record that scaffolding has begun

**Interfaces:**
- Produces the runnable Next.js application, `@/*` import alias, `npm run dev`, `npm run lint`, `npm run test`, and `npm run build` scripts.
- Produces the environment contract used later by `lib/emailjs.ts`.

- [ ] **Step 1: Initialize the local repository and scaffold the application**

Run from `C:\Users\Administrator\Desktop\my_portfolio`:

```powershell
git init
npm init -y
npm install next react react-dom framer-motion next-themes @emailjs/browser zod clsx tailwind-merge lucide-react
npm install -D typescript @types/node @types/react @types/react-dom eslint eslint-config-next tailwindcss @tailwindcss/postcss postcss vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom vite-tsconfig-paths
```

Add scripts with these names:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [ ] **Step 2: Configure Tailwind v4, TypeScript paths, Vitest, and environment exclusions**

Use `@tailwindcss/postcss` in `postcss.config.mjs`, define the `@/*` path alias in `tsconfig.json`, and configure Vitest for jsdom:

```ts
// vitest.config.ts
import path from 'node:path';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    css: true,
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
});
```

Add `.env.example` with names only:

```text
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

Add `.env.local`, `.next`, `node_modules`, coverage output, and local render output to `.gitignore`.

- [ ] **Step 3: Create a minimal renderable page and base stylesheet**

Use `app/page.tsx` with a single `main` element containing a temporary heading, and `app/globals.css` with the Tailwind import and the approved accent token:

```css
@import "tailwindcss";

:root {
  --color-accent: #4c78ca;
}

@custom-variant dark (&:where(.dark, .dark *));
```

- [ ] **Step 4: Add a smoke test and verify the scaffold**

Create `tests/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

Run:

```powershell
npm run test
npm run lint
npm run build
```

Expected: Vitest exits successfully, ESLint reports no errors, and Next.js produces a production build.

- [ ] **Step 5: Commit the scaffold**

```powershell
git add .
git commit -m "chore: scaffold portfolio application"
```

### Task 2: Add typed portfolio data and the root visual foundation

**Files:**
- Create: `lib/types.ts`, `data/projects.ts`, `data/skills.ts`, `data/socials.ts`, `data/experience.ts`
- Modify: `app/layout.tsx`, `app/globals.css`, `app/page.tsx`
- Create: `public/images/profile.jpg`
- Test: `tests/data.test.ts`

**Interfaces:**
- `Project`: `{ id, title, description, techStack, liveUrl?, githubUrl?, featured }`.
- `SkillGroup`: `{ category, items: string[] }`.
- `SocialLink`: `{ platform, url, label }`.
- `ExperienceEntry`: `{ company, role, period, summary, highlights: string[] }`.

- [ ] **Step 1: Write data-shape tests for the confirmed content**

Add tests that assert the project list contains one featured entry with the exact DevPath-AI URL, the social list contains the confirmed GitHub and LinkedIn URLs, and the experience list contains Galaxy Wave and Kopwar.

```ts
expect(projects.filter((project) => project.featured)).toHaveLength(1);
expect(projects[0].liveUrl).toBe('https://devpath-ai-three.vercel.app/');
expect(experience.map((entry) => entry.company)).toEqual(['Galaxy Wave', 'Kopwar']);
```

- [ ] **Step 2: Implement the typed data modules**

Populate the modules with curated CV content. Do not include the phone number, email address, thesis status, or an unconfirmed GitHub repository URL. Keep `githubUrl` absent from the DevPath-AI entry until a public repository is provided.

- [ ] **Step 3: Add the user-provided profile image and global tokens**

Copy the supplied profile image into `public/images/profile.jpg` without altering the source. Use Next Image sizing and CSS object positioning for the displayed crop. Define light and dark surface/text tokens, focus-ring styles, section spacing, and `prefers-reduced-motion` behavior in `app/globals.css`.

- [ ] **Step 4: Add metadata and compose the page sections by ID**

Set the root metadata title and description in `app/layout.tsx`, then make `app/page.tsx` compose sections in this order:

```tsx
<main>
  <Hero />
  <About />
  <Skills />
  <Experience />
  <Projects />
  <Contact />
</main>
```

Ensure each section has a stable ID for navigation.

- [ ] **Step 5: Run the data and build checks**

```powershell
npm run test -- data
npm run lint
npm run build
```

- [ ] **Step 6: Commit the data and visual foundation**

```powershell
git add app data lib public/images/profile.jpg
git commit -m "feat: add portfolio content and design tokens"
```

### Task 3: Implement navigation, theme persistence, and shared UI

**Files:**
- Create: `components/layout/navbar.tsx`, `components/layout/footer.tsx`
- Create: `components/theme/theme-provider.tsx`, `components/theme/theme-toggle.tsx`
- Create: `components/ui/button.tsx`, `components/ui/section-heading.tsx`
- Modify: `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- Test: `tests/components/navbar.test.tsx`, `tests/components/theme-toggle.test.tsx`

**Interfaces:**
- `Navbar({ links }: { links: Array<{ label: string; href: string }> })`.
- `ThemeProvider({ children }: { children: React.ReactNode })`.
- `ThemeToggle()` renders an accessible button with `aria-label` and icon state.
- `Button` accepts normal anchor or button behavior without duplicating styles.

- [ ] **Step 1: Write failing tests for theme and navigation behavior**

Assert that the theme control exposes an accessible label and calls the next-themes setter, and that selecting a mobile navigation link calls the close behavior.

```tsx
it('exposes a labeled theme control', () => {
  render(<ThemeToggle />);
  expect(screen.getByRole('button', { name: /theme/i })).toBeInTheDocument();
});

it('renders all anchored navigation links', () => {
  render(<Navbar links={[{ label: 'Projects', href: '#projects' }]} />);
  expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects');
});
```

- [ ] **Step 2: Implement the theme provider and toggle**

Configure `next-themes` with `attribute="class"`, `defaultTheme="system"`, `enableSystem`, and `storageKey="portfolio-theme"`. Use a mounted guard in the toggle so the server render does not depend on browser-only theme state.

- [ ] **Step 3: Implement responsive navigation and footer**

Use a sticky header, desktop links, a mobile menu button with `aria-expanded`, and a mobile panel. Close the panel after a link click and keep Escape behavior available. Add footer quick links and social links.

- [ ] **Step 4: Implement shared button and section-heading styles**

Centralize accent, outline, muted, focus, disabled, and external-link styles so sections do not duplicate button CSS.

- [ ] **Step 5: Run focused tests and the build**

```powershell
npm run test -- tests/components/navbar.test.tsx tests/components/theme-toggle.test.tsx
npm run lint
npm run build
```

- [ ] **Step 6: Commit the shared UI**

```powershell
git add app components tests
git commit -m "feat: add navigation theme toggle and shared UI"
```

### Task 4: Build the Hero, About, Skills, and Experience sections

**Files:**
- Create: `components/motion/reveal.tsx`
- Create: `components/sections/hero.tsx`, `components/sections/about.tsx`, `components/sections/skills.tsx`, `components/sections/experience.tsx`
- Modify: `app/page.tsx`, `app/globals.css`
- Test: extend `tests/components/sections.test.tsx`
- Create: `tests/components/sections.test.tsx`

**Interfaces:**
- `Reveal({ children, delay?, className? }: { children: React.ReactNode; delay?: number; className?: string })`.
- Each section component consumes its matching typed data module and has no network dependency.

- [ ] **Step 1: Write failing section-content tests**

Assert that the rendered sections contain the title, employers, selected skills, profile image alt text, and the correct section IDs.

```tsx
expect(screen.getByRole('heading', { name: /Htet Lin Lin Naing/i })).toBeInTheDocument();
expect(screen.getByText('Galaxy Wave')).toBeInTheDocument();
expect(screen.getByText('Kopwar')).toBeInTheDocument();
expect(screen.getByRole('img', { name: /Htet Lin Lin Naing/i })).toBeInTheDocument();
```

- [ ] **Step 2: Implement the reduced-motion-aware reveal wrapper**

Use Framer Motion’s `useReducedMotion()`. When it returns true, render children without a movement animation; otherwise use a short opacity/translate reveal with an optional delay.

- [ ] **Step 3: Implement the Hero and About sections**

Use the profile image in a responsive blue organic treatment, provide View Projects and Contact actions, and write a concise professional summary derived from the CV. Do not expose the phone number or email address.

- [ ] **Step 4: Implement Skills and Experience**

Render grouped skills as readable tags or lists and experience as two responsive cards/timeline entries. Keep text concise and achievement-oriented.

- [ ] **Step 5: Run section tests and visual checks**

```powershell
npm run test -- tests/components/sections.test.tsx
npm run lint
npm run build
```

Open the development page at desktop and mobile widths and confirm the profile image, headings, cards, and section spacing do not overflow.

- [ ] **Step 6: Commit the content sections**

```powershell
git add app components tests
git commit -m "feat: add hero about skills and experience sections"
```

### Task 5: Build the featured Projects section

**Files:**
- Create: `components/sections/projects.tsx`
- Modify: `data/projects.ts`, `app/page.tsx`
- Test: extend `tests/components/sections.test.tsx`

**Interfaces:**
- `Projects({ projects }: { projects: Project[] })` renders all project entries and shows optional actions only when their URLs exist.
- Project cards show title, description, technology tags, and live demo action.

- [ ] **Step 1: Write failing project-card tests**

Assert that DevPath-AI appears as featured, the live link has the correct URL and opens safely in a new tab, and no GitHub action renders when `githubUrl` is absent.

```tsx
expect(screen.getByRole('heading', { name: 'DevPath-AI' })).toBeInTheDocument();
expect(screen.getByRole('link', { name: /live demo/i })).toHaveAttribute(
  'href',
  'https://devpath-ai-three.vercel.app/',
);
expect(screen.queryByRole('link', { name: /github/i })).not.toBeInTheDocument();
```

- [ ] **Step 2: Implement the featured card and extensible grid**

Use typed data mapping, responsive card layout, the confirmed description, and confirmed technology tags. Use an internal CSS preview treatment if no project image is available; do not invent a screenshot or claim an unverified feature.

- [ ] **Step 3: Add future-project empty behavior without showing filler content**

Render only available project entries. The layout must accept additional entries later without changing the card component or section API.

- [ ] **Step 4: Run focused tests and build**

```powershell
npm run test -- tests/components/sections.test.tsx
npm run lint
npm run build
```

- [ ] **Step 5: Commit the projects section**

```powershell
git add app components data tests
git commit -m "feat: add featured DevPath AI project"
```

### Task 6: Implement the validated EmailJS contact form

**Files:**
- Create: `lib/contact-schema.ts`, `lib/emailjs.ts`
- Create: `components/contact/contact-form.tsx`, `components/sections/contact.tsx`
- Modify: `app/page.tsx`, `.env.example`
- Test: `tests/lib/contact-schema.test.ts`, `tests/lib/emailjs.test.ts`, `tests/components/contact-form.test.tsx`

**Interfaces:**
- `contactSchema`: Zod schema for `{ name, email, subject, message }`.
- `sendContactMessage(values: ContactFormValues): Promise<void>` validates environment configuration, maps fields to the EmailJS template variables `from_name`, `reply_to`, `subject`, and `message`, then calls `emailjs.send`.
- `ContactForm` exposes no email address and renders `idle`, `submitting`, `success`, and `error` states.

- [ ] **Step 1: Write failing validation tests**

Cover required name, valid email syntax, required subject, required message, and trimming whitespace before submission.

```ts
expect(contactSchema.safeParse({ name: '', email: 'bad', subject: '', message: '' }).success).toBe(false);
expect(contactSchema.safeParse({ name: 'A', email: 'a@example.com', subject: 'Hello', message: 'Hi' }).success).toBe(true);
```

- [ ] **Step 2: Implement the Zod schema and EmailJS configuration guard**

Read only the three `NEXT_PUBLIC_EMAILJS_*` variables. If any is missing, throw an error with the message `Contact service is not configured.` before importing or calling the send operation. Do not read mailbox passwords or private provider credentials.

- [ ] **Step 3: Write failing EmailJS wrapper tests**

Mock `@emailjs/browser`, verify the exact service ID, template ID, public key initialization, and template parameter mapping. Add a test that missing configuration rejects without calling `send`.

- [ ] **Step 4: Implement the EmailJS send wrapper**

Use the browser SDK with the supplied environment variable values and map the form fields as follows:

```ts
{
  from_name: values.name,
  reply_to: values.email,
  subject: values.subject,
  message: values.message,
}
```

- [ ] **Step 5: Write failing contact-form interaction tests**

Assert that invalid submission displays field errors, valid submission disables the submit button while pending, success displays a confirmation, failure displays a retry action, and a second submit cannot happen while the first is pending.

- [ ] **Step 6: Implement the form and contact section**

Use controlled form state or React Hook Form with the shared Zod schema. Add visible labels, `aria-invalid`, `aria-describedby`, status messaging with `role="status"`, and a retry action that preserves entered values. The receiving email remains private.

- [ ] **Step 7: Configure local testing values and run focused checks**

Create `.env.local` locally with the user-supplied EmailJS values, never commit it, then run:

```powershell
npm run test -- tests/lib/contact-schema.test.ts tests/lib/emailjs.test.ts tests/components/contact-form.test.tsx
npm run lint
npm run build
```

- [ ] **Step 8: Commit the contact form**

```powershell
git add app components lib tests .env.example
git commit -m "feat: add EmailJS contact form"
```

### Task 7: Add SEO files, accessibility polish, and responsive visual refinement

**Files:**
- Create: `app/sitemap.ts`, `app/robots.ts`
- Modify: `app/layout.tsx`, `app/globals.css`, all section components as needed
- Test: `tests/accessibility.test.tsx`

**Interfaces:**
- `sitemap()` returns the portfolio site URL and root route.
- `robots()` allows public crawling and points to the sitemap.

- [ ] **Step 1: Write metadata and accessibility checks**

Add tests or static assertions for the root metadata title/description, landmark presence, one H1, labeled form controls, and external links using `rel="noreferrer"` when opened in a new tab.

- [ ] **Step 2: Implement sitemap, robots, and Open Graph metadata**

Use Next.js metadata route files and a single canonical site URL configuration. Use `/images/profile.jpg` as the initial Open Graph image. Keep deployment URL configuration isolated so a future custom domain changes one location.

- [ ] **Step 3: Refine responsive and theme styles**

Check the approved accent color in light and dark themes, ensure blue text meets contrast expectations, reserve image dimensions, and verify the page at 320px, 768px, 1024px, and 1280px widths.

- [ ] **Step 4: Run the full verification suite**

```powershell
npm run test
npm run lint
npm run build
```

Then manually verify keyboard navigation, mobile menu behavior, theme persistence, reduced motion, external links, contact states, and absence of visible phone/email text.

- [ ] **Step 5: Commit SEO and polish**

```powershell
git add app components public tests
git commit -m "feat: add SEO accessibility and responsive polish"
```

### Task 8: Final acceptance and handoff

**Files:**
- Modify: `README.md`
- Verify: all application files and the production build

**Interfaces:**
- README documents local setup, environment variable names, development command, test command, build command, and deployment notes.

- [ ] **Step 1: Document local setup**

Write README instructions using these commands:

```powershell
npm install
npm run dev
npm run test
npm run build
```

Document that `.env.local` must contain the three EmailJS public configuration values and that the file must not be committed.

- [ ] **Step 2: Run the final production verification**

```powershell
npm run test
npm run lint
npm run build
```

Expected: all tests pass, lint reports no errors, and the production build completes successfully.

- [ ] **Step 3: Perform the real EmailJS test submission**

Start the production build locally, submit one test message, confirm the configured inbox receives it, confirm Reply-To uses the visitor’s email, and confirm the UI shows success. If the send fails, preserve the form values and use the retry state; do not expose provider credentials in the UI.

- [ ] **Step 4: Commit the final handoff documentation**

```powershell
git add README.md
git commit -m "docs: add local setup and deployment notes"
```
