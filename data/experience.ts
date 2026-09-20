import type { ExperienceEntry } from '@/lib/types';

export const experience: ExperienceEntry[] = [
  {
    company: 'Galaxy Wave',
    role: 'Full Stack Developer',
    period: 'November 2022 – Present',
    summary:
      'Building and maintaining production web applications across frontend, backend, API, database, testing, and delivery workflows.',
    highlights: [
      'Developed responsive features with React, Next.js, and TypeScript, including advanced search, dynamic forms, reporting, and large-data exports.',
      'Integrated REST APIs, PostgreSQL data, authentication, permissions, validation, and complex application workflows.',
      'Improved release reliability through Playwright end-to-end tests, Docker, CI/CD workflows, debugging, and code review.',
    ],
  },
  {
    company: 'Kopwar',
    role: 'Backend Developer (Golang)',
    period: 'May 2022 – October 2022',
    summary:
      'Developed REST APIs and supported backend integrations for a microservices CRUD application.',
    highlights: [
      'Built APIs with Go, Gin, GORM, and relational databases, including related-record joins and table design.',
      'Created positive and negative API tests in Postman and validated responses, error handling, and database changes.',
      'Integrated MinIO image uploads and collaborated with frontend and related teams on requirements and integration.',
    ],
  },
];
