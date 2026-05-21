import Link from "next/link";
import { Suspense } from "react";
import { Logo } from "@/presentation/components/atoms";
import { SearchBar } from "@/presentation/components/molecules/search-bar";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col items-stretch gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-6 sm:py-4 lg:px-8">
        <Link
          href="/"
          aria-label="Bidcom — ir a la página principal"
          className="self-start rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        >
          <Logo />
        </Link>
        <div className="flex-1">
          <Suspense fallback={<div className="h-11 rounded-xl border-2 border-ink bg-paper" aria-hidden="true" />}>
            <SearchBar />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
