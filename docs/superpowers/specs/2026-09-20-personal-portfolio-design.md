# Personal Portfolio Website Design Specification

## 1. Purpose

Build a polished personal portfolio for Htet Lin Lin Naing, a Full Stack Developer. The site should help recruiters, collaborators, and other visitors quickly understand his strengths, see his featured project, and contact him through a private contact form.

The first release is a single responsive scrolling page based on the supplied Figma reference. The content and project model must remain easy to extend as additional projects become available.

## 2. Confirmed Decisions

- Use the professional title “Full Stack Developer”.
- Use one scrolling page with anchored navigation rather than four separate pages.
- Use the user-provided profile photograph in the Hero and About sections.
- Use `#4C78CA` as the primary accent color instead of the yellow shown in the reference.
- Feature DevPath-AI as the first and currently only project.
- Use `https://devpath-ai-three.vercel.app/` as the DevPath-AI live-demo URL.
- Publicly mention Galaxy Wave and Kopwar as previous employers.
- Do not publish the phone number or email address as visible text.
- Use the contact form as the primary contact method.
- Do not include the Master’s thesis status.
- Use EmailJS for client-side contact delivery.
- Use npm for project setup and scripts.

## 3. Scope

### Included in the first release

- Next.js App Router application written in TypeScript.
- Responsive single-page layout with Home, About, Skills, Experience, Projects, and Contact sections.
- Sticky desktop navigation and mobile navigation menu.
- Light and dark themes with system preference detection and persisted manual preference.
- Hero section with profile image, role, short introduction, social links, and calls to action.
- Curated About and Experience content derived from the CV.
- Grouped technical skills derived from the CV.
- Featured DevPath-AI project card with description, technology tags, and live-demo link.
- Contact form with Name, Email, Subject, and Message fields.
- Client-side validation, loading state, success state, error state, and retry action.
- EmailJS integration using environment variables.
- Responsive behavior for mobile, tablet, and desktop widths.
- Semantic HTML, keyboard-accessible controls, focus styles, image alt text, and reduced-motion support.
- Page metadata, Open Graph metadata, sitemap, and robots configuration.

### Deferred from the first release

- Separate project-detail routes.
- Additional projects beyond DevPath-AI.
- Public resume or CV download.
- Public phone number and email display.
- Map or location widget.
- Custom domain configuration.
- Database, authentication, admin panel, or CMS.

## 4. Page Structure

The application uses one page with section IDs so navigation links can scroll to the correct location.

### Navigation

- Brand/name link scrolls to the top.
- Links: About, Skills, Experience, Projects, Contact.
- Theme toggle is available on desktop and mobile.
- Mobile navigation opens and closes with an accessible hamburger button.
- Navigation closes after a mobile link is selected.

### Hero

- Display the name Htet Lin Lin Naing.
- Display the title Full Stack Developer.
- Use a concise introduction focused on building reliable, responsive web applications.
- Provide a primary action to view projects and a secondary action to contact.
- Show GitHub and LinkedIn links.
- Display the supplied profile photo inside a rounded/organic blue treatment using `#4C78CA`.
- Include a subtle scroll cue that does not interfere with keyboard navigation.

### About

- Use a short, selective professional summary rather than reproducing the full CV.
- Emphasize full-stack web development, React, Next.js, TypeScript, APIs, databases, testing, and production delivery.
- Present the profile as a current professional introduction, not an exhaustive biography.

### Skills

Group selected CV skills into concise categories:

- Frontend: React, Next.js, TypeScript, JavaScript, Tailwind CSS, SWR, React Hook Form, Zod, HeroUI.
- Backend: Node.js, C#, Go, Gin, GORM, REST APIs.
- Data and search: PostgreSQL, SQL, OpenSearch.
- Testing and delivery: Playwright, Jest, API testing, Docker, Bitbucket Pipelines, CI/CD, Vercel.

The section should prioritize readability and relevance over showing every tool listed in the CV.

### Experience

- Show Galaxy Wave, Full Stack Developer, November 2022 to present.
- Show Kopwar, Backend Developer (Golang), May 2022 to October 2022.
- Use concise achievement-oriented descriptions.
- Mention production web applications, APIs, database-backed workflows, testing, CI/CD, debugging, and collaboration.
- Do not include the thesis status or unrelated personal details.

### Projects

- Render a featured DevPath-AI project card.
- Description: an AI-powered learning platform that creates personalized learning paths and structured development roadmaps based on a developer’s skills, experience, and career goals.
- Include the live-demo link.
- Include technology tags based on the CV and project description, using only confirmed technologies.
- Omit a GitHub button until a public repository URL is supplied.
- Keep the data shape extensible so future projects can be added without changing the section layout.

### Contact

- Fields: Name, Email, Subject, Message.
- Keep the receiving email private from visitors.
- Validate required fields and email format on the client.
- Disable or otherwise protect duplicate submissions while a message is sending.
- Show a clear success message after EmailJS accepts the submission.
- Show a clear error message with a retry option when submission fails.
- Provide GitHub and LinkedIn links as secondary ways to connect without exposing the private email address.

### Footer

- Display the name and current role.
- Include quick links and social links.
- Use a current copyright notice without adding unnecessary personal contact details.

## 5. Visual Design

### Colors

- Primary accent: `#4C78CA`.
- Light background: near-white neutral surface.
- Dark background: deep charcoal/navy surface.
- Primary text: high-contrast dark text in light mode and light text in dark mode.
- Secondary text: muted but readable text color.
- Use the blue accent consistently for buttons, links, highlights, decorative shapes, focus rings, and the profile-image treatment.
- Do not use the reference design’s yellow as a primary design color.

### Typography and layout

- Use Inter for body text and Space Grotesk for headings, with system sans-serif fallbacks.
- Use clear heading hierarchy and readable line lengths.
- Use a maximum content width near 1200px.
- Use generous vertical section spacing and a card radius near 12px.
- Prefer restrained decorative shapes, borders, shadows, and motion so the content remains the visual priority.

### Motion

- Use Framer Motion for entrance reveals, staggered cards, hover states, and subtle page-level transitions.
- Keep motion short and purposeful.
- Respect `prefers-reduced-motion` by reducing or disabling nonessential animation.

## 6. Technical Architecture

- Use Next.js App Router with TypeScript.
- Keep the page and content structure primarily server-rendered where possible.
- Isolate interactive behavior into client components: theme toggle, mobile navigation, animated sections, and contact form.
- Store project, skill, and social data in typed local data modules.
- Use Tailwind CSS for responsive styles and theme variants.
- Use CSS custom properties or a centralized theme layer for shared design tokens.
- Use `next/image` for the profile photo and project imagery.
- Use EmailJS through the browser SDK from the contact form.
- Keep EmailJS configuration in environment variables:
  - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
  - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
  - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
- Do not store email passwords, private tokens, or provider credentials in the application.

## 7. Accessibility and Performance

- Use semantic landmarks including header, nav, main, section, article, and footer.
- Give every form field a visible label and useful validation message.
- Ensure keyboard operation for navigation, theme toggle, mobile menu, buttons, and form controls.
- Preserve visible focus indicators.
- Provide descriptive image alt text and decorative-image handling where appropriate.
- Maintain readable contrast for both themes, especially blue text on light backgrounds.
- Avoid layout shift by sizing images and reserving space for dynamic content.
- Target Lighthouse scores of 90 or higher where practical.
- Use reduced-motion behavior and responsive image sizing.

## 8. Verification Plan

- Run formatting/lint checks and TypeScript validation.
- Run a production build before delivery.
- Test navigation and theme persistence on desktop and mobile viewport sizes.
- Test contact validation, loading, success, failure, and retry states.
- Verify EmailJS using a real test submission after configuration is connected.
- Check external links and confirm the DevPath-AI live-demo link opens correctly.
- Perform a manual accessibility pass for keyboard navigation, labels, focus states, and color contrast.
- Review the final page visually at mobile, tablet, and desktop widths.

## 9. Future Extension Points

- Add more entries to the project data module.
- Add optional GitHub links when repositories are available.
- Add project-detail routes when project descriptions require more space.
- Add a custom domain and deployment configuration after the first release is approved.
- Revisit the bundle-size target after measuring the production build rather than treating the PRD estimate as an unverified constraint.
