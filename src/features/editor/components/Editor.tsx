"use client";

import Emoji, { gitHubEmojis } from "@tiptap/extension-emoji";
import TextAlign from "@tiptap/extension-text-align";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorLoader from "@/features/editor/components/EditorLoader";
import TextEditor from "@/features/editor/components/TextEditor";

export default function Editor() {
  const editor = useEditor({
    // Don't render immediately on the server to avoid SSR issues
    content: "",
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,

    extensions: [
      StarterKit,

      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
      }),
      Emoji.configure({
        emojis: gitHubEmojis,
        enableEmoticons: true,
      }),
    ],

    editorProps: {
      attributes: {
        class: "min-h-[250px] border-b p-5.5 outline-none rounded-md",
      },
    },
  });

  return (
    <article className="focus:border-primary rounded-md border-1 border-b-0 transition-colors focus:outline-none">
      {editor ? <TextEditor editor={editor} /> : <EditorLoader />}
    </article>
  );
}
