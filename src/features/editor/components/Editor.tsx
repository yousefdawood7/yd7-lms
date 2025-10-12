"use client";

import MenuEditor from "@/features/editor/components/MenuEditor";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { LoaderCircle } from "lucide-react";

export default function Editor() {
  const editor = useEditor({
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",

    editorProps: {
      attributes: {
        class: "min-h-[250px] border-b p-5.5 outline-none",
      },
    },
  });

  return (
    <article className="focus:border-primary border-1 transition-colors focus:outline-none">
      {editor ? (
        <>
          <MenuEditor editor={editor} />
          <EditorContent editor={editor} />
        </>
      ) : (
        <div className="flex min-h-[250px] flex-col items-center justify-center gap-y-2.5 border-b p-5.5 outline-none">
          <LoaderCircle className="size-12 animate-spin" />
          <span className="text-muted-foreground tracking-tight">
            Editor Loading...
          </span>
        </div>
      )}
    </article>
  );
}
