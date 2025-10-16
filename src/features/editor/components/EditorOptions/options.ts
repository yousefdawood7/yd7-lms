import { type Editor } from "@tiptap/react";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  LucideIcon,
  Strikethrough,
  Underline,
} from "lucide-react";

type OptionsType = {
  label: string;
  icon: LucideIcon;
  action: (editor: Editor) => void;
  isActive: (editor: Editor) => boolean;
};

export const textTransformOptions: OptionsType[][] = [
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
];
