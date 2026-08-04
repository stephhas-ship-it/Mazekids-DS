import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Alert from "./Alert";

describe("Alert", () => {
  it("renders title and body", () => {
    render(<Alert title="Heads up">Fee structure changes on 1 April.</Alert>);
    expect(screen.getByText("Heads up")).toBeTruthy();
    expect(screen.getByText("Fee structure changes on 1 April.")).toBeTruthy();
  });

  it("announces a danger alert assertively", () => {
    render(<Alert tone="danger">Payment failed.</Alert>);
    expect(screen.getByRole("alert")).toBeTruthy();
  });

  it("uses status for non-danger tones", () => {
    render(<Alert tone="info">Saved.</Alert>);
    expect(screen.getByRole("status")).toBeTruthy();
  });
});
