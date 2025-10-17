import { type Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  LucideIcon,
  Redo,
  SpellCheck2,
  Strikethrough,
  Underline,
  Undo,
} from "lucide-react";
import { spellCheck } from "@/features/editor/components/EditorOptions/Events/spellcheck";

type OptionsType = {
  label: string;
  icon: LucideIcon;
  action: (editor: Editor) => void;
  isActive: (editor: Editor) => boolean;
  disabledProp?: boolean;
};

export const spellCheckStore = {
  subscribe: (callback: () => void) => {
    const abortController = new AbortController();
    const editor = document.querySelector(".tiptap");

    editor?.addEventListener("spellcheck", () => callback(), {
      signal: abortController.signal,
    });

    return () => abortController.abort();
  },

  getSnapshot: () => {
    const editor = document.querySelector(".tiptap");
    return editor?.getAttribute("spellcheck") === "true" ? true : false;
  },

  getServerSnapshot: () => {
    // As Initial State
    return false;
  },
};

export const textTransformOptions: OptionsType[][] = [
  [
    {
      label: "Undo",
      icon: Undo,
      action: (editor) => editor.chain().focus().undo().run(),
      isActive: (editor) => editor.can().chain().focus().undo().run(),
      disabledProp: true,
    },
    {
      label: "Redo",
      icon: Redo,
      action: (editor) => editor.chain().focus().redo().run(),
      isActive: (editor) => editor.can().chain().focus().redo().run(),
      disabledProp: true,
    },
  ],

  [
    {
      label: "Bold",
      icon: Bold,
      action: (editor) => editor.chain().focus().toggleBold().run(),
      isActive: (editor) => editor.isActive("bold"),
    },

    {
      label: "Italic",
      icon: Italic,
      action: (editor) => editor.chain().focus().toggleItalic().run(),
      isActive: (editor) => editor.isActive("italic"),
    },

    {
      label: "Underline",
      icon: Underline,
      action: (editor) => editor.chain().focus().toggleUnderline().run(),
      isActive: (editor) => editor.isActive("underline"),
    },

    {
      label: "Strike",
      icon: Strikethrough,
      action: (editor) => editor.chain().focus().toggleStrike().run(),
      isActive: (editor) => editor.isActive("strike"),
    },
  ],

  [
    {
      label: "Heading-1",
      icon: Heading1,
      action: (editor) =>
        editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: (editor) => editor.isActive("heading", { level: 1 }),
    },

    {
      label: "Heading-2",
      icon: Heading2,
      action: (editor) =>
        editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: (editor) => editor.isActive("heading", { level: 2 }),
    },

    {
      label: "Heading-3",
      icon: Heading3,
      action: (editor) =>
        editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: (editor) => editor.isActive("heading", { level: 3 }),
    },
  ],

  [
    {
      label: "Unordered-List",
      icon: List,
      action: (editor) => editor.chain().focus().toggleBulletList().run(),
      isActive: (editor) => editor.isActive("bulletList"),
    },

    {
      label: "Ordered-List",
      icon: ListOrdered,
      action: (editor) => editor.chain().focus().toggleOrderedList().run(),
      isActive: (editor) => editor.isActive("orderedList"),
    },
  ],

  [
    {
      label: "Align-Left",
      icon: AlignLeft,
      action: (editor) => editor.chain().focus().setTextAlign("left").run(),
      isActive: (editor) => editor.isActive({ textAlign: "left" }),
    },

    {
      label: "Align-Center",
      icon: AlignCenter,
      action: (editor) => editor.chain().focus().setTextAlign("center").run(),
      isActive: (editor) => editor.isActive({ textAlign: "center" }),
    },

    {
      label: "Align-Right",
      icon: AlignRight,
      action: (editor) => editor.chain().focus().setTextAlign("right").run(),
      isActive: (editor) => editor.isActive({ textAlign: "right" }),
    },
  ],

  [
    {
      label: "Spell-Checker",
      icon: SpellCheck2,
      action: (editor) => {
        const isActive = editor.view.dom.getAttribute("spellcheck");
        editor.view.dom.setAttribute(
          "spellcheck",
          isActive === "true" ? "false" : "true",
        );
        editor.view.dom.dispatchEvent(spellCheck);
      },

      isActive: (editor) =>
        editor.view.dom.getAttribute("spellcheck") === "true" ? true : false,
    },
  ],
];
