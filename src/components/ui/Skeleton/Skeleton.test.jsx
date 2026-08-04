import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Skeleton from "./Skeleton";
import SkeletonStatCard from "./SkeletonStatCard";
import SkeletonTableRows from "./SkeletonTableRows";

describe("Skeleton", () => {
  it("renders and is hidden from assistive tech", () => {
    render(<Skeleton data-testid="sk" />);
    expect(screen.getByTestId("sk").getAttribute("aria-hidden")).toBe("true");
  });

  it("renders the stat card preset", () => {
    render(<SkeletonStatCard data-testid="card" />);
    expect(screen.getByTestId("card").children.length).toBe(3);
  });

  it("renders the requested number of table rows", () => {
    render(<SkeletonTableRows rows={3} cols={2} data-testid="rows" />);
    expect(screen.getByTestId("rows").children.length).toBe(3);
  });
});
