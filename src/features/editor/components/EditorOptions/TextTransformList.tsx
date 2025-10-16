import { Toggle } from "@/components/ui/toggle";
import { textTransformOptions } from "@/features/editor/components/EditorOptions/options";
import { type Editor } from "@tiptap/react";

export default function TextTransformList({ editor }: { editor: Editor }) {
  return textTransformOptions[0].map(
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
  );
}
