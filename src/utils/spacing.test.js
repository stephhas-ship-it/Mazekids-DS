import { describe, it, expect } from "vitest";
import { GAP, PAD } from "./spacing";

describe("spacing scale", () => {
  it("maps each step to its Tailwind class", () => {
    expect(GAP[4]).toBe("gap-4");
    expect(PAD[4]).toBe("p-4");
  });

  it("offers the same steps for gap and padding", () => {
    expect(Object.keys(GAP)).toEqual(Object.keys(PAD));
  });

  it("has no off-scale steps", () => {
    expect(Object.keys(GAP)).toEqual(["0", "1", "2", "3", "4", "6", "8"]);
  });
});
