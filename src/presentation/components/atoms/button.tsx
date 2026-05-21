import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 font-display font-semibold " +
  "rounded-xl transition-all duration-150 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-cream " +
  "disabled:cursor-not-allowed disabled:opacity-50 " +
  "active:translate-y-1 active:shadow-pop-sm";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-paper border-2 border-ink shadow-pop hover:bg-brand-deep",
  secondary:
    "bg-accent-yellow text-ink border-2 border-ink shadow-pop hover:bg-accent-lime",
  outline:
    "bg-paper text-ink border-2 border-ink shadow-pop-sm hover:bg-cream-soft",
  ghost:
    "bg-transparent text-ink hover:bg-ink/5 border-2 border-transparent",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-base",
  lg: "h-14 px-7 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant = "primary", size = "md", isLoading, children, disabled, ...rest },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        {...rest}
      >
        {isLoading ? <Spinner /> : null}
        {children}
      </button>
    );
  },
);

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="40 60"
        opacity="0.9"
      />
    </svg>
  );
}
