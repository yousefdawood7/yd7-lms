import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { textTransformOptions } from "@/features/editor/components/EditorOptions/options";
import { type Editor } from "@tiptap/react";
import { Fragment } from "react";

export default function TextTransformList({ editor }: { editor: Editor }) {
  return textTransformOptions.slice(0, 2).map((transformOption, i) => (
    <Fragment key={i}>
      {transformOption.map(({ label, icon: Icon, action, isActive }) => (
        <li key={label}>
          <Toggle
            className="rounded-sm"
            pressed={isActive(editor)}
            onClick={() => action(editor)}
          >
            <Icon className="size-6" />
          </Toggle>
        </li>
      ))}
      <Separator orientation="vertical" className="!h-10" />
    </Fragment>
  ));
}
