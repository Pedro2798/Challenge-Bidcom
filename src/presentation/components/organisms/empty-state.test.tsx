import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { EmptyState } from "./empty-state";
import type { Category } from "@/domain/entities/category";

const fiveCategories: Category[] = [
  { slug: "beauty", name: "Beauty" },
  { slug: "fragrances", name: "Fragrances" },
  { slug: "furniture", name: "Furniture" },
  { slug: "groceries", name: "Groceries" },
  { slug: "home-decoration", name: "Home Decoration" },
];

describe("EmptyState", () => {
  it("renders the exact challenge wording", () => {
    render(<EmptyState categories={fiveCategories} />);
    expect(
      screen.getByText(/no se encontró ningún producto/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/te recomendamos buscar estas categorías/i),
    ).toBeInTheDocument();
  });

  it("renders one pill per category linking to /search?s=<slug>", () => {
    render(<EmptyState categories={fiveCategories} />);
    const list = screen.getByTestId("empty-state-categories");
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(5);

    const beautyLink = within(list).getByRole("link", { name: "Beauty" });
    expect(beautyLink).toHaveAttribute("href", "/search?s=beauty");

    const homeLink = within(list).getByRole("link", { name: "Home Decoration" });
    expect(homeLink).toHaveAttribute("href", "/search?s=home-decoration");
  });

  it("includes the query in the heading when provided", () => {
    render(<EmptyState categories={fiveCategories} query="xyzqqq" />);
    expect(screen.getByText(/no encontramos nada para/i)).toBeInTheDocument();
    expect(screen.getByText(/"xyzqqq"/)).toBeInTheDocument();
  });
});
