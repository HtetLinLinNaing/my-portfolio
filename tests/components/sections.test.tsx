import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomePage from '@/app/page';

describe('portfolio content sections', () => {
  it('renders the public profile content and profile photo', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { name: /Htet Lin Lin Naing/i })).toBeInTheDocument();
    expect(screen.getByText('Galaxy Wave')).toBeInTheDocument();
    expect(screen.getByText('Kopwar')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Htet Lin Lin Naing/i })).toBeInTheDocument();
  });

  it('keeps private contact details out of the visible page', () => {
    render(<HomePage />);

    expect(screen.queryByText('082 490 9891')).not.toBeInTheDocument();
    expect(screen.queryByText('htetlinlinnaing.myanmar@gmail.com')).not.toBeInTheDocument();
  });
});
