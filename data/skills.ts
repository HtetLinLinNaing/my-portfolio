import type { SkillGroup } from '@/lib/types';

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages & Application Development',
    items: ['TypeScript', 'JavaScript', 'Go', 'C#', 'Node.js', 'React', 'Next.js', 'Gin', 'GORM'],
  },
  {
    category: 'APIs & Databases',
    items: ['REST APIs', 'API integration', 'PostgreSQL', 'SQL', 'OpenSearch', 'Postman'],
  },
  {
    category: 'DevOps & CI/CD',
    items: ['Docker', 'Bitbucket Pipelines', 'CircleCI', 'Vercel', 'Azure'],
  },
  {
    category: 'Testing & Quality',
    items: ['Playwright', 'Jest', 'E2E Testing', 'Integration Testing', 'API Testing'],
  },
  {
    category: 'Monitoring & Support',
    items: ['Production troubleshooting', 'Root cause investigation', 'Azure logging and monitoring'],
  },
  {
    category: 'Tools & Practices',
    items: ['Git', 'Bitbucket', 'GitHub', 'Pull Requests', 'Code Review', 'Agile/Scrum', 'SDLC', 'RBAC'],
  },
  {
    category: 'AI-Assisted Engineering',
    items: ['ChatGPT', 'GitHub Copilot', 'Codex', 'Claude Code', 'OpenCode', 'Superpowers', 'Custom agentic development workflows'],
  },
];
