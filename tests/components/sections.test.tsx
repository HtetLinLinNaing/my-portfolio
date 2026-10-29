import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomePage from '@/app/page';
import { Footer } from '@/components/layout/footer';

describe('portfolio content sections', () => {
  it('keeps the contact section focused on the form without repeated profile links', () => {
    render(<HomePage />);
    const contact = within(document.getElementById('contact')!);
    expect(contact.queryByRole('link', { name: 'GitHub' })).not.toBeInTheDocument();
    expect(contact.queryByRole('link', { name: 'LinkedIn' })).not.toBeInTheDocument();
    expect(contact.getByRole('button', { name: 'Send message' })).toBeInTheDocument();
  });

  it('keeps hero actions focused and the footer limited to copyright', () => {
    render(<><HomePage /><Footer /></>);
    const hero = within(document.getElementById('hero')!);
    expect(hero.getByRole('link', { name: /view my work/i })).toHaveAttribute('href', '#projects');
    expect(hero.getByRole('link', { name: /contact me/i })).toHaveAttribute('href', '#contact');
    expect(hero.getAllByRole('link')).toHaveLength(2);
    const footer = screen.getByRole('contentinfo');
    expect(within(footer).queryByRole('link')).not.toBeInTheDocument();
    expect(footer).toHaveTextContent(`© ${new Date().getFullYear()} Htet Lin Lin Naing.`);
    expect(footer).not.toHaveTextContent('Full Stack Developer');
  });

  it('renders the public profile content and profile photo', () => {
    render(<HomePage />);

    const heroHeading = screen.getByRole('heading', { name: /Htet Lin Lin Naing/i });

    expect(heroHeading).toBeInTheDocument();
    expect(heroHeading).toHaveClass('whitespace-nowrap');
    const hero = within(document.getElementById('hero')!);
    const role = hero.getByText('Full-Stack Software Engineer');
    expect(heroHeading.compareDocumentPosition(role) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hero.queryByText('Full-stack engineering for enterprise applications.')).not.toBeInTheDocument();
    expect(screen.getByText('Galaxy Wave')).toBeInTheDocument();
    expect(screen.getByText('Kopwar')).toBeInTheDocument();
    expect(decodeURIComponent(screen.getByRole('img', { name: 'Galaxy Wave logo' }).getAttribute('src')!)).toContain('/images/gw_logo-transparent.png');
    expect(decodeURIComponent(screen.getByRole('img', { name: 'Kopwar logo' }).getAttribute('src')!)).toContain('/images/pw_logo.jpg');
    expect(screen.getAllByText('React').length).toBeGreaterThan(0);
    expect(screen.getByRole('img', { name: /Htet Lin Lin Naing/i })).toBeInTheDocument();
    expect(decodeURIComponent(screen.getByRole('img', { name: 'Htet Lin Lin Naing' }).getAttribute('src')!)).toContain('/images/profile-cutout-v1.png');
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

  it('embeds the DevPath-AI demo without autoplay and offers a YouTube link', () => {
    render(<HomePage />);
    const project = within(document.getElementById('projects')!);
    const video = project.getByTitle('DevPath-AI video demonstration');
    expect(video).toHaveAttribute('src', 'https://www.youtube.com/embed/mDVlat1dtDY?playsinline=1');
    expect(video).toHaveAttribute('allowFullScreen');
    expect(video).toHaveAttribute('referrerPolicy', 'strict-origin-when-cross-origin');
    expect(project.getByRole('heading', { name: 'My contribution' }).compareDocumentPosition(video) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(project.getByRole('link', { name: /watch on youtube/i })).toHaveAttribute('href', 'https://www.youtube.com/watch?v=mDVlat1dtDY');
    expect(project.queryByRole('img')).not.toBeInTheDocument();
  });

  it('separates current AI learning from professional experience and shows project integration', () => {
    render(<HomePage />);
    const about = within(document.getElementById('about')!);
    expect(about.getByText(/learning how agentic workflows/i)).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: /learning in practice/i })).not.toBeInTheDocument();
    const work = document.getElementById('experience')!;
    expect(within(work).getByText('Software Engineer')).toBeInTheDocument();
    expect(within(work).queryByText(/promoted from full stack developer/i)).not.toBeInTheDocument();
    const project = document.getElementById('projects')!;
    expect(within(project).getByText('OpenAI API')).toBeInTheDocument();
    expect(within(project).getByRole('heading', { name: /my contribution/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /download.*(cv|résumé|resume)/i })).not.toBeInTheDocument();
  });
});
