interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
}

export function SectionHeading({ eyebrow, title, description, id }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl space-y-3">
      {eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>}
      <h2 id={id} className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {description && <p className="leading-7 text-muted">{description}</p>}
    </div>
  );
}
