import { describe, it, expect } from "vitest";
import { toProduct, toCategory } from "./mappers";
import type { DummyJSONProductDTO, DummyJSONCategoryDTO } from "./dtos";

const sampleProductDTO: DummyJSONProductDTO = {
  id: 101,
  title: "Apple AirPods Max Silver",
  description: "Premium headphones",
  category: "mobile-accessories",
  price: 549.99,
  discountPercentage: 13.67,
  rating: 3.5,
  stock: 94,
  tags: ["audio"],
  brand: "Apple",
  sku: "MOB-APP-APP-101",
  weight: 1,
  thumbnail: "https://cdn.dummyjson.com/p/101.png",
  images: ["https://cdn.dummyjson.com/p/101-1.png"],
};

describe("toProduct", () => {
  it("maps the DTO into a domain Product", () => {
    const product = toProduct(sampleProductDTO);
    expect(product).toEqual({
      id: 101,
      sku: "MOB-APP-APP-101",
      title: "Apple AirPods Max Silver",
      description: "Premium headphones",
      category: "mobile-accessories",
      brand: "Apple",
      price: 549.99,
      discountPercentage: 13.67,
      rating: 3.5,
      stock: 94,
      thumbnail: "https://cdn.dummyjson.com/p/101.png",
      images: ["https://cdn.dummyjson.com/p/101-1.png"],
    });
  });

  it("normalises missing brand to null", () => {
    const { brand, ...rest } = sampleProductDTO;
    void brand;
    const product = toProduct(rest as DummyJSONProductDTO);
    expect(product.brand).toBeNull();
  });
});

describe("toCategory", () => {
  it("drops the url and keeps slug + name", () => {
    const dto: DummyJSONCategoryDTO = {
      slug: "beauty",
      name: "Beauty",
      url: "https://dummyjson.com/products/category/beauty",
    };
    expect(toCategory(dto)).toEqual({ slug: "beauty", name: "Beauty" });
  });
});
