type ContentPageHeaderProps = {
  title: string;
  description?: string;
};

export function ContentPageHeader({
  title,
  description,
}: ContentPageHeaderProps) {
  return (
    <header className="max-w-3xl space-y-4 border-s-2 border-primary ps-5 py-1">
      <h1 className="type-h1 text-foreground">{title}</h1>
      {description ? (
        <p className="type-body-lg text-muted-foreground">{description}</p>
      ) : null}
    </header>
  );
}
