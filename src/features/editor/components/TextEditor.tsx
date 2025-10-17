import { useSyncExternalStore } from "react";
import { type Editor,EditorContent } from "@tiptap/react";
import { spellCheckStore } from "@/features/editor/components/EditorOptions/options";
import MenuEditor from "@/features/editor/components/MenuEditor";

export default function TextEditor({ editor }: { editor: Editor }) {
  useSyncExternalStore(
    spellCheckStore.subscribe,
    spellCheckStore.getSnapshot,
    spellCheckStore.getServerSnapshot,
  );

  return (
    <>
      <MenuEditor editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
}
