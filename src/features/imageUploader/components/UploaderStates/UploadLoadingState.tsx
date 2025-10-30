import { LoaderCircle } from "lucide-react";
import { Counter } from "@/components/ui/shadcn-io/counter";

export default function UploadLoadingState({
  fileName,
  progress,
}: {
  fileName: string;
  progress: number;
}) {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-5">
      <div>
        <LoaderCircle className="size-10 animate-spin" />
      </div>

      <article className="flex flex-col gap-y-2.5 text-center">
        <p>Uploading File: {fileName}</p>
        <div className="flex items-center justify-center gap-x-2">
          <p className="text-muted-foreground mb-2 text-sm">Uploading: </p>
          <Counter
            number={progress}
            className="text-muted-foreground -mt-1.5 bg-transparent p-0"
          />
          <p className="text-muted-foreground mb-2 text-sm">%</p>
        </div>
      </article>
    </div>
  );
}
