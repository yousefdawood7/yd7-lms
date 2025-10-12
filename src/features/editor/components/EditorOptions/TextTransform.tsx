import {
  type LucideIcon,
  Bold,
  Italic,
  Strikethrough,
  Underline,
} from "lucide-react";
import { type Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";

type TextTransformType = {
  label: string;
  icon: LucideIcon;
  action: (editor: Editor) => void;
  isActive: (editor: Editor) => boolean;
};

const textTransformOptions: TextTransformType[][] = [
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

export default function TextTransform({ editor }: { editor: Editor }) {
  return (
    <div className="flex gap-x-5">
      <nav>
        <ul className="flex gap-x-5">
          {textTransformOptions[0].map(
            ({ label, icon: Icon, action, isActive }) => (
              <li key={label}>
                <Toggle
                  className="rounded-sm"
                  pressed={isActive(editor)}
                  onClick={() => action(editor)}
                >
                  <Icon className="size-6" />
                </Toggle>
              </li>
            ),
          )}
        </ul>
      </nav>
      <Separator orientation="vertical" className="!h-10" />
    </div>
  );
}
