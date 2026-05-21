import type {
  ProductRepository,
  SearchProductsResult,
} from "@/domain/repositories/product-repository";

export async function searchProducts(
  repo: ProductRepository,
  query: string,
  limit = 20,
): Promise<SearchProductsResult> {
  const safeQuery = query.trim();
  const safeLimit = Math.max(1, Math.min(limit, 100));
  return repo.search(safeQuery, safeLimit);
}
