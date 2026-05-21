import { Suspense } from "react";
import { searchProducts } from "@/application/search-products";
import { getProductRepository } from "@/lib/container";
import { ProductGrid } from "@/presentation/components/organisms/product-grid";
import { ProductGridSkeleton } from "@/presentation/components/organisms/product-grid-skeleton";

const HOME_LIMIT = 20;

export default function HomePage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <Hero />
      <Suspense fallback={<ProductGridSkeleton count={HOME_LIMIT} />}>
        <ProductsResource />
      </Suspense>
    </section>
  );
}

async function ProductsResource() {
  const repo = getProductRepository();
  const { products } = await searchProducts(repo, "", HOME_LIMIT);
  return <ProductGrid products={products} />;
}

function Hero() {
  return (
    <div className="relative mb-8 overflow-hidden rounded-3xl border-2 border-ink bg-confetti px-6 py-10 shadow-pop sm:px-10 sm:py-14">
      <span className="absolute -right-6 -top-6 inline-flex h-24 w-24 items-center justify-center rounded-full border-2 border-ink bg-accent-yellow text-3xl font-bold shadow-pop-sm">
        ★
      </span>
      <p className="font-display text-sm font-bold uppercase tracking-widest text-brand">
        novedades
      </p>
      <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
        Encontrá lo que buscás, <span className="bg-accent-lime px-1">con onda</span>.
      </h1>
      <p className="mt-3 max-w-xl text-base text-ink-soft sm:text-lg">
        Una selección de {HOME_LIMIT} productos del momento, listos para descubrir.
      </p>
    </div>
  );
}
