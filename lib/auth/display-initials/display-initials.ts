export function getDisplayInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0];

  if (!first) {
    return "";
  }

  const last = parts[parts.length - 1];

  if (!last || last === first) {
    return first.slice(0, 1);
  }

  return `${first.slice(0, 1)}${last.slice(0, 1)}`;
}
