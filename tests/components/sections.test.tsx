import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomePage from '@/app/page';

describe('portfolio content sections', () => {
  it('renders the public profile content and profile photo', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { name: /Htet Lin Lin Naing/i })).toBeInTheDocument();
    expect(screen.getByText('Galaxy Wave')).toBeInTheDocument();
    expect(screen.getByText('Kopwar')).toBeInTheDocument();
    expect(screen.getAllByText('React').length).toBeGreaterThan(0);
    expect(screen.getByRole('img', { name: /Htet Lin Lin Naing/i })).toBeInTheDocument();
  });

  it('keeps private contact details out of the visible page', () => {
    render(<HomePage />);

    expect(screen.queryByText('082 490 9891')).not.toBeInTheDocument();
    expect(screen.queryByText('htetlinlinnaing.myanmar@gmail.com')).not.toBeInTheDocument();
  });

  it('renders the featured DevPath-AI project with only confirmed actions', () => {
    render(<HomePage />);

    const projectsSection = screen.getByRole('region', { name: /closer look at what i build/i });

    expect(within(projectsSection).getByRole('heading', { name: 'DevPath-AI' })).toBeInTheDocument();
    expect(within(projectsSection).getByRole('link', { name: /live demo/i })).toHaveAttribute(
      'href',
      'https://devpath-ai-three.vercel.app/',
    );
    expect(within(projectsSection).queryByRole('link', { name: /github/i })).not.toBeInTheDocument();
  });
});
