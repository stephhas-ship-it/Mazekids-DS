import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Field from "./Field";
import Input from "../Input/Input";

describe("Field", () => {
  it("links the label to the control", () => {
    render(
      <Field label="Vendor">
        <Input />
      </Field>,
    );
    expect(screen.getByLabelText("Vendor")).toBeTruthy();
  });

  it("marks the control invalid and describes it with the error", () => {
    render(
      <Field label="Amount" error="Enter an amount">
        <Input />
      </Field>,
    );
    const input = screen.getByLabelText("Amount");
    expect(input.getAttribute("aria-invalid")).toBe("true");
    const describedBy = input.getAttribute("aria-describedby");
    expect(document.getElementById(describedBy).textContent).toBe(
      "Enter an amount",
    );
  });

  it("shows help text when there is no error", () => {
    render(
      <Field label="Amount" help="Excluding GST">
        <Input />
      </Field>,
    );
    expect(screen.getByText("Excluding GST")).toBeTruthy();
    expect(screen.queryByRole("alert")).toBeNull();
  });
});
