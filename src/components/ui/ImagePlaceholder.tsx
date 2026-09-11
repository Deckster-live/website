import { ImageIcon } from "lucide-react";

interface ImagePlaceholderProps {
  /** What should eventually go here — shown so it's obvious what to drop in. */
  label?: string;
  className?: string;
}

/** Stand-in for a real photo while assets aren't ready yet. Swap for a
 * plain <Image> once the file exists — the label just documents intent. */
export function ImagePlaceholder({ label, className }: ImagePlaceholderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line-strong bg-mist/70 text-slate/70 ${className ?? ""}`}
    >
      <ImageIcon className="h-5 w-5 shrink-0" strokeWidth={1.5} />
      {label && (
        <span className="max-w-[80%] text-center text-[11px] leading-snug">
          {label}
        </span>
      )}
    </div>
  );
}
