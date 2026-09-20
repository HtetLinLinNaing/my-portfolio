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
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects');
  });

  it('closes the mobile menu after selecting a link', () => {
    render(<Navbar links={links} />);
    fireEvent.click(screen.getAllByRole('button', { name: /open menu/i })[0]);
    expect(screen.getByRole('navigation', { name: /mobile/i })).toBeVisible();
    fireEvent.click(screen.getByRole('navigation', { name: /mobile/i }).querySelector('a')!);
    expect(screen.queryByRole('navigation', { name: /mobile/i })).not.toBeInTheDocument();
  });
});
