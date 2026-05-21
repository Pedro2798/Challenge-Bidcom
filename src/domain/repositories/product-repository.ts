import type { Product } from "@/domain/entities/product";
import type { Category } from "@/domain/entities/category";

export interface SearchProductsResult {
  products: Product[];
  total: number;
}

export interface ProductRepository {
  search(query: string, limit: number): Promise<SearchProductsResult>;
  findBySku(sku: string): Promise<Product | null>;
  listCategories(): Promise<Category[]>;
}
