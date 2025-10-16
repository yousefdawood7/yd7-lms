import { Fragment } from "react";
import { type Editor } from "@tiptap/react";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { textTransformOptions } from "@/features/editor/components/EditorOptions/options";

export default function TextTransformList({ editor }: { editor: Editor }) {
  return textTransformOptions.slice(0, 3).map((transformOption, i) => (
    <Fragment key={i}>
      {transformOption.map(
        ({ label, icon: Icon, action, isActive, disabledProp }) => (
          <li key={label}>
            <Toggle
              className="rounded-sm"
              pressed={disabledProp ? false : isActive(editor)}
              onClick={() => action(editor)}
              disabled={disabledProp ? !isActive(editor) : false}
            >
              <Icon className="size-6" />
            </Toggle>
          </li>
        ),
      )}
      <Separator orientation="vertical" className="!h-10" />
    </Fragment>
  ));
}
