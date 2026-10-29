import { describe, expect, it } from 'vitest';
import { experience } from '@/data/experience';
import { projects } from '@/data/projects';
import { socials } from '@/data/socials';

describe('portfolio data', () => {
  it('contains exactly one featured project with the DevPath-AI demo', () => {
    expect(projects.filter((project) => project.featured)).toHaveLength(1);
    expect(projects[0].liveUrl).toBe('https://devpath-ai-three.vercel.app/');
  });

  it('contains the confirmed social profiles', () => {
    expect(socials.map((social) => social.url)).toEqual([
      'https://www.linkedin.com/in/htetlinlinnaing/',
      'https://github.com/HtetLinLinNaing',
    ]);
  });

  it('contains the approved public work history', () => {
    expect(experience.map((entry) => entry.company)).toEqual(['Galaxy Wave', 'Kopwar']);
  });
});
