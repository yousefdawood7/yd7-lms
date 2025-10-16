import { type Editor } from "@tiptap/react";
import TextTransformList from "@/features/editor/components/EditorOptions/TextTransformList";

export default function TextTransform({ editor }: { editor: Editor }) {
  return (
    <div className="flex gap-x-5">
      <nav>
        <ul className="flex gap-x-5">
          <TextTransformList editor={editor} />
        </ul>
      </nav>
    </div>
  );
}
