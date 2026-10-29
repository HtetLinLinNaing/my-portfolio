import type { Project } from '@/lib/types';

export const projects: Project[] = [{
  id: 'devpath-ai',
  title: 'DevPath-AI',
  description: 'A personal project that turns a developer’s skills, experience, and career goals into a personalized learning path.',
  problem: 'Choosing what to learn next is difficult when resources are scattered and advice does not account for a developer’s starting point.',
  contribution: 'Built the frontend and backend, including the OpenAI integration that generates learning recommendations and development roadmaps.',
  implementation: 'Added authentication, input validation, and persistent storage to support the learning-path workflow.',
  techStack: ['Next.js', 'TypeScript', 'OpenAI API', 'Vercel'],
  liveUrl: 'https://devpath-ai-three.vercel.app/',
  featured: true,
  youtubeVideoId: 'mDVlat1dtDY',
}];
