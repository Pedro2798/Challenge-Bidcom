"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export interface LogoProps {
  className?: string;
  size?: number;
  animated?: boolean;
  label?: string;
}

export function Logo({
  className,
  size = 36,
  animated = true,
  label = "Bidcom",
}: LogoProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-2", className)}
      aria-label={label}
    >
      <motion.span
        className="relative inline-flex items-center justify-center rounded-full bg-brand text-paper font-display font-bold"
        style={{ width: size, height: size }}
        whileHover={animated ? { rotate: -12, scale: 1.08 } : undefined}
        transition={{ type: "spring", stiffness: 400, damping: 14 }}
        aria-hidden="true"
      >
        <span
          className="absolute -top-1 -right-1 block rounded-full bg-accent-yellow border-2 border-ink"
          style={{ width: size * 0.28, height: size * 0.28 }}
        />
        <span style={{ fontSize: size * 0.5, lineHeight: 1 }}>B</span>
      </motion.span>
      <span className="font-display font-bold text-ink text-xl tracking-tight">
        {label}
      </span>
    </span>
  );
}
