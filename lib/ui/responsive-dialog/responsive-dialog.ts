export const RESPONSIVE_DIALOG_DESKTOP_QUERY = "(min-width: 768px)";

export type ResponsiveDialogDesktopVariant = "dialog" | "sheet";
export type ResponsiveDialogSurface = "dialog" | "sheet" | "drawer";

export function resolveResponsiveDialogSurface(
  isDesktop: boolean,
  desktopVariant: ResponsiveDialogDesktopVariant = "dialog",
): ResponsiveDialogSurface {
  if (!isDesktop) {
    return "drawer";
  }

  return desktopVariant;
}
