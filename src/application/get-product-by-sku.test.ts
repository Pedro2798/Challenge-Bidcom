import { describe, it, expect, vi } from "vitest";
import { getProductBySku } from "./get-product-by-sku";
import type { ProductRepository } from "@/domain/repositories/product-repository";

const repoStub: ProductRepository = {
  search: vi.fn(async () => ({ products: [], total: 0 })),
  findBySku: vi.fn(async (sku: string) =>
    sku === "FOUND"
      ? {
          id: 1,
          sku: "FOUND",
          title: "Found",
          description: "",
          category: "",
          brand: null,
          price: 1,
          discountPercentage: 0,
          rating: 0,
          stock: 1,
          thumbnail: "",
          images: [],
        }
      : null,
  ),
  listCategories: vi.fn(async () => []),
};

describe("getProductBySku", () => {
  it("returns null without hitting the repo when sku is empty/whitespace", async () => {
    const product = await getProductBySku(repoStub, "   ");
    expect(product).toBeNull();
    expect(repoStub.findBySku).not.toHaveBeenCalledWith("   ");
  });

  it("delegates to the repo with trimmed sku", async () => {
    const found = await getProductBySku(repoStub, "  FOUND  ");
    expect(found?.sku).toBe("FOUND");
    expect(repoStub.findBySku).toHaveBeenCalledWith("FOUND");
  });

  it("returns null for unknown sku", async () => {
    const missing = await getProductBySku(repoStub, "MISSING");
    expect(missing).toBeNull();
  });
});
