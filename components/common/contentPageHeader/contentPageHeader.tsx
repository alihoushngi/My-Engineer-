type ContentPageHeaderProps = {
  title: string;
  description?: string;
};

export function ContentPageHeader({
  title,
  description,
}: ContentPageHeaderProps) {
  return (
    <header className="max-w-2xl space-y-2">
      <h1 className="type-h1 text-foreground">{title}</h1>
      {description ? (
        <p className="type-body text-muted-foreground">{description}</p>
      ) : null}
    </header>
  );
}
