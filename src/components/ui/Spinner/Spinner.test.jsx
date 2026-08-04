import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Spinner from "./Spinner";

describe("Spinner", () => {
  it("announces itself as loading", () => {
    render(<Spinner />);
    expect(screen.getByRole("status", { name: "Loading" })).toBeTruthy();
  });

  it("sizes from the size prop", () => {
    render(<Spinner size={24} />);
    expect(screen.getByRole("status").style.width).toBe("24px");
  });
});
