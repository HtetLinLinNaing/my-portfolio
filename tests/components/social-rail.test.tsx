import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SocialRail } from '@/components/layout/social-rail';

describe('SocialRail', () => {
  it('offers only the confirmed professional profiles with accessible names', () => {
    render(<SocialRail />);
    const rail = within(screen.getByRole('navigation', { name: 'Social profiles' }));
    expect(rail.getAllByRole('link')).toHaveLength(2);
    expect(rail.getAllByRole('link').map((link) => link.getAttribute('aria-label')))
      .toEqual(['Visit LinkedIn profile', 'Visit GitHub profile']);
    expect(rail.getByRole('link', { name: 'Visit GitHub profile' })).toHaveAttribute('href', 'https://github.com/HtetLinLinNaing');
    expect(rail.getByRole('link', { name: 'Visit LinkedIn profile' })).toHaveAttribute('href', 'https://www.linkedin.com/in/htetlinlinnaing/');
    rail.getAllByRole('link').forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', expect.stringContaining('noreferrer'));
    });
  });
});
