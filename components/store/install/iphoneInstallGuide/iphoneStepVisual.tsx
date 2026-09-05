import {
  CheckIcon,
  CompassIcon,
  HouseIcon,
  PlusSquareIcon,
  ShareIcon,
} from "lucide-react";

type IphoneStepVisualProps = {
  variant: "safari" | "share" | "add-menu" | "preview" | "confirm" | "home";
};

export function IphoneStepVisual({ variant }: IphoneStepVisualProps) {
  return (
    <div
      aria-hidden="true"
      className="mx-auto flex h-52 w-32 shrink-0 flex-col overflow-hidden rounded-[1.75rem] border-4 border-primary-deep bg-surface shadow-sm"
    >
      <div className="mx-auto h-3 w-14 rounded-b-xl bg-primary-deep" />
      <div className="flex flex-1 flex-col p-2">
        {variant === "safari" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3">
            <CompassIcon className="size-12 text-primary" />
            <span className="ltr-data rounded-md bg-surface-muted px-2 py-1 text-[0.6rem]">
              Safari
            </span>
          </div>
        )}

        {variant === "share" && (
          <>
            <div className="mt-4 h-20 rounded-md bg-primary-subtle" />
            <div className="mt-auto flex items-center justify-around border-t border-border pt-2 text-primary">
              <span className="size-3 rounded-full border border-current" />
              <ShareIcon className="size-5" />
              <span className="size-3 rounded-sm border border-current" />
            </div>
          </>
        )}

        {variant === "add-menu" && (
          <div className="mt-auto space-y-1 rounded-xl bg-surface-muted p-2">
            <div className="h-4 rounded bg-surface" />
            <div className="flex items-center gap-1 rounded bg-primary-subtle p-1 text-[0.5rem] text-primary-deep">
              <PlusSquareIcon className="size-3" />
              <span className="ltr-data">Add to Home Screen</span>
            </div>
            <div className="h-4 rounded bg-surface" />
          </div>
        )}

        {variant === "preview" && (
          <div className="mt-5 flex flex-col items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary-deep text-primary-deep-foreground">
              <HouseIcon className="size-6" />
            </div>
            <span className="type-caption">مهندس من</span>
            <div className="h-5 w-full rounded bg-surface-muted" />
          </div>
        )}

        {variant === "confirm" && (
          <div className="flex h-full flex-col">
            <div className="ltr-data flex items-center justify-between text-[0.58rem] text-info">
              <span>Cancel</span>
              <span className="font-semibold">Add</span>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <CheckIcon className="size-12 rounded-full bg-success/10 p-2 text-success" />
            </div>
          </div>
        )}

        {variant === "home" && (
          <div className="grid flex-1 grid-cols-3 content-center gap-2 bg-primary-subtle/60 p-1">
            {Array.from({ length: 8 }).map((_, index) => (
              <span
                key={index}
                className="aspect-square rounded-lg bg-secondary-subtle"
              />
            ))}
            <span className="flex aspect-square items-center justify-center rounded-lg bg-primary-deep text-primary-deep-foreground">
              <HouseIcon className="size-4" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
