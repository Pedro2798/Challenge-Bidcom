import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "./search-bar";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
  useSearchParams: () => new URLSearchParams(),
}));

beforeEach(() => {
  pushMock.mockClear();
});

describe("SearchBar", () => {
  it("pushes /search?s=<encoded> when the user submits a non-empty term", async () => {
    render(<SearchBar />);
    const input = screen.getByLabelText(/buscar productos/i);
    await userEvent.type(input, "iPhone 13");
    await userEvent.click(screen.getByRole("button", { name: /buscar/i }));
    expect(pushMock).toHaveBeenCalledWith("/search?s=iPhone%2013");
  });

  it("submits on Enter inside the input", async () => {
    render(<SearchBar />);
    const input = screen.getByLabelText(/buscar productos/i);
    await userEvent.type(input, "watch{Enter}");
    expect(pushMock).toHaveBeenCalledWith("/search?s=watch");
  });

  it("does not navigate when the query is empty or whitespace", async () => {
    render(<SearchBar />);
    await userEvent.click(screen.getByRole("button", { name: /buscar/i }));
    expect(pushMock).not.toHaveBeenCalled();

    const input = screen.getByLabelText(/buscar productos/i);
    await userEvent.type(input, "   ");
    await userEvent.keyboard("{Enter}");
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("seeds the input with initialQuery when provided", () => {
    render(<SearchBar initialQuery="seeded" />);
    expect(screen.getByLabelText(/buscar productos/i)).toHaveValue("seeded");
  });
});
