export interface Project {
  id: string;
  title: string;
  description: string;
  problem?: string;
  contribution?: string;
  implementation?: string;
  youtubeVideoId?: string;
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
  logo?: { src: string; width: number; height: number };
  role: string;
  period: string;
  summary: string;
  highlights: { title: string; description: string }[];
}
