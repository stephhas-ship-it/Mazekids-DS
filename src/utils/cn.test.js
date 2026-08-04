import { describe, it, expect } from "vitest";
import cn from "./cn";

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("flex", "items-center")).toBe("flex items-center");
  });

  it("drops falsy values", () => {
    expect(cn("flex", false && "hidden", null, undefined)).toBe("flex");
  });

  it("resolves conflicting Tailwind utilities in favour of the last", () => {
    expect(cn("bg-primary", "bg-surface-1")).toBe("bg-surface-1");
  });

  it("flattens nested arrays", () => {
    expect(cn(["flex", ["gap-2"]])).toBe("flex gap-2");
  });
});
