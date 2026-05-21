"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/domain/entities/product";
import { finalPrice } from "@/domain/entities/product";
import { Button, Pill } from "@/presentation/components/atoms";
import { fadeIn, fadeUp, staggerGrid } from "@/lib/animations";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";

const DETAIL_TILES = [
  "bg-accent-pink/40",
  "bg-accent-lime/45",
  "bg-accent-violet/30",
  "bg-accent-yellow/50",
  "bg-accent-coral/35",
  "bg-accent-mint/45",
];

export interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const tone =
    DETAIL_TILES[Math.abs(hashCode(product.sku)) % DETAIL_TILES.length];
  const hasDiscount = product.discountPercentage > 0.5;
  const price = finalPrice(product);
  const inStock = product.stock > 0;

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={staggerGrid}
      className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12"
    >
      <motion.div
        variants={fadeIn}
        className={cn(
          "relative overflow-hidden rounded-3xl border-2 border-ink shadow-pop",
          tone,
        )}
      >
        <div className="relative aspect-square w-full">
          <Image
            src={product.images[0] ?? product.thumbnail}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain p-8"
            priority
          />
        </div>
        {hasDiscount ? (
          <motion.span
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: -8 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 280 }}
            className="absolute left-5 top-5 inline-flex items-center rounded-2xl border-2 border-ink bg-accent-yellow px-3 py-1 font-display text-lg font-bold text-ink shadow-pop-sm"
          >
            -{Math.round(product.discountPercentage)}%
          </motion.span>
        ) : null}
      </motion.div>

      <motion.div variants={fadeUp} className="flex flex-col">
        <motion.p
          variants={fadeUp}
          className="font-display text-xs font-bold uppercase tracking-widest text-brand"
        >
          {product.brand ?? product.category}
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="mt-2 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl"
        >
          {product.title}
        </motion.h1>

        <motion.div variants={fadeUp} className="mt-3 flex items-center gap-3">
          <Rating value={product.rating} />
          <Link
            href={`/search?s=${encodeURIComponent(product.category)}`}
            className="text-sm text-ink-soft underline-offset-2 hover:text-ink hover:underline"
          >
            ver más de {product.category}
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-6 rounded-2xl border-2 border-ink bg-paper p-5 shadow-pop-sm"
        >
          <div className="flex items-baseline gap-3">
            <span className="font-display text-4xl font-bold text-ink">
              {formatPrice(price)}
            </span>
            {hasDiscount ? (
              <span className="text-base text-ink-faded line-through">
                {formatPrice(product.price)}
              </span>
            ) : null}
          </div>
          {hasDiscount ? (
            <p className="mt-1 text-sm font-semibold text-success">
              Ahorrás {formatPrice(product.price - price)}
            </p>
          ) : null}
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-6 text-base leading-relaxed text-ink-soft"
        >
          {product.description}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-2">
          <Pill tone={inStock ? "lime" : "coral"}>
            {inStock ? `${product.stock} en stock` : "Sin stock"}
          </Pill>
          <Pill tone="mint">SKU · {product.sku}</Pill>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-8 flex gap-3">
          <Button size="lg" disabled={!inStock}>
            {inStock ? "Comprar ahora" : "Avisame cuando vuelva"}
          </Button>
          <Button size="lg" variant="outline">
            Agregar al carrito
          </Button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function Rating({ value }: { value: number }) {
  const rounded = Math.round(value * 10) / 10;
  return (
    <span className="inline-flex items-center gap-1 rounded-full border-2 border-ink bg-accent-yellow px-3 py-0.5 text-sm font-semibold text-ink shadow-pop-sm">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2 14.9 8.6 22 9.3 16.7 14 18.3 21 12 17.3 5.7 21 7.3 14 2 9.3l7.1-.7z" />
      </svg>
      {rounded}
    </span>
  );
}

function hashCode(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return h;
}
