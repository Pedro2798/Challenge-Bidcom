"use client";

import { motion } from "framer-motion";
import type { Product } from "@/domain/entities/product";
import { ProductCard } from "@/presentation/components/molecules/product-card";
import { staggerGrid } from "@/lib/animations";

export interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <motion.ul
      variants={staggerGrid}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-4"
      data-testid="product-grid"
    >
      {products.map((product, index) => (
        <li key={product.id} className="h-full">
          <ProductCard product={product} index={index} priority={index < 4} />
        </li>
      ))}
    </motion.ul>
  );
}
