"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/domain/entities/product";
import { finalPrice } from "@/domain/entities/product";
import { cardHover, fadeUp } from "@/lib/animations";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";

const TILE_TONES = [
  "bg-accent-pink/30",
  "bg-accent-lime/40",
  "bg-accent-violet/25",
  "bg-accent-yellow/40",
  "bg-accent-coral/30",
  "bg-accent-mint/40",
];

export interface ProductCardProps {
  product: Product;
  index?: number;
  priority?: boolean;
}

export function ProductCard({ product, index = 0, priority }: ProductCardProps) {
  const tone = TILE_TONES[index % TILE_TONES.length];
  const hasDiscount = product.discountPercentage > 0.5;
  const discountedPrice = finalPrice(product);

  return (
    <motion.article variants={fadeUp} className="h-full">
      <motion.div
        initial="rest"
        whileHover="hover"
        whileFocus="hover"
        animate="rest"
        variants={cardHover}
        className="h-full"
      >
        <Link
          href={`/product/${encodeURIComponent(product.sku)}`}
          aria-label={`Ver ${product.title}`}
          className={cn(
            "group flex h-full flex-col overflow-hidden rounded-2xl",
            "border-2 border-ink bg-paper shadow-pop",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
          )}
        >
          <div className={cn("relative aspect-square overflow-hidden border-b-2 border-ink", tone)}>
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              priority={priority}
            />
            {hasDiscount ? (
              <span className="absolute left-3 top-3 inline-flex items-center rounded-full border-2 border-ink bg-accent-yellow px-2 py-0.5 font-display text-xs font-bold text-ink shadow-pop-sm">
                -{Math.round(product.discountPercentage)}%
              </span>
            ) : null}
            {product.stock <= 0 ? (
              <span className="absolute right-3 top-3 inline-flex items-center rounded-full border-2 border-ink bg-paper px-2 py-0.5 font-display text-xs font-bold text-ink shadow-pop-sm">
                sin stock
              </span>
            ) : null}
          </div>
          <div className="flex flex-1 flex-col gap-1 p-4">
            {product.brand ? (
              <p className="font-display text-xs font-semibold uppercase tracking-wider text-ink-soft">
                {product.brand}
              </p>
            ) : (
              <p className="font-display text-xs font-semibold uppercase tracking-wider text-ink-soft">
                {product.category}
              </p>
            )}
            <h3 className="line-clamp-2 font-display text-base font-semibold text-ink">
              {product.title}
            </h3>
            <div className="mt-auto flex items-baseline gap-2 pt-2">
              <span className="font-display text-xl font-bold text-ink">
                {formatPrice(discountedPrice)}
              </span>
              {hasDiscount ? (
                <span className="font-sans text-sm text-ink-faded line-through">
                  {formatPrice(product.price)}
                </span>
              ) : null}
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.article>
  );
}
