import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Without an explicit cleanup, mounted trees leak into the next test and
// queries like getByRole find duplicates from earlier renders.
afterEach(cleanup);
