import { DummyJSONProductRepository } from "@/infrastructure/dummyjson/product-repository";
import type { ProductRepository } from "@/domain/repositories/product-repository";

let cached: ProductRepository | null = null;

export function getProductRepository(): ProductRepository {
  if (!cached) {
    cached = new DummyJSONProductRepository();
  }
  return cached;
}
