import type { Product } from "@/domain/entities/product";
import type { ProductRepository } from "@/domain/repositories/product-repository";

export async function getProductBySku(
  repo: ProductRepository,
  sku: string,
): Promise<Product | null> {
  const safeSku = sku.trim();
  if (!safeSku) return null;
  return repo.findBySku(safeSku);
}
