import type { Category } from "@/domain/entities/category";
import type { Product } from "@/domain/entities/product";
import type {
  ProductRepository,
  SearchProductsResult,
} from "@/domain/repositories/product-repository";
import { fetchJSON } from "./client";
import type {
  DummyJSONCategoryDTO,
  DummyJSONProductDTO,
  DummyJSONProductsResponse,
} from "./dtos";
import { toCategory, toProduct } from "./mappers";

const REVALIDATE_LIST = 60;
const REVALIDATE_DETAIL = 300;
const REVALIDATE_CATEGORIES = 60 * 60 * 24;

export class DummyJSONProductRepository implements ProductRepository {
  async search(query: string, limit: number): Promise<SearchProductsResult> {
    const params = new URLSearchParams({ limit: String(limit) });
    if (query) params.set("q", query);

    const path = query
      ? `/products/search?${params.toString()}`
      : `/products?${params.toString()}`;

    const data = await fetchJSON<DummyJSONProductsResponse>(path, {
      next: { revalidate: REVALIDATE_LIST, tags: ["products"] },
    });

    return {
      products: data.products.map(toProduct),
      total: data.total,
    };
  }

  async findBySku(sku: string): Promise<Product | null> {
    const data = await fetchJSON<DummyJSONProductsResponse>(
      `/products?limit=0&select=id,sku`,
      { next: { revalidate: REVALIDATE_DETAIL, tags: ["products"] } },
    );

    const match = data.products.find(
      (p) => p.sku.toLowerCase() === sku.toLowerCase(),
    );
    if (!match) return null;

    const dto = await fetchJSON<DummyJSONProductDTO>(`/products/${match.id}`, {
      next: { revalidate: REVALIDATE_DETAIL, tags: ["products"] },
    });

    return toProduct(dto);
  }

  async listCategories(): Promise<Category[]> {
    const data = await fetchJSON<DummyJSONCategoryDTO[]>(
      "/products/categories",
      { next: { revalidate: REVALIDATE_CATEGORIES, tags: ["categories"] } },
    );
    return data.map(toCategory);
  }
}
