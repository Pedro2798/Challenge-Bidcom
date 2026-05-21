import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

describe("Button", () => {
  it("renders children and is clickable", async () => {
    const handle = vi.fn();
    render(<Button onClick={handle}>Comprar</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Comprar" }));
    expect(handle).toHaveBeenCalledOnce();
  });

  it("becomes disabled while loading and exposes aria-busy", () => {
    render(<Button isLoading>Cargando</Button>);
    const button = screen.getByRole("button", { name: /cargando/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });

  it("supports outline variant without throwing", () => {
    render(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
