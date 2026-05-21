import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "md" | "lg";
}

const sizes = {
  md: "h-11 px-4 text-base",
  lg: "h-14 px-5 text-lg",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, size = "md", ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-xl border-2 border-ink bg-paper text-ink",
        "placeholder:text-ink-faded font-sans",
        "shadow-pop-sm transition-shadow duration-150",
        "focus:outline-none focus:shadow-pop focus:-translate-y-0.5",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        sizes[size],
        className,
      )}
      {...rest}
    />
  );
});
