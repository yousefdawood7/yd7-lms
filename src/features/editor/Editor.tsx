"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function Editor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
    // Don't render immediately on the server to avoid SSR issues
    editorProps: {
      attributes: {
        class:
          "border-b min-h-[250px] border-1 p-5.5 focus:border-primary focus:outline-none transition-colors rounded-md",
      },
    },

    immediatelyRender: false,
  });

  return <EditorContent editor={editor} />;
}
