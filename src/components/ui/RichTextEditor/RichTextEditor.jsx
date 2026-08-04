import * as React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Heading3,
  List,
  ListOrdered,
  Link as LinkIcon,
  Undo2,
  Redo2,
  RemoveFormatting,
} from "lucide-react";
import cn from "../../../utils/cn";
import ToolbarButton from "./ToolbarButton";

/**
 * @param {object} props
 * @param {string} props.value  HTML string in and out
 * @param {(html: string) => void} props.onChange
 * @param {number} [props.minHeight]
 */
// Toolbar is deliberately structural only (heading, lists, links, bold) —
// circulars need structure, not fonts, colours or sizes.
const RichTextEditor = ({
  value = "",
  onChange,
  placeholder = "Write here…",
  minHeight = 160,
  disabled,
  className = "",
  "aria-label": ariaLabel = "Rich text editor",
  ...rest
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [3] } }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: "noopener noreferrer" },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    editable: !disabled,
    onUpdate: ({ editor: e }) => onChange?.(e.getHTML()),
    editorProps: {
      attributes: {
        "aria-label": ariaLabel,
        class: "mk-richtext focus:outline-none",
        style: `min-height:${minHeight}px`,
      },
    },
  });

  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  React.useEffect(() => {
    editor?.setEditable(!disabled);
  }, [disabled, editor]);

  const setLink = () => {
    if (!editor) return;
    const previous = editor.getAttributes("link").href;
    const url = window.prompt("Link URL", previous ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  if (!editor) return null;

  return (
    <div
      className={cn(
        "rounded-input border border-border-strong bg-surface-2",
        "focus-within:border-primary",
        disabled && "opacity-60",
        className,
      )}
      {...rest}
    >
      <div
        role="toolbar"
        aria-label="Formatting"
        className="flex flex-wrap items-center gap-0.5 border-b border-border px-2 py-1.5"
      >
        <ToolbarButton
          label="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={14} />
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={14} />
        </ToolbarButton>
        <ToolbarButton
          label="Heading"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 size={14} />
        </ToolbarButton>
        <span className="mx-1 h-4 w-px bg-border" aria-hidden="true" />
        <ToolbarButton
          label="Bulleted list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={14} />
        </ToolbarButton>
        <ToolbarButton
          label="Numbered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={14} />
        </ToolbarButton>
        <ToolbarButton
          label="Link"
          active={editor.isActive("link")}
          onClick={setLink}
        >
          <LinkIcon size={14} />
        </ToolbarButton>
        <ToolbarButton
          label="Clear formatting"
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
        >
          <RemoveFormatting size={14} />
        </ToolbarButton>
        <span className="ml-auto flex items-center gap-0.5">
          <ToolbarButton
            label="Undo"
            disabled={!editor.can().undo()}
            onClick={() => editor.chain().focus().undo().run()}
          >
            <Undo2 size={14} />
          </ToolbarButton>
          <ToolbarButton
            label="Redo"
            disabled={!editor.can().redo()}
            onClick={() => editor.chain().focus().redo().run()}
          >
            <Redo2 size={14} />
          </ToolbarButton>
        </span>
      </div>
      <EditorContent editor={editor} className="px-3.5 py-3 text-sm text-ink" />
    </div>
  );
};

export default RichTextEditor;
