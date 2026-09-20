import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomePage from '@/app/page';
import { metadata } from '@/app/layout';
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';

describe('portfolio accessibility and metadata', () => {
  it('exposes the expected root metadata and crawl routes', () => {
    expect(metadata.title).toBe('Htet Lin Lin Naing | Full Stack Developer');
    expect(metadata.description).toMatch(/Full Stack Developer/);
    expect(metadata.openGraph).toMatchObject({ type: 'website', images: ['/images/profile.jpg'] });
    expect(sitemap()[0]).toMatchObject({ url: expect.any(String) });
    expect(robots()).toMatchObject({ rules: { userAgent: '*', allow: '/' }, sitemap: expect.stringContaining('/sitemap.xml') });
  });

  it('renders one main heading, labeled form controls, and named landmarks', () => {
    render(<HomePage />);

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('region', { name: /closer look at what i build/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /let’s build something useful/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Subject')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('protects external links opened in a new tab', () => {
    render(<HomePage />);

    screen.getAllByRole('link').forEach((link) => {
      if (link.getAttribute('target') === '_blank') {
        expect(link).toHaveAttribute('rel', expect.stringContaining('noreferrer'));
      }
    });
  });
});
