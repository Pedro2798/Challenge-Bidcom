import { describe, it, expect, vi } from "vitest";
import { searchProducts } from "./search-products";
import type { ProductRepository } from "@/domain/repositories/product-repository";

function makeRepo(): ProductRepository {
  return {
    search: vi.fn(async (q: string, limit: number) => ({
      products: [],
      total: 0,
      __echoed: { q, limit },
    })) as unknown as ProductRepository["search"],
    findBySku: vi.fn(async () => null),
    listCategories: vi.fn(async () => []),
  };
}

describe("searchProducts", () => {
  it("trims the query before calling the repo", async () => {
    const repo = makeRepo();
    await searchProducts(repo, "  iphone  ", 20);
    expect(repo.search).toHaveBeenCalledWith("iphone", 20);
  });

  it("clamps the limit between 1 and 100", async () => {
    const repo = makeRepo();
    await searchProducts(repo, "x", 0);
    expect(repo.search).toHaveBeenCalledWith("x", 1);

    await searchProducts(repo, "x", 1000);
    expect(repo.search).toHaveBeenCalledWith("x", 100);
  });

  it("uses the provided default limit when omitted", async () => {
    const repo = makeRepo();
    await searchProducts(repo, "watch");
    expect(repo.search).toHaveBeenCalledWith("watch", 20);
  });
});
