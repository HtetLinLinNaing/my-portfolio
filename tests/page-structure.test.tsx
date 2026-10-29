import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomePage from '@/app/page';

describe('portfolio page structure', () => {
  it('renders every primary navigation section', () => {
    render(<HomePage />);

    for (const id of ['hero', 'about', 'skills', 'experience', 'projects', 'contact']) {
      expect(document.getElementById(id)).toBeInTheDocument();
    }

    expect(screen.getByRole('heading', { name: /Htet Lin Lin Naing/i })).toBeInTheDocument();
  });

  it('puts project evidence before the toolkit and keeps the contact path last', () => {
    render(<HomePage />);
    expect(Array.from(document.querySelectorAll('main > section')).map((section) => section.id))
      .toEqual(['hero', 'projects', 'experience', 'skills', 'about', 'contact']);
  });
});
