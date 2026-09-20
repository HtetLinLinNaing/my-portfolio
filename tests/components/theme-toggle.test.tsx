import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeToggle } from '@/components/theme/theme-toggle';

const { setTheme } = vi.hoisted(() => ({ setTheme: vi.fn() }));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme }),
}));

describe('ThemeToggle', () => {
  it('exposes an accessible theme control', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button', { name: /theme/i })).toBeInTheDocument();
  });

  it('switches from light mode to dark mode', () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button', { name: /theme/i }));
    expect(setTheme).toHaveBeenCalledWith('dark');
  });
});
