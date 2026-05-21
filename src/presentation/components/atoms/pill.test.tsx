import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Pill, pillToneFor, PILL_TONES } from "./pill";

describe("Pill", () => {
  it("renders as a span when no href is provided", () => {
    render(<Pill>Hola</Pill>);
    expect(screen.getByText("Hola").tagName).toBe("SPAN");
  });

  it("renders as a link when href is provided", () => {
    render(<Pill href="/search?s=beauty">Beauty</Pill>);
    const link = screen.getByRole("link", { name: "Beauty" });
    expect(link).toHaveAttribute("href", "/search?s=beauty");
  });
});

describe("pillToneFor", () => {
  it("cycles through PILL_TONES based on index", () => {
    expect(pillToneFor(0)).toBe(PILL_TONES[0]);
    expect(pillToneFor(PILL_TONES.length)).toBe(PILL_TONES[0]);
    expect(pillToneFor(PILL_TONES.length + 2)).toBe(PILL_TONES[2]);
  });
});
