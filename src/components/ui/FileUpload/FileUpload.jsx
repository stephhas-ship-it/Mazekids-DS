import * as React from "react";
import { UploadCloud, FileText, X } from "lucide-react";
import cn from "../../../utils/cn";

const formatSize = (bytes) =>
  bytes >= 1048576
    ? `${(bytes / 1048576).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

const matchesAccept = (file, accept) => {
  if (!accept) return true;
  return accept.split(",").some((rule) => {
    const r = rule.trim().toLowerCase();
    if (r.startsWith(".")) return file.name.toLowerCase().endsWith(r);
    if (r.endsWith("/*")) return file.type.startsWith(r.slice(0, -1));
    return file.type === r;
  });
};

/**
 * @param {object} props
 * @param {File[]} props.files  Controlled — the parent owns the array
 * @param {(files: File[]) => void} props.onFilesChange
 * @param {string} [props.accept]  e.g. ".pdf,image/*"
 * @param {number} [props.maxSizeMb]
 */
const FileUpload = ({
  files = [],
  onFilesChange,
  accept,
  maxSizeMb = 10,
  multiple = false,
  label = "Upload file",
  help,
  disabled,
  className = "",
  ...rest
}) => {
  const [dragging, setDragging] = React.useState(false);
  const [rejection, setRejection] = React.useState(null);
  const inputRef = React.useRef(null);
  const id = React.useId();

  const addFiles = (list) => {
    const ok = [];
    for (const f of [...list]) {
      if (!matchesAccept(f, accept)) {
        setRejection(`"${f.name}" isn't an accepted file type.`);
        continue;
      }
      if (f.size > maxSizeMb * 1048576) {
        setRejection(`"${f.name}" is over the ${maxSizeMb} MB limit.`);
        continue;
      }
      ok.push(f);
    }
    if (ok.length) {
      setRejection(null);
      onFilesChange?.(multiple ? [...files, ...ok] : ok.slice(0, 1));
    }
  };

  const removeAt = (i) => onFilesChange?.(files.filter((_, j) => j !== i));

  return (
    <div className={cn("flex flex-col gap-2", className)} {...rest}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-labelledby={`${id}-label`}
        aria-disabled={disabled}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => {
          if (!disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (!disabled) addFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-1.5",
          "rounded-input border border-dashed px-4 py-6 text-center transition-colors",
          dragging
            ? "border-primary bg-primary-subtle"
            : "border-border-strong bg-surface-1 hover:bg-primary-subtle/50",
          disabled && "pointer-events-none opacity-50",
        )}
      >
        <UploadCloud size={20} className="text-ink-muted" aria-hidden="true" />
        <span id={`${id}-label`} className="text-sm font-medium text-ink">
          {label}
        </span>
        <span className="text-xs text-ink-muted">
          {help ??
            `Drag and drop or click to browse${accept ? ` · ${accept}` : ""} · up to ${maxSizeMb} MB`}
        </span>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => {
            addFiles(e.target.files);
            // Reset so re-picking the same file still fires a change event.
            e.target.value = "";
          }}
          className="sr-only"
          tabIndex={-1}
        />
      </div>

      {rejection && (
        <p className="text-xs text-danger-fg" role="alert">
          {rejection}
        </p>
      )}

      {files.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center gap-2.5 rounded-input border border-border bg-surface-2 px-3 py-2 text-sm"
            >
              <FileText
                size={15}
                className="shrink-0 text-ink-muted"
                aria-hidden="true"
              />
              <span className="min-w-0 flex-1 truncate text-ink">{f.name}</span>
              <span className="shrink-0 text-xs tabular-nums text-ink-muted">
                {formatSize(f.size)}
              </span>
              <button
                type="button"
                onClick={() => removeAt(i)}
                aria-label={`Remove ${f.name}`}
                className="shrink-0 rounded-control p-1 text-ink-muted hover:bg-surface-1 hover:text-danger-fg"
              >
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUpload;
