export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
}
