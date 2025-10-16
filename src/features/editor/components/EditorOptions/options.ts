import { type Editor } from "@tiptap/react";
import {
  Bold,
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
];
