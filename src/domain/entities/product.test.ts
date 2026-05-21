import { describe, it, expect } from "vitest";
import { finalPrice, type Product } from "./product";

function makeProduct(price: number, discountPercentage: number): Pick<Product, "price" | "discountPercentage"> {
  return { price, discountPercentage };
}

describe("finalPrice", () => {
  it("returns the same price when there is no discount", () => {
    expect(finalPrice(makeProduct(100, 0))).toBe(100);
  });

  it("applies the discount and rounds to 2 decimals", () => {
    expect(finalPrice(makeProduct(100, 25))).toBe(75);
    expect(finalPrice(makeProduct(549.99, 13.67))).toBeCloseTo(474.81, 2);
  });

  it("handles a 100% discount", () => {
    expect(finalPrice(makeProduct(100, 100))).toBe(0);
  });
});
