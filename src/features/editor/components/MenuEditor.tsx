import { type Editor } from "@tiptap/react";
import TextTransform from "@/features/editor/components/EditorOptions/TextTransformItem";

export default function MenuEditor({ editor }: { editor: Editor }) {
  return (
    <div className="overflow-auto border-b px-1.5 py-2.5">
      <TextTransform editor={editor} />
    </div>
  );
}
