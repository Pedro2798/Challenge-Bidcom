import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import { getProductBySku } from "@/application/get-product-by-sku";
import { getProductRepository } from "@/lib/container";
import { ProductDetail } from "@/presentation/components/organisms/product-detail";
import { ProductDetailSkeleton } from "@/presentation/components/organisms/product-detail-skeleton";

interface PageProps {
  params: Promise<{ sku: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sku } = await params;
  const decoded = decodeURIComponent(sku);
  const repo = getProductRepository();
  const product = await getProductBySku(repo, decoded);

  if (!product) {
    return { title: "Producto no encontrado" };
  }

  return {
    title: product.title,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 160),
      images: product.images[0] ? [product.images[0]] : undefined,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { sku } = await params;
  const decoded = decodeURIComponent(sku);

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 lg:px-8 lg:py-10">
      <Breadcrumb sku={decoded} />
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductResource sku={decoded} />
      </Suspense>
    </section>
  );
}

async function ProductResource({ sku }: { sku: string }) {
  const repo = getProductRepository();
  const product = await getProductBySku(repo, sku);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}

function Breadcrumb({ sku }: { sku: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-soft">
        <li>
          <Link href="/" className="hover:text-ink hover:underline">
            Inicio
          </Link>
        </li>
        <li aria-hidden="true">›</li>
        <li className="font-mono text-xs text-ink">{sku}</li>
      </ol>
    </nav>
  );
}
