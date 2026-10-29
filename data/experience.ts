import type { ExperienceEntry } from '@/lib/types';

export const experience: ExperienceEntry[] = [
  {
    company: 'Galaxy Wave',
    logo: { src: '/images/gw_logo-transparent.png', width: 2032, height: 774 },
    role: 'Software Engineer',
    period: 'November 2022 – Present',
    summary:
      'Work across feature development and ongoing maintenance, with responsibilities in application design, technical guidance, and production delivery.',
    highlights: [
      {
        title: 'Enterprise web applications',
        description: 'Build responsive applications with React, Next.js, and TypeScript, including advanced search, dynamic forms, reporting, large-data exports, and complex business workflows.',
      },
      {
        title: 'System design and backend integration',
        description: 'Contribute to application design and integrate REST APIs and PostgreSQL data, including authentication, role-based access control (RBAC), and validation.',
      },
      {
        title: 'Technical leadership and collaboration',
        description: 'Provide technical guidance, review pull requests, and mentor junior developers. Collaborate with the team to clarify requirements and support implementation decisions.',
      },
      {
        title: 'Test automation and quality',
        description: 'Build and maintain Playwright automation for business workflows and regressions, helping reduce manual regression testing effort by approximately 40%.',
      },
      {
        title: 'AI-assisted development and agentic workflows',
        description: 'Contribute to internal AI-assisted development workflow initiatives, exploring agentic automation and integrations with development and project management tools.',
      },
      {
        title: 'Delivery and production support',
        description: 'Investigate production issues and support application delivery with Docker, Bitbucket Pipelines, and CircleCI, following issues from investigation through fixes and verification.',
      },
    ],
  },
  {
    company: 'Kopwar',
    logo: { src: '/images/pw_logo.jpg', width: 200, height: 200 },
    role: 'Backend Developer (Golang)',
    period: 'May 2022 – October 2022',
    summary:
      'Developed REST APIs and supported backend integrations for a microservices CRUD application.',
    highlights: [
      {
        title: 'Backend application development',
        description: 'Built REST APIs with Go, Gin, GORM, and relational databases, including related-record joins and table design.',
      },
      {
        title: 'API testing and reliability',
        description: 'Created positive and negative API tests in Postman and validated responses, error handling, and database changes.',
      },
      {
        title: 'Integration and collaboration',
        description: 'Integrated MinIO image uploads and collaborated with frontend and related teams on requirements and integration.',
      },
    ],
  },
];
