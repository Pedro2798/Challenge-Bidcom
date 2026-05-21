import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "pink" | "lime" | "violet" | "yellow" | "coral" | "mint";

const tones: Record<Tone, string> = {
  pink: "bg-accent-pink",
  lime: "bg-accent-lime",
  violet: "bg-accent-violet text-paper",
  yellow: "bg-accent-yellow",
  coral: "bg-accent-coral",
  mint: "bg-accent-mint",
};

export interface PillProps {
  tone?: Tone;
  href?: string;
  className?: string;
  children: ReactNode;
}

export function Pill({ tone = "pink", href, className, children }: PillProps) {
  const cls = cn(
    "inline-flex items-center gap-2 px-4 py-2 rounded-full font-display font-semibold text-sm",
    "border-2 border-ink shadow-pop-sm",
    "transition-transform duration-150 ease-out",
    "hover:-translate-y-0.5 hover:rotate-[-2deg]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
    tones[tone],
    "text-ink",
    tone === "violet" && "text-paper",
    className,
  );
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return <span className={cls}>{children}</span>;
}

export const PILL_TONES: Tone[] = ["pink", "lime", "violet", "yellow", "coral", "mint"];

export function pillToneFor(index: number): Tone {
  return PILL_TONES[index % PILL_TONES.length];
}
