import type { Category } from "@/domain/entities/category";
import type { ProductRepository } from "@/domain/repositories/product-repository";

export async function listCategories(
  repo: ProductRepository,
  limit?: number,
): Promise<Category[]> {
  const categories = await repo.listCategories();
  return typeof limit === "number" ? categories.slice(0, limit) : categories;
}
