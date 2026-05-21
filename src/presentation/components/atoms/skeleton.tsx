import { cn } from "@/lib/cn";

export interface SkeletonProps {
  className?: string;
  shape?: "rect" | "circle" | "line";
}

export function Skeleton({ className, shape = "rect" }: SkeletonProps) {
  const shapeClass =
    shape === "circle"
      ? "rounded-full"
      : shape === "line"
        ? "rounded-full h-3"
        : "rounded-xl";
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden bg-ink/10",
        shapeClass,
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent",
        "before:animate-[shimmer_1.4s_infinite]",
        className,
      )}
      style={{
        // @ts-expect-error custom property
        "--tw-animate-shimmer": "shimmer",
      }}
    />
  );
}
