import type { SkillGroup } from '@/lib/types';

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'SWR', 'Zod'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'C#', 'Go', 'Gin', 'GORM', 'REST APIs'],
  },
  {
    category: 'Data & Search',
    items: ['PostgreSQL', 'SQL', 'OpenSearch'],
  },
  {
    category: 'Testing & Delivery',
    items: ['Playwright', 'Jest', 'API Testing', 'Docker', 'CI/CD', 'Vercel'],
  },
];
