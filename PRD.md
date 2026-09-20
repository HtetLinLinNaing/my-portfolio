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
