import { describe, it, expect, vi } from "vitest";
import { listCategories } from "./list-categories";
import type { ProductRepository } from "@/domain/repositories/product-repository";

const allCategories = Array.from({ length: 10 }, (_, i) => ({
  slug: `cat-${i}`,
  name: `Category ${i}`,
}));

const repo: ProductRepository = {
  search: vi.fn(async () => ({ products: [], total: 0 })),
  findBySku: vi.fn(async () => null),
  listCategories: vi.fn(async () => allCategories),
};

describe("listCategories", () => {
  it("returns all categories when no limit is given", async () => {
    const result = await listCategories(repo);
    expect(result).toHaveLength(10);
  });

  it("slices to the requested limit", async () => {
    const result = await listCategories(repo, 5);
    expect(result).toHaveLength(5);
    expect(result[0].slug).toBe("cat-0");
    expect(result[4].slug).toBe("cat-4");
  });
});
