import { describe, it, expect } from "vitest";
import { can, ROLE_LABELS } from "./permissions";

describe("can", () => {
  it("grants a permission the role holds", () => {
    expect(can("center_admin", "billing")).toBe(true);
  });

  it("denies a permission the role lacks", () => {
    expect(can("teacher", "billing")).toBe(false);
  });

  it("denies everything for an unknown role instead of throwing", () => {
    expect(can("intern", "billing")).toBe(false);
    expect(can(undefined, "billing")).toBe(false);
  });
});

describe("ROLE_LABELS", () => {
  it("labels every role in the matrix", () => {
    for (const role of ["internal_admin", "center_admin", "coordinator", "teacher"]) {
      expect(typeof ROLE_LABELS[role]).toBe("string");
    }
  });
});
