import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FileUpload from "./FileUpload";

const file = (name, type = "application/pdf", size = 1024) => {
  const f = new File(["x"], name, { type });
  Object.defineProperty(f, "size", { value: size });
  return f;
};

describe("FileUpload", () => {
  it("renders a labelled drop zone", () => {
    render(<FileUpload label="Upload receipt" />);
    expect(screen.getByRole("button", { name: "Upload receipt" })).toBeTruthy();
  });

  it("lists selected files with their size", () => {
    render(<FileUpload files={[file("receipt.pdf", "application/pdf", 2048)]} />);
    expect(screen.getByText("receipt.pdf")).toBeTruthy();
    expect(screen.getByText("2 KB")).toBeTruthy();
  });

  it("rejects a file over the size limit", () => {
    const onFilesChange = vi.fn();
    const { container } = render(
      <FileUpload maxSizeMb={1} onFilesChange={onFilesChange} />,
    );
    const input = container.querySelector("input[type=file]");
    fireEvent.change(input, {
      target: { files: [file("big.pdf", "application/pdf", 5 * 1048576)] },
    });
    expect(screen.getByRole("alert").textContent).toContain("over the 1 MB limit");
    expect(onFilesChange).not.toHaveBeenCalled();
  });

  it("rejects a file that fails the accept rule", () => {
    const onFilesChange = vi.fn();
    const { container } = render(
      <FileUpload accept=".pdf" onFilesChange={onFilesChange} />,
    );
    fireEvent.change(container.querySelector("input[type=file]"), {
      target: { files: [file("photo.png", "image/png")] },
    });
    expect(screen.getByRole("alert").textContent).toContain("isn't an accepted file type");
    expect(onFilesChange).not.toHaveBeenCalled();
  });

  it("removes a file by index", () => {
    const onFilesChange = vi.fn();
    render(
      <FileUpload
        files={[file("a.pdf"), file("b.pdf")]}
        multiple
        onFilesChange={onFilesChange}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Remove a.pdf" }));
    expect(onFilesChange.mock.calls[0][0].map((f) => f.name)).toEqual(["b.pdf"]);
  });
});
