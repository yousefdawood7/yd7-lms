import { LoaderCircle } from "lucide-react";

export default function EditorLoader() {
  return (
    <div className="flex min-h-[250px] flex-col items-center justify-center gap-y-2.5 border-b p-5.5 outline-none">
      <LoaderCircle className="size-12 animate-spin" />
      <span className="text-muted-foreground tracking-tight">
        Editor Loading...
      </span>
    </div>
  );
}
