import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Navbar } from '@/components/layout/navbar';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
];

describe('Navbar', () => {
  it('renders anchored navigation links', () => {
    render(<Navbar links={links} />);
    expect(screen.getByRole('link', { name: 'Htet — back to top' })).toHaveAttribute('href', '#hero');
    expect(screen.queryByRole('link', { name: 'Htet Lin Lin Naing' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects');
  });

  it('offers LinkedIn then GitHub in the mobile menu', () => {
    render(<Navbar links={links} />);
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    const menu = screen.getByRole('navigation', { name: /mobile/i });
    const profiles = Array.from(menu.querySelectorAll('a[target="_blank"]'));
    expect(profiles.map((link) => link.getAttribute('href'))).toEqual([
      'https://www.linkedin.com/in/htetlinlinnaing/',
      'https://github.com/HtetLinLinNaing',
    ]);
    profiles.forEach((link) => expect(link).toHaveAttribute('rel', expect.stringContaining('noreferrer')));
  });

  it('closes the mobile menu after selecting a link', () => {
    render(<Navbar links={links} />);
    fireEvent.click(screen.getAllByRole('button', { name: /open menu/i })[0]);
    expect(screen.getByRole('navigation', { name: /mobile/i })).toBeVisible();
    fireEvent.click(screen.getByRole('navigation', { name: /mobile/i }).querySelector('a')!);
    expect(screen.queryByRole('navigation', { name: /mobile/i })).not.toBeInTheDocument();
  });
});
