import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "./product-card";
import type { Product } from "@/domain/entities/product";

vi.mock("next/image", () => ({
  default: (props: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img src={props.src} alt={props.alt} />
  ),
}));

const baseProduct: Product = {
  id: 1,
  sku: "ABC-001",
  title: "Producto de prueba",
  description: "desc",
  category: "test",
  brand: "TestBrand",
  price: 100,
  discountPercentage: 25,
  rating: 4.5,
  stock: 10,
  thumbnail: "https://example.com/thumb.png",
  images: [],
};

describe("ProductCard", () => {
  it("renders title, brand and final price", () => {
    render(<ProductCard product={baseProduct} />);
    expect(screen.getByText("Producto de prueba")).toBeInTheDocument();
    expect(screen.getByText("TestBrand")).toBeInTheDocument();
    expect(screen.getByText("$75,00")).toBeInTheDocument();
    expect(screen.getByText("$100,00")).toBeInTheDocument();
  });

  it("renders discount badge when discountPercentage is meaningful", () => {
    render(<ProductCard product={baseProduct} />);
    expect(screen.getByText("-25%")).toBeInTheDocument();
  });

  it("links to /product/<encoded-sku>", () => {
    render(<ProductCard product={{ ...baseProduct, sku: "AB/CD 1" }} />);
    const link = screen.getByRole("link", { name: /Ver Producto de prueba/i });
    expect(link).toHaveAttribute("href", "/product/AB%2FCD%201");
  });

  it("falls back to category when brand is null", () => {
    render(<ProductCard product={{ ...baseProduct, brand: null }} />);
    expect(screen.getByText("test")).toBeInTheDocument();
  });

  it("shows the out-of-stock badge when stock is zero", () => {
    render(<ProductCard product={{ ...baseProduct, stock: 0 }} />);
    expect(screen.getByText(/sin stock/i)).toBeInTheDocument();
  });
});
