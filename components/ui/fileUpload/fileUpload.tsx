"use client";

import { UploadIcon } from "lucide-react";
import {
  useRef,
  type ChangeEvent,
  type DragEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils/cn/cn";

type FileUploadProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "children"
> & {
  label?: ReactNode;
  description?: ReactNode;
  invalid?: boolean;
};

export function FileUpload({
  className,
  label = "انتخاب پرونده",
  description,
  invalid,
  disabled,
  onChange,
  ...props
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function openPicker() {
    if (disabled) {
      return;
    }

    inputRef.current?.click();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    if (disabled || !inputRef.current) {
      return;
    }

    const files = event.dataTransfer.files;

    if (!files.length) {
      return;
    }

    const transfer = new DataTransfer();
    const selected = props.multiple ? Array.from(files) : [files[0]];
    selected.forEach((file) => {
      if (file) transfer.items.add(file);
    });
    inputRef.current.files = transfer.files;
    inputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
  }

  return (
    <div
      data-slot="file-upload"
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
      className={cn(
        "flex min-h-32 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-input bg-surface-subtle px-4 py-6 text-center transition-colors",
        !disabled && "hover:border-border-strong hover:bg-accent/60",
        invalid && "border-danger bg-danger/5",
        disabled && "cursor-not-allowed opacity-60",
        className,
      )}
    >
      <UploadIcon className="size-6 text-muted-foreground" aria-hidden="true" />
      <button
        type="button"
        disabled={disabled}
        onClick={openPicker}
        className="min-h-11 rounded-md px-4 type-button text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:no-underline"
      >
        {label}
      </button>
      {description ? (
        <p className="type-caption text-muted-foreground">{description}</p>
      ) : null}
      <input
        ref={inputRef}
        type="file"
        disabled={disabled}
        aria-invalid={invalid || undefined}
        aria-label={
          props["aria-label"] ?? (typeof label === "string" ? label : undefined)
        }
        className="sr-only"
        onChange={handleChange}
        {...props}
      />
    </div>
  );
}
