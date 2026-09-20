import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'muted';
  className?: string;
} & (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>);

export function Button({ children, variant = 'primary', className, ...props }: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60',
    variant === 'primary' && 'bg-accent text-white hover:brightness-95',
    variant === 'outline' && 'border border-border text-ink hover:border-accent hover:text-accent',
    variant === 'muted' && 'bg-surface text-ink hover:bg-accent/10',
    className,
  );

  if ('href' in props) {
    return (
      <a className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
