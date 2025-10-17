"use client";

import Emoji, { gitHubEmojis } from "@tiptap/extension-emoji";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { LoaderCircle } from "lucide-react";
import MenuEditor from "@/features/editor/components/MenuEditor";

export type EditorProps = {
  handleChange?: (value: string) => void;
};

export default function Editor({ handleChange }: EditorProps) {
  const editor = useEditor({
    // Don't render immediately on the server to avoid SSR issues
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
    content: "",

    onUpdate: ({ editor }) => {
      handleChange?.(editor.getText());
    },

    editorProps: {
      attributes: {
        class: "min-h-[250px] border-b p-5.5 outline-none rounded-md",
      },
    },
  });

  return (
    <article className="focus:border-primary rounded-md border-1 border-b-0 transition-colors focus:outline-none">
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
