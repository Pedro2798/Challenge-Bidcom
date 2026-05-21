"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { Input } from "@/presentation/components/atoms";
import { cn } from "@/lib/cn";

export interface SearchBarProps {
  initialQuery?: string;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  initialQuery = "",
  placeholder = "Buscar productos…",
  className,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [focused, setFocused] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?s=${encodeURIComponent(trimmed)}`);
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={cn("flex w-full items-center gap-2", className)}
    >
      <motion.div
        className="relative flex-1"
        animate={{ scale: focused ? 1.01 : 1 }}
        transition={{ type: "spring", stiffness: 380, damping: 24 }}
      >
        <Input
          type="search"
          name="s"
          aria-label="Buscar productos"
          placeholder={placeholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="pl-12 pr-4"
          autoComplete="off"
        />
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft" />
      </motion.div>
      <button
        type="submit"
        aria-label="Buscar"
        className={cn(
          "inline-flex h-11 items-center justify-center rounded-xl border-2 border-ink bg-accent-yellow px-4 sm:px-5",
          "font-display font-semibold text-ink shadow-pop-sm",
          "transition-transform duration-150 active:translate-y-1 active:shadow-none",
          "hover:bg-accent-lime",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
        )}
      >
        <SearchIcon className="sm:hidden" />
        <span className="hidden sm:inline">Buscar</span>
      </button>
    </form>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
