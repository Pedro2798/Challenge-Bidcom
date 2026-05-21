import { Suspense } from "react";
import type { Metadata } from "next";
import { searchProducts } from "@/application/search-products";
import { listCategories } from "@/application/list-categories";
import { getProductRepository } from "@/lib/container";
import { ProductGrid } from "@/presentation/components/organisms/product-grid";
import { ProductGridSkeleton } from "@/presentation/components/organisms/product-grid-skeleton";
import { EmptyState } from "@/presentation/components/organisms/empty-state";

const SEARCH_LIMIT = 20;
const SUGGESTED_CATEGORIES = 5;

interface SearchPageProps {
  searchParams: Promise<{ s?: string | string[] }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { s } = await searchParams;
  const query = pickQuery(s);
  return {
    title: query ? `Resultados para "${query}"` : "Búsqueda",
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { s } = await searchParams;
  const query = pickQuery(s);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <div className="mb-6">
        <p className="font-display text-xs font-bold uppercase tracking-widest text-brand">
          Búsqueda
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">
          {query ? (
            <>
              Resultados para{" "}
              <span className="bg-accent-yellow px-1">&quot;{query}&quot;</span>
            </>
          ) : (
            "Escribí algo para buscar"
          )}
        </h1>
      </div>

      <Suspense key={query} fallback={<ProductGridSkeleton count={SEARCH_LIMIT} />}>
        <SearchResults query={query} />
      </Suspense>
    </section>
  );
}

async function SearchResults({ query }: { query: string }) {
  const repo = getProductRepository();
  const result = await searchProducts(repo, query, SEARCH_LIMIT);

  if (result.products.length === 0) {
    const categories = await listCategories(repo, SUGGESTED_CATEGORIES);
    return <EmptyState categories={categories} query={query} />;
  }

  return <ProductGrid products={result.products} />;
}

function pickQuery(s: string | string[] | undefined): string {
  if (Array.isArray(s)) return (s[0] ?? "").trim();
  return (s ?? "").trim();
}
